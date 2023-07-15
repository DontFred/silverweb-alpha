"use client";
import { Container, Text } from "@nextui-org/react";
import React, { Fragment } from "react";

export default function ProjectCard({
  name,
  icon,
  onPress,
}: {
  name: string;
  icon: React.ReactNode;
  onPress?: (name: string) => void;
}) {
  return (
    <Fragment>
      <Container
        onClick={() => {
          onPress && onPress(name);
        }}
        css={{
          display: "grid",
          gridTemplateColumns: "25px 1fr",
          padding: "10px",
          borderRadius: "6px",
          columnGap: "10px",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid var(--nextui-colors-border)",
          background: "white",
          transition: "var(--nextui-transitions-card)",
          "@smMax": {
            gridTemplateColumns: "1fr !important",
          },
        }}
        onMouseEnter={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          (e.currentTarget.style.transform = "translateY(-2px)"),
            (e.currentTarget.style.filter = "var(--nextui-dropShadows-lg)");
        }}
        onMouseLeave={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.filter = "";
        }}
      >
        <Container
          fluid
          css={{
            alignContent: "center",
            display: "flex",
            p: 0,
            m: 0,
            "@smMax": {
              display: "none",
            },
          }}
        >
          {icon}
        </Container>
        <Text
          color="black"
          css={{
            fontSize: "1.2rem",
            fontWeight: "400",
            lineHeight: "10px",
            letterSpacing: "-1.112px",
            "@md": {
              fontSize: "1.2rem",
              lineHeight: "25px",
            },
          }}
        >
          {name}
        </Text>
        {/* <Text css={{
          display: "flex",
          gridArea: "2 / 1 / 3 / 3",
          "@smMax": {
            display: "none",
          }
        }}>Building seamless connections</Text> */}
      </Container>
    </Fragment>
  );
}
