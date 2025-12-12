import { useEffect, useState } from 'react'
import SectionHeader from '../../../components/SectionHeader'
import { Trash, UserPlus, X } from 'lucide-react'
import { supabase } from '../../../supabaseClient'
import StatusBadge from '../../../components/StatusBadge'
import TechnicianDropDown from '../../../components/TechnicianDropDown'
import PriorityBadge from '../../../components/PriorityBadge'

function Reports() {

    const [reports, setReports] = useState([]);
    const [technicians, setTechnicians] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [currentReport, setCurrentReport] = useState(null);
    const [selectedTech, setSelectedTech] = useState(null);

    // Fetch reports with assigned technician details
    const fetchData = async () => {
      // First fetch all reports
      const {data: reportsData, error: reportsError} = await supabase
        .from("reports")
        .select("*")
        .order("created_at", {ascending: false})
      
      if (reportsError) {
        console.error("Error fetching reports:", reportsError);
        return;
      }

      // Then fetch all profiles to map names
      const {data: profilesData, error: profilesError} = await supabase
        .from("profiles")
        .select("user_id, full_name");

      if (profilesError) {
        console.error("Error fetching profiles:", profilesError);
      }

      // Map technician and reporter names to reports
      const reportsWithNames = reportsData.map(report => ({
        ...report,
        assigned_technician: profilesData?.find(p => p.user_id === report.assigned_to),
        reporter: profilesData?.find(p => p.user_id === report.reported_by)
      }));

      setReports(reportsWithNames || []);
    }
    
    useEffect(()=> {
      fetchData();
      return () => setReports([]);
    },[])

    // Real-time subscription for new reports
    useEffect(() => {
      const channel = supabase.channel("reports-channel");
      channel.on("postgres_changes", {
        event: "INSERT", 
        schema: "public", 
        table: "reports"
      }, (payload) => {
        fetchData(); // Refetch to get complete data with joins
      })
      .on("postgres_changes", {
        event: "UPDATE",
        schema: "public",
        table: "reports"
      }, (payload) => {
        fetchData(); // Refetch to get updated data
      })
      .on("postgres_changes", {
        event: "DELETE",
        schema: "public",
        table: "reports"
      }, (payload) => {
        fetchData(); // Refetch after deletion
      })
      .subscribe((status) => {
        console.log("Subscription status:", status)
      })

      return () => {
        supabase.removeChannel(channel);
      }
    }, [])

    // Fetch technicians
    const fetchTechnicians = async () => {
      const { data, error } = await supabase
        .from("technicians")
        .select("user_id, full_name, category");

      if (error) {
        console.error("Error fetching technicians:", error);
        return;
      }
      setTechnicians(data || []);
    };

    useEffect(() => {
      fetchTechnicians();
    }, []);

    // Handle assignment
    const handleAssign = async () => {
      console.log("=== ASSIGNMENT DEBUG ===");
      console.log("Selected Tech:", selectedTech);
      console.log("Selected Tech user_id:", selectedTech?.user_id);
      console.log("Selected Tech user_id type:", typeof selectedTech?.user_id);
      console.log("Current Report:", currentReport);
      console.log("Current Report id:", currentReport?.id);
      console.log("Current Report id type:", typeof currentReport?.id);
      
      if (!selectedTech || !currentReport) {
        console.log("Missing data - selectedTech or currentReport is null");
        alert("Please select a technician");
        return;
      }

      if (!selectedTech.user_id) {
        console.log("ERROR: selectedTech.user_id is missing!");
        alert("Invalid technician selected");
        return;
      }

      console.log("Attempting to assign user_id:", selectedTech.user_id, "to report:", currentReport.id);

      const { data, error } = await supabase
        .from("reports")
        .update({ 
          assigned_to: selectedTech.user_id,
          status: 'waiting_approval',
          assigned_at: new Date().toISOString()
        })
        .eq("id", currentReport.id)
        .select();

      console.log("Supabase UPDATE response data:", data);
      console.log("Supabase UPDATE response error:", error);

      if (error) {
        console.error("Assignment error:", error);
        alert("Error assigning technician: " + error.message);
        return;
      }
      
      if (!data || data.length === 0) {
        console.log("WARNING: Update returned no data");
        alert("Assignment may have failed - no data returned");
      }
      
      console.log("Assignment successful, refreshing data...");
      
      // Refresh data to get updated technician info
      await fetchData();
      
      // Close modal and reset state
      setIsOpen(false);
      setSelectedTech(null);
      setCurrentReport(null);
      
      alert("Technician assigned successfully!");
    };

    // Handle delete report
    const handleDelete = async (reportId) => {
      const confirmed = window.confirm("Are you sure you want to delete this report? This action cannot be undone.");
      
      if (!confirmed) return;

      try {
        const { error } = await supabase
          .from("reports")
          .delete()
          .eq("id", reportId);

        if (error) {
          console.error("Error deleting report:", error);
          alert("Failed to delete report: " + error.message);
          return;
        }

        // Remove from local state immediately
        setReports(prev => prev.filter(report => report.id !== reportId));
        alert("Report deleted successfully!");
      } catch (err) {
        console.error("Error:", err);
        alert("An error occurred while deleting the report");
      }
    };

  return (
    <section className="flex flex-col gap-5 relative">
      <SectionHeader
        title='Reports Management'
        text='Oversee all facility reports and assignments'
      />

      <div className="w-full overflow-x-auto mt-4 border border-border rounded-lg shadow-md bg-surface/50">
        <table className="table-auto border-collapse w-full">
          <thead className="bg-background-black/50 text-text">
            <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Images</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Location</th>
                <th className="px-4 py-2 text-left">Priority</th>
                <th className="px-4 py-2 text-left">Category</th>
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
              <tr className="border-b border-border hover:bg-gray-200/10 transition" key={report.id}>
              
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

                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {report.location}
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text">
                  <PriorityBadge priority={report.priority} />
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {report.category || 'Uncategorized'}
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {report.reporter?.full_name || report.reported_by || 'Unknown'}
                </td>

                <td className="whitespace-nowrap px-4 py-2">
                    <StatusBadge status={report.status} />
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text-muted">
                  {!report.assigned_to ? (
                    <StatusBadge status={'unassigned'} />
                  ) : report.assigned_technician?.full_name ? (
                    <span className="text-text">
                      {report.assigned_technician.full_name}
                    </span>
                  ) : (
                    <span className="text-text-muted text-xs">Loading...</span>
                  )}
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text-muted">
                  {report.created_at?.slice(0, 10)}
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text">
                  <button 
                    className='cursor-pointer border-border border px-2 py-1 flex gap-1 items-center rounded-lg shadow-sm hover:bg-gray-200/30 bg-gray-200/20 transition' 
                    onClick={() => {
                      setIsOpen(true);
                      setCurrentReport(report);
                      setSelectedTech(null);
                    }}
                  >
                    <UserPlus className="w-4 h-4 text-gray-800 dark:text-white"/>
                    {report.assigned_to ? 'Reassign' : 'Assign'}
                  </button>
                </td>

                <td className="whitespace-nowrap px-4 py-2">
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition"
                  >
                    <Trash className='w-5'/>
                  </button>
                </td>
              </tr>
            ))} 
          </tbody>
        </table>
      </div>

      {/* Assignment Modal */}
      {isOpen && (
        <div className='fixed inset-0 z-50 bg-background-black/50 flex justify-center items-center'>
          <div className='bg-background w-96 rounded-lg flex flex-col p-6 gap-6 relative shadow-xl'>
            <button 
              className="absolute top-4 right-4 text-text hover:text-text/70 transition"
              onClick={() => {
                setIsOpen(false);
                setSelectedTech(null);
                setCurrentReport(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-text text-xl font-semibold">
              Assign Technician
            </h3>

            {currentReport && (
              <div className="text-text-muted text-sm">
                <p><strong>Report:</strong> {currentReport.title}</p>
                <p><strong>Location:</strong> {currentReport.location}</p>
              </div>
            )}

            <TechnicianDropDown
              technicians={technicians}
              value={selectedTech?.user_id || null}
              onChange={(tech) => setSelectedTech(tech)}
            />

            <button 
              className="text-white bg-primary-dark px-4 py-2 rounded-lg hover:bg-primary-dark/90 transition disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={handleAssign}
              disabled={!selectedTech}
            >
              Assign Technician
            </button>
          </div> 
        </div>
      )}
    </section>
  )
}

export default Reports