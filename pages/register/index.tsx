import React from 'react';

import {
  Form,
  Formik,
} from 'formik';
import {
  CurrencyCode,
  LanguageCode,
  useCreateChannelMutation,
} from 'generated/graphql';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

import { InputField } from '@/components/InputField';
import { Wrapper } from '@/components/Wrapper';
import { useAuth } from '@/lib/auth';
import { createUser } from '@/lib/db';
import { setToken } from '@/utils/token';
import {
  Button,
  Flex,
  Heading,
  Image,
} from '@chakra-ui/react';

interface registerProps {}

export const RegisterName: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const auth = useAuth();
  let token = "";
  const [, createChannel] = useCreateChannelMutation();

  return (
    <Wrapper>
      <Flex direction="column" p="4">
        <Heading mb="2">Enter your salon name</Heading>
        <Formik
          key={1}
          initialValues={{ salonname: "" }}
          onSubmit={(values, { setErrors }) => {
            token = values.salonname.replace(/\s+/g, "-").toLowerCase();
            createChannel({
              input: {
                code: values.salonname,
                token: token,
                defaultLanguageCode: LanguageCode.En,
                pricesIncludeTax: true,
                currencyCode: CurrencyCode.Inr,
                defaultShippingZoneId: "1",
                defaultTaxZoneId: "1",
              },
            });
            createUser(auth.user.uid, {
              salonName: values.salonname,
              channelToken: token,
            });
            setToken(token);
            router.push("/register/location");
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <InputField
                type="text"
                name="salonname"
                placeholder="Salon Name"
                label=""
              />
              <Button
                mt={4}
                type="submit"
                backgroundColor="primary.300"
                color="white"
                isLoading={isSubmitting}
              >
                Next
              </Button>
            </Form>
          )}
        </Formik>
        <Image src="/static/login1.png" />
      </Flex>
    </Wrapper>
  );
};

export default withUrqlClient(
  (_ssrExchange, ctx) => ({
    url: `https://server.sevashop.tech/admin-api`,
  }),
  { ssr: false }
)(RegisterName);
