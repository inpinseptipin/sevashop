import React from 'react';

import {
  Form,
  Formik,
} from 'formik';
import { withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';

import { InputField } from '@/components/InputField';
import { Wrapper } from '@/components/Wrapper';
import { useAuth } from '@/lib/auth';
import { createUser } from '@/lib/db';
import { createUrqlClient } from '@/utils/createUrqlClient';
import {
  Button,
  Flex,
  Heading,
  Image,
} from '@chakra-ui/react';

interface registerProps {}

export const RegisterLoc: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const auth = useAuth();

  // const [, createCollection] = useCreateCollectionMutation();

  // const memo = React.useMemo(function () {
  //   return {
  //     url: `https://server.sevashop.tech/admin-api?vendure-token=${getToken()}`,
  //   };
  // }, []);
  // function getCategory(item) {
  //   return item.code === "category";
  // }
  // const [{ data: facetlist, fetching }] = useGetFacetListQuery({
  //   context: memo,
  // });
  // console.log(facetlist);
  return (
    <Wrapper>
      <Flex direction="column" p="4">
        <Heading mb="2">Enter your salon location</Heading>
        <Formik
          key={2}
          initialValues={{ location: "" }}
          onSubmit={(values, { setErrors }) => {
            auth.addDisplayName();
            createUser(auth.user.uid, { salonLocation: values.location });

            // const categoryOptions = facetlist.facets.items
            //   .filter(getCategory)[0]
            //   .values.map((value) => ({
            //     name: value.name,
            //     id: value.id,
            //   }));
            // console.log("yo", categoryOptions);

            // categoryOptions.map((value) =>
            //   createCollection(
            //     {
            //       input: {
            //         translations: [
            //           {
            //             languageCode: LanguageCode.En,
            //             name: value.name,
            //             slug: value.name,
            //             description: "",
            //           },
            //         ],
            //         filters: [
            //           {
            //             code: "facet-value-filter",
            //             arguments: [
            //               {
            //                 name: "facetValueIds",
            //                 value: `["${value.id}"]`,
            //               },
            //               {
            //                 name: "containsAny",
            //                 value: "true",
            //               },
            //             ],
            //           },
            //         ],
            //       },
            //     },
            //     memo
            //   )
            // );
            router.push("/");
          }}
        >
          {({ isSubmitting }) => (
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
                isLoading={isSubmitting}
              >
                Finish
              </Button>
            </Form>
          )}
        </Formik>
        <Image src="/static/login2.png" />
      </Flex>
    </Wrapper>
  );
};

export default withUrqlClient(createUrqlClient)(RegisterLoc);
