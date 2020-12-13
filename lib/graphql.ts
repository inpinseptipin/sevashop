import { gql, GraphQLClient, request } from "graphql-request";
const endpoint =
  "http://localhost:4000/admin-api?vendure-token=xae8shfoehl1x27xhyn";
// const fetcher = (query) => request(API, query);

export const graphQLClient = new GraphQLClient(endpoint, {
  credentials: "include",
});
