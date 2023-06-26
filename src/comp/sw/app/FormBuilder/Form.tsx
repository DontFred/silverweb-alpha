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
import AddressField from "./ui/AddressField";
import ContactField from "./ui/ContactField";
import PhoneField from "./ui/PhoneField";
import ArrayField from "./ui/ArrayField";
import EmailField from "./ui/EmailField";
import RadioField from "./ui/RadioField";
import CheckboxField from "./ui/CheckboxField";
import NumberField from "./ui/NumberField";
import GridField from "./ui/GridField";
import RelationNumberField from "./ui/RelationNumberField";
import DatePickerField from "./ui/DatePickerField";
import FileField from "./ui/FileField";

//Dev
import { DevTool } from "@hookform/devtools";
import TextAreaField from "./ui/TextAreaField";

/**
 * Renders a form field based on its type and properties.
 *
 * @param {[string, Field]} name - the name and properties of the field
 * @param {number} idx - the index of the field
 * @return {JSX.Element} the rendered form field
 */
export function renderFields([name, fieldProps]: [string, Field], idx: number) {
  switch (fieldProps.type) {
    case "title":
      return <TitleField {...fieldProps} key={idx} />;
    case "description":
      return <DescriptionField {...fieldProps} key={idx} />;
    case "heading":
      return <HeadingField {...fieldProps} key={idx} />;
    case "subheading":
      return <SubheadingField {...fieldProps} key={idx} />;
    case "spacer":
      return <SpacerField {...fieldProps} key={idx} />;
    case "text":
      return <TextField {...fieldProps} name={name} key={idx} />;
    case "number":
      return <NumberField {...fieldProps} name={name} key={idx} />;
    case "select":
      return <SelectField {...fieldProps} name={name} key={idx} />;
    case "textarea":
      return <TextAreaField {...fieldProps} name={name} key={idx} />;
    case "radio":
      return <RadioField {...fieldProps} name={name} key={idx} />;
    case "checkbox":
      return <CheckboxField {...fieldProps} name={name} key={idx} />;
    case "date":
      return <DatePickerField {...fieldProps} name={name} key={idx} />;
    case "file":
      return <FileField {...fieldProps} name={name} key={idx} />;
    case "address":
      return <AddressField {...fieldProps} name={name} key={idx} />;
    case "contact":
      return <ContactField {...fieldProps} name={name} key={idx} />;
    case "password":
      return <PasswordField {...fieldProps} name={name} key={idx} />;
    case "email":
      return <EmailField {...fieldProps} name={name} key={idx} />;
    case "phone":
      return <PhoneField {...fieldProps} name={name} key={idx} />;
    case "array":
      return <ArrayField {...fieldProps} name={name} key={idx} />;
    case "grid":
      return <GridField {...fieldProps} name={name} key={idx} />;
    case "relationNumber":
      return <RelationNumberField {...fieldProps} name={name} key={idx} />;
    default:
      return (
        <div key={idx}>Unknown type: &apos;{fieldProps["type"]}&apos;</div>
      );
  }
}

/**
 * Renders a form with dynamic fields and pagination.
 *
 * @param {Object[]} fields - an array of objects describing each field. Each object must contain:
 *   @param {string} name - the name of the field.
 *   @param {string} label - the label of the field.
 *   @param {string} type - the type of the field (e.g. "text", "email").
 * @param {Function} onSubmit - a callback function to be called when the form is submitted.
 * @return {JSX.Element} - a React component representing the form.
 */
export function Form({ fields, onSubmit, defaultValues }: FormProps) {
  const [pages, setPages] = useState<number>(0);

  const form = useForm({
    defaultValues: defaultValues
  });
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
        id="modal"
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
                    onPress={() => {
                      document
                        .getElementsByClassName(
                          "nextui-backdrop nextui-backdrop--open nextui-backdrop-wrapper-enter nextui-backdrop-wrapper-enter-active"
                        )[0]
                        .scrollTo({
                          top: 0,
                          behavior: "smooth",
                        });
                      setPages(pages > 0 ? pages - 1 : 0);
                    }}
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
                      draggable="true"
                      auto
                      type="button"
                      onPress={form.handleSubmit(onSubmit) as any}
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
                        document
                          .getElementsByClassName(
                            "nextui-backdrop nextui-backdrop--open nextui-backdrop-wrapper-enter nextui-backdrop-wrapper-enter-active"
                          )[0]
                          .scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
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
