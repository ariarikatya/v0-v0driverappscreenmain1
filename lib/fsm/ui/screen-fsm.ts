export function computeUIConfig(
  screen: ScreenFSMState,
  context: UIFSMContext,
  allowedActions: string[]
): UIConfig {
  switch (screen) {
    case "BOARDING":
      return {
        queue: allowedActions.includes("scan_queue_qr")
          ? "active"
          : "locked",
        reservation: context.reservation?.exists
          ? context.reservation.mode ?? "waiting"
          : "hidden",
        primaryAction: {
          id: "depart",
          label: "Отправиться",
          enabled: allowedActions.includes("depart_stop"),
        },
      };

    case "AT_STOP":
      return {
        queue: "hidden", // Убедитесь, что здесь стоит "hidden"
        reservation: context.reservation?.exists
          ? context.reservation.mode ?? "waiting"
          : "hidden",
      };

    case "IN_TRANSIT":
      return {
        queue: "hidden", // Добавьте скрытие для состояния в пути
        reservation: "hidden",
      };

    case "FINISHED":
      return {
        queue: "hidden", // Скрываем при завершении
        reservation: "hidden",
      };

    default:
      return {
        queue: "hidden",
        reservation: "hidden",
      };
  }
}
