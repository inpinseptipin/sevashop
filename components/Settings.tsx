import React from 'react';

import { useRouter } from 'next/router';
import useSWR from 'swr';

import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import { QuestionIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Skeleton,
  Spacer,
  Text,
} from '@chakra-ui/react';

interface SettingsProps {}

export const Settings: React.FC<SettingsProps> = ({}) => {
  const auth = useAuth();
  const router = useRouter();
  const { data } = useSWR(
    auth.user ? ["/api/user", auth.user.uid] : null,
    fetcher
  );
  if (!data) return <Skeleton m="2" height="40px" />;
  const link = `https://sevashop.tech/${data.user.channelToken}`;
  return (
    <Flex height="100vh" p="2" direction="column">
      <HStack>
        <QuestionIcon boxSize="96px" />
        <Box>
          <Text fontWeight="bold" fontSize="lg">
            {data.user.channelToken}
          </Text>
          <Link href={link} isExternal>
            {link}
          </Link>
          <Spacer />
          <Button fontWeight="regular" size="sm">
            Edit your business details
          </Button>
        </Box>
      </HStack>
      <Button m="2">App Guide & Help</Button>
      <Button m="2">Rate us 5 star!</Button>
      <Button
        m="2"
        onClick={() => {
          auth.signout();
          router.push("/welcome");
        }}
      >
        Logout
      </Button>
    </Flex>
  );
};
