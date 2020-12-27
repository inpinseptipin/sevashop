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

  if (fetching || !productlist) return <Text>Loading data</Text>;

  function getCategory(item) {
    return item.facetValue.facet.code === "category";
  }

  function getFacetProducts(facetValueId, item) {
    return item.facetValueIds.includes(facetValueId);
  }

  console.log(productlist);

  const facetMap = productlist.search.facetValues.reduce(
    (map, obj) => ((map[obj.facetValue.id] = obj.facetValue.name), map),
    {}
  );

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
            borderTopWidth={0}
            _last={{ borderBottomWidth: 0 }}
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
                    facetMap={facetMap}
                    key={service.productId}
                  ></ServiceItem>
                ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
};
