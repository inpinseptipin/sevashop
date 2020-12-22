import { getToken } from './token';

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  return {
    url: "https://server.sevashop.tech/admin-api",
    fetchOptions: () => ({
      credentials: "include" as const,
      headers: {
        "vendure-token": getToken(),
      },
    }),
  };
};
