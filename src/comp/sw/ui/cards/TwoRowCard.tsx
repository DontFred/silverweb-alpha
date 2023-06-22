"use client";

import { Card, Text } from "@nextui-org/react";
import { ReactNode } from "react";

/**
 * Renders a card component with a heading and description in two separate rows.
 *
 * @param {ReactNode | string | number} heading - The main text in the first row.
 * @param {ReactNode | string | number} description - The text in the second row.
 * @param {number | string} [width] - The width of the card. Defaults to 267px.
 * @param {() => void} [onPress] - The function to execute on press.
 * @return {JSX.Element} The resulting card component.
 */
export default function TwoRowCard({
  heading,
  description,
  width,
  onPress,
}: {
  heading: ReactNode | string | number;
  description: ReactNode | string | number;
  width?: number | string;
  onPress?: () => void;
}) {
  return (
    <Card
      variant="bordered"
      isHoverable
      {...onPress && {
        isPressable: true,
        onPress: onPress,
      }}
      css={{ ...(!width ? { minWidth: 267} : { width: width }) }}
    >
      <Card.Body css={{ p: 15.5 }}>
        <Text h3 role="heading" css={{ mb: 2 }}>
          {heading}
        </Text>
        <Text h5 weight={"normal"} css={{ mb: 0 }} role="description">
          {description}
        </Text>
      </Card.Body>
    </Card>
  );
}
