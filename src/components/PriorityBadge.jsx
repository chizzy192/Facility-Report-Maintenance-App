import React from 'react'

function PriorityBadge({ priority }) {
    const variants = {
    'high': {
      bg: 'bg-error/10 dark:bg-error/20',
      text: 'text-error dark:text-error',
      label: 'high'
    },
    'medium': {
      bg: 'bg-amber-500/10 dark:bg-amber-500/20',
      text: 'text-amber-600 dark:text-amber-400',
      label: 'medium'
    },
    'low': {
      bg: 'bg-surface dark:bg-surface/80',
      text: 'text-text-muted',
      label: 'low'
    }
  }

    const variant = variants[priority];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${variant.bg} ${variant.text}`}>
      {variant.label}
    </span>
  )
}

export default PriorityBadge
