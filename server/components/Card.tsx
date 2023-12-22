import { JSX } from "preact";

export function Card(props: JSX.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className="border-2 rounded border-grey py-2">
      {props.children}
    </div>
  );
}
