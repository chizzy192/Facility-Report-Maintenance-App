const status = 'pending' | 'waiting-approval' | 'in-progress' | 'awaiting-confirmation' | 'fixed' | 'unassigned';

function StatusBadge({status}) {
    const variants = {
    'pending': {
      bg: 'bg-yellow-500/10 dark:bg-yellow-500/20',
      text: 'text-yellow-600 dark:text-yellow-400',
      dot: 'bg-yellow-500',
      label: 'Pending'
    },
    'waiting_approval': {
      bg: 'bg-blue-500/10 dark:bg-blue-500/20',
      text: 'text-blue-600 dark:text-blue-400',
      dot: 'bg-blue-500',
      label: 'Waiting for Approval'
    },
    'in_progress': {
      bg: 'bg-orange-500/10 dark:bg-orange-500/20',
      text: 'text-orange-600 dark:text-orange-400',
      dot: 'bg-orange-500',
      label: 'In Progress'
    },
    'completed_waiting_admin': {
      bg: 'bg-purple-500/10 dark:bg-purple-500/20',
      text: 'text-purple-600 dark:text-purple-400',
      dot: 'bg-purple-500',
      label: 'Awaiting Confirmation'
    },
    'fixed': {
      bg: 'bg-green-500/10 dark:bg-green-500/20',
      text: 'text-green-600 dark:text-green-400',
      dot: 'bg-green-500',
      label: 'Fixed'
    },
    'unassigned': {
      bg: 'bg-gray-500/10 dark:bg-gray-500/20',
      text: 'text-gray-600 dark:text-gray-400',
      dot: 'bg-gray-500',
      label: 'Unassigned'
    }
  }



   const variant = variants[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${variant.bg} ${variant.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${variant.dot}`} />
      {variant.label}
    </span>
  )
}

export default StatusBadge
