"use client";

import { Card, Text } from "@nextui-org/react";
import { ReactNode } from "react";

/**
 * Renders a three-row card component with the given heading, description,
 * subdescription, and width.
 *
 * @param {ReactNode|string|number} heading - The heading of the card.
 * @param {ReactNode|string|number} description - The main description of the card.
 * @param {ReactNode|string|number} subdescription - The subdescription of the card.
 * @param {() => void} [onPress] - The function to execute on press.
 * @param {number|string} [width] - The optional width of the card.
 * @return {JSX.Element} The rendered card component.
 */
export default function ThreeRowCard({
  heading,
  description,
  subdescription,
  width,
  onPress
}: {
  heading: ReactNode | string | number;
  description: ReactNode | string | number;
  subdescription: ReactNode | string | number;
  width?: number | string;
  onPress?: () => void;
}) {
  return (
    <Card
      variant="bordered"
      isHoverable
      css={{ ...(!width ? { minWidth: 267 } : { width: width }) }}
      {...onPress && {
        isPressable: true,
        onPress: onPress,
      }}
    >
      <Card.Body css={{ p: 15 }}>
        <Text h6 role="heading" css={{ mb: 0 }}>
          {heading}
        </Text>
        <Text h6 weight={"normal"} css={{ mb: 0 }}>
          {description}
        </Text>
        <Text h6 weight={"normal"} css={{ mb: 0 }} role="description">
          {subdescription}
        </Text>
      </Card.Body>
    </Card>
  );
}
