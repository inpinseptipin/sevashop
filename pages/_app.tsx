import theme from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import "focus-visible/dist/focus-visible";
import { AuthProvider } from "@/lib/auth";
// import "swiper/swiper.scss";
import { createClient, Provider } from "urql";
const client = createClient({
  url: "http://localhost:4000/admin-api?vendure-token=xae8shfoehl1x27xhyn",
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
