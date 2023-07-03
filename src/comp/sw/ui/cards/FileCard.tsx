import {
  Button,
  CSS,
  Card,
  Container,
  Grid,
  Popover,
  Spacer,
  Text,
} from "@nextui-org/react";
import {
  File as FileIcon,
  FileEdit,
  FileImage,
  FileText,
  FileType,
  Scaling,
  Calendar,
} from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import StyleObject from "csstype";
import { Prisma } from "@prisma/client";


type FileProps = Prisma.FileGetPayload<{}>

/**
 * Renders a file card component that displays file information and allows for downloading.
 *
 * @param {Object} props - object containing a file property of type FileProps
 * @return {JSX.Element} a file card component
 */
export default function FileCard({ file }: { file: FileProps }) {
  const [fileData, setFileData] = useState<File>();

  useEffect(() => {
    setFileData(
      new File(
        [new Blob([Buffer.from(Buffer.from(file.uri, "base64"))])],
        file.name,
        {
          type: file.uri.substring(
            file.uri.indexOf(":") + 1,
            file.uri.indexOf(";")
          ),
        }
      )
    );
  }, [file.uri, file.name]);



  const TriggerStyling: CSS = {
    w: "100%"
  }

  const FileCardBodyStyling: CSS = {
    p: "10px 0"
  }

  const PopoverContentStyling: CSS = {
    bs: "0 0 10px black",
    p: 6,
  }

  const DisplayContainer: CSS = {
    w: 250
  }

  const DividerStyling: CSS = {
    h: 0, border: "0.25px solid $border", p: 0 
  }

  const ButtonStyling: CSS = {
    m: 0
  }

  const FileInfoStyling: CSS = {
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
              css={FileCardBodyStyling}
            >
              <FileDisplay file={fileData}/>
            </Card.Body>
          </Card>
        </Popover.Trigger>
        <Popover.Content
          css={PopoverContentStyling}
        >
          <Grid.Container css={DisplayContainer} gap={1} justify="space-between">
            <Grid xs={8.5}>
              <FileDisplay file={fileData} noIcon/>
            </Grid>
            <Grid alignItems="center" xs={3.5} justify="flex-end">
              <Button
                size="xs"
                css={ButtonStyling}
                onPress={() => {
                  const link = document.createElement("a");
                  link.setAttribute("href", file.uri);
                  link.setAttribute("download", file.name);
                  link.style.display = "none";
                  document.body.appendChild(link);
                  link.click();
                  document.body.removeChild(link);
                }}
              >
                Download
              </Button>
            </Grid>
            <Spacer y={0.25} />
            <Grid
              xs={12}
              css={DividerStyling}
            />

            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={FileInfoStyling}
                  >
                    <Grid alignItems="center" xs={4}>
                      <Scaling size={15} />
                    </Grid>
                    <Grid alignItems="center" xs={8}>
                      <Text size={"$sm"} color="$accents8">
                        Size
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid xs={8.5}>
                  <Text size="$sm" weight="medium">
                    {Math.round(((fileData?.size || 0) / 1024) * 100) / 100 +
                      " KB"}
                  </Text>
                </Grid>
              </Grid.Container>
            </Grid>
            <Grid xs={12}>
              <Grid.Container gap={0.5} justify="space-between">
                <Grid xs={3.5}>
                  <Grid.Container
                    css={FileInfoStyling}
                  >
                    <Grid alignItems="center" xs={4}>
                      <Calendar size={15} />
                    </Grid>
                    <Grid alignItems="center" xs={8}>
                      <Text size={"$sm"} color="$accents8">
                        Date
                      </Text>
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid xs={8.5}>
                  <Text size="$sm" weight="medium">
                    {new Date(fileData?.lastModified || 1).toLocaleString(
                      "en-IE",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      }
                    )}
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


/**
 * Renders a file display with an icon and a name. The icon is automatically
 * selected based on the file type. The file name and type are displayed
 * underneath the icon.
 *
 * @param {Object} props - The props object
 * @param {File} props.file - The file to display
 * @param {boolean} props.noIcon - True to hide the icon
 * @return {JSX.Element} The file display
 */
function FileDisplay({
  file,
  noIcon
}: {
  file?: File,
  noIcon?: boolean
}) {

  var Icon = <FileIcon size={25} />;
  switch (file) {
    case file?.type.startsWith("image/") && file:
      Icon = <FileImage size={25} />;
      break;
    case file?.type.startsWith("text/plain") && file:
      Icon = <FileType size={25} />;
      break;
    case file?.type.startsWith("application/pdf") && file:
      Icon = <FileText size={25} />;
      break;
    case file?.type.startsWith("application/msword") && file:
    case file?.type.startsWith(
      "application/vnd.openxmlformats-package.document"
    ) && file:
      Icon = <FileEdit size={25} />;
      break;
    default:
      Icon = <FileIcon size={25} />;
      break;
  }

  const FileDisplayContainerStyling: StyleObject.Properties = {
    display: "inline-flex",
    padding: "0 var(--nextui-space-sm)",
    justifyContent: "center",
    alignItems: "center",
    width: "max-content",
    maxWidth: "100%",
    transition: "transform 250ms ease 0ms, box-shadow 0.25s ease 0s",
  }

  const FileDisplayTextStyling: CSS = {
    ml: !noIcon ? "$sm": 0,
    d: "inline-flex",
    fd: "column",
    p: 0,
    alignItems: "flex-start",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    maxWidth: `calc(100% - ${!noIcon ? "25px": "0"})`,
  }

  const FileDisplayFileNameStyling: StyleObject.Properties = {
    fontSize: "var(--nextui-fontSizes-sm)",
    color: "var(--nextui-colors-text)",
    lineHeight: "var(--nextui-lineHeights-sm)",
    fontWeight: "var(--nextui-fontWeights-medium)",
    maxWidth: "100%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  }

  const FileDisplayFileTypeStyling: StyleObject.Properties = {
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
        style={FileDisplayContainerStyling}
      >
        {!noIcon && Icon}
        <Container
          css={FileDisplayTextStyling}
          fluid
        >
          <span
            style={FileDisplayFileNameStyling}
          >
            {file?.name.replace(/\.[^/.]+$/, "")}
          </span>
          <span
            style={FileDisplayFileTypeStyling}
          >
            {file?.type}
          </span>
        </Container>
      </div>
    </Fragment>
  );
}
