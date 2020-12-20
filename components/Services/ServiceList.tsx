import React from 'react';

import { useServicesQuery } from 'generated/graphql';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Skeleton,
} from '@chakra-ui/react';

import { ServiceItem } from './ServiceItem';

// interface MenProps {}

export const ServiceList = ({ gender }) => {
  // const [{ data, fetching }] = useServicesQuery({
  //   context: {
  //     fetchOptions: {
  //       headers: {
  //         "vendure-token": "wdb0yw5brs4bl35wto1i",
  //       },
  //     },
  //   },
  // });
  const [{ data, fetching }] = useServicesQuery();
  if (fetching) {
    return <Skeleton m="2" height="40px" />;
  }
  console.log("data is", data);
  return "Loading";
  // if (!services) return "...Loading";
  function checkGender(item) {
    return (
      item.facetValues[0].name === gender || item.facetValues[1].name === gender
    );
  }
  // console.log(services);
  return (
    <Accordion defaultIndex={[0]} allowMultiple m="2">
      {data.collections.items.map((collection) => (
        <AccordionItem
          key={collection.id}
          m="2"
          backgroundColor="white"
          borderRadius="10px"
        >
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {collection.name}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel pb={4}>
            {collection.productVariants.items.map((service) => (
              <ServiceItem service={service} key={service.id}></ServiceItem>
            ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
