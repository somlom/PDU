import * as React from "react";

export function Sidebar({
  children,
  title,
  className,
}: {
  children?: React.ReactNode;
  title?: string;
  className?: string;
}): JSX.Element {
  return (
    <div className={className}>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
