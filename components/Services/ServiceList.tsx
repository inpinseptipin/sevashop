import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { useServicesQuery } from "generated/graphql";
import React from "react";
import { ServiceItem } from "./ServiceItem";

// interface MenProps {}

export const ServiceList = ({ gender }) => {
  const [{ data, fetching }] = useServicesQuery();
  if (fetching) {
    return <Skeleton m="2" height="40px" />;
  }
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
          id={collection.id}
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
            {collection.productVariants.items
              // .filter(checkGender)
              .map((service) => (
                <ServiceItem service={service}></ServiceItem>
              ))}
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
