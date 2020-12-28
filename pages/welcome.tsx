import React from 'react';

import { useRouter } from 'next/router';

import { useAuth } from '@/lib/auth';
import {
  Button,
  Flex,
  Heading,
  Image,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

const Welcome: React.FC<{}> = ({}) => {
  const router = useRouter();
  const auth = useAuth();
  return (
    <Flex
      height="100vh"
      p="4"
      direction="column"
      maxW={["100vw", "75vw", "50vw", "25vw"]}
      mx="auto"
      justify="center"
      align="center"
    >
      <Tabs variant="soft-rounded" colorScheme="primary" align="center">
        <TabPanels align="center">
          <TabPanel>
            <Image src="/static/intro1.png" w="210px" />
            <Heading>About SevaShop</Heading>
            <Text fontSize="sm">
              One stop solution for your service. Market, manage and maximize
              your business.
            </Text>
          </TabPanel>
          <TabPanel>
            <Image src="/static/intro2.png" w="200px" />
            <Heading>Your Own Website in 15 secs</Heading>
            <Text fontSize="sm">
              Create an onine presence for your service. Interact with your
              visitors and convert them into your valuable customers.
            </Text>
          </TabPanel>
          <TabPanel>
            <Image src="/static/intro3.png" w="200px" />
            <Heading>Take bookings Online</Heading>
            <Text fontSize="sm">
              Eliminate back and forth call. Flawless scheduling and easily
              manage bookings for your services.
            </Text>
          </TabPanel>
          <TabPanel>
            <Image src="/static/intro4.png" w="200px" />
            <Heading>Marketing Suit</Heading>
            <Text fontSize="sm">
              Get readymade personalised social media posts and stories, which
              can be easily shared anywhere with just a click of a button!
            </Text>
          </TabPanel>
        </TabPanels>
        <TabList>
          <Tab>One</Tab>
          <Tab>Two</Tab>
          <Tab>Three</Tab>
          <Tab>Four</Tab>
        </TabList>
      </Tabs>
      <Button
        size="lg"
        backgroundColor="primary.300"
        color="white"
        onClick={() => {
          if (!auth.user) {
            router.push("/login");
          } else {
            router.push("/");
          }
        }}
        // bottom="0"
        // position="fixed"
        m="8"
      >
        Get Started!
      </Button>
    </Flex>
    //</Wrapper>
  );
};

export default Welcome;
