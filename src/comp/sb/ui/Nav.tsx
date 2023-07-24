"use client";

import {  Dropdown, Navbar, Row, Text } from "@nextui-org/react";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";
import Logo from "./Logo";

export default function Nav({
  data,
  active,
}: {
  data: Array<{ title: string; href: string }>;
  active: number;
}) {
  return (
    <Fragment>
      <Row
        css={{
          position: "absolute",
        }}
      >
        <Navbar isBordered variant="floating">
          <Navbar.Toggle showIn="xs" />
          <Navbar.Brand showIn="xs">
            <div
              style={{
                position: "absolute",
                top: 10,
                right: 20,
              }}
            >
              <Logo fill={"white"} width={30} sm />
            </div>
          </Navbar.Brand>
          <Navbar.Brand hideIn="xs">
            <div
              style={{
                position: "absolute",
                top: 5,
              }}
            >
              <Logo fill={"white"} width={36} sm />
            </div>
            <div
              style={{
                marginLeft: 40,
              }}
            >
              <Text
                b
                css={{
                  letterSpacing: "-0.067em",
                  lineHeight: "14px",
                }}
              >
                SilverBack Group
                <br />
                <Text
                  css={{
                    color: "#aba6a2",
                  }}
                >
                  Powering mission-critical construction throughout Europe.
                </Text>
              </Text>
            </div>
          </Navbar.Brand>
          <Navbar.Content
            enableCursorHighlight
            activeColor="primary"
            hideIn="md"
            variant="underline-rounded"
          >
            {data.map((item, index) => (
              <Navbar.Link
                key={index}
                href={item.href}
                isActive={active == index}
                as={Link}
              >
                {item.title}
              </Navbar.Link>
            ))}
              <Dropdown placement="bottom-right">
                <Navbar.Item>
                  <Dropdown.Button
                    auto
                    light
                    css={{
                      px: 0,
                      dflex: "center",
                      svg: { pe: "none" },
                    }}
                    ripple={false}
                  >
                    <Link href="" style={{
                      fontWeight: "400"
                    }}>
                      Sign In
                    </Link>
                  </Dropdown.Button>
                </Navbar.Item>
                <Dropdown.Menu  css={{
                  bg: "$black",
                  m: "$2",
                  br: "12px"
                }}>
                  <Dropdown.Item textValue="As an employee">
                    <Link href={""}>
                    As an employee
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item><Link href={""}onClick={()=>signOut()} >As a partner</Link></Dropdown.Item>
                  <Dropdown.Item><Link href={"/auth/login-admin"} onClick={()=>signIn()}>As an admin</Link></Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
          </Navbar.Content>
          <Navbar.Toggle showIn="md" hideIn="xs" />
          <Navbar.Collapse
            id="SilverBack.Navbar"
            aria-labelledby="SilverBack Navbar"
            showIn="md"
            style={{
              top: "0 !important",
            }}
          >
            <Navbar.CollapseItem
              style={{
                height: "var(--nextui--navbarHeight)",
              }}
            />
            {data.map((item, index) => (
              <Navbar.CollapseItem
                key={index}
                activeColor="primary"
                isActive={active == index}
              >
                {item.title}
              </Navbar.CollapseItem>
            ))}
          </Navbar.Collapse>
        </Navbar>
      </Row>
    </Fragment>
  );
}
