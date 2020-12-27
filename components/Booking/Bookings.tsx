import React from 'react';

import {
  CalendarIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  Spacer,
  Switch,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';

import { BookingList } from './BookingList';

export const Bookings: React.FC = ({}) => {
  return (
    <Flex direction="column" minW={["100vw","75vw","50vw","25vw"]} >
      <Flex m="4" align="center">
        <Heading>My Bookings</Heading>
        <Spacer />
        <SearchIcon color="primary.300" mr="4" boxSize="24px" />
        <CalendarIcon color="primary.300" boxSize="24px" />
      </Flex>
      <Tabs variant="soft-rounded">
        <TabList
          backgroundColor="background.50"
          borderRadius="15px"
          mr="4"
          ml="4"
        >
          <Tab
            _selected={{ color: "white", bg: "primary.300" }}
            borderRadius="15px"
            width="100%"
          >
            Completed
          </Tab>
          <Spacer />
          <Tab
            _selected={{ color: "white", bg: "primary.300" }}
            borderRadius="15px"
            width="100%"
          >
            Upcoming
          </Tab>
        </TabList>
        <Flex
          backgroundColor="background.50"
          height="100vh"
          mt="4"
          // width="100%"
          direction="column"
        >
          {/* Saloon Status Starts */}
          <Flex
            boxShadow="sm"
            m="2"
            mx={4}
            p="2"
            borderRadius="15px"
            backgroundColor="white"
          >
            <Text>Salon Status</Text>
            <Spacer />
            <Switch />
          </Flex>
          {/* Saloon Status Ends */}
          <TabPanels>
            <TabPanel>
              <BookingList />
            </TabPanel>

            <TabPanel>
              <BookingList />
            </TabPanel>
          </TabPanels>
        </Flex>
      </Tabs>
    </Flex>
  );
};
