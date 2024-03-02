import { useEffect, useState } from "preact/hooks";
import { PDU_PanelComponent } from "../components/PDU.tsx";
import { IPDU } from "../interfaces/PDU.ts";
import { Spinner } from "../components/Spinner.tsx";
// import { EventSource } from "https://deno.land/std/http/server.ts";

export function PDU_Panel() {
  const [data, setData] = useState<IPDU[] | null>(null);

  useEffect(() => {
    const sse = new EventSource(
      "http://localhost:8000/api/control/getTelemetry"
    );

    // Handle heartbeat
    let heartbeatTimer: number;

    function sendHeartbeat() {
      // Send a comment as a heartbeat signal
      sse.dispatchEvent(new Event("ping"));
      // Reset the timer
      clearTimeout(heartbeatTimer);
      heartbeatTimer = setTimeout(handleHeartbeatTimeout, 5000); // Adjust the timeout as needed
    }

    function handleHeartbeatTimeout() {
      // Handle connection timeout here
      console.log("Connection timeout");
      setData([
        {
          name: "PDU-1",
          connected: false,
          consumption: 0,
          outlets: undefined,
        },
      ]);
      sse.close();
    }

    sse.addEventListener("message", (event: any) => {
      // Reset heartbeat timer upon receiving any message
      sendHeartbeat();

      const data = JSON.parse(event.data) as {
        socketsDown: number[];
        time: number;
      };
      const time = Date.now();
      const outlets = data.socketsDown.map((socket, i) => ({
        index: i,
        name: "Socket " + i,
        active: socket * 1000 < time,
        consumption: 0,
      }));
      setData([
        {
          name: "PDU-1",
          connected: true,
          consumption: 0,
          outlets: outlets,
        },
      ]);
    });

    sse.addEventListener("error", (err) => {
      // Handle connection error here
      console.log("Connection Error:", err);
      setData([
        {
          name: "PDU-1",
          connected: false,
          consumption: 0,
          outlets: undefined,
        },
      ]);
      sse.close();
    });

    // Initial heartbeat and start heartbeat timer
    sendHeartbeat();

    // Cleanup function
    return () => {
      clearInterval(heartbeatTimer);
      sse.close();
    };
  }, [setTimeout(() => {}, 1000)]);

  return (
    <div id="pdu_panel">
      {data ? (
        data.map((item, index) => (
          <PDU_PanelComponent item={item} index={index} />
        ))
      ) : (
        <Spinner />
      )}
    </div>
  );
}
