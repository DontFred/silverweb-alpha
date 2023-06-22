import { Fragment } from "react";
import { DescriptionProps } from "../types";
import { Container } from "@nextui-org/react";

/**
 * Renders a description field with the given content.
 *
 * @param {DescriptionProps} props - The props object containing the content to be rendered.
 * @returns {JSX.Element} A React Fragment containing the DescriptionField component.
 */
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
