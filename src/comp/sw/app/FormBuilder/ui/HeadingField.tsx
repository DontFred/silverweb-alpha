import { Fragment } from "react";
import { HeadingProps } from "../types";
import { Text } from "@nextui-org/react";

/**
 * Renders a heading field component with a given content.
 *
 * @param {HeadingProps} props - An object containing the content to render.
 * @return {JSX.Element} A React fragment containing a Text component with the given content.
 */
export default function HeadingField(props: HeadingProps) {
  const { content } = props;
  return (
    <Fragment>
        <Text h5 css={{ w: "100%", textAlign: "end" }}>
        {content}
      </Text>
    </Fragment>
  );
}
