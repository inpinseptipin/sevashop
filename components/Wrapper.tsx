import { Flex } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<WrapperProps> = ({
  children,
  variant = "regular",
}) => {
  return (
    <Flex
      // mt={8}
      // mx="auto"
      maxW={variant === "regular" ? "800px" : "400px"}
      w="100%"
      // h="100%"
      backgroundColor="#F0F0F0"
    >
      {children}
    </Flex>
  );
};
