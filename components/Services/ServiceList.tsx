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
  Text,
} from '@chakra-ui/react';

import { ServiceItem } from './ServiceItem';

// interface MenProps {}

export const ServiceList = ({ gender }) => {
  const [{ data, fetching }] = useServicesQuery();
  if (fetching) {
    return <Skeleton m="2" height="40px" />;
  }
  function checkGender(item) {
    return (
      item.facetValues[0].name === gender || item.facetValues[1].name === gender
    );
  }
  if (!data) return <Text>No data!</Text>;
  console.log(data);
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
