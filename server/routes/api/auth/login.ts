import { FreshContext } from "$fresh/server.ts";

export const login = async (
  _req: Request,
  _ctx: FreshContext,
): Promise<Response> => {
  const token = new URL(_req.url).searchParams.get("token");
  if (!_req.body || !token) {
    return new Response(
      JSON.stringify({
        status: 400,
        body: "Bad Request: Missing token parameter",
      }),
    );
  }

  //https://deno.land/x/otpauth@v9.2.1
  return new Response();
};
