"use client";

import Layout from "@/comp/sw/ui/Layout";
import { Grid, Loading, Switch, Text } from "@nextui-org/react";
import React from "react";
import dynamic from "next/dynamic";
import ContainerCard from "@/comp/sw/ui/cards/ContainerCard";
import { MapFriendlyProjectData } from "./page";

const Map = dynamic(() => import("@/comp/sw/app/Map"), {
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "var(--nextui-colors-gray100)",
      }}
    >
      <Loading
        css={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  ),
  ssr: false
});

export default function ProjectsContent({projectsData}: {projectsData: MapFriendlyProjectData}) {
  return (
    <Layout>
      <Grid.Container gap={0} css={{ p: 30, height: "100%" }}>
        <Grid xs={12} css={{ h: "60px" }}>
          <div
            style={{
              textAlign: "end",
            }}
          >
            <Text h2 role="banner">
              Project interface
            </Text>
          </div>
        </Grid>
        <Grid xs={12} css={{ h: "calc(100% - 80px)" }}>
          <ContainerCard overflowHidden>
            <div style={{
              zIndex: 1000,
              position: "absolute",
            }}>
            <Switch                                                 color={"secondary"}
                                                bordered/>
            </div>
            <Map
              marker={projectsData}
            />
          </ContainerCard>
        </Grid>
      </Grid.Container>
    </Layout>
  );
}
