import * as React from "react";

export function Sidebar({ children, label }: {
  children?: React.ReactNode;
  label?: string;
}) {
  return (
    <div>
      <h1>{label}</h1>
      {children}
    </div>
  );
}
