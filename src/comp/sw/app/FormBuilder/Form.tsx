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
import PhoneField from "./ui/PhoneField";

function renderFields([name, fieldProps]: [string, Field], idx: number) {
  if (fieldProps.type === "title") {
    return <TitleField {...fieldProps} key={idx} />;
  }

  if (fieldProps.type === "description") {
    return <DescriptionField {...fieldProps} key={idx} />;
  }

  if (fieldProps.type === "heading") {
    return <HeadingField {...fieldProps} key={idx} />;
  }

  if (fieldProps.type === "subheading") {
    return <SubheadingField {...fieldProps} key={idx} />;
  }

  if (fieldProps.type === "spacer") {
    return <SpacerField {...fieldProps} key={idx} />;
  }

  if (fieldProps.type === "text") {
    return <TextField {...fieldProps} name={name} key={idx} />;
  }

  if (fieldProps.type === "select") {
    return <SelectField {...fieldProps} name={name} key={idx} />;
  }

  if (fieldProps.type === "address") {
    return <AddressField {...fieldProps} name={name} key={idx} />;
  }

  if (fieldProps.type === "contact") {
    return <ContactField {...fieldProps} name={name} key={idx} />;
  }

  if (fieldProps.type === "password") {
    return <PasswordField {...fieldProps} name={name} key={idx} />;
  }

  if (fieldProps.type === "phone") {
    return <PhoneField {...fieldProps} name={name} key={idx} />;
  }

  return <div key={idx}>Unknown type: &apos;{fieldProps["type"]}&apos;</div>;
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
      <Modal
        open={true}
        blur
        preventClose
        width="100%"
        css={{
          width: "90%",
          m: "0 auto",
          "@sm": {
            width: "60%",
          },
          "@md": {
            width: "45%",
          },
          "@lg": {
            width: "45%",
          },
        }}
      >
        <Modal.Body
          css={{
            p: "$sm 40px",
            "@sm": {
              p: "40px 80px",
            },
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
                    type="button"
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
                        const Errors = await Promise.all(
                          Object.entries(fields[pages]).map(async (field) => {
                            // Checking field
                            return await form.trigger(field[0]);
                          })
                        );
                        if (Errors.every((value) => value === true)) {
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
