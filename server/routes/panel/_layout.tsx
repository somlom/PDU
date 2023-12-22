import { LayoutProps } from "$fresh/server.ts";
import { Navbar } from "../../islands/Navbar.tsx";

export default function Layout({ Component }: LayoutProps) {
  return (
    <div class="layout">
      <Navbar />
      <Component />
    </div>
  );
}
