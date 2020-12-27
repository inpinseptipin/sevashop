import React from 'react';

import { useRouter } from 'next/router';

import { SearchIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';

import { GoBackIcon } from '../Icons';
import { ServiceList } from './ServiceList';

interface ServicesProps {}

export const Services: React.FC<ServicesProps> = ({}) => {
  const router = useRouter();
  return (
    <Flex direction="column" minW={["100vw","75vw","50vw","25vw"]}> 
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
