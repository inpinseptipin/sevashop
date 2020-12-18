import React from 'react';

import { Flex } from '@chakra-ui/react';

interface WrapperProps {
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "small",
}) => {
  return (
    <Flex
      // mt={8}
      // mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      // h="100%"
      backgroundColor="background.50"
    >
      {children}
    </Flex>
  );
};
