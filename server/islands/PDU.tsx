import { useEffect, useState } from "preact/hooks";

import {
  PDU_PanelComponent,
  PDU_PanelComponentElement,
} from "../components/PDU.tsx";

type IOutlet = {
  name: string;
  active: boolean;
  consumption: number;
};
interface IPDU {
  name: string;
  connected: boolean;
  consumption: number;
  outlets: IOutlet[];
}
export function PDU_Panel() {
  const [data, setData] = useState<
    IPDU[] | null // State can be null initially
  >(null);

  const fetchData = async () => {
    const response = await fetch("api/status");
    const newState = await response.json();
    setData(newState);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 2 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="pdu_panel">
      {data ? (
        data.map((item, index) => (
          <PDU_PanelComponent item={item} index={index}>
            {item.outlets.map((outlet) => (
              <PDU_PanelComponentElement outlet={outlet} />
            ))}
          </PDU_PanelComponent>
        ))
      ) : (
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
