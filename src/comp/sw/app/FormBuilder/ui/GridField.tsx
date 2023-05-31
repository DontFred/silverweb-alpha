import { CSS, Container } from "@nextui-org/react";
import { renderFields } from "../Form";
import { GirdProps } from "../types";

export default function GridField(props: GirdProps & { name: string }) {
  const { name, properties, columnWidth, gap } = props;

  const CheckboxContainerStyling: CSS = {
    p: 0,
    w: "100%",
    display: "grid",
    gridTemplateColumns: "1fr ".repeat(columnWidth || 1),
    gap: gap || "$5",
  };
  return (
    <Container css={CheckboxContainerStyling}>
      {Object.entries(properties).map(([fieldName, field], idx) => {
        return renderFields([`${name}.${fieldName}`, field], idx);
      })}
    </Container>
  );
}
