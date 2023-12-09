import { JSX } from "preact";

export function Card(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    // <div {...props} className="border-2 rounded border-grey p-2 ">
    <div
      {...props}
      className={`border-2 rounded border-grey py-2 ${props.className || ""}`}
    >
      {props.children}
    </div>
  );
}
