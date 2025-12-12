import { CalendarIcon, CircleCheck, MapPinHouseIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import Buttons from '../../../components/Buttons'
import SectionHeader from '../../../components/SectionHeader'
import StatusBadge from '../../../components/StatusBadge'
import { supabase } from '../../../supabaseClient'
import { UserAuth } from '../../../context/AuthContext'
import Masonry from 'react-masonry-css';
import PriorityBadge from '../../../components/PriorityBadge'

function InProgress() {
  const { user } = UserAuth();
  const [inProgressTasks, setInProgressTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const breakpointColumns = {
    default: 3,
    1100: 2,
    500: 1
  };

  const fetchInProgressTasks = async () => {
    if (!user?.id) {
      console.log("No user ID found");
      return;
    }

    console.log("=== FETCHING IN PROGRESS TASKS ===");
    console.log("Current user ID:", user.id);

    setLoading(true);
    try {
      // Fetch reports assigned to the current technician with "in progress" status
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("assigned_to", user.id)
        .eq("status", "in_progress")
        .order("created_at", { ascending: false });

      console.log("In progress tasks:", data);
      console.log("Error (if any):", error);

      if (error) {
        console.error("Error fetching in progress tasks:");
        console.error("Error message:", error.message);
        console.error("Error details:", error.details);
        console.error("Full error:", JSON.stringify(error, null, 2));
        return;
      }

      setInProgressTasks(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchInProgressTasks();
    }
  }, [user]);

  // Real-time subscription for task updates
  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase.channel("in-progress-channel");
    channel
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "reports",
        filter: `assigned_to=eq.${user.id}`
      }, (payload) => {
        console.log("Report updated:", payload);
        fetchInProgressTasks(); // Refresh the list
      })
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleMarkAsResolved = async (reportId) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({ 
          status: "completed_waiting_admin",
          completed_at: new Date().toISOString()
        })
        .eq("id", reportId);

      if (error) {
        console.error("Error marking task as resolved:", error);
        alert("Failed to mark task as resolved: " + error.message);
        return;
      }

      // Remove from list after marking as resolved
      setInProgressTasks(prev => prev.filter(task => task.id !== reportId));
      alert("Task marked as resolved! Awaiting confirmation.");
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while marking the task as resolved");
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title="In Progress"
        text="Tasks you're currently working on"
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
          <p className="mt-4 text-text-muted">Loading in progress tasks...</p>
        </div>
      ) : inProgressTasks.length === 0 ? (
        <div className="text-center py-12 border border-border rounded-lg bg-background-black">
          <p className="text-text-muted text-lg">No tasks in progress</p>
          <p className="text-text-muted text-sm mt-2">Accept tasks from "Assigned Tasks" to see them here</p>
        </div>
      ) : (
        <Masonry
          breakpointCols={breakpointColumns}
          className="my-masonry-grid"
          columnClassName="my-masonry-grid_column"
        >
          {inProgressTasks.map(task => (
            <div key={task.id} className="border-border/50 border bg-background-black rounded-2xl gap-3 shadow-md relative">

              {task.image_url && (
                <div className="absolute right-0 m-2">
                  <StatusBadge
                    status={task.status}
                />
                </div>
              )}
    
              {!task.image_url &&  (<div className="m-2">
                <StatusBadge
                  status={task.status}
              />
              </div>)}
              
              {task.image_url && (
                <img 
                  src={task.image_url}
                  alt="" 
                  className="w-full h-40 rounded-tl-2xl rounded-tr-2xl object-cover"
                />
              )}

              <div className="m-5">
                <div className="mb-3 flex flex-col w-auto">
                  <div className="flex flex-row mb-1 justify-between items-center">
                    <h2 className="text-text text-lg w-[70%]">
                        {task.title}
                    </h2>

                    <PriorityBadge priority={task.priority} />
                  </div>

                  <div>
                    <p className='text-text-muted text-sm'>
                      {task.description || 'No description provided'}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <p className="flex gap-2 items-center text-text-muted">
                    <span className="text-text-muted text-sm">
                      <MapPinHouseIcon className="text-text-muted w-4 h-4"/>
                    </span>
                    <span className="text-sm">{task.location}</span>
                  </p>

                  <p className="flex gap-2 items-center">
                    <span className="text-text-muted text-sm">
                      <CalendarIcon className="text-text-muted w-4 h-4"/>
                    </span>
                    <span className="text-text-muted text-sm">
                      {task.created_at?.slice(0, 10)}
                    </span>
                  </p>

                  <div className="border-border/50 border"></div>

                  <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Reported by:</span>
                    <span className="text-text">
                      {task.reported_by || 'Unknown'}
                    </span>
                  </p>

                  {task.accepted_at && (
                    <p className="flex justify-between items-center">
                      <span className="text-text-muted text-sm">Started:</span>
                      <span className="text-text text-xs">
                        {new Date(task.accepted_at).toLocaleDateString()}
                      </span>
                    </p>
                  )}
                </div>
              </div>
              
              <div className='mx-5 mb-5'>
                <Buttons 
                  type='button'
                  style='cursor-pointer bg-success hover:bg-success/80 text-white flex gap-2 w-full items-center justify-center p-2 text-sm shadow-sm rounded-sm transition' 
                  text='Mark as Resolved'
                  icon={<CircleCheck className='w-4 h-4'/>}
                  onClick={() => handleMarkAsResolved(task.id)}
                />
              </div>
            </div>
          ))}
        </Masonry>
      )}
    </section>
  )
}

export default InProgress