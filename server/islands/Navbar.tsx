import { useSignal } from "@preact/signals";
import { JSX } from "preact";

import { OffCanvas, OffCanvasElement } from "../components/OffCanvas.tsx";
import { Button } from "../components/Button.tsx";

export const Navbar = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  const showOffcanvas = useSignal<boolean>(false);

  return (
    <>
      <Button onClick={() => (showOffcanvas.value = true)}>---</Button>

      <OffCanvas
        show={showOffcanvas.value}
        onClick={() => (showOffcanvas.value = false)}
      >
        <OffCanvasElement>asd</OffCanvasElement>
      </OffCanvas>
    </>
  );
};
