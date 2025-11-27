import { CalendarIcon, MapPinHouseIcon } from "lucide-react"
import SectionHeader from "../../../components/SectionHeader"
import StatusBadge from "../../../components/StatusBadge"
import { useEffect, useState } from "react"
import { supabase } from "../../../subabaseClient"

function Home() {
    const [reports, setReports] = useState([]);
    const fetchData = async () => {
        const {data} = await supabase.from("reports").select('*').order("created_at", {ascending: false})
        setReports(data)
    }
    
    useEffect(()=> {
        fetchData();
        return () => setReports([]);
    },[])

    useEffect(() => {
      const channel = supabase.channel("reports-channel");
      channel.on("postgres_changes", {event: "INSERT", schema: "public", table: "reports"}, (payload) => {
        const newReport = payload.new;
        setReports((prev)=> [...prev, newReport])
      }).subscribe((status) => {
        console.log("subscription")
      })
    }, [])

  return (
    <section className="flex flex-col gap-5">
        <SectionHeader
            title="All Reports"
            text="View all active facility reports"
        />
        {/* my card */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>

        {reports.map (report => (  
        <div key={report.id} className="border-border/50 border bg-background-black rounded-2xl gap-3 shadow-md ">
            {report.image_url && (<img 
                src={report.image_url}
                alt="" 
                className="w-full h-40 rounded-tl-2xl rounded-tr-2xl "
            />)}

            <div className="m-5">
                <div className="mb-3 flex flex-col w-auto">
                    <div className="flex flex-row mb-1 justify-between items-center">
                        <h2 className="text-text text-lg w-[70%]">
                            {report.title}
                        </h2>
                        {/* <p className="bg-primary-dark/20 border-primary-dark border py-1 px-1 sm:px-2 rounded-2xl text-xs text-primary-dark">
                            
                        </p> */}

                        <StatusBadge
                            status={report.status}
                        />
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
                      <span className="text-text">{report.assigned_to}</span>
                  </p> 
                  )}
                     
                </div>
            </div>
        </div>
        ))}
      </div>
    </section>
  )
}

export default Home
