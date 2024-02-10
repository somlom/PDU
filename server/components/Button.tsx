import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
}

export const Button = (props: ButtonProps) => {
  switch (props.variant) {
    case "primary":
      props.class = "bg-blue-500 text-white";
      break;
    case "secondary":
      props.class = "bg-blue-300";
      break;
    case "success":
      props.class = "bg-green-500 text-white";
      break;
    case "warning":
      props.class = "bg-yellow-500";
      break;
    case "danger":
      props.class = "bg-red-500 text-white";
      break;

    default:
      props.class = "bg-white border-1 border-black";
      break;
  }
  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={
        "px-2 py-1 rounded " +
        (props.class || "") +
        " transition-colors duration-300"
      }
    />
  );
};
