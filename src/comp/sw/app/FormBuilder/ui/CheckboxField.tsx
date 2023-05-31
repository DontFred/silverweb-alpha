import { ChangeEvent, Fragment, useState } from "react";
import { CheckboxFieldProps, RadioAndCheckboxItemProps } from "../types";
import {
  CSS,
  Checkbox,
  Container,
  FormElement,
  Input,
  Text,
} from "@nextui-org/react";
import {
  FieldErrors,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";

export default function CheckboxField(
  props: CheckboxFieldProps & { name: string }
) {
  const { items, name, columnWidth, option, otherOpt } = props;

  const { control, formState } = useFormContext();

  const { field } = useController({
    name: name,
    control: control,
    rules: option,
    defaultValue: [],
  });

  const Error: FieldErrors<FieldValues> = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  const CheckboxContainerStyling: CSS = {
    w: "100%",
    display: "grid",
    gridTemplateColumns: "1fr ".repeat(columnWidth || 1),
    gap: "$5",
  };

  const CheckboxStyling: CSS = {
    ...(typeof items[0] !== "string" && items[0].description && { pb: 17.86 }),
  };

  const LabelStyling: CSS = {
    fs: "var(--nextui-space-7)",
    lh: "21px",
    ml: -2.73,
  };

  const DescriptionStyling: CSS = {
    position: "absolute",
    color: "$accents7",
    fs: "calc(var(--nextui-space-7)*0.85)",
    m: "21px 0 0 calc(var(--nextui-space-7) + var(--nextui-space-7) * 0.375)",
  };

  const RadioOtherInput: CSS = {
    ml: 10,
    position: "relative",
    mt: -15,
    mb: -25,
    top: 2,
    zIndex: "$max",
  };

  const ErrorMessageStyling: CSS = {
    fs: "var(--nextui-space-5)",
    color: "$error",
    w: "100%",
    ta: "right",
    p: "$1 $8 0 0",
  };

  return (
    <Fragment>
      <Checkbox.Group
        aria-label={"Checkbox group for" + name}
        name={field.name}
        value={
          (typeof items[0] == "string" &&
            field.value.every((item: string) => items.includes(item))) ||
          (typeof items[0] !== "string" &&
            field.value.every((item: string) =>
              items
                .map(
                  (entry) =>
                    (
                      entry as {
                        value: string;
                        description?: string;
                        label?: string;
                      }
                    ).value
                )
                .includes(item)
            ))
            ? field.value
            : field.value.map((item: string, idx: number) =>
                idx ==
                field.value.findIndex((item: string) =>
                  typeof items[0] == "string"
                    ? !items.includes(item)
                    : !items
                        .map(
                          (entry) =>
                            (
                              entry as {
                                value: string;
                                description?: string;
                                label?: string;
                              }
                            ).value
                        )
                        .includes(item)
                )
                  ? "other"
                  : item
              )
        }
        orientation="horizontal"
        onChange={(values: string[]) => {
          field.onChange(values);
        }}
      >
        <Container css={CheckboxContainerStyling}>
          {items.map((item: RadioAndCheckboxItemProps, idx: number) => (
            <Fragment key={idx}>
              <Checkbox
                value={typeof item == "string" ? item : item.value}
                size="xs"
                color="secondary"
                css={CheckboxStyling}
              >
                <Text css={LabelStyling}>
                  {typeof item == "string"
                    ? item
                    : item.label
                    ? item.label
                    : item.value}
                </Text>
              </Checkbox>
              {typeof item !== "string" && item.description && (
                <Text css={DescriptionStyling}>{item.description}</Text>
              )}
            </Fragment>
          ))}
          {otherOpt && (
            <Checkbox
              value="other"
              size="xs"
              color="secondary"
              css={CheckboxStyling}
            >
              <Text css={LabelStyling}>
                {(typeof items[0] == "string" &&
                  field.value.every((item: string) => items.includes(item))) ||
                (typeof items[0] !== "string" &&
                  field.value.every((item: string) =>
                    items
                      .map(
                        (entry) =>
                          (
                            entry as {
                              value: string;
                              description?: string;
                              label?: string;
                            }
                          ).value
                      )
                      .includes(item)
                  )) ? (
                  "Other"
                ) : (
                  <Input
                    size="sm"
                    css={RadioOtherInput}
                    name={name}
                    value={
                      field.value[
                        field.value.findIndex((item: string) =>
                          typeof items[0] == "string"
                            ? !items.includes(item)
                            : !items
                                .map(
                                  (entry) =>
                                    (
                                      entry as {
                                        value: string;
                                        description?: string;
                                        label?: string;
                                      }
                                    ).value
                                )
                                .includes(item)
                        )
                      ] == "other"
                        ? ""
                        : field.value[
                            field.value.findIndex((item: string) =>
                              typeof items[0] == "string"
                                ? !items.includes(item)
                                : !items
                                    .map(
                                      (entry) =>
                                        (
                                          entry as {
                                            value: string;
                                            description?: string;
                                            label?: string;
                                          }
                                        ).value
                                    )
                                    .includes(item)
                            )
                          ]
                    }
                    bordered
                    aria-label="Other"
                    onChange={(e: ChangeEvent<FormElement>) => {
                      field.onChange(
                        field.value.map((item: string, idx: number) =>
                          idx ==
                          field.value.findIndex((item: string) =>
                            typeof items[0] == "string"
                              ? !items.includes(item)
                              : !items
                                  .map(
                                    (entry) =>
                                      (
                                        entry as {
                                          value: string;
                                          description?: string;
                                          label?: string;
                                        }
                                      ).value
                                  )
                                  .includes(item)
                          )
                            ? e.target.value
                            : item
                        )
                      );
                    }}
                    fullWidth
                    onClick={(e) => {
                      const element = e.target as FormElement;
                      element.focus();
                    }}
                  />
                )}
              </Text>
            </Checkbox>
          )}
        </Container>
      </Checkbox.Group>
      {Error && (
        <Text css={ErrorMessageStyling}>
          {Error.message ? Error.message.toString() : ""}
        </Text>
      )}
    </Fragment>
  );
}
