import { ContactProps as FakerContactProps } from "@/faker.d";
import {
  Avatar,
  Button,
  Card,
  Container,
  Grid,
  Popover,
  Spacer,
  Text,
} from "@nextui-org/react";
import { AtSign, Building, Smartphone, User } from "lucide-react";
import React, { Fragment } from "react";

type ContactProps = FakerContactProps;

export default function ContactCard({ contact }: { contact: ContactProps }) {
  return (
    <Fragment>
      <Popover>
        <Popover.Trigger>
          <Card
            variant="bordered"
            isHoverable
            isPressable
            css={{
              width: "fit-content",
            }}
          >
            <Card.Body
              css={{
                p: "12px 0",
              }}
            >
              <UserDisplay
                job={contact.jobPosition}
                name={`${contact.firstName} ${contact.lastName}`}
              />
            </Card.Body>
          </Card>
        </Popover.Trigger>
        <Popover.Content
          css={{
            bs: "0 0 10px black",
            p: 6,
          }}
        >
          <Grid.Container css={{ w: 350 }} gap={1} justify="space-between">
            <Grid xs={8}>
              <UserDisplay
                noIcon
                job={contact.jobPosition}
                name={`${contact.firstName} ${contact.lastName}`}
              />
            </Grid>
            <Grid alignItems="center" xs={4} justify="flex-end">
              <Button size="xs" css={{ m: "0 $sm" }}>
                Edit
              </Button>
            </Grid>
            <Spacer y={0.25} />
            <Grid
              xs={12}
              css={{ h: 0, border: "0.25px solid $border", p: 0 }}
            />
            <Spacer y={0.5} />
            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={{
                      color: "$accents8",
                    }}
                  >
                    <Grid alignItems="center" xs={3}>
                      <Building size={15} />
                    </Grid>
                    <Grid alignItems="center" xs={9}>
                      <Text size={"$sm"} color="$accents8">
                        Company
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid xs={8.5}>
                  <Text size="$sm" weight="medium">
                    {contact.company.name}
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={{
                      color: "$accents8",
                    }}
                  >
                    <Grid alignItems="center" xs={3}>
                      <AtSign size={15} />
                    </Grid>
                    <Grid alignItems="center" xs={9}>
                      <Text size={"$sm"} color="$accents8">
                        Email
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid xs={8.5}>
                  <Text size="$sm" weight="medium">
                    {contact.email}
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={{
                      color: "$accents8",
                    }}
                  >
                    <Grid alignItems="center" xs={3}>
                      <Smartphone size={15} />
                    </Grid>
                    <Grid alignItems="center" xs={9}>
                      <Text size={"$sm"} color="$accents8">
                        Phone
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid xs={8.5}>
                  <Text size="$sm" weight="medium">
                    {contact.phoneNumber}
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Spacer y={0.5} />
            <Grid
              xs={12}
              css={{ h: 0, border: "0.25px solid $border", p: 0 }}
            />
            <Spacer y={0.25} />
            <Grid xs={12}>
              <Grid.Container>
                <Grid xs={3.5}>
                  <Text
                    size="$xs"
                    color="$accents7"
                    css={{
                      margin: "0 0 0 24px",
                    }}
                  >
                    Comments
                  </Text>
                </Grid>
                <Grid>
                  <Text
                    size="$xs"
                    color="$accents6"
                    weight={"bold"}
                  >
                    1
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Popover.Content>
      </Popover>
    </Fragment>
  );
}

function UserDisplay({
  name,
  job,
  noIcon,
}: {
  name: string;
  job: string;
  noIcon?: boolean;
}) {
  return (
    <Fragment>
      <div
        style={{
          display: "inline-flex",
          padding: "0 var(--nextui-space-sm)",
          justifyContent: "center",
          alignItems: "center",
          width: "max-content",
          maxWidth: "100%",
          transition: "transform 250ms ease 0ms, box-shadow 0.25s ease 0s",
        }}
      >
        {!noIcon && <Avatar icon={<User />} squared />}
        <Container
          css={{
            ml: "$sm",
            d: "inline-flex",
            fd: "column",
            p: 0,
            alignItems: "flex-start",
            whiteSpace: "nowrap",
          }}
          fluid
        >
          <span
            style={{
              fontSize: "var(--nextui-fontSizes-sm)",
              color: "var(--nextui-colors-text)",
              lineHeight: "var(--nextui-lineHeights-sm)",
              fontWeight: "var(--nextui-fontWeights-medium)",
              maxWidth: "var(--nextui-space-60)",
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {name}
          </span>
          <span
            style={{
              fontSize: "var(--nextui-fontSizes-xs)",
              color: "var(--nextui-colors-accents7)",
              marginTop: "0",
            }}
          >
            {job}
          </span>
        </Container>
      </div>
    </Fragment>
  );
}
