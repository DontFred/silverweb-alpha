"use client";

import Head from "next/head";
import { CssBaseline, NextUIProvider, createTheme } from "@nextui-org/react";
import { Fragment } from "react";
import { ThemeProvider } from "next-themes";
import { TrpcProvider } from "./trpcProvider";

const lightTheme = createTheme({
  type: "light",
  theme: {
    colors: {
      primary: "#aba6a2",
      secondary: "#aba6a2",
      selection: "#aba6a2",
    },
    radii: {
      md: "4px",
    },
  },
});

const darkTheme = createTheme({
  type: "dark",
  theme: {
    colors: {
      primary: "#aba6a2",
      secondary: "#aba6a2",
      selection: "#aba6a2",
    },
    radii: {
      md: "4px",
    },
  },
});

export default function Providers({ children }: any) {
  return (
    <Fragment>
      <TrpcProvider>
      <ThemeProvider
        defaultTheme="dark"
        attribute="class"
        value={{
          light: lightTheme.className,
          dark: darkTheme.className,
        }}
      >
        <Head>{CssBaseline.flush()}</Head>
        <NextUIProvider>{children}</NextUIProvider>
      </ThemeProvider>
      </TrpcProvider>
    </Fragment>
  );
}
