"use client";

import Layout from "@/comp/sw/ui/Layout";
import {
  Badge,
  Grid,
  Loading,
  SortDescriptor,
  Switch,
  Table,
  Text,
  useAsyncList,
  useCollator,
} from "@nextui-org/react";
import React, { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import ContainerCard from "@/comp/sw/ui/cards/ContainerCard";
import { MapFriendlyProjectData } from "./page";
import { Plus, Table as TableIcon, Trash2} from "lucide-react";

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
  ssr: false,
});

export default function ProjectsContent({
  projectsData,
}: {
  projectsData: MapFriendlyProjectData;
}) {
  const [displayTable, setDisplayTable] = useState<boolean>(true);

  const collator = useCollator({ numeric: true });
  async function load({}) {
    return {
      items:
        projectsData?.map((project) => ({
          id: project.id,
          type: project.type,
          code: project.name,
          company: project.company,
          location: project.address.locstring,
        })) || [],
    };
  }
  async function sort({
    items,
    sortDescriptor,
  }: {
    items: Array<{
      id: string;
      type: string;
      code: string;
      company: string;
      location: string;
    }>;
    sortDescriptor: SortDescriptor;
  }) {
    return {
      items: items.sort((a, b) => {
        let first = a[sortDescriptor.column as keyof typeof a] as string;
        let second = b[sortDescriptor.column as keyof typeof b] as string;
        let cmp = collator.compare(first, second);
        if (sortDescriptor.direction === "descending") {
          cmp *= -1;
        }
        return cmp;
      }),
    };
  }

  const list = useAsyncList({ load, sort });
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
        <Grid xs={12} css={{ h: "calc(100vh - 140px)" }}>
          <ContainerCard overflowHidden>
            <div
              style={{
                zIndex: 1000,
                position: "absolute",
                right: 20,
                top: 20,
              }}
            >
              <Switch
                checked={displayTable}
                onChange={() => setDisplayTable(!displayTable)}
                color={"secondary"}
                icon={<TableIcon />}
                css={{
                  p: 0,
                  bs: "0 0 12px 2px black",
                  br: "$pill",
                }}
              />
            </div>
            {displayTable ? (
              <Fragment>
                <Grid.Container
                  gap={1}
                  css={{
                    px: 28,
                  }}
                >
                  <Grid>
                    <Badge color={"secondary"} disableOutline size={"sm"} isSquared css={{
                      fontWeight: "$medium"
                    }}>
                      Project in <strong>Sweden</strong>   
                      <div 
                        style={{
                          transition: "var(--nextui-transitions-default)",
                          alignItems: "center",
                          display: "flex",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e)=> {
                          e.currentTarget.style.color = "var(--nextui-colors-accents7)";
                        }}
                        onMouseLeave={(e)=> {
                          e.currentTarget.style.color = "white";
                        }}
                      >
                        <Trash2 size={14} strokeWidth={2.5}  />
                      </div>
                    </Badge>
                  </Grid>
                  <Grid>
                    <Badge color={'secondary'} disableOutline size={"sm"} isSquared>
                      <Plus size={14} strokeWidth={2.5} />
                    </Badge>
                  </Grid>
                </Grid.Container>
                <div
                  style={{
                    position: "absolute",
                    width: "calc(100% - 87px)",
                    left: 43.5,
                    right: 43.5,
                    background: "var(--nextui-colors-accents1)",
                    height: 1.5,
                  }}
                />
                <Table
                  headerLined
                  sticked
                  aria-label="Project Table"
                  color="secondary"
                  sortDescriptor={list.sortDescriptor}
                  onSortChange={list.sort}
                  containerCss={{
                    height: "100%"
                  }}
                  css={{
                    pt: 0,
                    height: "100%"
                  }}
                >
                  <Table.Header>
                    <Table.Column
                      css={{
                        p: "10px 10px 10px 26px !important",
                      }}
                      key="code"
                      allowsSorting
                    >
                      Project code
                    </Table.Column>
                    <Table.Column
                      css={{
                        p: 10,
                      }}
                      key="type"
                      allowsSorting
                    >
                      Project type
                    </Table.Column>
                    <Table.Column
                      css={{
                        p: 10,
                      }}
                      key="company"
                      allowsSorting
                    >
                      Company
                    </Table.Column>
                    <Table.Column
                      css={{
                        p: 10,
                      }}
                      key="location"
                      allowsSorting
                    >
                      Location
                    </Table.Column>
                  </Table.Header>
                  <Table.Body items={list.items}>
                    {(item) => (
                      <Table.Row key={item.code}>
                        <Table.Cell>
                          <Text><a href={"/sb/project/" + item.id}>{item.code}</a></Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text>{item.type}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text>{item.company}</Text>
                        </Table.Cell>
                        <Table.Cell>
                          <Text>{item.location}</Text>
                        </Table.Cell>
                      </Table.Row>
                    )}
                  </Table.Body>
                </Table>
              </Fragment>
            ) : (
              <Fragment>
                <Map marker={projectsData} />
              </Fragment>
            )}
          </ContainerCard>
        </Grid>
      </Grid.Container>
    </Layout>
  );
}
