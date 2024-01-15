import { Card } from "./Card.tsx";
import { JSX } from "preact/jsx-runtime";
import { Tooltip } from "./Tooltip.tsx";

interface PDU_PanelComponentProps extends JSX.HTMLAttributes<HTMLDivElement> {
  index: number;
  item: {
    name: string;
    consumption: number;
    connected: boolean;
    outlets: {
      active: boolean;
      consumption: number;
    }[];
  };
}

export const PDU_PanelComponent = (props: PDU_PanelComponentProps) => {
  return (
    <Card key={props.index} style={{ margin: "2px" }}>
      <div className={"flex flex-row justify-between p-2"}>
        <div className={"flex flex-row items-center"}>
          <Tooltip
            variant={props.item.connected ? "success" : "danger"}
            square
          ></Tooltip>
          <span>{props.item.name}</span>
        </div>

        <div className="flex flex-col items-end">
          <span>{new Date().toUTCString()}</span>
          <span>consumption: {props.item.consumption}W</span>
        </div>
      </div>
      <div className={"flex flex-col p-2 self-center"}>{props.children}</div>
    </Card>
  );
};
export const PDU_PanelComponentElement = ({
  outlet,
}: {
  outlet: {
    name: string;
    active: boolean;
    consumption: number;
  };
}) => {
  return (
    <Card className={"m-2"} style={{ minWidth: "250px" }}>
      <div className={"flex flex-row items-center"}>
        <Tooltip
          variant={outlet.active ? "success" : "danger"}
          square
        ></Tooltip>
        <span>{outlet.name}</span>
      </div>
      consumption: {outlet.consumption}W
    </Card>
  );
};
