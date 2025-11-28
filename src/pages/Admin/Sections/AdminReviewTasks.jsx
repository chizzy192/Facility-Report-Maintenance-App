import { CalendarIcon, Check, MapPinHouseIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Buttons from '../../../components/Buttons'
import SectionHeader from '../../../components/SectionHeader'
import StatusBadge from '../../../components/StatusBadge'
import { supabase } from '../../../supabaseClient'

function AdminReviewTasks() {
  const [reviewTasks, setReviewTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviewTasks = async () => {
    setLoading(true);
    try {
      // Fetch tasks with status 'completed_waiting_admin' and join with users table
      const { data, error } = await supabase
        .from("reports")
        .select(`
          *,
          reporter:users!reports_reported_by_fkey(id, full_name, email),
          technician:users!reports_assigned_to_fkey(id, full_name, email)
        `)
        .eq("status", "completed_waiting_admin")
        .order("created_at", { ascending: false });

      console.log("Tasks awaiting admin review:", data);
      
      if (error) {
        console.error("Error fetching review tasks:", error);
        return;
      }

      setReviewTasks(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviewTasks();
  }, []);

  // Real-time subscription for new completed tasks
  useEffect(() => {
    const channel = supabase.channel("admin-review-channel");
    channel
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "reports"
      }, (payload) => {
        console.log("Report updated:", payload);
        
        // If status changed to completed_waiting_admin, add it to the list
        if (payload.new.status === "completed_waiting_admin") {
          setReviewTasks(prev => {
            const exists = prev.find(task => task.id === payload.new.id);
            if (!exists) {
              return [payload.new, ...prev];
            }
            return prev;
          });
        } else {
          // If status changed away from completed_waiting_admin, remove it
          setReviewTasks(prev => prev.filter(task => task.id !== payload.new.id));
        }
      })
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleConfirm = async (reportId) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({ 
          status: "fixed",
          fixed_at: new Date().toISOString()
        })
        .eq("id", reportId);

      if (error) {
        console.error("Error confirming task:", error);
        alert("Failed to confirm task: " + error.message);
        return;
      }

      // Remove from list after confirming
      setReviewTasks(prev => prev.filter(task => task.id !== reportId));
      alert("Task confirmed as fixed!");
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while confirming the task");
    }
  };

  const handleCancel = async (reportId) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({ 
          status: "pending",
          assigned_to: null,
          assigned_at: null,
          accepted_at: null
        })
        .eq("id", reportId);

      if (error) {
        console.error("Error canceling task:", error);
        alert("Failed to cancel task: " + error.message);
        return;
      }

      // Remove from list after canceling
      setReviewTasks(prev => prev.filter(task => task.id !== reportId));
      alert("Task returned to pending - technician unassigned");
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while canceling the task");
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title="Review Completed Tasks"
        text="Confirm or reject tasks marked as complete by technicians"
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
          <p className="mt-4 text-text-muted">Loading tasks for review...</p>
        </div>
      ) : reviewTasks.length === 0 ? (
        <div className="text-center py-12 border border-border rounded-lg bg-background-black">
          <p className="text-text-muted text-lg">No tasks awaiting review</p>
          <p className="text-text-muted text-sm mt-2">Completed tasks will appear here for your approval</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          {reviewTasks.map(task => (
            <div key={task.id} className="border-border/50 border bg-background-black rounded-2xl gap-3 shadow-md">
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
                    <StatusBadge status={task.status} />
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
                      Reported: {task.created_at?.slice(0, 10)}
                    </span>
                  </p>

                  <div className="border-border/50 border"></div>

                  <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Reported by:</span>
                    <span className="text-text">
                      {task.reporter?.full_name || task.reported_by || 'Unknown'}
                    </span>
                  </p>

                  <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Assigned to:</span>
                    <span className="text-text">
                      {task.technician?.full_name || task.assigned_to || 'Unknown'}
                    </span>
                  </p>    
                </div>
              </div>
              
              <div className='mx-5 mb-5 flex justify-between gap-3'>
                <Buttons 
                  type='button'
                  style='cursor-pointer bg-green-600 hover:bg-green-700 text-white flex gap-2 w-full items-center justify-center p-1.5 text-sm shadow-sm rounded-sm transition' 
                  text='Confirm'
                  icon={<Check className='w-4 h-4'/>}
                  onClick={() => handleConfirm(task.id)}
                />
                    
                <Buttons 
                  type='button'
                  style='cursor-pointer bg-red-600 hover:bg-red-700 text-white flex gap-2 w-full items-center justify-center p-1.5 text-sm shadow-sm rounded-sm transition' 
                  text='Reject'
                  icon={<X className='w-4 h-4'/>}
                  onClick={() => handleCancel(task.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default AdminReviewTasks