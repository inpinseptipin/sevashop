import React from "react";
import { Wrapper } from "../components/Wrapper";
import { Form, Formik } from "formik";
import { InputField } from "../components/InputField";
import {
  Button,
  Flex,
  HStack,
  PinInput,
  Text,
  PinInputField,
  Box,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/router";
import { PhoneIcon } from "@chakra-ui/icons";
import { useAuth } from "@/lib/auth";
const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const auth = useAuth();

  let screen2 = (
    <Box p="4">
      <Heading mb="2">Enter your Mobile Number</Heading>
      <Text fontSize="sm" mb="2">
        Enter 6 digit OTP you received
      </Text>
      <HStack>
        <PinInput
          // autocomplete="one-time-code"
          // onComplete={(value: string) => verifyOTP(value)}
          // onComplete={(value: string) => setBody("screen1")}

          onComplete={(value: string) => {
            const result = auth.verifyPhone(value);
            // console.log("result is", result);
            // if (result) {
            //   // console.log("loggeed in!");
            //   router.push("/register");
            // } else {
            //   console.log("nahi hua login");
            // }
          }}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack>
      <Image src="/static/login2.png" />
    </Box>
  );

  let screen1 = (
    <Flex direction="column" p="4">
      <Heading mb="2">Enter your Mobile Number</Heading>
      <Text fontSize="sm" mb="2">
        We will send you a 6 digit OTP
      </Text>
      <Formik
        initialValues={{ phonenumber: "" }}
        // onSubmit={(values, { setErrors }) => sendOTP(values.phonenumber)}
        // onSubmit={(values, { setErrors }) => setBody("screen2")}
        onSubmit={(values, { setErrors }) => {
          auth.signinWithPhone(values.phonenumber);
          console.log("sent otp");
          setBody("screen2");
        }}
        // onSubmit={(values, { setErrors }) => console.log(values.phonenumber)}
      >
        <Form>
          {/* <div id="recaptcha-container"></div> */}
          <InputField
            name="phonenumber"
            placeholder="Phone Number"
            label=""
            type="phone"
          />
          <Button
            mt={4}
            type="submit"
            backgroundColor="primary.300"
            color="white"
          >
            Get OTP
          </Button>
        </Form>
      </Formik>
      <Image src="/static/login1.png" />
    </Flex>
  );

  // let screen12 = (
  //   <Flex direction="column" p="4">
  //     <Heading mb="2">Enter your Mobile Number</Heading>
  //     <Text fontSize="sm" mb="2">
  //       We will send you a 6 digit OTP
  //     </Text>
  //     <InputGroup>
  //       <InputLeftElement
  //         pointerEvents="none"
  //         children={<PhoneIcon color="gray.300" />}
  //       />
  //       <Input type="phone" placeholder="Phone number" />
  //     </InputGroup>
  //     <Button mt={4} type="submit" backgroundColor="primary.300" color="white">
  //       Get OTP
  //     </Button>
  //     <Image src="/static/login1.png" />
  //   </Flex>
  // );

  const [body, setBody] = useState("screen1");
  return (
    <Flex height="100vh" direction="column" maxW="400px">
      <div id="recaptcha-container"></div>
      {body === "screen1" ? screen1 : screen2}
    </Flex>
  );
};

export default Login;
