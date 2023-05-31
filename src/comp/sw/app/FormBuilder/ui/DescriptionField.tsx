import { Fragment } from "react";
import { DescriptionProps } from "../types";
import { Container } from "@nextui-org/react";

export default function DescriptionField(props: DescriptionProps) {
  const { content } = props;
  return (
    <Fragment>
      <Container
        css={{
          w: "100%",
          textAlign: "justify",
          mb: 20,
          p: 0,
          fs: "$base",
          fontWeight: "$normal",
          letterSpacing: "$tighter",
          fontFamily: "$sans",
          color: "$gray900",
        }}
      >
        {content}
      </Container>
    </Fragment>
  );
}
