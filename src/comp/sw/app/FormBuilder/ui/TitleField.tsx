import { Fragment } from "react";
import { TitleProps } from "../types";
import { Text } from "@nextui-org/react";

/**
 * Renders a title field component with the given content.
 *
 * @param {TitleProps} props - The props object containing the content to render.
 * @return {JSX.Element} A React Fragment containing a Text component representing the title field.
 */
export default function TitleField(props: TitleProps) {
  const { content } = props;
  return (
    <Fragment>
      <Text h2 css={{ w: "100%", textAlign: "center" }}>
        {content}
      </Text>
    </Fragment>
  );
}
