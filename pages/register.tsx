import React, { useState } from 'react';

import {
  Form,
  Formik,
} from 'formik';
import {
  CurrencyCode,
  LanguageCode,
  useCreateChannelMutation,
} from 'generated/graphql';
import { useRouter } from 'next/router';

import { InputField } from '@/components/InputField';
import { useAuth } from '@/lib/auth';
import { createUser } from '@/lib/db';
import {
  Button,
  Flex,
  Heading,
  Image,
} from '@chakra-ui/react';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const auth = useAuth();
  let token = "";
  const [, createChannel] = useCreateChannelMutation();

  let screen1 = (
    <Flex direction="column" p="4">
      <Heading mb="2">Enter your salon name</Heading>
      <Formik
        key={1}
        initialValues={{ salonname: "" }}
        onSubmit={(values, { setErrors }) => {
          token = values.salonname.replace(/\s+/g, "-").toLowerCase();
          console.log("token is", token);
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
            token: token,
          });
          setBody("screen2");
        }}
      >
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
          >
            Next
          </Button>
        </Form>
      </Formik>
      <Image src="/static/login1.png" />
    </Flex>
  );
  let screen2 = (
    <Flex direction="column" p="4">
      <Heading mb="2">Enter your salon location</Heading>

      <Formik
        key={2}
        initialValues={{ location: "" }}
        onSubmit={(values, { setErrors }) => {
          auth.addDisplayName();
          createUser(auth.user.uid, { salonLocation: values.location });
          router.push("/");
        }}
      >
        <Form>
          <InputField
            type="text"
            name="location"
            placeholder="Salon Location"
            label=""
          />
          <Button
            mt={4}
            type="submit"
            backgroundColor="primary.300"
            color="white"
          >
            Finish
          </Button>
        </Form>
      </Formik>
      <Image src="/static/login2.png" />
    </Flex>
  );
  const [body, setBody] = useState("screen1");
  return (
    <Flex direction="column">{body === "screen1" ? screen1 : screen2}</Flex>
  );
};

export default Register;
