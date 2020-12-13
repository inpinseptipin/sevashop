import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fontWeights: {
    normal: 400,
    medium: 600,
    bold: 700,
  },
  styles: {
    global: {
      html: {
        scrollBehavior: "smooth",
      },
      "#__next": {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      },
    },
  },
  colors: {
    primary: {
      50: "#e3e8ff",
      100: "#b2baff",
      200: "#7f8cff",
      300: "#4d5fff",
      400: "#1d31fe",
      500: "#0518e5",
      600: "#0012b3",
      700: "#000d81",
      800: "#000750",
      900: "#000220",
    },
    background: {
      50: "#f2f2f2",
      100: "#d9d9d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#737373",
      600: "#595959",
      700: "#404040",
      800: "#262626",
      900: "#0d0d0d",
    },
  },
});

export default theme;
