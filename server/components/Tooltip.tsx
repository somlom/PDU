import { JSX } from "preact/jsx-runtime";

interface TooltipProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  square?: boolean;
}

export const Tooltip = (props: TooltipProps) => {
  props.class = "flex ";
  switch (props.variant) {
    case "primary":
      props.class += "bg-blue-500 text-white";
      break;
    case "secondary":
      props.class += "bg-blue-300";
      break;
    case "success":
      props.class += "bg-green-500 text-white";
      break;
    case "warning":
      props.class += "bg-yellow-500";
      break;
    case "danger":
      props.class += "bg-red-500 text-white";
      break;

    default:
      props.class = "bg-white border-1 border-black";
      break;
  }
  if (props.square) {
    props.class = props.class + " w-3.5 h-3.5 ";
  }
  return <span {...props} />;
};
