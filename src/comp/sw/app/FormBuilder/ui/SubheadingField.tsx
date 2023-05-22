import { Fragment } from "react";
import { SubheadingProps } from "../types";
import { Text } from "@nextui-org/react";

export default function SubheadingField(props: SubheadingProps) {
  const { content } = props;
  return (
    <Fragment>
      <Text h6 css={{ w: "100%", textAlign: "end", mt: -15, color: "$primary" }}>
        {content}
      </Text>
    </Fragment>
  );
}
