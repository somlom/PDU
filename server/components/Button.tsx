import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";

interface ButtonProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger";
  sz?: "sm" | "md" | "lg";
}

export const Button = (props: ButtonProps) => {
  let buttonClass =
    "px-4 py-2 rounded-md font-semibold transition duration-300 ease-in-out ";

  switch (props.variant) {
    case "primary":
      buttonClass +=
        "bg-blue-500 text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50";
      break;
    case "secondary":
      buttonClass +=
        "bg-blue-300 text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-opacity-50";
      break;
    case "success":
      buttonClass +=
        "bg-green-500 text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50";
      break;
    case "warning":
      buttonClass +=
        "bg-yellow-500 text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50";
      break;
    case "danger":
      buttonClass +=
        "bg-red-500 text-white shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50";
      break;
    default:
      buttonClass +=
        "bg-gray-300 text-black shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-50";
      break;
  }
  switch (props.sz) {
    case "sm":
      buttonClass += " text-sm";
      break;
    case "md":
      buttonClass += " text-base";
      break;
    case "lg":
      buttonClass += " text-lg";
      break;

    default:
      buttonClass += " text-base";
      break;
  }

  return (
    <button
      {...props}
      disabled={!IS_BROWSER || props.disabled}
      class={buttonClass}
    />
  );
};
