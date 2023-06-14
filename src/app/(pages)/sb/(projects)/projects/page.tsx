"use client";

import Layout from "@/comp/sw/ui/Layout";
import { Grid, Loading, Text } from "@nextui-org/react";
import React from "react";
import dynamic from "next/dynamic";
import ContainerCard from "@/comp/sw/ui/cards/ContainerCard";
import { faker } from "@faker-js/faker";
import { createRandomProjects } from "@/faker";

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
});

export default function page() {
  return (
    <Layout>
      <Grid.Container gap={0} css={{ m: 30 }}>
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
          <ContainerCard>
            <Map
              marker={[
                ...faker.helpers.multiple(() => ({
                  id: createRandomProjects().id,
                  name: createRandomProjects().name,
                  company: createRandomProjects().company.name,
                  type: createRandomProjects().type,
                  address: createRandomProjects().address.coordinates
                  }), {
                  count: 40,
                }),
              ]}
            />
          </ContainerCard>
        </Grid>
      </Grid.Container>
    </Layout>
  );
}
