import { FreshContext } from "$fresh/server.ts";

export const login = async (
  _req: Request,
  _ctx: FreshContext
): Promise<Response> => {
  if (!_req.body) {
    return new Response(
      JSON.stringify({
        status: 400,
        body: "Bad Request: Missing token parameter",
      })
    );
  }

  const token = new URL(_req.url).searchParams.get("token");
  if (token) {
    //https://deno.land/x/otpauth@v9.2.1
    return new Response();
  } else {
    return new Response(
      JSON.stringify({
        status: 400,
        body: "Bad Request: Missing token parameter",
      })
    );
  }
};
