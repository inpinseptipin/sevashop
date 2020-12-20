function authstuff(ctx) {
  // const user = useAuth();
  // const { data } = useSWR(user ? ["/api/user", user.uid] : null, fetcher);
  // console.log("okay user is", data);
  // console.log("context is", ctx);
  // return data.token;
}

// const { user } = useAuth();
// console.log("data is", user);

export const createUrqlClient = (ssrExchange: any, ctx: any) => {
  console.log(ctx);
  // const { user } = useAuth();
  // console.log("data is ", user);
  return {
    url: "https://server.sevashop.tech/admin-api",
    fetchOptions: {
      credentials: "include" as const,
      headers: {
        "vendure-token": "rohan-kirana",
      },
    },
  };
};
