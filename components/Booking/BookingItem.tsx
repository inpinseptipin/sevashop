import React from 'react';

import {
  Box,
  Flex,
  Skeleton,
  Spacer,
  Text,
} from '@chakra-ui/react';

interface BookingItemProps {
  order: any;
}

export const BookingItem: React.FC<BookingItemProps> = ({ order }) => {
  if (!order) return <Skeleton m="2" height="40px" />;
  return (
    <Flex
      width="100%"
      backgroundColor="white"
      borderRadius="5px"
      boxShadow="sm"
    >
      <Flex
        direction="column"
        p="2"
        backgroundColor="#FF6B01"
        borderRadius="5px 0 0 5px"
        color="white"
        shrink={0}
        align="center"
      >
        <Text>{order.createdAt.substr(11, 5)}</Text>
        <Text fontSize="sm">
          {order.lines[0].productVariant.facetValues[2].name} mins
        </Text>
      </Flex>
      <Flex p="2" width="100%">
        <Box>
          <Text>{order.customer ? order.customer.firstName : "Guest"}</Text>
          <Text fontSize="sm">
            {order.lines[0].productVariant.facetValues[1].name}
          </Text>
        </Box>
        <Spacer />
        <Box>
          <Text as="b">₹ {order.total / 100}</Text>
          <Text fontSize="sm">paytm</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
