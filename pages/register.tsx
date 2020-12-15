import React from "react";

import { useState } from "react";
import { useRouter } from "next/router";
import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { InputField } from "@/components/InputField";
import { Formik, Form } from "formik";
import { useAuth } from "@/lib/auth";
import { createUser } from "@/lib/db";
interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const auth = useAuth();
  console.log(auth);

  // if (!auth.user) {
  //   return "Loading...";
  // }

  let screen1 = (
    <Flex direction="column" p="4">
      <Heading mb="2">Enter your salon name</Heading>

      <Formik
        initialValues={{ salonname: "" }}
        // onSubmit={(values, { setErrors }) => sendOTP(values.phonenumber)}
        onSubmit={(values, { setErrors }) => {
          // setBody("screen2");
          // auth.user.
          createUser(auth.user.uid, { salonName: values.salonname });
          console.log("added salon name");
          setBody("screen2");
        }}
        // onSubmit={(values, { setErrors }) => console.log(values.phonenumber)}
      >
        <Form>
          {/* <div id="recaptcha-container"></div> */}
          <InputField name="salonname" placeholder="Salon Name" label="" />
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
    </Flex>
  );
  let screen2 = (
    <Flex direction="column" p="4">
      <Heading mb="2">Enter your salon location</Heading>

      <Formik
        initialValues={{ location: "" }}
        // onSubmit={(values, { setErrors }) => sendOTP(values.phonenumber)}
        onSubmit={(values, { setErrors }) => {
          auth.addDisplayName();
          createUser(auth.user.uid, { salonLocation: values.location });
          console.log("going to dashboard");
          // setBody("screen1");
          router.push("/");
        }}
        // onSubmit={(values, { setErrors }) => console.log(values.phonenumber)}
      >
        <Form>
          {/* <div id="recaptcha-container"></div> */}
          <InputField name="location" placeholder="Salon Location" label="" />
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
    </Flex>
  );
  const [body, setBody] = useState("screen1");
  return (
    <Flex direction="column">{body === "screen1" ? screen1 : screen2}</Flex>
  );
};

export default Register;
