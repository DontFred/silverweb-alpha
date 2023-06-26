"use client";
import AppIcons from "@/comp/sw/app/Home/AppIcons";
import Layout from "@/comp/sw/ui/Layout";
import { Grid, Text } from "@nextui-org/react";
import { FileSpreadsheet } from "lucide-react";
import React from "react";

export default function HomeScreenContent() {
  return (
    <Layout compact>
      <Grid.Container gap={0} css={{ p: 30, height: "100%" }}>
        <Grid xs={12} css={{ h: "60px" }}>
          <div
            style={{
              textAlign: "end",
            }}
          >
            <Text h2 role="banner">
              SilverSuite
            </Text>
          </div>
        </Grid>
        <Grid xs={12} css={{ h: "calc(100% - 80px)" }}>
          <Grid.Container gap={5}>
            <Grid>
              <AppIcons icon={<FileSpreadsheet size={30}/>} name={"Order"} link="/sw/apps/order"/>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Layout>
  );
}
