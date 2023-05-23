import { Fragment, useState } from "react";
import { Button, Grid, Modal } from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";

import { Field, FormProps } from "./types";
import TextField from "./ui/TextField";
import TitleField from "./ui/TitleField";
import DescriptionField from "./ui/DescriptionField";
import PasswordField from "./ui/PasswordField";
import SpacerField from "./ui/SpacerField";
import HeadingField from "./ui/HeadingField";
import SubheadingField from "./ui/SubheadingField";
import SelectField from "./ui/SelectField";

//Dev
import { DevTool } from "@hookform/devtools";

function renderFields([name, fieldProps]: [string, Field]) {
  if (fieldProps.type === "title") {
    return <TitleField {...fieldProps} />;
  }

  if (fieldProps.type === "description") {
    return <DescriptionField {...fieldProps} />;
  }

  if (fieldProps.type === "heading") {
    return <HeadingField {...fieldProps} />;
  }

  if (fieldProps.type === "subheading") {
    return <SubheadingField {...fieldProps} />;
  }

  if (fieldProps.type === "spacer") {
    return <SpacerField {...fieldProps} />;
  }

  if (fieldProps.type === "text") {
    return <TextField {...fieldProps} name={name} />;
  }

  if (fieldProps.type === "select") {
    return <SelectField {...fieldProps} name={name} />
  }

  if (fieldProps.type === "password") {
    return <PasswordField {...fieldProps} name={name} />;
  }

  return <div>Unknown type: &apos;{fieldProps["type"]}&apos;</div>;
}

export function Form({ fields, onSubmit }: FormProps) {
  const [pages, setPages] = useState<number>(0);
  const form = useForm();
  return (
    <Fragment>
      {process.env.NODE_ENV !== "production" && (
        // Form state tool for react-hook-form
        <DevTool control={form.control} />
      )}
      <Modal open={true} blur preventClose width="40%">
        <Modal.Body
          css={{
            p: "40px 80px",
          }}
        >
          <FormProvider {...form}>
            <SelectField
              label="Select"
              type="select"
              name="Select"
              items={[
                { label: "name", value: "name" },
                { label: "name1", value: "name1" },
                { label: "name2", value: "name2" },
                { label: "name3", value: "name3" },
                { label: "name4", value: "name4" },
                { label: "name5", value: "name5" }
              ]}
              option={{
                required: {
                  value: true,
                  message: "Please enter your company name",
                },
              }}
            />
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {fields.map((field, idx) => (
                <div
                  key={idx}
                  style={{ display: pages === idx ? "block" : "none" }}
                >
                  {Object.entries(field).map(renderFields)}
                </div>
              ))}
              <Grid.Container justify="space-between">
                <Grid>
                  <Button
                    disabled={pages === 0}
                    color="secondary"
                    size="sm"
                    ghost
                    auto
                    type="submit"
                    onPress={() => setPages(pages > 0 ? pages - 1 : 0)}
                  >
                    Back
                  </Button>
                </Grid>
                <Grid>
                  {pages + 1 === fields.length ? (
                    <Button
                      color={"default"}
                      size="sm"
                      ghost
                      auto
                      type="submit"
                    >
                      Submit
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      size="sm"
                      ghost
                      auto
                      onPress={() => {
                        Object.entries(fields[pages]).map(
                          ([name, fieldProps]) => form.trigger([name])
                        );
                        if (
                          !Object.entries(fields[pages]).find(
                            ([name, fieldProps]) => form.formState.errors[name]
                          )
                        )
                          setPages(pages + 1);
                      }}
                    >
                      Next
                    </Button>
                  )}
                </Grid>
              </Grid.Container>
            </form>
          </FormProvider>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
