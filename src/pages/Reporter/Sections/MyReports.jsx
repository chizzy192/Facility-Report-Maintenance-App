import { CalendarIcon, MapPinHouseIcon } from "lucide-react"
import { supabase } from "../../../subabaseClient";
import { useEffect, useState } from "react"
import SectionHeader from "../../../components/SectionHeader";
import { UserAuth } from "../../../context/AuthContext";
import StatusBadge from "../../../components/StatusBadge"

function MyReports() {
  const { user } = UserAuth();
  const [reports, setReports] = useState([]);

  const fetchData = async () => {
      if (!user) return; 
      const {data} = await supabase
                      .from("reports")
                      .select('*')
                      .eq("user_id", user.id)
                      .order("created_at", {ascending: false})
      setReports(data)
  }
  
  useEffect(() => {
    fetchData();
  }, [user])

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
          title={`Hello, ${user?.user_metadata?.full_name || "Loading..."}`}
          text="Welcome back to your dashboard"
      />
      {/* <!-- statistics --> */}
      <div className="w-full mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div className="border-border border p-6 bg-background-black rounded-xl shadow-md">
          <figure className="flex justify-between items-center">
            <figcaption>
                <p className="text-text-muted">
                    Total Requests
                </p>
                <h2 className="js-total-requests text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-text">
                    0
                </h2>
            </figcaption>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clipboard-list h-10 w-10 text-[#2563eb]"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M12 11h4"></path><path d="M12 16h4"></path><path d="M8 11h.01"></path><path d="M8 16h.01"></path></svg>
          </figure> 
        </div>

        <div className="border-border border p-6 bg-background-black rounded-xl shadow-md">
          <figure className="flex justify-between items-center">
              <figcaption>
                  <p className="text-text-muted">
                      Pending
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-text">
                      0
                  </h2>
              </figcaption>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-alert h-10 w-10 text-amber-500"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg>
          </figure> 
        </div>

        <div className="border-border border p-6 bg-background-black rounded-xl shadow-md">
          <figure className="flex justify-between items-center">
              <figcaption>
                  <p className="text-text-muted">
                      In Progress
                  </p>
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-text">
                      0
                  </h2>
              </figcaption>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-clock h-10 w-10 text-[#2563eb]"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
          </figure> 
        </div>

        <div className="border-border border p-6 bg-background-black rounded-xl shadow-md">
            <figure className="flex justify-between items-center">
                <figcaption>
                    <p className="text-text-muted">
                        Resolved
                    </p>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-text">
                        0
                    </h2>
                </figcaption>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-check h-10 w-10 text-green-500"><circle cx="12" cy="12" r="10"></circle><path d="m9 12 2 2 4-4"></path></svg>
            </figure> 
        </div>
      </div>


      {/* <!-- status of added reports --> */}
      <div className="js-report-grid-section  flex my-7 text-xs sm:text-sm w-full sm:w-90 justify-between flex-row gap-1 text-text-muted font-semibold  bg-surface border-border border-2 rounded-2xl py-2 px-2 sm:px-4 shadow-md">
        <button className="cursor-pointer focus:text-text">
          All Requests
        </button>
        <button className="cursor-pointer focus:text-text">
          Pending
        </button>
        <button className="cursor-pointer focus:text-text">
          In Progress
        </button>
        <button className="cursor-pointer focus:text-text">
          Resolved
        </button>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3'>

        {reports.map(report => (
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

                    

                    {report.assigned_to && (
                      <div>
                        <div className="border-border/50 border "></div>
                        <p className="flex justify-between items-center">
                          <span className="text-text-muted text-sm">Assigned to:</span>
                          <span className="text-text">{report.assigned_to}</span>
                      </p>
                      </div>
                      )}    
                  </div>
              </div>
          </div>
        ))}
      </div>  
    </section>
  )
}

export default MyReports
