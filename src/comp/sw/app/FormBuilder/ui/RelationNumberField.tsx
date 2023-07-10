import { CSS, Container } from "@nextui-org/react";
import { Fields, RelationNumberProps } from "../types";
import GridField from "./GridField";
import { useFormContext, useWatch } from "react-hook-form";

/**
 * Renders a component that displays a list of related numbers as a grid.
 *
 * @param {RelationNumberProps & { name: string }} props - The props object that contains the name and relatedField.
 * @return {JSX.Element} A React component that displays related numbers as a grid.
 */
export default function RelationNumberField(props: RelationNumberProps & { name: string }) {
  const { name, relatedField } = props;

  const { control } = useFormContext()

  const related = useWatch({
    control: control,
    name: relatedField 
  })

  const properties: Fields = Array.isArray(related) ? related.reduce((a: any, v: string) => ({...a, [v]: {type: "number", label: v}}), {}) : {}

  const CheckboxContainerStyling: CSS = {
    p: 0,
    w: "100%",
  };
  return (
    <Container css={CheckboxContainerStyling}>
        <GridField type="grid" properties={properties} columnWidth={2} name={name} gap="$10" />
    </Container>
  );
}
