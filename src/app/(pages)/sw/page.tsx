"use client";

import Layout from "@/comp/sw/ui/Layout";
import ThreeRowCard from "@/comp/sw/ui/cards/ThreeRowCard";
import TwoRowCard from "@/comp/sw/ui/cards/TwoRowCard";
import { faker } from "@faker-js/faker";
import { Grid, Loading, Spacer, Text } from "@nextui-org/react";
import React from "react";
import dynamic from "next/dynamic";
import ContainerCard from "@/comp/sw/ui/cards/ContainerCard";
import Link from "next/link";
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
        <Grid xs={12} css={{ h: "120px" }}>
          <div
            style={{
              textAlign: "end",
            }}
          >
            <Text h2 role="banner">
              Welcome {faker.person.firstName()},
            </Text>
            <Text h3 role="banner">
              it&apos;s{" "}
              {new Date().toLocaleString("en-IE", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </Text>
          </div>
        </Grid>
        <Grid xs={12} css={{ h: "calc(100% - 140px)" }}>
          <Grid.Container gap={1}>
            <Grid xs={9}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <Grid.Container css={{ h: "100%", display: "block" }}>
                  <Grid xs={12}>
                    <div style={{ width: "100%" }}>
                      <Text weight="light">Monthly Hours Statistics</Text>
                      <Grid.Container gap={2} justify="space-between">
                        <Grid>
                          <TwoRowCard heading={300} description="Mechanic" />
                        </Grid>
                        <Grid>
                          <TwoRowCard heading={300} description="Electrician" />
                        </Grid>
                        <Grid>
                          <TwoRowCard
                            heading={300}
                            description="White collar"
                          />
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                  <Spacer y={1} />
                  <Grid xs={12}>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <Grid.Container
                        justify="space-between"
                        alignItems="flex-end"
                      >
                        <Grid>
                          <Text weight="light">Map Charts</Text>
                        </Grid>
                        <Grid>
                          <Text
                            css={{
                              m: "0 20px -10px 0",
                            }}
                            size="$sm"
                            weight="light"
                          >
                            <Link href="/sb/projects">See all</Link>
                          </Text>
                        </Grid>
                      </Grid.Container>
                      <Grid.Container
                        gap={2}
                        justify="space-between"
                        css={{
                          height: 498.4,
                        }}
                      >
                        <Grid xs={12}>
                          <ContainerCard>
                            <Map
                              marker={[
                                ...faker.helpers.multiple(
                                  () => ({
                                    id: createRandomProjects().id,
                                    name: createRandomProjects().name,
                                    company:
                                      createRandomProjects().company.name,
                                    type: createRandomProjects().type,
                                    address:
                                      createRandomProjects().address
                                        .coordinates,
                                  }),
                                  {
                                    count: 12,
                                  }
                                ),
                              ]}
                            />
                          </ContainerCard>
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                </Grid.Container>
              </div>
            </Grid>
            <Grid xs={3}>
              <div
                style={{
                  width: "100%",
                }}
              >
                <Grid.Container>
                  <Grid xs={12}>
                    <div style={{ width: "100%" }}>
                      <Text weight="light">New Project</Text>
                      <Grid.Container gap={2} justify="space-between">
                        <Grid>
                          <ThreeRowCard
                            heading="GVX21 | Jones Eng"
                            description="Dublin | Freddy"
                            subdescription="@July 2023"
                          />
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                  <Spacer y={1} />
                  <Grid xs={12}>
                    <div style={{ width: "100%" }}>
                      <Text weight="light">Project Status</Text>
                      <Grid.Container gap={2} justify="space-between">
                        <Grid>
                          <TwoRowCard
                            heading={26}
                            description="Battery Factory"
                          />
                        </Grid>
                        <Grid>
                          <TwoRowCard heading={32} description="Data Centre" />
                        </Grid>
                        <Grid>
                          <TwoRowCard heading={6} description="Factory" />
                        </Grid>
                        <Grid>
                          <TwoRowCard heading={2} description="Substation" />
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                </Grid.Container>
              </div>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Layout>
  );
}
