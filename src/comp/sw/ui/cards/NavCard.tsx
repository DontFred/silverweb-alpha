"use client";

import { Card, Grid, Text } from "@nextui-org/react";
import Link from "next/link";
import { ReactNode } from "react";

export default function NavCard({
  icon,
  name,
  link,
  disabled,
}: {
  icon: ReactNode;
  name: string;
  link: string;
  disabled?: boolean;
}) {
  return (
    <Link
      href={link}
      style={{
        ...(disabled && {
          filter:
            "brightness(0) saturate(100%) invert(68%) sepia(7%) saturate(241%) hue-rotate(165deg) brightness(93%) contrast(90%)",
          cursor: "not-allowed"
        }),
      }}
    >
      <Card variant="bordered" css={{ bg: "transparent" }}>
        <Card.Body css={{ p: 10 }}>
          <Grid.Container gap={1}>
            <Grid>
              {icon}
            </Grid>
            <Grid>
              <Text h6 css={{ m: 0 }}>
                {name}
              </Text>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </Link>
  );
}
