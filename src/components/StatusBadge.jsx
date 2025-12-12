const status = 'pending' | 'waiting-approval' | 'in-progress' | 'awaiting-confirmation' | 'fixed' | 'unassigned';

function StatusBadge({status}) {
    const variants = {
    'pending': {
      bg: 'bg-yellow-500 dark:bg-yellow-400',
      text: 'text-yellow-600 uppercase font-bold ',
      label: 'Pending'
    },
    'waiting_approval': {
      bg: 'bg-blue-300 dark:bg-blue-400',
      text: 'text-blue-600 uppercase font-bold',
      label: 'Waiting for Approval'
    },
    'in_progress': {
      bg: 'bg-orange-300 dark:bg-orange-400',
      text: 'text-orange-600 uppercase font-bold',
      
      label: 'In Progress'
    },
    'completed_waiting_admin': {
      bg: 'bg-purple-300 dark:bg-purple-400',
      text: 'text-purple-600 uppercase font-bold',
      
      label: 'Awaiting Confirmation'
    },
    'fixed': {
      bg: 'bg-green-300 dark:bg-green-400',
      text: 'text-green-600 uppercase font-bold',
      
      label: 'Fixed'
    },
    'unassigned': {
      bg: 'bg-gray-300/20 dark:bg-gray-400/20',
      text: 'text-text-muted uppercase font-bold',
      
      label: 'Unassigned'
    }
  }



   const variant = variants[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs ${variant.bg} ${variant.text}`}>
      {variant.label}
    </span>
  )
}

export default StatusBadge
