import { CSS, Container } from "@nextui-org/react";
import { renderFields } from "../Form";
import { GirdProps } from "../types";

/**
 * Renders a grid field based on the given properties.
 *
 * @param {GirdProps & { name: string }} props - An object containing properties
 * such as name, properties, columnWidth, gap, and justify.
 * @return {JSX.Element} A React component representing a grid field.
 */
export default function GridField(props: GirdProps & { name: string }) {
  const { name, properties, columnWidth, gap, justify } = props;

  const CheckboxContainerStyling: CSS = {
    p: 0,
    w: "100%",
    display: "grid",
    gridTemplateColumns: "1fr ".repeat(columnWidth || 0),
    gap: gap || "$5",
    ...justify && {justifyContent: "center"}
  };
  return (
    <Container css={CheckboxContainerStyling}>
      {Object.entries(properties).map(([fieldName, field], idx) => {
        return renderFields([`${name}.${fieldName}`, field], idx);
      })}
    </Container>
  );
}
