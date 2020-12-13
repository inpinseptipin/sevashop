import { Box, Flex, Spacer, Text } from "@chakra-ui/react";
import React from "react";

interface BookingItemProps {}

export const BookingItem: React.FC<BookingItemProps> = ({}) => {
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
      >
        <Text>12:00</Text>
        <Text fontSize="sm">90 mins</Text>
      </Flex>
      {/* <Spacer /> */}
      <Flex p="2" width="100%">
        <Box>
          <Text>Rohan Rajpal</Text>
          <Text fontSize="sm">Haircut + 2 services | Deepal C.</Text>
        </Box>
        <Spacer />
        <Box>
          <Text as="b">₹500</Text>
          <Text fontSize="sm">paytm</Text>
        </Box>
      </Flex>
    </Flex>
  );
};
