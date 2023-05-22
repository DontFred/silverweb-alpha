"use client";

import { Grid } from "@nextui-org/react";
import { Fragment } from "react";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";

import { faker } from "@faker-js/faker";
import { createRandomMessages, createRandomUser } from "@/faker";
import Copyright from "./Copyright";

export default function Layout({ children }: any) {
  return (
    <Fragment>
      <Grid.Container css={{ p: 0 }}>
        <Grid
          css={{
            p: 0,
          }}
        >
          <Copyright />
          <UserMenu
            user={{ ...createRandomUser() }}
            messages={[
              ...faker.helpers.multiple(createRandomMessages, {
                count: 12,
              }),
            ]}
          />
          <Sidebar />
        </Grid>
        <Grid xs>{children}</Grid>
      </Grid.Container>
    </Fragment>
  );
}
