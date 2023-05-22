import { Fragment } from "react";
import { SpacerProps } from "../types";
import { Spacer } from "@nextui-org/react";

export default function SpacerField(props: SpacerProps) {
    const { half, double } = props;
  return (
    <Fragment>
        <Spacer y={half ? 0.5 : double ? 2 : 1}/>
    </Fragment>
  );
}
