import {
  Box,
  Flex,
  Heading,
  VStack,
  Image,
  Text,
  Button,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { GoBackIcon, PrintIcon, ScanQRIcon } from "./Icons";

interface ShareProps {}

export const Share: React.FC<ShareProps> = ({}) => {
  return (
    <Flex direction="column">
      <Flex m="4" align="center">
        <GoBackIcon boxSize="32px" />
        <Heading ml="4">Promote My Salon</Heading>
      </Flex>
      <Flex direction="column" backgroundColor="gray.50" height="100vh">
        <Flex p="2" align="center">
          <Image src="/static/qrcode.png" alt="QR Code" boxSize="128px" />
          <Box ml="2">
            <Heading size="lg">Scan to book</Heading>
            <Flex align="center">
              <PrintIcon boxSize="28px" mr="2" />
              <Text>Get printout & paste the QR in your shop</Text>
            </Flex>
            <Flex align="center">
              <ScanQRIcon boxSize="28px" mr="2" />
              <Text>Ask customers to scan & place bookings</Text>
            </Flex>
          </Box>
        </Flex>
        <Button color="white" mx="4" backgroundColor="black">
          Save to device
        </Button>
        <Heading>Graphics</Heading>
        <Flex overflowX="auto">
          <Image
            flexShrink={0}
            p="2"
            src="/static/promo1.png"
            alt="Promo 1"
            borderRadius="15px"
          />
          <Image
            flexShrink={0}
            p="2"
            src="/static/promo2.png"
            alt="Promo 1"
            borderRadius="15px"
          />
        </Flex>
        <Button color="white" mx="4" mb="2" backgroundColor="#AA47D8">
          SMS Marketing
        </Button>
        <Button color="white" mx="4" mb="2" backgroundColor="#E95354">
          Share Catalogue
        </Button>
        <Button color="white" mx="4" mb="2" backgroundColor="#01C853">
          Share Store Link
        </Button>
      </Flex>
    </Flex>
  );
};
