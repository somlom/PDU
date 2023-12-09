// tcp_server.ts
import { serve } from "std/http";

const hostname = "0.0.0.0";
const port = 8080;

const listener = Deno.listen({ hostname, port });
console.log(`Server listening on ${hostname}:${port}`);

for await (const conn of listener) {
  handleConnection(conn);
}

async function handleConnection(conn: Deno.Conn) {
  const buffer = new Uint8Array(1024);

  while (true) {
    const n = await conn.read(buffer);
    if (n === null) break;

    const message = new TextDecoder().decode(buffer.subarray(0, n));
    console.log(`Received message from client: ${message}`);

    // Handle the received message

    // Send a response back to the client
    const response = "Message received";
    const encodedResponse = new TextEncoder().encode(response);
    await conn.write(encodedResponse);
  }

  conn.close();
}
