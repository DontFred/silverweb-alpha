"use client";

import Head from "next/head";
import { CssBaseline, NextUIProvider, createTheme } from "@nextui-org/react";
import { Fragment } from "react";
import { ThemeProvider } from "next-themes";
import { TrpcProvider } from "./trpc/trpcProvider";

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
            <Head>
              {CssBaseline.flush()}

              <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/icon/apple-touch-icon.png"
              />
              <link
                rel="icon"
                type="image/x-icon"
                href="/icon/favicon.ico"
              ></link>
              <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/icon/favicon-32x32.png"
              />
              <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/icon/favicon-16x16.png"
              />
              <link rel="manifest" href="/icon/site.webmanifest" />
              <link
                rel="mask-icon"
                href="/icon/safari-pinned-tab.svg"
                color="#000000"
              />
              <meta name="apple-mobile-web-app-title" content="SilverBack" />
              <meta name="application-name" content="SilverBack" />
              <meta name="msapplication-TileColor" content="#000000" />
              <meta
                name="msapplication-config"
                content="/icon/browserconfig.xml"
              />
              <meta name="theme-color" content="dark" />
            </Head>
            <NextUIProvider>{children}</NextUIProvider>
          </ThemeProvider>
        </TrpcProvider>
    </Fragment>
  );
}
