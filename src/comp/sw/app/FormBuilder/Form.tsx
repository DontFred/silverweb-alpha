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
import AddressField from "./ui/AddressField";
import ContactField from "./ui/ContactField";

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
    return <SelectField {...fieldProps} name={name} />;
  }

  if (fieldProps.type === "address" ){
    return <AddressField {...fieldProps} name={name} />;
  }

  if (fieldProps.type === "contact") {
    return <ContactField {...fieldProps} name={name} />;
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
        <style jsx global>
            {`
                .nextui-input-helper-text-container {
                    right: 10px;
                }
            `}
        </style>
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
            <form>
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
                      type="button"
                      onClick={form.handleSubmit(onSubmit)}
                    >
                        Submit
                    </Button>
                  ) : (
                    <Button
                      type="button"
                      role="button"
                      size="sm"
                      ghost
                      auto
                      onPress={async () => {
                        const Errors = await Promise.all(Object.entries(fields[pages]).map(async (field) => {
                            // Checking field
                            return await form.trigger(field[0])
                        }));
                        if(Errors.every(value => value === true)){
                            // No errors found
                            setPages(pages + 1);
                        }
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
