import { GoBackIcon } from "@/components/Icons";
import { InputField } from "@/components/InputField";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  useRadio,
  useRadioGroup,
  HStack,
} from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useCreateProductMutation } from "generated/graphql";
import React from "react";

interface addProps {}
// 1. Create a component that consumes the `useRadio` hook
function RadioCard(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        // borderWidth="1px"
        // borderRadius="md"
        // boxShadow="md"
        _checked={{
          bg: "primary.300",
          color: "white",
          // borderColor: "primary.300",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        // px={5}
        // py={3}
        p="1"
        fontSize="sm"
      >
        {props.children}
      </Box>
    </Box>
  );
}

export const Add: React.FC<addProps> = ({}) => {
  const genderOptions = ["Male", "Female"];
  const { getRootProps, getRadioProps: getGenderRadioProps } = useRadioGroup({
    name: "Gender",
    defaultValue: "Female",
    onChange: console.log,
  });
  const categoryOptions = [
    "Hair Cut & Finish",
    "Hair Colour",
    "Hair Treatments",
  ];
  const {
    getRootProps: _,
    getRadioProps: getCategoryRadioProps,
  } = useRadioGroup({
    name: "Gender",
    // defaultValue: "Female",
    onChange: console.log,
  });
  const staffOptions = ["Deepak Chopra", "Ruh Nexa", "John Doe"];
  const { getRootProps: __, getRadioProps: getStaffRadioProps } = useRadioGroup(
    {
      name: "Staff",
      // defaultValue: "Female",
      onChange: console.log,
    }
  );
  const timeOptions = ["15 mins", "30 mins", "45 mins", "1 hour"];
  const { getRootProps: ___, getRadioProps: getTimeRadioProps } = useRadioGroup(
    {
      name: "Time",
      // defaultValue: "Female",
      onChange: console.log,
    }
  );

  const [, createProduct] = useCreateProductMutation();

  return (
    <Box p="2">
      <Flex
        zIndex={1}
        boxShadow="lg"
        p="4"
        align="center"
        position="sticky"
        top={0}
        backgroundColor="white"
      >
        <GoBackIcon boxSize="32px" />
        <Heading ml="4">Add Service</Heading>
      </Flex>
      <Formik
        initialValues={{ name: "", price: "" }}
        onSubmit={(values, { setErrors }) => {
          console.log("values from the form", values);
          // const res = createProduct({
          //   input: {
          //     translations: [
          //       {
          //         languageCode: "en",
          //         name: values.name,
          //         slug: values.name,
          //         description: "",
          //       },
          //     ],
          //     facetValueIds: ["50"],
          //   },
          // });
          // console.log("output of the product created", res);
        }}
      >
        <Form>
          {/* <div id="recaptcha-container"></div> */}
          <Text></Text>
          <HStack>
            {genderOptions.map((value) => {
              const radio = getGenderRadioProps({ value });
              console.log("radio props are", radio);
              return (
                <RadioCard key={"arre vah" + value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
          <InputField name="name" placeholder="Hair Cut" label="Name" />
          <InputField name="price" placeholder="200" label="Price" />
          <Text>Duration</Text>
          <HStack>
            {timeOptions.map((value) => {
              const radio = getTimeRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>

          <InputField
            name="Category"
            placeholder="Select one or create one"
            label="Category Name"
          />
          <HStack>
            {categoryOptions.map((value) => {
              const radio = getCategoryRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
          <Text>Select staff</Text>
          <HStack>
            {staffOptions.map((value) => {
              const radio = getStaffRadioProps({ value });
              return (
                <RadioCard key={value} {...radio}>
                  {value}
                </RadioCard>
              );
            })}
          </HStack>
          <Button
            mt={4}
            // type="submit"
            // backgroundColor="primary.300"
            // color="white"
          >
            Cancel
          </Button>
          <Button
            mt={4}
            type="submit"
            backgroundColor="primary.300"
            color="white"
          >
            Save
          </Button>
        </Form>
      </Formik>
    </Box>
  );
};

export default Add;
