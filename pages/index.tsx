import { Services } from "@/components/Services/Services";
import { Settings } from "@/components/Settings";
import { Share } from "@/components/Share";
import { useAuth } from "@/lib/auth";
import {
  Box,
  chakra,
  Flex,
  Skeleton,
  Spacer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useStyles,
  useTab,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";
import { Bookings } from "../components/Bookings";
import {
  BookingsIcon,
  ServicesIcon,
  SettingsIcon,
  WhatsAppIcon,
} from "../components/Icons";

// 1. Reuse the styles for the Tab
// const StyledTab = chakra("button", { themeKey: "Tabs.Tab" });
const StyledTab = chakra("button");

const CustomTab = React.forwardRef((props: any, ref) => {
  // 2. Reuse the `useTab` hook
  const tabProps = useTab(props);
  const isSelected = !!tabProps["aria-selected"];

  // 3. Hook into the Tabs `size`, `variant`, props
  const styles = useStyles();

  const childrenWithProps = React.Children.map(tabProps.children, (child) => {
    // checking isValidElement is the safe way and avoids a typescript error too
    if (React.isValidElement(child)) {
      return React.cloneElement(child, {
        color: isSelected ? "primary.300" : "black",
      });
    }
    return child;
  });

  return (
    <StyledTab __css={styles.tab} backgroundColor="white" {...tabProps}>
      {childrenWithProps}
    </StyledTab>
  );
});

const Home: React.FC<{}> = ({}) => {
  const router = useRouter();
  const auth = useAuth();
  if (!auth.userAll) {
    return (
      <Flex direction="column" height="100vh" justify="center" p="4">
        <Skeleton m="2" height="40px" />
        <Skeleton m="2" height="40px" />
        <Spacer />
        <Skeleton m="2" height="40px" />
      </Flex>
    );
  }
  // const [user, setUser] = useState(null);
  // setUser(getUser(auth.user.id));

  // console.log(auth);
  // const user = async () => {
  //   return await getUser(auth.user.uid);
  // };
  // const user = getUser(auth.user.uid);
  // getUser(auth.user.uid).then((success, err) => {
  //   if (err) {
  //     console.error(err);
  //   }
  //   console.log("this is success", success);
  // });

  // console.log("printing from dashboard", auth.userAll);
  return (
    <Flex direction="column" backgroundColor="gray.50">
      <Tabs isFitted variant="unstyled" width="100%">
        <TabPanels>
          <TabPanel p={0}>
            <Bookings />
          </TabPanel>
          <TabPanel p={0}>
            <Services />
          </TabPanel>
          <TabPanel p={0}>
            <Share />
          </TabPanel>
          <TabPanel>
            <Settings user={auth.userAll} />
          </TabPanel>
        </TabPanels>
        <Box boxShadow="2xl" width="100%" position="fixed" bottom="0">
          <TabList>
            <CustomTab>
              <BookingsIcon boxSize="28px" />
              <Text fontSize="sm">Bookings</Text>
            </CustomTab>
            <CustomTab>
              <ServicesIcon boxSize="28px" />
              <Text fontSize="sm">Services</Text>
            </CustomTab>
            <CustomTab>
              <WhatsAppIcon boxSize="28px" />
              <Text fontSize="sm">Share</Text>
            </CustomTab>
            <CustomTab>
              <SettingsIcon boxSize="28px" />
              <Text fontSize="sm">Settings</Text>
            </CustomTab>
          </TabList>
        </Box>
      </Tabs>
    </Flex>
  );
};

export default Home;
