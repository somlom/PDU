import { FreshContext } from "$fresh/server.ts";

export const login = async (
  _req: Request,
  _ctx: FreshContext
): Promise<Response> => {
  if (!_req.body) {
    return new Response(
      JSON.stringify({
        status: 400,
        body: "Bad Request: Missing request body",
      })
    );
  }

  const { body } = await _req.json();

  // Now you can parse the body as needed
  const parsedBody = JSON.parse(body);

  return new Response(parsedBody);
};
