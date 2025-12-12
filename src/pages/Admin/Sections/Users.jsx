import {useState, useEffect} from 'react'
import SectionHeader from '../../../components/SectionHeader'
import {  Edit, X } from 'lucide-react'
import { supabase } from '../../../supabaseClient';
import CategoryDropDown from '../../../components/CategoryDropDown';
import { categories } from '../../../components/categories';

function Users() {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [technicians, setTechnicians] = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchData = async () => {
    const {data} = await supabase
      .from("profiles")
      .select('*')
      .order("created_at", {ascending: false})
    setProfiles(data || [])

    // Fetch technicians data
    const { data: techniciansData } = await supabase
      .from("technicians")
      .select('category, user_id');
    setTechnicians(techniciansData || []);
  }
  
  useEffect(() => {
    fetchData();
    return () => setProfiles([]);
  }, []);
  

  const updateRole = async (userId, newRole) => {
    setUpdatingUserId(userId);
    
    const { error } = await supabase
      .from('profiles')
      .update({ role: newRole })
      .eq('user_id', userId);

    if (error) {
      console.error('Error:', error.message);
    } else {
      console.log('Role updated to:', newRole);
      await fetchData();
    }
    
    setUpdatingUserId(null);
  }

  const insertTechnicians = async (userId) => {
    setUpdatingUserId(userId);
    
    const { error } = await supabase
      .from('technicians')
      .insert({ user_id: userId, full_name: profiles.find(p => p.user_id === userId)?.full_name || '' });

    if (error) {
      console.error('Error:', error.message);
    } else {
      console.log('Technician inserted for user:', userId);
      await fetchData();
    }
    
    setUpdatingUserId(null);
  }

  const handleAssign = async () => {
    // Assignment logic here
    if (!selectedUserId) {
      alert('No technician selected to assign');
      return;
    }
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }

    const { data, error } = await supabase
        .from("technicians")
        .update({ category: selectedCategory })
        .eq('user_id', selectedUserId)
        .select();

              console.log("Supabase UPDATE response data:", data);
      console.log("Supabase UPDATE response error:", error);

      if (error) {
        console.error("Assignment error:", error);
        alert("Error assigning technician: " + error.message);
        return;
      }
      
              if (!data || data.length === 0) {
                // If no rows were updated, try inserting a technician record (if it doesn't exist)
                const exists = technicians.find(t => t.user_id === selectedUserId);
                if (!exists) {
                  const { data: insertData, error: insertError } = await supabase
                    .from('technicians')
                    .insert({ user_id: selectedUserId, category: selectedCategory, full_name: profiles.find(p => p.user_id === selectedUserId)?.full_name || '' })
                    .select();

                  if (insertError) {
                    console.error('Insert fallback error:', insertError);
                    alert('Assignment failed: ' + insertError.message);
                    return;
                  }

                  console.log('Inserted new technician record:', insertData);
                } else {
                  console.log("WARNING: Update returned no data");
                  alert("Assignment may have failed - no data returned");
                }
              }
      
      console.log("Assignment successful, refreshing data...");
      
        // Refresh data to get updated technician info
        await fetchData();

        // Close modal and reset state
        setIsOpen(false);
        setSelectedUserId(null);
        setSelectedCategory(null);

        alert("Technician assigned successfully!");
  };

  // Function to render role buttons based on current role
  const renderRoleButton = (profile) => {
    const isUpdating = updatingUserId === profile.user_id;
    
    switch(profile.role) {
      case 'reporter':
        return (
          <button 
            onClick={() => { insertTechnicians(profile.user_id); 
                            updateRole(profile.user_id, 'technician');
            }}
            disabled={isUpdating}
            className="flex gap-1 border border-border py-1 px-2 justify-center items-center rounded bg-background-black/50 hover:text-text/50 disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Set as Technician'}
          </button>
        );
      
      case 'technician':
        return (
          <button 
            onClick={() => updateRole(profile.user_id, 'reporter')}
            disabled={isUpdating}
            className="flex gap-1 border border-border py-1 px-2 justify-center items-center rounded bg-background-black/50 hover:text-text/50 disabled:opacity-50"
          >
            {isUpdating ? 'Updating...' : 'Set as Reporter'}
          </button>
        );
      
      case 'admin':
        return (
          <div className="flex gap-2">
            <button 
              onClick={() => updateRole(profile.user_id, 'technician')}
              disabled={isUpdating}
              className="flex gap-1 border border-border py-1 px-2 justify-center items-center rounded bg-background-black/50 hover:text-text/50 disabled:opacity-50 text-xs"
            >
              {isUpdating ? 'Updating...' : 'Technician'}
            </button>
            <button 
              onClick={() => updateRole(profile.user_id, 'reporter')}
              disabled={isUpdating}
              className="flex gap-1 border border-border py-1 px-2 justify-center items-center rounded bg-background-black/50 hover:text-text/50 disabled:opacity-50 text-xs"
            >
              {isUpdating ? 'Updating...' : 'Reporter'}
            </button>
          </div>
        );
      
      default:
        return <span className="text-text-muted">Unknown role</span>;
    }
  }

  return (
    <section className="flex flex-col gap-5">
      <SectionHeader
        title='Users Management'
        text='Manage user roles and permissions'
      />
      <div className="w-full overflow-x-auto mt-4 border border-border rounded-lg shadow-md bg-surface/40">
        <table className="table-auto border-collapse w-full">
          <thead className="bg-background-black/50 text-text">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Action</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>

          <tbody className='text-sm'>
            {profiles.filter(user => user.role !== "admin").map((profile) => (
              <tr key={profile.user_id} className="border-b border-border hover:bg-gray-200/10 transition" >
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {profile.full_name}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {profile.email}
                </td>
                <td className="whitespace-nowrap px-4 py-2 text-text">
                  <span className='bg-surface p-1.5 flex items-center justify-center text-xs rounded-xl'>
                    {profile.role}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text">
                  <span className='bg-surface p-1.5 flex items-center justify-center text-xs rounded-xl'>
                    {technicians.find(tech => tech.user_id === profile.user_id)?.category || 'N/A'}
                  </span>
                </td>

                <td className="whitespace-nowrap px-4 py-2 text-text">
                  {renderRoleButton(profile)}
                </td>
                <td className="whitespace-nowrap py-2 text-text">
                  <Edit className='w-5 cursor-pointer hover:text-primary-dark' onClick={() => { setSelectedUserId(profile.user_id); setSelectedCategory(technicians.find(t => t.user_id === profile.user_id)?.category || null); setIsOpen(true); }} />
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
                setSelectedUserId(null);
                setSelectedCategory(null);
              }}
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="text-text text-xl font-semibold">
              Select Category for Technician
            </h3>

            <CategoryDropDown
              value={selectedCategory}
              onChange={(c) => setSelectedCategory(c)}
            />
            <button 
              className="text-white bg-primary-dark px-4 py-2 rounded-lg hover:bg-primary-dark/90 transition disabled:opacity-50 disabled:cursor-not-allowed" 
              onClick={handleAssign}
              // disabled={!selectedTech}
            >
              Assign Category
            </button>
          </div> 
        </div>
      )}
    </section>
  )
}

export default Users