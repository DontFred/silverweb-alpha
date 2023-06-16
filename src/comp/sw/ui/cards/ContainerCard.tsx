"use client";

import { Card } from "@nextui-org/react";
import { ReactNode } from "react";

export default function ContainerCard({children, noBorder, noPadding, overflowHidden}: {children?: ReactNode, noBorder?: boolean, noPadding?: boolean, overflowHidden?: boolean}){
  return (
    <Card
    {...!noBorder && {variant: "bordered"} }
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
