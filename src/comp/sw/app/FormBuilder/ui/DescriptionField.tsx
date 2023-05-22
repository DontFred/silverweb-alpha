import { Fragment } from "react";
import { DescriptionProps } from "../types";
import { Text } from "@nextui-org/react";

export default function DescriptionField(props: DescriptionProps) {
  const { content } = props;
  return (
    <Fragment>
      <Text css={{ w: "100%", textAlign: "justify", mb: 20 }}>{content}</Text>
    </Fragment>
  );
}
