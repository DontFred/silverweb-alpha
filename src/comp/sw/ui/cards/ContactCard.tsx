import { CommentProps, ContactProps as FakerContactProps } from "@/faker.d";
import {
  Avatar,
  Button,
  CSS,
  Card,
  Container,
  Grid,
  Popover,
  Spacer,
  Text,
} from "@nextui-org/react";
import { AtSign, Building, Smartphone, User } from "lucide-react";
import React, { Fragment } from "react";
import StyleObject from "csstype";


type ContactProps = FakerContactProps;

/**
 * Renders a contact card with details such as name, job, company, email, phone and comments.
 *
 * @param {object} props - The props object containing contact details and comment information.
 * @param {object} props.contact - The contact object containing all the details such as firstName, lastName, jobPosition, email, phoneNumber and company.
 * @param {object} props.contact.comment - The comment object containing details of the comment such as user, date and comment.
 * @return {JSX.Element} A React JSX element that renders the contact card with details and comments.
 */
export default function ContactCard({
  contact,
}: {
  contact: ContactProps & { comment: CommentProps };
}) {

  const TriggerStyling: CSS = {
    w: "100%"
  }

  const ContactCardBodyStyling: CSS = {
    p: "12px 0"
  }

  const PopoverContentStyling: CSS = {
    bs: "0 0 10px black",
    p: 6,
  }

  const DisplayContainer: CSS = {
    w: 350
  }

  const ButtonStyling: CSS = {
    m: "0 $sm"
  }

  const DividerStyling: CSS = {
    h: 0, border: "0.25px solid $border", p: 0 
  }

  const ContactInfoStyling: CSS = {
    color: "$accents8"
  }

  return (
    <Fragment>
      <Popover>
        <Popover.Trigger>
          <Card
            variant="bordered"
            isHoverable
            isPressable
            css={TriggerStyling}
          >
            <Card.Body
              css={ContactCardBodyStyling}
            >
              <UserDisplay
                job={contact.jobPosition}
                name={`${contact.firstName} ${contact.lastName}`}
              />
            </Card.Body>
          </Card>
        </Popover.Trigger>
        <Popover.Content
          css={PopoverContentStyling}
        >
          <Grid.Container css={DisplayContainer} gap={1} justify="space-between">
            <Grid xs={8}>
              <UserDisplay
                noIcon
                job={contact.jobPosition}
                name={`${contact.firstName} ${contact.lastName}`}
              />
            </Grid>
            <Grid alignItems="center" xs={4} justify="flex-end">
              <Button size="xs" css={ButtonStyling}>
                Edit
              </Button>
            </Grid>
            <Spacer y={0.25} />
            <Grid
              xs={12}
              css={DividerStyling}
            />
            <Spacer y={0.5} />
            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={ContactInfoStyling}
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
                    css={ContactInfoStyling}
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
                    css={ContactInfoStyling}
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
              css={DividerStyling}
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
                  <Text size="$xs" color="$accents6" weight={"bold"}>
                    1
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12}>
              <Comment
                name={contact?.comment?.user?.name}
                color={contact?.comment?.user?.color}
                avatar={contact?.comment?.user?.avatar}
                date={contact?.comment?.date}
                comment={contact?.comment?.comment}
              />
            </Grid>
            <Spacer y={0.5} />
          </Grid.Container>
        </Popover.Content>
      </Popover>
    </Fragment>
  );
}

/**
 * Renders a user display component with name and job information.
 *
 * @param {string} name - The name of the user.
 * @param {string} job - The job of the user.
 * @param {boolean} [noIcon] - Optional boolean to not display an icon.
 * @return {JSX.Element} A fragment containing the user display component.
 */
function UserDisplay({
  name,
  job,
  noIcon,
}: {
  name: string;
  job: string;
  noIcon?: boolean;
}) {

  const ContactDisplayContainerStyling: StyleObject.Properties = {
    display: "inline-flex",
    padding: "0 var(--nextui-space-sm)",
    justifyContent: "center",
    alignItems: "center",
    width: "max-content",
    maxWidth: "100%",
    transition: "transform 250ms ease 0ms, box-shadow 0.25s ease 0s",
  }

  const ContactDisplayTextStyling: CSS = {
    ml: "$sm",
    d: "inline-flex",
    fd: "column",
    p: 0,
    alignItems: "flex-start",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: `calc(100% - ${!noIcon && "52px"})`,
  }

  const ContactDisplayContactNameStyling: StyleObject.Properties = {
    fontSize: "var(--nextui-fontSizes-sm)",
    color: "var(--nextui-colors-text)",
    lineHeight: "var(--nextui-lineHeights-sm)",
    fontWeight: "var(--nextui-fontWeights-medium)",
    maxWidth: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  }

  const ContactDisplayContactJobStyling: StyleObject.Properties = {
    fontSize: "var(--nextui-fontSizes-xs)",
    color: "var(--nextui-colors-accents7)",
    marginTop: "0",
    maxWidth: "100%",
    overflow: "hidden",
    textOverflow: "ellipsis",
  }

  return (
    <Fragment>
      <div
        style={ContactDisplayContainerStyling}
      >
        {!noIcon && <Avatar icon={<User />} squared />}
        <Container
          css={ContactDisplayTextStyling}
          fluid
        >
          <span
            style={ContactDisplayContactNameStyling}
          >
            {name}
          </span>
          <span
            style={ContactDisplayContactJobStyling}
          >
            {job}
          </span>
        </Container>
      </div>
    </Fragment>
  );
}

/**
 * Renders a comment with the given avatar, color, name, date, and comment.
 *
 * @param {string} avatar - The URL of the avatar image.
 * @param {string} [color="default"] - The color of the comment. Defaults to "default".
 * @param {string} name - The name of the person who wrote the comment.
 * @param {Date} date - The date the comment was written.
 * @param {string} comment - The text of the comment.
 * @return {JSX.Element} The rendered comment as a JSX element.
 */
function Comment({
  avatar,
  color,
  name,
  date,
  comment,
}: {
  avatar: string;
  color?: "error" | "default" | "primary" | "secondary" | "success" | "warning" | "gradient";
  name: string;
  date: Date;
  comment: string;
}) {

  const CommentContainerStyling: CSS = {
    m: "0 15px",
  }

  const CommentStyling: CSS = {
    lh: "$sm"
  }

  const CommentContentStyling: CSS = {
    m: "2px 0"
  }
  return (
    <Fragment>
      <Grid.Container
        alignItems="flex-start"
        css={CommentContainerStyling}
      >
        <Grid xs={1.5}>
          <Avatar bordered color={color} src={avatar} size={"sm"} />
        </Grid>
        <Grid xs={10.5}>
          <Grid.Container justify="space-between">
            <Grid>
              <Text
                size={"$sm"}
                weight={"semibold"}
                css={CommentStyling}
              >
                {name}
              </Text>
            </Grid>
            <Grid>
              <Text
                size={"$sm"}
                css={CommentStyling}
                color="$accents7"
              >
                {date.toLocaleString("en-IE", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })}
              </Text>
            </Grid>
            <Grid xs={12}>
              <Text
                css={CommentContentStyling}
                size={"$sm"}
              >
                {comment}
              </Text>
            </Grid>
          </Grid.Container>
        </Grid>
      </Grid.Container>
    </Fragment>
  );
}
