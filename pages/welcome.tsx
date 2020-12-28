import 'swiper/swiper-bundle.css';

import React from 'react';

import { useRouter } from 'next/router';
import SwiperCore, {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
} from 'swiper';
import {
  Swiper,
  SwiperSlide,
} from 'swiper/react';

import { useAuth } from '@/lib/auth';
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
} from '@chakra-ui/react';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Welcome: React.FC<{}> = ({}) => {
  const router = useRouter();
  const auth = useAuth();
  return (
    <Flex align="center" direction="column">
      <style global jsx>{`
        html,
        body {
          position: relative;
          height: 100%;
        }
        body {
          background: #fff;
          font-family: Helvetica Neue, Helvetica, Arial, sans-serif;
          font-size: 14px;
          color: #000;
          margin: 0;
          padding: 0;
        }
        .swiper-container {
          width: 100%;
          height: 60vh;
          margin: auto;
        }
        .swiper-slide {
          text-align: center;
          font-size: 18px;
          background: #fff;
          flex-direction: column;
          // height: 100vh;

          /* Center slide text vertically */
          display: -webkit-box;
          display: -ms-flexbox;
          display: -webkit-flex;
          display: flex;
          -webkit-box-pack: center;
          -ms-flex-pack: center;
          -webkit-justify-content: center;
          justify-content: center;
          -webkit-box-align: center;
          -ms-flex-align: center;
          -webkit-align-items: center;
          align-items: center;
        }
      `}</style>
      {/*
      // @ts-ignore */}
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        // scrollbar={{ draggable: true }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <Image src="/static/intro1.png" w="210px" />
          <Heading>About SevaShop</Heading>
          <Text fontSize="sm" align="center">
            One stop solution for your service. Market, manage and maximize your
            business.
          </Text>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/static/intro2.png" w="200px" />
          <Heading>Your Own Website in 15 secs</Heading>
          <Text fontSize="sm">
            Create an onine presence for your service. Interact with your
            visitors and convert them into your valuable customers.
          </Text>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/static/intro3.png" w="200px" />
          <Heading>Take bookings Online</Heading>
          <Text fontSize="sm">
            Eliminate back and forth call. Flawless scheduling and easily manage
            bookings for your services.
          </Text>
        </SwiperSlide>
        <SwiperSlide>
          <Image src="/static/intro4.png" w="200px" />
          <Heading>Marketing Suit</Heading>
          <Text fontSize="sm">
            Get readymade personalised social media posts and stories, which can
            be easily shared anywhere with just a click of a button!
          </Text>
        </SwiperSlide>
      </Swiper>
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
        m="8"
      >
        Get Started!
      </Button>
    </Flex>
  );
};

export default Welcome;
