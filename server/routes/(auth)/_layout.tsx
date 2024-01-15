import { LayoutProps } from "$fresh/server.ts";
import { Card } from "../../components/Card.tsx";

export default function Layout({ Component }: LayoutProps) {
  return (
    <div
      className={
        "justify-self-center self-center flex flex-row items-center justify-center h-screen w-screen"
      }
    >
      <Card class="auth" className={"m-5 p-5 w-5/6 md:w-1/3"}>
        <div className={"flex flex-row justify-center items-center flex-wrap"}>
          <Component />
        </div>
      </Card>
    </div>
  );
}
