import { RaceState } from "../domain/race-states";

export function mapTripStatusToRaceState(
  tripStatus: string
): RaceState {
  switch (tripStatus) {
    case "waiting_start":
      return "RACE_WAITING_START";
    case "boarding":
      return "RACE_BOARDING";
    case "in_transit":
      return "RACE_IN_TRANSIT";
    case "arrived_stop":
      return "RACE_ARRIVED_STOP";
    case "finished":
      return "RACE_FINISHED";
    default:
      return "RACE_OFFLINE";
  }
}
