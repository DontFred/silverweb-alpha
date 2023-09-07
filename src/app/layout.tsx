import "./(styles)/globals.css";
import Providers from "@/lib/providers";
import localFont from "next/font/local";
import { Metadata } from "next";

const graphik = localFont({
  src: [
    {
      path: "../../public/font/graphik-light-webfont.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../public/font/graphik-lightitalic-webfont.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../public/font/graphik-medium-webfont.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../public/font/graphik-regular-webfont.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/font/graphik-regularitalic-webfont.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../public/font/graphik-semibold-webfont.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--graphik-webfont",
  display: "fallback",
});

export const metadata: Metadata = {
  title: {
    template: "%s | SilverBack",
    default:
      "SilverBack Group - Making the Future Easy, Green, and Productive.",
  },
  description:
    "Build a better future with the SilverBack Group - a global construction and contracting company committed to sustainability and innovation. Contact us today to start building a greener future.",
  authors: { name: "SilverBack Group" },
  creator: "Frederik W. Grimm for SilverBack",
  openGraph: {
    type: "website",
    siteName: "SilverBack Group",
    url: process.env.NEXT_PUBLIC_HOST_DOMAIN,
    images: {
      url: "/opengraph/opengraph-image.png",
    },
  },
  icons: {
    icon: [
      {
        url: "/icon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        url: "/icon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/icon/favicon.ico",
        type: "image/x-icon",
      },
    ],
    other: [
      {
        rel: "apple-touch-icon",
        url: "/icon/apple-touch-icon.png",
        sizes: "180x180",
      },
      {
        rel: "mask-icon",
        url: "/icon/safari-pinned-tab.svg",
      },
      {
        rel: "shortcut icon",
        url: "/icon/favicon.ico"
      }
    ],
  },
  manifest: "/icon/site.webmanifest",
  other: {
    "apple-mobile-web-app-title": "SilverBack Group",
    "application-name": "SilverBack Group",
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/icon/browserconfig.xml",
    "theme-color": "dark",
  },
};


export default async function RootLayout({
  children,
  modal
}: {
  children: React.ReactNode;
  modal: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={graphik.className}>
        <Providers>{children}{modal}</Providers>
      </body>
    </html>
  );
}
