"use client";

import { Container, Grid } from "@nextui-org/react";
import { Fragment, ReactNode } from "react";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";

import { faker } from "@faker-js/faker";
import { createRandomMessages, createRandomUser } from "@/faker";
import Copyright from "./Copyright";

/**
 * Renders a layout component with a sidebar, user menu, and main content section.
 *
 * @param {Object} children - The main content to be rendered.
 * @return {JSX.Element} The rendered layout component.
 */
export default function Layout({ children }: {children: ReactNode[] | ReactNode}) {
  return (
    <Fragment>
      <Grid.Container css={{ p: 0 }}>
        <Grid
          css={{
            p: 0
          }}
        >
          <Copyright />
          <UserMenu
            user={{ ...createRandomUser()}}
            messages={[
              ...faker.helpers.uniqueArray(()=>({
                id: createRandomMessages().id,
                read: createRandomMessages().read,
                user: {
                  name: createRandomMessages().sourceUser.name,
                  dept: createRandomMessages().sourceUser.dept.name,
                  avatar: createRandomMessages().sourceUser.avatar,
                },
                message: createRandomMessages().message,
                date: createRandomMessages().date
              }), 12),
            ]}
          />
          <Sidebar />
        </Grid>
        <Grid xs justify="center"><Container lg css={{p: 0}}>
        {children}
          </Container></Grid>
      </Grid.Container>
    </Fragment>
  );
}
