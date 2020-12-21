import React from 'react';

import {
  LogicalOperator,
  useSearchProductsQuery,
} from 'generated/graphql';

import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from '@chakra-ui/react';

import { ServiceItem } from './ServiceItem';

// interface MenProps {}

export const ServiceList = ({ gender }) => {
  // const [{ data, fetching }] = useServicesQuery();
  const [{ data: productlist, fetching }] = useSearchProductsQuery({
    variables: {
      input: {
        skip: 0,
        take: 50,
        term: "",
        facetValueIds: [],
        facetValueOperator: LogicalOperator.And,
        groupByProduct: true,
      },
    },
  });

  if (fetching) return <Text>Loading data</Text>;

  console.log(productlist);

  function getCategory(item) {
    return item.facetValue.facet.code === "category";
  }
  function getFacetProducts(facetValueId, item) {
    return item.facetValueIds.includes(facetValueId);
  }
  return (
    <Accordion defaultIndex={[0]} allowMultiple m="2">
      {productlist.search.facetValues
        .filter(getCategory)
        .map(({ facetValue }) => (
          <AccordionItem
            key={facetValue.name}
            m="2"
            backgroundColor="white"
            borderRadius="10px"
          >
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {facetValue.name}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {productlist.search.items
                .filter(getFacetProducts.bind(this, facetValue.id))
                .map((service) => (
                  <ServiceItem
                    service={service}
                    key={service.productId}
                  ></ServiceItem>
                ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
};
