import theme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import { AuthProvider } from "@/lib/auth";
import { createClient, Provider } from "urql";
const client = createClient({
  url:
    "https://server.sevashop.tech/admin-api?vendure-token=wdb0yw5brs4bl35wto1i",
  fetchOptions: {
    credentials: "include",
  },
});
function MyApp({ Component, pageProps }: any) {
  return (
    <Provider value={client}>
      <ChakraProvider theme={theme}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;
