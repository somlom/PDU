import { useState } from "preact/hooks";
import { Button } from "../components/Button.tsx";
import { JSX } from "preact/jsx-runtime";

export const LoginIsland = (props: JSX.HTMLAttributes<HTMLFormElement>) => {
  const [OTP, setOTP] = useState<number | null>(null);

  const onSubmit = (event: Event) => {
    event.preventDefault();
    alert(OTP);
  };
  return (
    <form
      className={
        "flex flex-col w-full " + (props.class || props.className || "")
      }
      onSubmit={onSubmit}
      {...props}
    >
      <h1 className={"text-2xl mb-5"}>Login</h1>
      <input
        id="otp-input"
        type="number"
        className="w-full p-3 text-center border border-gray-300 rounded focus:outline-none focus:border-blue-500 mb-2"
        placeholder={"OTP token"}
        maxLength={6}
        onChange={(event) => setOTP(parseInt(event.currentTarget.value))}
      />
      <Button type="submit" variant="primary" className={"p-2 mb-2"}>
        Login
      </Button>
      <hr className={"mb-2"} />
      <a href={"/register"}>
        <Button type="button" className={"w-full"}>
          Register new device
        </Button>
      </a>
    </form>
  );
};
