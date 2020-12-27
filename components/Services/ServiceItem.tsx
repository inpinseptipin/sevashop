import React from 'react';

import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Spacer,
  Text,
} from '@chakra-ui/react';

import { SampleServiceIcon } from '../Icons';

// interface ServiceItemProps {}

export const ServiceItem = ({ service, facetMap }) => {
  // console.log(service);
  function getGender(item) {
    for (var idx = 0; idx < item.length; idx++) {
      const name = item[idx].name;
      if (name === "Male" || name === "Female") {
        return name;
      }
    }
  }
  return (
    <Button
      fontWeight="regular"
      p="0"
      width="100%"
      backgroundColor="white"
      m="2"
      borderRadius="10px"
      
    >
      <SampleServiceIcon boxSize="38px" />
      <Box align="left" ml="2">
        <Text fontSize="sm" fontWeight="bold">
          {service.productName}
        </Text>
        <Text fontSize="sm">
          {facetMap[service.facetValueIds[2]]} mins / ₹{service.price.min / 100}{" "}
          / {facetMap[service.facetValueIds[1]]}
        </Text>
      </Box>
      <Spacer />
      <DeleteIcon color="primary.300" />
    </Button>
  );
};
