"use client";

import { Grid } from "@nextui-org/react";
import { Fragment, ReactNode } from "react";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";

import { faker } from "@faker-js/faker";
import { createRandomMessages, createRandomUser } from "@/faker";
import Copyright from "./Copyright";

export default function Layout({ children }: {children: ReactNode[] | ReactNode}) {
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
            user={{ ...createRandomUser()}}
            messages={[
              ...faker.helpers.multiple(()=>({
                id: createRandomMessages().id,
                read: createRandomMessages().read,
                user: {
                  name: createRandomMessages().sourceUser.name,
                  dept: createRandomMessages().sourceUser.dept.name,
                  avatar: createRandomMessages().sourceUser.avatar,
                },
                message: createRandomMessages().message,
                date: createRandomMessages().date
              }), {
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
