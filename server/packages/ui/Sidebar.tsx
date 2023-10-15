import * as React from "react";

interface Props {
  children?: React.ReactNode;
  label?: string;
}

export const Sidebar = ({ children, label }: Props) => {
  return (
    <div>
      <h1>{label}</h1>
      {children}
    </div>
  );
};
