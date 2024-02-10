import { Card } from "./Card.tsx";
import { JSX } from "preact/jsx-runtime";
import { Tooltip } from "./Tooltip.tsx";
import { IOutlet, IPDU } from "../interfaces/PDU.ts";
import { Button } from "./Button.tsx";

interface PDU_PanelComponentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  index: number;
  item: IPDU;
}

export const PDU_PanelComponent = (props: PDU_PanelComponentProps) => {
  return (
    <Card key={props.index} style={{ margin: "2px" }}>
      <div className={"flex flex-row justify-between p-2"}>
        <div className={"flex flex-row items-center"}>
          <Tooltip
            variant={props.item.connected ? "success" : "danger"}
            square
          >
          </Tooltip>
          <span>{props.item.name}</span>
        </div>

        <div className="flex flex-col items-end">
          <span>{new Date().toUTCString()}</span>
          <span>consumption: {props.item.consumption}W</span>
        </div>
      </div>
      <div className={"flex flex-col p-2 self-center"}>{props.children}</div>
      <Button
        onClick={() => {
          Promise.all([
            fetch(
              "/api/control/shutdown?socket=0&seconds=10",
            ),
            fetch(
              "/api/control/shutdown?socket=1&seconds=10",
            ),
            fetch(
              "/api/control/shutdown?socket=2&seconds=10",
            ),
            fetch(
              "/api/control/shutdown?socket=3&seconds=10",
            ),
          ]);
        }}
      >
        Restart PDU
      </Button>
    </Card>
  );
};

interface PDU_PanelComponentElementProps
  extends JSX.HTMLAttributes<HTMLDivElement> {
  outlet: IOutlet;
}

export const PDU_PanelComponentElement = (
  { outlet }: PDU_PanelComponentElementProps,
) => {
  return (
    <Card className={"m-2"} style={{ minWidth: "250px" }}>
      <div className={"flex flex-row items-center"}>
        <Tooltip
          variant={outlet.active ? "success" : "danger"}
          square
        >
        </Tooltip>
        <span>{outlet.name}</span>
      </div>
      consumption: {outlet.consumption}W
      <Button
        onClick={async () => {
          await fetch(
            "/api/control/shutdown?socket=" + outlet.index + "&seconds=10",
          );
        }}
      >
        Restart socket
      </Button>
    </Card>
  );
};
