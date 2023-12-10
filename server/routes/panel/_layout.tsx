import { LayoutProps } from "$fresh/server.ts";
import { Navbar } from "../../islands/Navbar.tsx";

export default function Layout({ Component }: LayoutProps) {
  return (
    <div class="layout">
      <Navbar
        data={[
          { href: "/panel", title: "Overview" },
          { href: "/panel/controls", title: "Controls" },
          { href: "/panel/consumption", title: "Consumption" },
          { href: "/panel/logs", title: "Logs" },
          { href: "/panel/rules", title: "Rules" },
          { href: "/docs", title: "Docs" },
        ]}
      />
      <Component />
    </div>
  );
}
