import { Fragment } from "react";
import { SpacerProps } from "../types";
import { Spacer } from "@nextui-org/react";

/**
 * Renders a spacer field component with a specified height.
 *
 * @param {SpacerProps} props - An object containing half and double boolean values to determine the height.
 * @return {JSX.Element} A fragment containing a Spacer component with the specified height.
 */
export default function SpacerField(props: SpacerProps) {
    const { half, double } = props;
  return (
    <Fragment>
        <Spacer y={half ? 0.5 : double ? 2 : 1}/>
    </Fragment>
  );
}
