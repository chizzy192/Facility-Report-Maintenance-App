import { useEffect, useState } from 'react'
import SectionHeader from '../../../components/SectionHeader'
import Buttons from '../../../components/Buttons'
import { Trash, UserPlus } from 'lucide-react'
import { supabase } from '../../../subabaseClient'
import StatusBadge from '../../../components/StatusBadge'

function Reports() {

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
        title='Reports Management'
        text='Oversee all facility reports and assignments'
      />


      <div className="w-full overflow-x-auto mt-4 border border-border rounded-lg shadow-md bg-surface/50">
        <table className=" table-auto border-collapse w-full">
          <thead className="bg-background-black/50 text-text">
            <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Images</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Reporter</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Technician</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Action</th>
                <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>

          <tbody className='text-sm'>
            {reports.map((report, index) => (
              <tr className="border-b border-border hover:bg-gray-200/10 transition">
              
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  #{index+1}
                </td>
                <td className="whitespace-nowrap px-4 py-2">
                  {report.image_url && <img 
                    src={report.image_url} 
                    alt="" 
                    className="w-12 h-12 object-cover rounded-md"
                  />}
                </td>
                  
                <td className="whitespace-nowrap px-4 py-2">
                  <h2 className="text-text text-sm lg:text-md">{report.title}</h2>
                </td>

                <td className="whitespace-nowrap px-4 py-2 ">
                  <span className="bg-surface text-text py-1 px-2 items-center flex justify-center rounded-2xl text-sm">{report.category}</span>
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {report.location}
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {report.reported_by}
                </td>

                <td className="whitespace-nowrap px-4 py-2">
                    <StatusBadge
                        status={report.status}
                    />
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text-muted">
                  {!report.assigned_to ? <StatusBadge status={'unassigned'} /> : (report.assigned_to)
                  }
                  
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text-muted">
                  {report.created_at?.slice(0, 10)}
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text">
                    <Buttons 
                      style="cursor-pointer border-border border px-2 py-1 flex gap-1 items-center rounded-lg shadow-sm hover:bg-gray-200/30
                      bg-bg-gray-200/20 transition"

                    icon = {<UserPlus className="w-4 h-4 text-gray-800 dark:text-white"/>}
                    
                    text='Assign'
                    />
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-error hover:text-error/50">
                  <Buttons
                    icon= {<Trash className='w-5'/>}
                  />
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Reports
