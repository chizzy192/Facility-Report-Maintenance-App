import { CalendarIcon, MapPinHouseIcon } from "lucide-react"
import { supabase } from "../../../supabaseClient";
import { useEffect, useState } from "react"
import SectionHeader from "../../../components/SectionHeader";
import { UserAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge"
import Masonry from 'react-masonry-css';
import PriorityBadge from "../../../components/PriorityBadge";

function MyReports() {
  const { user } = UserAuth();
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    inProgress: 0,
    resolved: 0
  });

    const breakpointColumns = {
      default: 3,
      1100: 2,
      500: 1
    };

  const fetchData = async () => {
    if (!user?.id) return;

    // Fetch reports with assigned technician details using a join
    const {data, error} = await supabase
      .from("reports")
      .select(`
        *,
        assigned_technician:profiles!reports_assigned_to_fkey(user_id, full_name)
      `)
      .eq("user_id", user.id)
      .order("created_at", {ascending: false})
    
    if (error) {
      console.error("Error fetching reports:", error);
      return;
    }
    
    setReports(data || []);
    
    // Calculate statistics
    const total = data?.length || 0;
    const pending = data?.filter(r => r.status === 'pending').length || 0;
    const inProgress = data?.filter(r => r.status === 'in progress' || r.status === 'assigned').length || 0;
    const resolved = data?.filter(r => r.status === 'resolved' || r.status === 'completed').length || 0;
    
    setStats({ total, pending, inProgress, resolved });
  }
  
  useEffect(() => {
    if (user?.id) {
      fetchData();
    }
    return () => setReports([]);
  }, [user])

  useEffect(() => {
    if (!user?.id) return;

    const channel = supabase.channel("my-reports-channel");
    channel.on("postgres_changes", {
      event: "INSERT", 
      schema: "public", 
      table: "reports",
      filter: `user_id=eq.${user.id}`
    }, (payload) => {
      const newReport = payload.new;
      // Add new report to the beginning since we sort by newest first
      setReports((prev) => [newReport, ...prev])
      // Update stats
      setStats(prev => ({
        ...prev,
        total: prev.total + 1,
        pending: newReport.status === 'pending' ? prev.pending + 1 : prev.pending
      }));
    })
    .on("postgres_changes", {
      event: "UPDATE",
      schema: "public",
      table: "reports",
      filter: `user_id=eq.${user.id}`
    }, () => {
      // Refresh data when a report is updated
      fetchData();
    })
    .subscribe((status) => {
      console.log("Subscription status:", status)
    })

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    }
  }, [user])
  
  return (
    <section className="flex flex-col gap-5">
        <SectionHeader
            title="All Reports"
            text="View all active facility reports"
        />
        {/* my card */}
      <Masonry
        breakpointCols={breakpointColumns}
        className="my-masonry-grid"
        columnClassName="my-masonry-grid_column"
      >

        {reports.map (report => (  
        <div key={report.id} className="border-border/50 border bg-background-black rounded-2xl gap-3 shadow-md relative">
          {report.image_url && (
            <div className="absolute right-0 m-2">
              <StatusBadge
                status={report.status}
            />
            </div>
          )}

          {!report.image_url &&  (<div className="m-2">
            <StatusBadge
              status={report.status}
          />
          </div>)}
          
          
            {report.image_url && (<img 
                src={report.image_url}
                alt="" 
                className="w-full h-40 rounded-tl-2xl rounded-tr-2xl object-cover"
            />)}

            <div className="m-5">
                <div className="mb-3 flex flex-col w-auto">
                    <div className="flex flex-row mb-1 justify-between items-center">
                        <h2 className="text-text text-lg w-[70%]">
                            {report.title}
                        </h2>

                        <PriorityBadge priority={report.priority} />
                    </div>

                    <div>
                      <p className='text-text-muted text-sm'>
                        {report.description}
                      </p>
                    </div>
                </div>
                <div className="flex flex-col gap-3">
                  <p className="flex gap-2 items-center text-text-muted">
                      <span className="text-text-muted text-sm">
                        <MapPinHouseIcon className="text-text-muted w-4 h-4"/>
                      </span>
                      <span className="text-sm">{report.location}</span>
                  </p>

                  <p className="flex gap-2 items-center">
                      <span className="text-text-muted text-sm">
                        <CalendarIcon className="text-text-muted w-4 h-4"/>
                      </span>
                      <span className="text-text-muted text-sm">{report.created_at?.slice(0, 10)}</span>
                  </p>

                  <div className="border-border/50 border "></div>
                  
                  {report.assigned_to && (
                    <p className="flex justify-between items-center">
                      <span className="text-text-muted text-sm">Assigned to:</span>
                      <span className="text-text">
                        {report.assigned_technician?.full_name || 'Unknown'}
                      </span>
                  </p> 
                  )}
                     
                </div>
            </div>
        </div>
        ))}
      </Masonry>
    </section>
  )
}

export default MyReports