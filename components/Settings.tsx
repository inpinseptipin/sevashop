import React from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SalonIcon } from "./Icons";
import { QuestionIcon } from "@chakra-ui/icons";
interface SettingsProps {
  user: any;
}

export const Settings: React.FC<SettingsProps> = ({ user }) => {
  // console.log("here is the received user", user);
  return (
    // <Flex width="100%" direction="column">
    <Flex height="100vh" p="2" direction="column">
      <HStack>
        <QuestionIcon boxSize="96px" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {user.salonName}
          </Text>
          <Spacer />
          <Button fontWeight="regular" size="sm">
            Edit your business details
          </Button>
        </Box>
      </HStack>
      {/* <Spacer /> */}
      <Button m="2">App Guide & Help</Button>
      <Button m="2">Rate us 5 star!</Button>
      <Button m="2">Logout!</Button>
      {/* </Flex> */}
    </Flex>
  );
};
