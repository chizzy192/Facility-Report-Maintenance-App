import { CalendarIcon, MapPinHouseIcon, User } from 'lucide-react'
import { useEffect, useState } from 'react'
import SectionHeader from '../../../components/SectionHeader'
import StatusBadge from '../../../components/StatusBadge'
import { supabase } from '../../../supabaseClient'
import { UserAuth } from '../../../context/AuthContext'

function Completed() {
  const { user } = UserAuth();
  const [completedTasks, setCompletedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCompletedTasks = async () => {
    if (!user?.id) {
      console.log("No user ID found");
      return;
    }

    setLoading(true);
    try {
      // Fetch tasks with status 'completed_waiting_admin' OR 'fixed'
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("assigned_to", user.id)
        .or("status.eq.completed_waiting_admin,status.eq.fixed")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching completed tasks:", error);
        return;
      }

      setCompletedTasks(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCompletedTasks();
    }
  }, [user]);

  // Real-time subscription for status changes
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase.channel("completed-tasks-channel");
    channel
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "reports",
        filter: `assigned_to=eq.${user.id}`
      }, (payload) => {
        console.log("Report updated:", payload);
        // If status changed to completed_waiting_admin or fixed, add/update it
        if (payload.new.status === "completed_waiting_admin" || payload.new.status === "fixed") {
          setCompletedTasks(prev => {
            const exists = prev.find(task => task.id === payload.new.id);
            if (exists) {
              return prev.map(task => task.id === payload.new.id ? payload.new : task);
            }
            return [payload.new, ...prev];
          });
        } else {
          // If status changed away from completed, remove it
          setCompletedTasks(prev => prev.filter(task => task.id !== payload.new.id));
        }
      })
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title='Completed Tasks'
        text='Your task history and resolved issues'
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
          <p className="mt-4 text-text-muted">Loading completed tasks...</p>
        </div>
      ) : completedTasks.length === 0 ? (
        <div className="text-center py-12 border border-border rounded-lg bg-background-black">
          <p className="text-text-muted text-lg">No completed tasks yet</p>
          <p className="text-text-muted text-sm mt-2">Completed tasks will appear here</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
          {completedTasks.map(task => (
            <div key={task.id} className="p-5 shadow-lg rounded-lg bg-background-black border-border/50 border">
              <div className="mb-3 flex flex-col w-auto">
                <div className="flex flex-row mb-1 justify-between items-center">
                  <h2 className="text-text text-lg w-[70%]">
                    {task.title}
                  </h2>
                  <StatusBadge status={task.status} />
                </div>

                <div>
                  <p className='text-text-muted text-sm'>
                    {task.description || 'No description provided'}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-1 sm:flex-row sm:gap-3 wrap-break-word">
                <p className="flex gap-1 items-center text-text-muted whitespace-nowrap">
                  <MapPinHouseIcon className="text-text-muted w-4 h-4"/>
                  <span className="text-sm">{task.location}</span>
                </p>

                <p className="flex gap-1 items-center whitespace-nowrap">
                  <CalendarIcon className="text-text-muted w-4 h-4"/>
                  <span className="text-text-muted text-sm">
                    {task.created_at?.slice(0, 10)}
                  </span>
                </p>

                <p className="flex gap-1 items-center whitespace-nowrap">
                  <User className="text-text-muted w-4 h-4"/>
                  <span className="text-text-muted text-sm">
                    Reported by <span>{task.reporter?.full_name || task.reported_by || 'Unknown'}</span>
                  </span>
                </p>    
              </div>

              {task.completed_at && (
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-text-muted text-xs">
                    Completed: {new Date(task.completed_at).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Completed