import { JSX } from "preact";

interface SpinnerProps extends JSX.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export const Spinner = ({ text }: SpinnerProps) => {
  return (
    <div
      class="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
      role="status"
    >
      <span class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
        {text || "Loading..."}
      </span>
    </div>
  );
};
