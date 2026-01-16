"use client"

import { Button } from "@/components/ui/button"

interface TripFSMButtonProps {
  action: {
    id: string
    label: string
    enabled: boolean
  }
  onClick?: () => void
  className?: string
}

export function TripFSMButton({ action, onClick, className }: TripFSMButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={!action.enabled}
      className={className}
      size="lg"
    >
      {action.label}
    </Button>
  )
}
