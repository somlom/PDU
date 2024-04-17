import { Handlers } from "$fresh/server.ts";
import {
  ServerSentEvent,
  ServerSentEventStreamTarget,
} from "$std/http/server_sent_event.ts";

const PUSH_DELAY_MILLISECONDS = 250; // Set to 250ms for 1 second

export const handler: Handlers = {
  GET(_req) {
    const sseTarget = new ServerSentEventStreamTarget({
      keepAlive: true,
    });

    let timerId = 0;

    const refetchData = async () => {
      try {
        const telemetryData = await fetchTelemetry();
        sendDataEvent(sseTarget, telemetryData);
      } catch (error) {
        return new Response(`Error fetching telemetry: ${error.message}`);
      }

      timerId = setTimeout(refetchData, PUSH_DELAY_MILLISECONDS);
    };

    sseTarget.addEventListener("close", () => {
      clearTimeout(timerId);
    });

    refetchData();
    return sseTarget.asResponse();
  },
};

function sendDataEvent(
  sseTarget: ServerSentEventStreamTarget,
  telemetryData: { socketsDown: number[]; time: number } | undefined,
) {
  const sse = new ServerSentEvent("message", {
    data: JSON.stringify(telemetryData),
  });
  sseTarget.dispatchEvent(sse);
}

async function fetchTelemetry(): Promise<
  { socketsDown: number[]; time: number } | undefined
> {
  const apiUrl = "http://192.168.248.238:80/getTelemetry";

  const response = await fetch(apiUrl);
  if (!response.ok) {
    return undefined;
  }

  const responseBody: { socketsDown: number[]; time: number } = await response
    .json();

  return responseBody;
}
