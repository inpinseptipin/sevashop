import React from 'react';

import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import { QuestionIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Skeleton,
  Spacer,
  Text,
} from '@chakra-ui/react';

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const { user } = useAuth();
  const { data } = useSWR(user ? ["/api/user", user.uid] : null, fetcher);
  if (!data) return <Skeleton m="2" height="40px" />;
  return (
    <Flex height="100vh" p="2" direction="column">
      <HStack>
        <QuestionIcon boxSize="96px" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {data.user.salonName}
          </Text>
          <Spacer />
          <Button fontWeight="regular" size="sm">
            Edit your business details
          </Button>
        </Box>
      </HStack>
      <Button m="2">App Guide & Help</Button>
      <Button m="2">Rate us 5 star!</Button>
      <Button m="2">Logout!</Button>
    </Flex>
  );
};
