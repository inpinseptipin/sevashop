import {
  ChevronDownIcon,
  DeleteIcon,
  EditIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { GoBackIcon, SampleServiceIcon } from "../Icons";

import useSWR from "swr";
import { ServiceList } from "./ServiceList";
import { useAuth } from "@/lib/auth";
import { useLoginMutation, useServicesQuery } from "generated/graphql";
import { useRouter } from "next/router";

interface ServicesProps {}

export const Services: React.FC<ServicesProps> = ({}) => {
  const router = useRouter();
  return (
    <Flex direction="column">
      <Flex
        zIndex={1}
        boxShadow="lg"
        p="4"
        align="center"
        position="sticky"
        top={0}
        backgroundColor="white"
      >
        <GoBackIcon boxSize="32px" />
        <Heading ml="4">My Services</Heading>
      </Flex>
      <Flex direction="column" backgroundColor="background.50">
        <Flex m="2" backgroundColor="white" borderRadius="10px">
          <InputGroup>
            <InputLeftElement
              zIndex={0}
              pointerEvents="none"
              children={<SearchIcon color="gray.300" />}
            />
            <Input type="phone" placeholder="Phone number" />
          </InputGroup>
        </Flex>

        <ServiceList gender="Male" />
      </Flex>
      <Flex>
        <Button>View Shop As Customer</Button>
        <Button
          onClick={() => {
            router.push("/service/add");
          }}
        >
          Add Service
        </Button>
      </Flex>
    </Flex>
  );
};
