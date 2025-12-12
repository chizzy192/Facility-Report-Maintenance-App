import { CalendarIcon, MapPinHouseIcon } from "lucide-react"
import SectionHeader from "../../../components/SectionHeader"
import StatusBadge from "../../../components/StatusBadge"
import { useEffect, useState } from "react"
import { supabase } from "../../../supabaseClient"
import Masonry from 'react-masonry-css';
import PriorityBadge from "../../../components/PriorityBadge"

function Home() {
    const [reports, setReports] = useState([]);
      const breakpointColumns = {
        default: 3,
        1100: 2,
        500: 1
      };
    
    const fetchData = async () => {
        // Fetch reports with assigned technician details using a join
        const {data, error} = await supabase
            .from("reports")
            .select(`
                *,
                assigned_technician:profiles!reports_assigned_to_fkey(user_id, full_name)
            `)
            .order("created_at", {ascending: false})
        
        if (error) {
            console.error("Error fetching reports:", error);
            return;
        }
        setReports(data || []);
    }
    
    useEffect(()=> {
        fetchData();
        return () => setReports([]);
    },[])

    useEffect(() => {
      const channel = supabase.channel("reports-channel");
      channel.on("postgres_changes", {
        event: "INSERT", 
        schema: "public", 
        table: "reports"
      }, (payload) => {
        const newReport = payload.new;
        // Add new report to the beginning since we sort by newest first
        setReports((prev)=> [newReport, ...prev])
      }).subscribe((status) => {
        console.log("Subscription status:", status)
      })

      // Cleanup subscription
      return () => {
        supabase.removeChannel(channel);
      }
    }, [])

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

                  <p className="flex justify-between items-center">
                      <span className="text-text-muted text-sm">Reported By:</span>
                      <span className="text-text">{report.reported_by}</span>
                  </p>

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

export default Home