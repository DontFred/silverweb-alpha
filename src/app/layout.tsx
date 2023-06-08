import "./(styles)/globals.css";
import Providers from "@/lib/providers";
import localFont from "next/font/local";

const graphik = localFont({
  src: [
    {
      path: "../lib/font/graphik-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../lib/font/graphik-lightitalic-webfont.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../lib/font/graphik-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../lib/font/graphik-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../lib/font/graphik-regularitalic-webfont.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../lib/font/graphik-semibold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--graphik-webfont",
  display: "fallback",
});

export const metadata = {
  title: "SilverBack Group - Making the Future Easy, Green, and Productive.",
  description: "Build a better future with the SilverBack Group - a global construction and contracting company committed to sustainability and innovation. Contact us today to start building a greener future. ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icon/apple-touch-icon.png"
        />
        <link rel="icon" type="image/x-icon" href="/icon/favicon.ico"></link>
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
        <meta name="msapplication-config" content="/icon/browserconfig.xml" />
        <meta name="theme-color" content="dark" />
      </head>
      <body className={graphik.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
