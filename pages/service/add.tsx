import { GoBackIcon } from "@/components/Icons";
import { InputField } from "@/components/InputField";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Skeleton,
  Text,
  useRadioGroup,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { RadioGroupControl } from "formik-chakra-ui";
import {
  CreateProductOptionGroupDocument,
  useAddOptionGroupToProductMutation,
  useCreateProductMutation,
  useCreateProductOptionGroupMutation,
  useCreateProductVariantsMutation,
  useGetFacetListQuery,
} from "generated/graphql";
import React from "react";
import { RadioCard } from "../../components/RadioCard";

interface addProps {}
export const Add: React.FC<addProps> = ({}) => {
  const [{ data: facetlist, fetching }] = useGetFacetListQuery();

  const [, createProduct] = useCreateProductMutation();
  const [, createProductOptionGroup] = useCreateProductOptionGroupMutation();
  const [, addOptionGroupToProduct] = useAddOptionGroupToProductMutation();
  const [, createProductVariants] = useCreateProductVariantsMutation();

  if (fetching) return <Skeleton m="2" height="40px" />;

  const genderOptions = facetlist.facets.items[0].values.map((value) => ({
    name: value.name,
    id: value.id,
  }));
  const categoryOptions = facetlist.facets.items[1].values.map((value) => ({
    name: value.name,
    id: value.id,
  }));
  const timeOptions = facetlist.facets.items[2].values
    .map((value) => ({
      name: value.name,
      id: value.id,
    }))
    .sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  const staffOptions = facetlist.facets.items[3].values.map((value) => ({
    name: value.name,
    id: value.id,
  }));

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
        initialValues={{
          name: "",
          price: 0,
          gender: "",
          staff: "",
          duration: "",
          category: "",
          picked: "",
        }}
        onSubmit={async (values, { setErrors }) => {
          console.log("values from the form", values);
          const productInfo = await createProduct({
            input: {
              translations: [
                {
                  languageCode: "en",
                  name: values.name,
                  slug: values.name,
                  description: "",
                },
              ],
            },
          });
          const optionGroupInfo = await createProductOptionGroup({
            input: {
              code: "gender",
              translations: [
                {
                  languageCode: "en",
                  name: "Gender",
                },
              ],
              options: [
                {
                  code: values.gender.toLowerCase(),
                  translations: [
                    {
                      languageCode: "en",
                      name: values.gender,
                    },
                  ],
                },
              ],
            },
          });
          const addOptionGroupToProductInfo = await addOptionGroupToProduct({
            productId: productInfo.data.createProduct.id,
            optionGroupId: optionGroupInfo.data.createProductOptionGroup.id,
          });
          await createProductVariants({
            input: [
              {
                productId: productInfo.data.createProduct.id,
                price: values.price * 100,
                sku: "2",
                stockOnHand: 1000,
                translations: [
                  {
                    languageCode: "en",
                    name: values.name,
                  },
                ],
                optionIds: [
                  addOptionGroupToProductInfo.data.addOptionGroupToProduct
                    .optionGroups[0].options[0].id,
                ],
                facetValueIds: [
                  values.gender,
                  values.category,
                  values.staff,
                  values.duration,
                ],
              },
            ],
          });
        }}
      >
        {({ values }) => (
          <Form>
            <RadioGroupControl name="gender" label="Gender">
              {genderOptions.map(({ name, id }) => {
                return (
                  <Radio value={id} key={id}>
                    {name}
                  </Radio>
                );
              })}
            </RadioGroupControl>

            <InputField name="name" placeholder="Hair Cut" label="Name" />
            <InputField name="price" placeholder="200" label="Price" />

            <RadioGroupControl name="duration" label="Duration">
              {timeOptions.map(({ name, id }) => {
                return (
                  <Radio value={id} key={id}>
                    {name}
                  </Radio>
                );
              })}
            </RadioGroupControl>

            <RadioGroupControl name="category" label="Category">
              {categoryOptions.map(({ name, id }) => {
                return (
                  <Radio value={id} key={id}>
                    {name}
                  </Radio>
                );
              })}
            </RadioGroupControl>
            <RadioGroupControl name="staff" label="Staff">
              {staffOptions.map(({ name, id }) => {
                return (
                  <Radio value={id} key={id}>
                    {name}
                  </Radio>
                );
              })}
            </RadioGroupControl>
            <Button mt={4}>Cancel</Button>
            <Button mt={4} type="submit" colorScheme="primary">
              Save
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Add;
