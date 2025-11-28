import {useState, useEffect} from 'react'
import SectionHeader from '../../../components/SectionHeader'
import {  Edit } from 'lucide-react'
import { supabase } from '../../../supabaseClient';

function Users() {
  const [loading, setLoading] = useState(false);
  const [profiles, setProfiles] = useState([]);
  const [updatingUserId, setUpdatingUserId] = useState(null);

  const fetchData = async () => {
    const {data} = await supabase
      .from("profiles")
      .select('*')
      .order("created_at", {ascending: false})
    setProfiles(data || [])
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

  // Function to render role buttons based on current role
  const renderRoleButton = (profile) => {
    const isUpdating = updatingUserId === profile.user_id;
    
    switch(profile.role) {
      case 'reporter':
        return (
          <button 
            onClick={() => updateRole(profile.user_id, 'technician')}
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
                  {renderRoleButton(profile)}
                </td>
                <td className="whitespace-nowrap py-2 text-text">
                  <Edit className='w-5 cursor-pointer hover:text-primary-dark'/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Users