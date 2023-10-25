import React from "react";
import { Offcanvas, OffcanvasBody, OffcanvasHeader, OffcanvasTitle } from "react-bootstrap";

export function OffCanvas({
  children,
  title,
  className,
  show,
  handleClose,
}: {
  children?: React.ReactNode;
  title?: string;
  className?: string;
  show: boolean;
  handleClose: () => void;
}): JSX.Element {

  return (

    <div className="sidebar">
      <Offcanvas backdropClassName={className} onHide={handleClose} show={show}>
        <OffcanvasHeader closeButton>
          <OffcanvasTitle>
            {title}
          </OffcanvasTitle>
        </OffcanvasHeader>
        <OffcanvasBody>
          {children}
        </OffcanvasBody>
      </Offcanvas>
    </div>

  );

}
