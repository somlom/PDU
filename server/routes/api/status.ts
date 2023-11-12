import { HandlerContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  const response = [
    {
      name: "PDU-1",
      connected: true,
      consumption: 1000,
      outlets: [
        { active: true, consumption: Math.floor(Math.random() * 1000) },
        { active: true, consumption: Math.floor(Math.random() * 1000) },
        { active: true, consumption: Math.floor(Math.random() * 1000) },
        { active: false, consumption: 0 },
      ],
    },
    {
      name: "PDU-2",
      connected: true,
      consumption: 0,
      outlets: [
        { active: Math.random() < 0.8, consumption: 0 },
        { active: Math.random() < 0.8, consumption: 0 },
        { active: Math.random() < 0.8, consumption: 0 },
        { active: Math.random() < 0.8, consumption: 0 },
      ],
    },
  ];
  return new Response(JSON.stringify(response));
};
