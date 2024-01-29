import { Handlers } from "$fresh/server.ts";
import {
  ServerSentEvent,
  ServerSentEventStreamTarget,
} from "$std/http/server_sent_event.ts";

const PUSH_DELAY_MILLISECONDS = 1000; // Set to 1000ms for 1 second

export const handler: Handlers = {
  GET(_req) {
    const sseTarget = new ServerSentEventStreamTarget({
      keepAlive: true,
    });

    let timerId = 0;

    const refetchData = async () => {
      try {
        const telemetryData = await fetchTelemetryFromESP();
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
  telemetryData: any
) {
  const sse = new ServerSentEvent("message", {
    data: JSON.stringify(telemetryData),
  });
  sseTarget.dispatchEvent(sse);
}

async function fetchTelemetryFromESP(): Promise<object> {
  const apiUrl = "http://192.168.178.149:80/getTelemetry";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return { message: `Failed to fetch telemetry: ${response.statusText}` };
    }

    const responseBody = await response.json();

    return JSON.parse(responseBody);
  } catch (error) {
    return { message: `Failed to fetch telemetry: ${error.message}` };
  }
}
