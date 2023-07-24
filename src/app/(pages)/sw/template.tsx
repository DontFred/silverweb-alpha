"use client";
import { Container } from "@nextui-org/react";
import { Fragment, ReactNode } from "react";

export const metadata = {
  title: "SilverWeb Alpha",
  description: "A SilverBack Product ",
};

export default function template({
  children,
}: {
  children: ReactNode[] | ReactNode;
}) {
  return (
    <Fragment>
      <Container
        xl
      >
        <div style={{ width: "100%", position: "relative", height: "100vh" }}>{children}</div>
      </Container>
    </Fragment>
  );
}
