import { useSignal } from "@preact/signals";

import { OffCanvas, OffCanvasElement } from "../components/OffCanvas.tsx";
import { Button } from "../components/Button.tsx";

type NavElement = {
  href: string;
  title: string;
};
interface INavBar {
  data: NavElement[];
}

interface IOCEI {
  key: string;
  title: string;
  href: string;
}
const OffCanvasElementIsland = ({ key, title, href }: IOCEI) => {
  if (window.location && window.location.pathname === href) {
    return (
      <OffCanvasElement
        className={"bg-gray-700"}
        key={key}
        title={title}
        href={href}
      />
    );
  } else {
    return <OffCanvasElement key={key} title={title} href={href} />;
  }
};

export const Navbar = ({ data }: INavBar) => {
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
        {data.map((obj) => (
          <OffCanvasElementIsland
            key={obj.href}
            title={obj.title}
            href={obj.href}
          />
        ))}
      </OffCanvas>
    </div>
  );
};
