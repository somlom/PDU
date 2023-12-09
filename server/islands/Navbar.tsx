import { useSignal } from "@preact/signals";
import { JSX } from "preact";

import { OffCanvas, OffCanvasElement } from "../components/OffCanvas.tsx";
import { Button } from "../components/Button.tsx";

export const Navbar = (props: JSX.HTMLAttributes<HTMLDivElement>) => {
  const showOffcanvas = useSignal<boolean>(false);

  return (
    <div className="flex flex-row items-center">
      <Button className="m-2" onClick={() => (showOffcanvas.value = true)}>
        ---
      </Button>
      <div className="p-2 flex flex-row items-center">
        <img src={"/variant1.png"} style={{ height: "30px" }} alt="Logo" />
        Pulse
      </div>

      <OffCanvas
        show={showOffcanvas.value}
        onClick={() => (showOffcanvas.value = false)}
      >
        <OffCanvasElement>asd</OffCanvasElement>
      </OffCanvas>
    </div>
  );
};
