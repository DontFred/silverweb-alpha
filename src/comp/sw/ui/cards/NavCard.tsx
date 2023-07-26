"use client";

import { Card, Grid, Text, Tooltip } from "@nextui-org/react";
import Link from "next/link";
import { ReactNode } from "react";

/**
 * Renders a navigational card component with an icon, name, and link.
 *
 * @param {ReactNode} icon - The icon component to display on the card.
 * @param {string} name - The name of the navigational link.
 * @param {string} link - The URL to navigate to.
 * @param {boolean} [disabled] - Whether or not the card is disabled.
 * @return {JSX.Element} The rendered navigational card component.
 */
export default function NavCard({
  icon,
  name,
  link,
  compact,
  disabled,
}: {
  icon: ReactNode;
  name: string;
  link: string;
  compact?: boolean;
  disabled?: boolean;
}) {
  return (
    <div style={{
      ...disabled && {
        userSelect: "none",
        cursor: "not-allowed",
        zIndex: -1,
        opacity: 0.7
      }
    }}>
      <Link
        passHref
        aria-disabled={disabled && "true"}
        href={disabled ? "#" : link}
        style={{
          ...(disabled && {
            filter:
              "brightness(0) saturate(100%) invert(68%) sepia(7%) saturate(241%) hue-rotate(165deg) brightness(93%) contrast(90%)",
            cursor: "not-allowed",
          }),
        }}
      >
        <Tooltip content={<Text color="$accents1" weight={"bold"} size={"$sm"}>{name}</Text>} css={{
          p: "1px 12px",
          ...disabled && {
            opacity: "0.5 !important",
          }
        }} rounded color={"invert"} placement="right" isDisabled={!compact}>
        <Card variant="bordered" css={{ bg: "transparent" }}>
          <Card.Body css={{ p: 10 }}>
            <Grid.Container gap={compact ? 0 : 1} justify={compact ? "center" :"flex-start"}>
              <Grid>{icon}</Grid>
              {!compact && (
                <Grid>
                  <Text h6 css={{ m: 0 }}>
                    {name}
                  </Text>
                </Grid>
              )}
            </Grid.Container>
          </Card.Body>
        </Card>
        </Tooltip>
      </Link>
    </div>
    );
}
