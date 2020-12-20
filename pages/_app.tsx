import 'focus-visible/dist/focus-visible';

import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';
import { ChakraProvider } from '@chakra-ui/react';

// const client = createClient({
//   url: "https://server.sevashop.tech/admin-api",
//   fetchOptions: {
//     credentials: "include",
//     headers: {
//       "vendure-token": "wdb0yw5brs4bl35wto1i",
//     },
//   },
// });
function MyApp({ Component, pageProps }: any) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
}

export default MyApp;
