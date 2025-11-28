import { CalendarIcon, Check, MapPinHouseIcon, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import Buttons from '../../../components/Buttons'
import SectionHeader from '../../../components/SectionHeader'
import StatusBadge from '../../../components/StatusBadge'
import { supabase } from '../../../supabaseClient'
import { UserAuth } from '../../../context/AuthContext'

function AssignedTasks() {
  const { user } = UserAuth();
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAssignedTasks = async () => {
    if (!user?.id) {
      console.log("No user ID found");
      return;
    }

    console.log("=== FETCHING ASSIGNED TASKS ===");
    console.log("Current user ID:", user.id);

    setLoading(true);
    try {
      // First check what statuses exist for this user
      const { data: allData, error: allError } = await supabase
        .from("reports")
        .select("id, status, assigned_to")
        .eq("assigned_to", user.id);
      
      console.log("ALL tasks for this user (any status):", allData);

      // Fetch only tasks that are still "waiting_approval" status (not accepted/in_progress)
      const { data, error } = await supabase
        .from("reports")
        .select("*")
        .eq("assigned_to", user.id)
        .eq("status", "waiting_approval") // Only fetch tasks that haven't been accepted yet
        .order("created_at", { ascending: false });

      console.log("Filtered assigned tasks:", data);
      console.log("Error (if any):", error);
      
      if (error) {
        console.error("Error fetching assigned tasks:");
        console.error("Error message:", error.message);
        console.error("Error details:", error.details);
        console.error("Error hint:", error.hint);
        console.error("Full error:", JSON.stringify(error, null, 2));
        return;
      }

      setAssignedTasks(data || []);
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchAssignedTasks();
    }
  }, [user]);

  // Real-time subscription for NEW assignments only
  useEffect(() => {
    if (!user?.id) return;

    console.log("Setting up real-time subscription for user:", user.id);

    const channel = supabase.channel("assigned-tasks-channel");
    channel
      .on("postgres_changes", {
        event: "INSERT", // Listen for new reports
        schema: "public",
        table: "reports"
      }, (payload) => {
        console.log("New report created:", payload);
        // Check if it's assigned to current user
        if (payload.new.assigned_to === user.id && payload.new.status === "waiting_approval") {
          console.log("Adding new assignment to list");
          setAssignedTasks(prev => [payload.new, ...prev]);
        }
      })
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "reports"
      }, (payload) => {
        console.log("Report updated:", payload);
        
        // If newly assigned to current user with status "waiting_approval"
        if (payload.new.assigned_to === user.id && payload.new.status === "waiting_approval") {
          console.log("Task assigned to current user, adding to list");
          setAssignedTasks(prev => {
            // Check if already exists
            const exists = prev.find(task => task.id === payload.new.id);
            if (!exists) {
              return [payload.new, ...prev];
            }
            return prev;
          });
        } 
        // If status changed away from "waiting_approval", remove it from the list
        else if (payload.new.assigned_to === user.id && payload.new.status !== "waiting_approval") {
          console.log("Status changed, removing from list");
          setAssignedTasks(prev => prev.filter(task => task.id !== payload.new.id));
        }
        // If unassigned from current user
        else if (payload.old?.assigned_to === user.id && payload.new.assigned_to !== user.id) {
          console.log("Task unassigned, removing from list");
          setAssignedTasks(prev => prev.filter(task => task.id !== payload.new.id));
        }
      })
      .subscribe((status) => {
        console.log("Subscription status:", status);
      });

    return () => {
      console.log("Cleaning up subscription");
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleAccept = async (reportId) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({ 
          status: "in_progress",
          accepted_at: new Date().toISOString()
        })
        .eq("id", reportId);

      if (error) {
        console.error("Error accepting task:", error);
        alert("Failed to accept task: " + error.message);
        return;
      }

      // Remove from list after accepting
      setAssignedTasks(prev => prev.filter(task => task.id !== reportId));
      alert("Task accepted successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while accepting the task");
    }
  };

  const handleDecline = async (reportId) => {
    try {
      const { error } = await supabase
        .from("reports")
        .update({ 
          status: "pending",
          assigned_to: null,
          assigned_at: null
        })
        .eq("id", reportId);

      if (error) {
        console.error("Error declining task:", error);
        alert("Failed to decline task: " + error.message);
        return;
      }

      // Remove from list after declining
      setAssignedTasks(prev => prev.filter(task => task.id !== reportId));
      alert("Task declined successfully!");
    } catch (err) {
      console.error("Error:", err);
      alert("An error occurred while declining the task");
    }
  };

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title="Assigned Tasks"
        text="Review and accept new task assignments"
      />

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark mx-auto"></div>
          <p className="mt-4 text-text-muted">Loading assigned tasks...</p>
        </div>
      ) : assignedTasks.length === 0 ? (
        <div className="text-center py-12 border border-border rounded-lg bg-background-black">
          <p className="text-text-muted text-lg">No pending tasks assigned to you</p>
          <p className="text-text-muted text-sm mt-2">New assignments will appear here</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>
          {assignedTasks.map(task => (
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
                      {task.created_at?.slice(0, 10)}
                    </span>
                  </p>

                  <div className="border-border/50 border"></div>

                  <p className="flex justify-between items-center">
                    <span className="text-text-muted text-sm">Reported by:</span>
                    <span className="text-text">
                      {task.reporter?.full_name || task.reported_by || 'Unknown'}
                    </span>
                  </p>    
                </div>
              </div>
              
              <div className='mx-5 mb-5 flex justify-between gap-3'>
                <Buttons 
                  type='button'
                  style='cursor-pointer bg-primary-dark hover:bg-primary-dark/50 text-white flex gap-2 w-full items-center justify-center p-1.5 text-sm shadow-sm rounded-sm transition' 
                  text='Accept'
                  icon={<Check className='w-4 h-4'/>}
                  onClick={() => handleAccept(task.id)}
                />
                    
                <Buttons 
                  type='button'
                  style='cursor-pointer border-border border text-text hover:bg-gray-200/10 flex gap-2 w-full items-center justify-center p-1.5 text-sm shadow-sm rounded-sm transition' 
                  text='Decline'
                  icon={<X className='w-4 h-4'/>}
                  onClick={() => handleDecline(task.id)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default AssignedTasks