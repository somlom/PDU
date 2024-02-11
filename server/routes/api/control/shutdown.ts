import { Handlers } from "$fresh/server.ts";

export const handler: Handlers = {
  async GET(_req: Request) {
    const params = new URL(_req.url).searchParams;
    const socket = parseInt(params.get("socket") || "error");
    const time = parseInt(params.get("seconds") || "error");

    if (Number.isFinite(socket) && Number.isFinite(time)) {
      try {
        const apiUrl = "http://192.168.178.149:80/shutdown?socket=" + socket +
          "&time=" + time;
        const response = await fetch(apiUrl);
        return new Response(response.body);
      } catch (error) {
        return new Response(error.message);
      }
    } else {
      return new Response("error");
    }
  },
};
