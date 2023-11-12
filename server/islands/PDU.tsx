import { useEffect, useState } from "preact/hooks";

import {
  PDU_PanelComponent,
  PDU_PanelComponentElement,
} from "../components/PDU.tsx";

export function PDU_Panel() {
  const [data, setData] = useState<
    | {
        name: string;
        connected: boolean;
        consumption: number;
        outlets: {
          active: boolean;
          consumption: number;
        }[];
      }[]
    | null // State can be null initially
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
            {item.outlets.map((outlet, i) => (
              <PDU_PanelComponentElement outlet={outlet} index={i} />
            ))}
          </PDU_PanelComponent>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
