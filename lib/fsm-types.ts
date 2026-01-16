// lib/fsm-types.ts

export type RaceState =
  | "RACE_OFFLINE"
  | "RACE_WAITING_START"
  | "RACE_BOARDING"
  | "RACE_IN_TRANSIT"
  | "RACE_ARRIVED_STOP"
  | "RACE_FINISHED"

export type TransitionAction =
  | "start_shift"
  | "start_boarding"
  | "depart_stop"
  | "arrive_stop"
  | "continue_boarding"
  | "finish_trip"
  | "end_shift"

export interface DriverRaceContract {
  raceState: RaceState
  allowedActions: TransitionAction[]
  context: {
    freeSeats: number
    queueSize?: number
    reservation?: {
      exists: boolean
      mode?: "waiting" | "confirming" | "expired"
    }
    cash?: {
      allowed: boolean
    }
  }
}

export function logFSMEvent(event: string, data?: Record<string, unknown>): void {
  if (process.env.NODE_ENV === "development") {
    console.log(`[FSM] ${event}`, data ?? "")
  }
}
