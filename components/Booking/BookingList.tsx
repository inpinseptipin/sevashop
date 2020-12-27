import React from 'react';

import {
  SortOrder,
  useGetOrderListQuery,
} from 'generated/graphql';

import {
  Skeleton,
  VStack,
} from '@chakra-ui/react';

import { BookingItem } from './BookingItem';

export const BookingList: React.FC = ({}) => {
  const [{ data: bookingList, fetching }] = useGetOrderListQuery({
    variables: {
      options: {
        skip: 0,
        take: 10,
        filter: {
          active: {
            eq: true,
          },
          code: {
            contains: "",
          },
        },
        sort: {
          updatedAt: SortOrder.Desc,
        },
      },
    },
  });
  if (fetching) return <Skeleton m="2" height="40px" />;
  return (
    <VStack align="left">
      {bookingList?.orders.items.map((order) => (
        <BookingItem order={order}></BookingItem>
      ))}
    </VStack>
  );
};
