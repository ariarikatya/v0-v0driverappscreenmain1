export function logFSMTransition(params: {
  source: "user" | "server";
  prevState: string;
  nextState: string;
  action?: string;
}) {
  console.log("[FSM]", {
    ...params,
    timestamp: new Date().toISOString(),
  });
}
