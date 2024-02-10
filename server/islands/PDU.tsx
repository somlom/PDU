import { useEffect, useState } from "preact/hooks";

import {
  PDU_PanelComponent,
  PDU_PanelComponentElement,
} from "../components/PDU.tsx";
import { IPDU } from "../interfaces/PDU.ts";

export function PDU_Panel() {
  const [data, setData] = useState<
    IPDU[] | null // State can be null initially
  >(null);

  useEffect(() => {
    const sse = new EventSource("api/control/getTelemetry");
    console.log(sse.readyState);
    sse.onerror = (err) => {
      console.log("Connection Error");
      sse.close();
    };
    sse.onmessage = (event) => {
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
      setData([{
        name: "PDU-1",
        connected: true,
        consumption: 0,
        outlets: outlets,
      }]);
    };
  }, []);

  return (
    <div id="pdu_panel">
      {data
        ? (
          data.map((item, index) => (
            <PDU_PanelComponent item={item} index={index}>
              {item.outlets.map((outlet) => (
                <PDU_PanelComponentElement outlet={outlet} />
              ))}
            </PDU_PanelComponent>
          ))
        )
        : (
          <div
            class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
    </div>
  );
}
