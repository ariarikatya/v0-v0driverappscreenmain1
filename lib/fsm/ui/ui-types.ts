export type QueuePanelMode = "hidden" | "active" | "locked";
export type ReservationPanelMode =
  | "hidden"
  | "waiting"
  | "confirming"
  | "expired";

export interface UIFSMContext {
  freeSeats: number;
  queueSize?: number;
  reservation?: {
    exists: boolean;
    mode?: ReservationPanelMode;
  };
  cash?: {
    allowed: boolean;
  };
}

export interface UIConfig {
  queue: QueuePanelMode;
  reservation: ReservationPanelMode;
  primaryAction?: {
    id: string;
    label: string;
    enabled: boolean;
  };
}
