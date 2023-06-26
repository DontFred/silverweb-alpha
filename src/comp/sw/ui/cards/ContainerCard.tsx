"use client";

import { Card } from "@nextui-org/react";
import { ReactNode } from "react";

/**
 * Renders a container card with optional styling props.
 *
 * @param {ReactNode} children - the content to render inside the card.
 * @param {boolean} noBorder - whether or not to render the card with a border.
 * @param {boolean} noPadding - whether or not to add padding to the card.
 * @param {boolean} overflowHidden - whether or not to hide overflow on the card.
 * @param {boolean} noBackground - whether or not to render the card without a background.
 * @return {JSX.Element} the rendered container card.
 */
export default function ContainerCard({children, noBorder, noPadding, overflowHidden, noBackground}: {children?: ReactNode, noBorder?: boolean, noPadding?: boolean, overflowHidden?: boolean, noBackground?: boolean}) {
  return (
    <Card
    {...!noBorder && {variant: "bordered"} }
    css={{...noBackground && {bg: "transparent"}}}
    >
      <Card.Body css={{p: noPadding ? 0 : 15.5}}>
        <div
            style={{
                width: "100%",
                height: "100%",
                ...overflowHidden && {overflow: "hidden"},
                borderRadius: "var(--nextui-radii-lg)"
            }}
        >
            {children}
        </div>
      </Card.Body>
    </Card>
  );
}
