import { AppProps } from "$fresh/server.ts";
import "npm:bootstrap/dist/css/bootstrap.min.css";
import { Button } from "npm:react-bootstrap";

export default function App({ Component }: AppProps) {
  return (
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>server</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body>
        <Component />
        <Button />
      </body>
    </html>
  );
}
