"use client";

import { Card, Text } from "@nextui-org/react";
import { ReactNode } from "react";

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
      css={{ ...(!width ? { minWidth: 269} : { width: width }) }}
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
