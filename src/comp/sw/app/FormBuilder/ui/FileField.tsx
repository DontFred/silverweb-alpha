import { CSS, Container, Grid, Text } from "@nextui-org/react";
import React, {
  ChangeEvent,
  DragEvent,
  Fragment,
  useEffect,
  useState,
} from "react";
import { FileFieldProps } from "../types";
import { FileCheck2, FileX2, X } from "lucide-react";
import StyleObject from "csstype";
import { useController, useFormContext } from "react-hook-form";

// Styling
const ContainerStyling: CSS = {
  borderWidth: 2,
  borderColor: "$border",
  borderStyle: "solid",
  borderRadius: "var(--nextui-space-6)",
  height: 150,
  transition: "$default",
  jc: "center",
  ai: "center",
  textAlign: "center",
  display: "flex",
};

const ItemContainerStyling: CSS = {
  position: "relative",
  cursor: "default",
  fs: "$sm",
  borderWidth: 2,
  borderColor: "$border",
  borderStyle: "solid",
  borderRadius: "var(--nextui-space-6)",
  width: "calc(100%-10px)",
  p: "5px 15px",
  margin: 5,
  transition: "$default",
  color: "$border",
  gap: 10,
};

const GridItemStyling: CSS = {
  color: "inherit !important",
};

const ErrorMessageStyling: CSS = {
    fs: "var(--nextui-space-5)",
    color: "$error",
    position: "absolute",
    w: "100%",
    ta: "right",
    p: "0 $8 0 0",
  };

const AllContainerStyling: StyleObject.Properties = {
    position: "relative"
}

const FileIconStyling: StyleObject.Properties = {
  overflow: "visible",
};

const DelIconStyling: StyleObject.Properties = {
  cursor: "pointer",
  overflow: "visible",
};

const ListStyling: StyleObject.Properties = {
  margin: 0,
};

const ListItemStyling: StyleObject.Properties = {
  margin: 0,
};

export default function FileField(props: FileFieldProps & { name: string }) {
  const { name, option } = props;

  const { control, formState, setError, watch, clearErrors } = useFormContext();

  const { field } = useController({
    name: name,
    control: control,
    rules: option,
    defaultValue: [],
  });

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  useEffect(() => {
    console.log("error", formState.isValidating)
    if (watch(name)) {
     if(
         watch(name).find(
           (file: { filename: string; uri: string }) => file.uri === "zugross"
         )
     ){
        console.log("error")
        setError(name, {
            message: "The file size is to big",
            type: "maxLength"
        })
     }else{
        console.log("clear")
        clearErrors(name)
     }
    }
  }, [ watch(name)]);

  //convert to base64

  async function handleFileConvert(file: File | null) {
    if (file) {
      if (file.size > 1024 * 1024 * 5) {
      }
      const fileString =
        file.size < 1024 * 1024 * 5
          ? await new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(file);
              reader.onload = () => resolve(reader.result);
              reader.onerror = reject;
            })
          : "zugross";
      return { filename: file.name, uri: fileString as string };
    }
  }

  // File input via click
  async function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length !== 0) {
      const convertedFiles = await Promise.all(
        [...(e.target.files as unknown as Array<File>)].map(handleFileConvert)
      );
      field.onChange([...field.value, ...convertedFiles]);
    }
  }
  // File input via drop
  async function handleDrop(e: DragEvent<HTMLLabelElement>) {
    e.preventDefault();
    if (e.dataTransfer.files.length !== 0) {
      const convertedFiles = await Promise.all(
        [...(e.dataTransfer.files as unknown as Array<File>)].map(
          handleFileConvert
        )
      );
      field.onChange([...field.value, ...convertedFiles]);
    }
  }

  return (
    <Fragment>
      <div style={AllContainerStyling}>
        <label
          htmlFor={"file-input-" + name}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
          }}
        >
          <Container
            css={ContainerStyling}
            fluid
            onMouseEnter={(e) => {
              const element = e.target as HTMLDivElement;
              element.style.borderColor = "var(--nextui-colors-foreground)";
            }}
            onMouseLeave={(e) => {
              const element = e.target as HTMLDivElement;
              element.style.borderColor = "var(--nextui-colors-border)";
            }}
          >
            <Text size={"$sm"}>Click or drag file to this area</Text>
          </Container>
        </label>
        <input
            onBlur={()=>{
                field.onBlur
            }}
          multiple
          onChange={handleFile}
          id={"file-input-" + name}
          style={{ display: "none" }}
          type="file"
          size={5000000}
        />
        {field.value && (
          <Fragment>
            <ul style={ListStyling}>
              {(
                field.value as Array<
                  { filename: string; uri: string } | undefined
                >
              ).map((file, idx) => {
                return (
                  <Fragment key={idx}>
                    {file && (
                      <li style={ListItemStyling}>
                        <Grid.Container
                          css={ItemContainerStyling}
                          {...(file.uri === "zugross" && {
                            style: {
                              borderColor: "var(--nextui-colors-errorBorder)",
                            },
                          })}
                          justify="center"
                          alignItems="center"
                          onMouseEnter={(e) => {
                            const element = e.target as HTMLDivElement;
                            if (
                              element.classList.contains(
                                "nextui-grid-container"
                              )
                            )
                              file.uri === "zugross"
                                ? (element.style.color =
                                    "var(--nextui-colors-error)")
                                : (element.style.color =
                                    "var(--nextui-colors-text) ");
                          }}
                          onMouseLeave={(e) => {
                            const element = e.target as HTMLDivElement;
                            if (
                              element.classList.contains(
                                "nextui-grid-container"
                              )
                            )
                              element.style.color =
                                "var(--nextui-colors-border)";
                          }}
                        >
                          <Grid xs={0.5} css={GridItemStyling}>
                            {file.uri === "zugross" ? (
                              <FileX2 size={15} style={FileIconStyling} />
                            ) : (
                              <FileCheck2 size={15} style={FileIconStyling} />
                            )}
                          </Grid>
                          <Grid xs css={GridItemStyling}>
                            {file.filename}
                          </Grid>
                          <Grid xs={0.5} css={GridItemStyling}>
                            <X
                              size={20}
                              style={DelIconStyling}
                              onClick={() => {
                                const tempArray = [...field.value];
                                tempArray.splice(idx, 1);
                                field.onChange(tempArray);
                              }}
                            />
                          </Grid>
                        </Grid.Container>
                      </li>
                    )}
                  </Fragment>
                );
              })}
            </ul>
          </Fragment>
        )}
      {Error && (
          <Text css={ErrorMessageStyling}>
          {Error.message ? Error.message.toString() : ""}
        </Text>
      )}
      </div>
    </Fragment>
  );
}
