import { CommentProps, ClientProps as FakerClientProps } from "@/faker.d";
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
import { AtSign, Building, Building2, MapPin, Smartphone, Map, Globe2 } from "lucide-react";
import React, { Fragment } from "react";
import StyleObject from "csstype";


type ClientProps = FakerClientProps;

/**
 * Renders a company card with detailed information about the company
 *
 * @param {Object} props - The props object
 * @param {Object} props.company - Object containing information about the company
 * @param {string} props.company.registerName - The name of the company
 * @param {Object} props.company.company - Object containing information about the company
 * @param {string} props.company.company.workingField - the working field of the company
 * @param {string} props.company.company.name - The name of the company
 * @param {string} props.company.company.email - The email of the company
 * @param {string} props.company.company.phone - The phone of the company
 * @param {Object} props.company.registerAddress - Object containing information about the address of the company
 * @param {string} props.company.registerAddress.streetNo - The street number of the company's address
 * @param {string} props.company.registerAddress.city - The city of the company's address
 * @param {string} props.company.registerAddress.postCode - The postcode of the company's address
 * @param {string} props.company.registerAddress.country - The country of the company's address
 * @param {Object} props.company.comment - Object containing information about the comment
 * @param {Object} props.company.comment.user - Object containing information about the user
 * @param {string} props.company.comment.user.name - The name of the user who made the comment
 * @param {string} props.company.comment.user.color - The color of the user who made the comment
 * @param {string} props.company.comment.user.avatar - The avatar of the user who made the comment
 * @param {string} props.company.comment.date - The date of the comment
 * @param {string} props.company.comment.comment - The content of the comment
 *
 * @return {JSX.Element} A CompanyCard component
 */
export default function CompanyCard({
  company,
}: {
    company: ClientProps & { comment: CommentProps };
}) {

  const TriggerStyling: CSS = {
    w: "100%"
  }

  const CompanyCardBodyStyling: CSS = {
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

  const CompanyInfoStyling: CSS = {
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
              css={CompanyCardBodyStyling}
            >
              <CompanyDisplay
                field={company.company.workingField}
                name={company.registerName}
              />
            </Card.Body>
          </Card>
        </Popover.Trigger>
        <Popover.Content
          css={PopoverContentStyling}
        >
          <Grid.Container css={DisplayContainer} gap={1} justify="space-between">
            <Grid xs={8}>
              <CompanyDisplay
                noIcon
                field={company.company.workingField}
                name={company.registerName}
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
                    css={CompanyInfoStyling}
                  >
                    <Grid alignItems="center" xs={3}>
                      <Building2 size={15} />
                    </Grid>
                    <Grid alignItems="center" xs={9}>
                      <Text size={"$sm"} color="$accents8">
                        Group
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid xs={8.5}>
                  <Text size="$sm" weight="medium">
                    {company.company.name}
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={CompanyInfoStyling}
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
                    {company.company.email}
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={CompanyInfoStyling}
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
                    {company.company.phone}
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Spacer y={0.5} />
            <Grid
              xs={12}
              css={DividerStyling}
            />
            <Spacer y={0.5} />
            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={CompanyInfoStyling}
                  >
                    <Grid alignItems="center" xs={3}>
                      <MapPin size={15} />
                    </Grid>
                    <Grid alignItems="center" xs={9}>
                      <Text size={"$sm"} color="$accents8">
                        Address
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid xs={8.5}>
                  <Text size="$sm" weight="medium">
                    {company?.registerAddress?.streetNo}
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={CompanyInfoStyling}
                  >
                    <Grid alignItems="center" xs={3}>
                      <Map size={15} />
                    </Grid>
                    <Grid alignItems="center" xs={9}>
                      <Text size={"$sm"} color="$accents8">
                        City
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid xs={8.5}>
                  <Text size="$sm" weight="medium">
                    {company?.registerAddress?.city + " " + company?.registerAddress?.postCode}
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={CompanyInfoStyling}
                  >
                    <Grid alignItems="center" xs={3}>
                      <Globe2 size={15} />
                    </Grid>
                    <Grid alignItems="center" xs={9}>
                      <Text size={"$sm"} color="$accents8">
                        Country
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid xs={8.5}>
                  <Text size="$sm" weight="medium">
                    {company?.registerAddress?.country}
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
                name={company?.comment?.user?.name}
                color={company?.comment?.user?.color}
                avatar={company?.comment?.user?.avatar}
                date={company?.comment?.date}
                comment={company?.comment?.comment}
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
 * Renders a company display with a name and field. Optionally, an icon can be included.
 *
 * @param {string} name - the name of the company
 * @param {string} field - the field the company is in
 * @param {boolean} [noIcon] - whether to exclude the icon (default false)
 * @return {JSX.Element} the company display component
 */
function CompanyDisplay({
  name,
  field,
  noIcon,
}: {
  name: string;
  field: string;
  noIcon?: boolean;
}) {

  const CompanyDisplayContainerStyling: StyleObject.Properties = {
    display: "inline-flex",
    padding: "0 var(--nextui-space-sm)",
    justifyContent: "center",
    alignItems: "center",
    width: "max-content",
    maxWidth: "100%",
    transition: "transform 250ms ease 0ms, box-shadow 0.25s ease 0s",
  }

  const CompanyDisplayTextStyling: CSS = {
    ml: "$sm",
    d: "inline-flex",
    fd: "column",
    p: 0,
    alignItems: "flex-start",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: `calc(100% - ${!noIcon && "52px"})`,
  }

  const CompanyDisplayCompanyNameStyling: StyleObject.Properties = {
    fontSize: "var(--nextui-fontSizes-sm)",
    color: "var(--nextui-colors-text)",
    lineHeight: "var(--nextui-lineHeights-sm)",
    fontWeight: "var(--nextui-fontWeights-medium)",
    maxWidth: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  }

  const CompanyDisplayCompanyJobStyling: StyleObject.Properties = {
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
        style={CompanyDisplayContainerStyling}
      >
        {!noIcon && <Avatar icon={<Building />} squared />}
        <Container
          css={CompanyDisplayTextStyling}
          fluid
        >
          <span
            style={CompanyDisplayCompanyNameStyling}
          >
            {name}
          </span>
          <span
            style={CompanyDisplayCompanyJobStyling}
          >
            {field}
          </span>
        </Container>
      </div>
    </Fragment>
  );
}

/**
 * Renders a comment with avatar, name, date, and comment content.
 *
 * @param {string} avatar - The URL of the avatar image.
 * @param {("error" | "default" | "primary" | "secondary" | "success" | "warning" | "gradient")=} color - The color of the avatar border.
 * @param {string} name - The name of the commenter.
 * @param {Date} date - The date of the comment.
 * @param {string} comment - The content of the comment.
 * @return {JSX.Element} A React component representing the comment.
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
