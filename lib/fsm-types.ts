// lib/fsm-types.ts

// Server race states
export type RaceState =
  | "RACE_OFFLINE"
  | "RACE_WAITING_START"
  | "RACE_BOARDING"
  | "RACE_IN_TRANSIT"
  | "RACE_ARRIVED_STOP"
  | "RACE_FINISHED";

// Map old trip status to race state (for compatibility)
export const TRIP_STATUS_TO_RACE_STATE: Record<string, RaceState> = {
  "PREP_IDLE": "RACE_OFFLINE",
  "PREP_TIMER": "RACE_WAITING_START",
  "BOARDING": "RACE_BOARDING",
  "ROUTE_READY": "RACE_ARRIVED_STOP",
  "IN_ROUTE": "RACE_IN_TRANSIT",
  "FINISHED": "RACE_FINISHED",
};

// UI FSM states for button
export type UIFSMState = "idle" | "processing" | "success" | "error" | "disabled";

// Transition actions
export type TransitionAction =
  | "start_shift"
  | "start_trip"
  | "depart_stop"
  | "arrive_stop"
  | "start_boarding"
  | "finish_trip"
  | "none";

// Panel modes (не boolean!)
export type PanelMode = "hidden" | "active" | "locked";
export type ReservationMode = "hidden" | "waiting" | "confirming" | "expired";
export type QueueMode = "hidden" | "active" | "locked";

// Button configuration based on race state
export interface ButtonConfig {
  label: string;
  action: TransitionAction;
  enabled: boolean;
  stopName?: string;
}

// Panel visibility states (с режимами)
export interface PanelVisibility {
  mainButton: boolean;
  queue: QueueMode;
  reservation: ReservationMode;
  cash: PanelMode;
}

// Допустимые переходы (guards)
export const ALLOWED_TRANSITIONS: Record<RaceState, TransitionAction[]> = {
  RACE_OFFLINE: ["start_shift"],
  RACE_WAITING_START: ["start_trip"],
  RACE_BOARDING: ["depart_stop"],
  RACE_IN_TRANSIT: ["arrive_stop"],
  RACE_ARRIVED_STOP: ["start_boarding"],
  RACE_FINISHED: ["finish_trip"],
};

// Проверка допустимости перехода
export function canTransition(
  currentState: RaceState,
  action: TransitionAction
): boolean {
  const allowed = ALLOWED_TRANSITIONS[currentState];
  return allowed.includes(action);
}

// Map race state to button config
export const RACE_STATE_TO_BUTTON: Record<RaceState, ButtonConfig> = {
  RACE_OFFLINE: {
    label: "Выйти на линию",
    action: "start_shift",
    enabled: true,
  },
  RACE_WAITING_START: {
    label: "Начать рейс",
    action: "start_trip",
    enabled: true,
  },
  RACE_BOARDING: {
    label: "Отправиться",
    action: "depart_stop",
    enabled: true,
  },
  RACE_IN_TRANSIT: {
    label: "Прибыл",
    action: "arrive_stop",
    enabled: true,
  },
  RACE_ARRIVED_STOP: {
    label: "Начать посадку",
    action: "start_boarding",
    enabled: true,
  },
  RACE_FINISHED: {
    label: "Завершить рейс",
    action: "finish_trip",
    enabled: true,
  },
};

// Map race state to panel visibility (с режимами)
export const RACE_STATE_TO_PANELS: Record<RaceState, PanelVisibility> = {
  RACE_OFFLINE: {
    mainButton: true,
    queue: "hidden",
    reservation: "hidden",
    cash: "hidden",
  },
  RACE_WAITING_START: {
    mainButton: true,
    queue: "hidden",
    reservation: "hidden",
    cash: "hidden",
  },
  RACE_BOARDING: {
    mainButton: true,
    queue: "active",
    reservation: "waiting",
    cash: "active",
  },
  RACE_IN_TRANSIT: {
    mainButton: true,
    queue: "hidden",
    reservation: "hidden",
    cash: "hidden",
  },
  RACE_ARRIVED_STOP: {
    mainButton: true,
    queue: "active",
    reservation: "waiting",
    cash: "active",
  },
  RACE_FINISHED: {
    mainButton: true,
    queue: "hidden",
    reservation: "hidden",
    cash: "hidden",
  },
};

// Logging helper
export const logFSMEvent = (
  event: string,
  details: Record<string, any>
) => {
  console.log(`[v0] ${event}`, {
    ...details,
    timestamp: new Date().toISOString(),
  });
};
