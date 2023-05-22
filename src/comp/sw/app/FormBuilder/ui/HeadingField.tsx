import { Fragment } from "react";
import { HeadingProps } from "../types";
import { Text } from "@nextui-org/react";

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
