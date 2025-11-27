import { Navigate } from 'react-router';
import { UserAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import { supabase } from '../subabaseClient';

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = UserAuth();
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('role')
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error fetching user role:', error);
        setUserRole(null);
      } else {
        setUserRole(data?.role);
      }
      
      setLoading(false);
    };

    fetchUserRole();
  }, [user]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-text">Loading...</p>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return (
      <div className="flex flex-col items-center justify-center h-screen gap-4">
        <h1 className="text-2xl font-bold text-error">Access Denied</h1>
        <p className="text-text-muted">You don't have permission to access this page.</p>
        <Navigate to="/login" replace />
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;