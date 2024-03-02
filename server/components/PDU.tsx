import IconReload from "https://deno.land/x/tabler_icons_tsx@0.0.5/tsx/reload.tsx";

import { Card } from "./Card.tsx";
import { JSX } from "preact/jsx-runtime";
import { Tooltip } from "./Tooltip.tsx";
import { IOutlet, IPDU } from "../interfaces/PDU.ts";
import { Button } from "./Button.tsx";
import { useEffect } from "preact/hooks";
import { Signal } from "@preact/signals";

interface PDU_PanelComponentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  index: number;
  item: IPDU;
}

export const PDU_PanelComponent = (props: PDU_PanelComponentProps) => {
  const ts = new Signal(Date.now());
  console.log(props);
  return (
    <Card key={props.index} style={{ margin: "2px" }}>
      <div className={"flex flex-row justify-between p-2"}>
        <div className={"flex flex-col"}>
          <span>{props.item.name}</span>
          <div className={"flex flex-row items-center"}>
            <Tooltip
              variant={props.item.connected ? "success" : "danger"}
              square
            />
            {props.item.connected ? "connected" : "disconnected"}
          </div>
        </div>

        <div className="flex flex-col items-end">
          <span>
            {props.item.connected
              ? new Date().toUTCString()
              : new Date(ts.value).toUTCString()}
          </span>
          {props.item.connected && (
            <span>consumption: {props.item.consumption}W</span>
          )}
        </div>
      </div>
      <div className={"flex flex-col p-2 self-center"}>
        {props.item.outlets &&
          props.item.outlets.map((outlet) => (
            <PDU_PanelComponentElement outlet={outlet} />
          ))}
      </div>
      {props.item.connected ? (
        <Button
          variant="primary"
          onClick={() => {
            Promise.all([
              fetch("/api/control/shutdown?socket=0&seconds=10"),
              fetch("/api/control/shutdown?socket=1&seconds=10"),
              fetch("/api/control/shutdown?socket=2&seconds=10"),
              fetch("/api/control/shutdown?socket=3&seconds=10"),
            ]);
            ts.value = Date.now();
          }}
        >
          <div className={"flex flex-row items-center"}>
            <IconReload class="w-6 h-6" /> Restart PDU
          </div>
        </Button>
      ) : (
        <Button
          variant="primary"
          onClick={() => {
            location.reload();
          }}
        >
          <div className={"flex flex-row items-center"}>
            <IconReload class="w-6 h-6" /> Reload page
          </div>
        </Button>
      )}
    </Card>
  );
};

interface PDU_PanelComponentElementProps
  extends JSX.HTMLAttributes<HTMLDivElement> {
  outlet: IOutlet;
}

export const PDU_PanelComponentElement = ({
  outlet,
}: PDU_PanelComponentElementProps) => {
  return (
    <Card
      className={"m-2 flex flex-row items-center justify-between"}
      style={{ minWidth: "250px" }}
    >
      <div>
        <div className={"flex flex-row items-center"}>
          <Tooltip
            variant={outlet.active ? "success" : "danger"}
            square
          ></Tooltip>
          <span>{outlet.name}</span>
        </div>
        consumption: {outlet.consumption}W
      </div>
      <Button
        variant="primary"
        sz={"sm"}
        onClick={async () => {
          await fetch(
            "/api/control/shutdown?socket=" + outlet.index + "&seconds=10"
          );
        }}
      >
        <div className={"flex flex-row items-center"}>
          <IconReload class="w-4 h-4" /> Restart socket
        </div>
      </Button>
    </Card>
  );
};
