import { useAuth } from "@/lib/auth";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Image,
  PinInput as ChakraPinInput,
  PinInputField,
  PinInputProps,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Form, Formik, useField } from "formik";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../components/InputField";
import * as yup from "yup";

const PinInput = (props: { name: string } & PinInputProps) => {
  const [field, { error }, { setValue }] = useField(props.name);
  const onChange = (value: string) => {
    setValue(value);
  };
  return (
    <ChakraPinInput
      {...props}
      {...field}
      isInvalid={!!error}
      onChange={onChange}
    />
  );
};
const validationSchema = yup.object().shape({
  pin: yup.string().required(),
});

const Login: React.FC<{}> = ({}) => {
  const router = useRouter();
  const auth = useAuth();
  const toast = useToast();

  let screen2 = (
    <Box p="4">
      <Heading mb="2">Enter your Mobile Number</Heading>
      <Text fontSize="sm" mb="2">
        Enter 6 digit OTP you received
      </Text>

      {/* <HStack>
        <PinInput
          onComplete={(value: string) => {
            console.log("otp is", value);
            auth.verifyPhone(value, toast);
            toast({
              title: "Verifying your Account",
              description: "Hang tight",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          }}
        >
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </HStack> */}
      <Formik
        initialValues={{ pin: "" }}
        onSubmit={(values) => {
          // console.log(values);
          auth.verifyPhone(values.pin, toast);
          toast({
            title: "Verifying your Account",
            description: "Hang tight",
            status: "success",
            duration: 2000,
            isClosable: true,
          });
        }}
        validationSchema={validationSchema}
        validateOnMount
      >
        <Form>
          {/* <VStack spacing={4} align="left"> */}
          <HStack>
            <PinInput name="pin">
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
              <PinInputField />
            </PinInput>
          </HStack>
          <Button
            type="submit"
            mt={4}
            colorScheme="primary"
            isLoading={auth.loading}
          >
            Submit
          </Button>
          {/* </VStack> */}
        </Form>
      </Formik>
      {/* <Button
        mt={4}
        type="submit"
        colorScheme="primary"
        color="white"
        // isLoading={auth.loading}
      >
        Submit OTP
      </Button> */}
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
          const singinRes = auth.signinWithPhone(values.phonenumber, setBody);
          console.log("signin response", singinRes);
          // console.log("sent otp");
          // setBody("screen2");
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
            colorScheme="primary"
            color="white"
            isLoading={auth.loading}
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
