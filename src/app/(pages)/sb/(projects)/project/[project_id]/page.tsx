"use client"
import Layout from "@/comp/sw/ui/Layout";
import { Grid, Text } from "@nextui-org/react";

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
              Project | 
            </Text>
          </div>
        </Grid>
        <Grid xs={12} css={{ h: "calc(100% - 80px)" }}></Grid>
      </Grid.Container>
    </Layout>
  );
}
