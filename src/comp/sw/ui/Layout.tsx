"use client";

import { Container, Grid, Loading } from "@nextui-org/react";
import { Fragment, ReactNode, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import UserMenu from "./UserMenu";
import { useSession } from "next-auth/react";
import Copyright from "./Copyright";
import { useRouter } from "next/navigation";

/**
 * Renders a layout component with a sidebar, user menu, and main content section.
 *
 * @param {Object} children - The main content to be rendered.
 * @param {boolean} compact - Whether the layout should be compact.
 * @return {JSX.Element} The rendered layout component.
 */
export default function Layout({
  children,
  compact,
}: {
  children: ReactNode[] | ReactNode;
  compact?: boolean;
}) {

  const router = useRouter();
  
  const [messages, setMessages] = useState<{id: string, read: boolean, user: {name: string, dept: string, avatar: string}, message: string, date: Date}[]>([]);
  useEffect(() => {});

  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated" ) {
      router.push("/auth/login-admin");
    }
  }, [status, router]);

  if(!session){
    return(
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
    )
  }

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
            compact={compact}
            user={session.user}
            messages={messages}
          />
          <Sidebar compact={compact} />
        </Grid>
        <Grid xs justify="center">
          <Container lg css={{ p: 0 }}>
            {children}
          </Container>
        </Grid>
      </Grid.Container>
    </Fragment>
  );
}
