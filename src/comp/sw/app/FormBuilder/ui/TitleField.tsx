import { Fragment } from "react";
import { TitleProps } from "../types";
import { Text } from "@nextui-org/react";

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
