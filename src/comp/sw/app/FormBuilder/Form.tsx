import { Button, Grid, Modal } from "@nextui-org/react";
import { Field, FormProps } from "./types";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "./ui/TextField";
import TitleField from "./ui/TitleField";
import { Fragment, useState } from "react";
import DescriptionField from "./ui/DescriptionField";
import PasswordField from "./ui/PasswordField";
import SpacerField from "./ui/SpacerField";

//Dev
import { DevTool } from "@hookform/devtools";
import HeadingField from "./ui/HeadingField";
import SubheadingField from "./ui/SubheadingField";
import SelectField from "./ui/SelectField";

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
        <DevTool control={form.control} />
      )}
      <Modal open={true} blur preventClose width="40%">
        <Modal.Body
          css={{
            p: "40px 80px",
          }}
        >
          <FormProvider {...form}>
            <SelectField/>
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
                        Object.entries(fields[pages]).map(([name, fieldProps]) => form.trigger([name]))
                        if(!Object.entries(fields[pages]).find(([name, fieldProps]) => form.formState.errors[name]))
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
