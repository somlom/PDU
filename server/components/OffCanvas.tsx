import { JSX } from "preact";

interface OffCanvasProps extends JSX.HTMLAttributes {
  show: boolean;
}
export function OffCanvasElement(props: JSX.HTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      href={props.href}
      className="block py-2 px-4 text-white hover:bg-gray-700"
    >
      {props.children}
    </a>
  );
}
export function OffCanvas(props: OffCanvasProps) {
  return (
    <>
      <div
        className={`fixed inset-0 bg-black opacity-50 z-0 ${
          props.show ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={props.onClick}
      ></div>
      <div
        className={`fixed top-0 h-full bg-gray-800 text-white w-64 transition-transform transform z-10 w-screen sm:w-96 ${
          props.show ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-labelledby="drawer-js-label"
        tabindex={-1}
      >
        {/* Sidebar Header */}
        <div className="flex flex-row justify-between items-center p-2">
          <h5
            id="drawer-js-label"
            class="text-base font-semibold text-gray-500 dark:text-gray-400"
          >
            Pulse
          </h5>
          <button
            onClick={props.onClick}
            id="drawer-hide-button"
            type="button"
            aria-controls="drawer-example"
            class="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              class="h-3 w-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
          </button>
        </div>

        {/* Sidebar Links */}
        <div className="flex-1 p-4">{props.children}</div>
      </div>
    </>
  );
}
