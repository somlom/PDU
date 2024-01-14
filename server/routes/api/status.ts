import { FreshContext } from "$fresh/server.ts";

export const handler = (_req: Request, _ctx: FreshContext): Response => {
  const response = [
    {
      name: "PDU-1",
      connected: true,
      consumption: 1000,
      outlets: [
        {
          name: "Lenovo ThinkServer",
          active: true,
          consumption: Math.floor(Math.random() * 1000),
        },
        {
          name: "Lenovo ThinkServer",
          active: true,
          consumption: Math.floor(Math.random() * 1000),
        },
        {
          name: "Lenovo ThinkServer",
          active: true,
          consumption: Math.floor(Math.random() * 1000),
        },
        { name: "Lenovo ThinkServer", active: false, consumption: 0 },
      ],
    },
    {
      name: "PDU-2",
      connected: true,
      consumption: 0,
      outlets: [
        { name: "HP Proliant", active: Math.random() < 0.8, consumption: 0 },
        { name: "HP SmartArray", active: Math.random() < 0.8, consumption: 0 },
        { name: "DB", active: Math.random() < 0.8, consumption: 0 },
        { name: "PDU_4", active: Math.random() < 0.8, consumption: 0 },
      ],
    },
  ];
  return new Response(JSON.stringify(response));
};
