import { Grid, Text } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React, { Fragment } from "react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <Fragment>
      <Grid.Container
        css={{
          m: "0 auto",
          position: "absolute",
          bottom: 0,
        }}
      >
        <Grid xs={12}>
          <hr
            style={{
              border: "1px solid grey",
              width: "100%",
              margin: "20px 40px",
            }}
          />
        </Grid>
        <Grid xs={12}>
          <Grid.Container
            justify="space-between"
            css={{
              p: "0 40px",
            }}
          >
            <Grid xs={12} sm={4.5} md={6}>
              <Grid.Container>
                <Grid>
                  <div
                    style={{
                      padding: 3,
                    }}
                  >
                    <Logo fill={"white"} width={20} sm />
                  </div>
                </Grid>
                <Grid>
                  <Text
                    h5
                    css={{
                      p: 8,
                      color: "#fff",
                      letterSpacing: "-0.067em",
                    }}
                  >
                    SilverBack
                  </Text>
                </Grid>
                <Grid>
                  <Text hideIn="md" css={{ p: 6, color: "#aba6a2" }}>
                    |‎ ‎ ‎ ‎ Powering mission-critical construction throughout
                    Europe.
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12} sm={7.5} md={5.5}>
              <Grid.Container gap={1}>
                <Grid xs={12} sm={5}>
                  <Text>
                    © {new Date().getFullYear()} SilverBack Staffing Ltd.
                  </Text>
                </Grid>
                <Grid xs={6} sm>
                  <Link style={{}} href="#">Privacy Policy</Link>
                </Grid>
                <Grid xs={6} sm>
                  <Link href="#">Contact</Link>
                </Grid>
                <Grid >
                  <Link href="https://www.linkedin.com/company/silverback-staffing/mycompany/">
                    <Image
                      src={"/svg/Icon/linkedin.svg"}
                      width={15}
                      height={15}
                      alt="Linkedin"
                      draggable="false"
                    />
                  </Link>
                </Grid>
                <Grid >
                  <Link href="https://www.facebook.com/SilverBackStaffing/">
                    <Image
                      src={"/svg/Icon/facebook.svg"}
                      width={15}
                      height={15}
                      alt="Facebook"
                      draggable="false"
                    />
                  </Link>
                </Grid>
                <Grid>
                  <Link href="https://www.facebook.com/SilverBackStaffing/">
                    <Image
                      src={"/svg/Icon/instagram.svg"}
                      width={15}
                      height={15}
                      alt="Instagram"
                      draggable="false"
                    />
                  </Link>
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Fragment>
  );
}
