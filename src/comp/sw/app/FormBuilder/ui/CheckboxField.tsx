import { ChangeEvent, Fragment } from "react";
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
  const { name, items, otherOpt, option, columnWidth } = props;

  const { control, formState } = useFormContext();

  const { field } = useController({
    name: name,
    control: control,
    rules: option,
  });

  const Error: FieldErrors<FieldValues> = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  const CheckboxContainer: CSS = {
    w: "100%",
    display: "grid",
    gridTemplateColumns: "1fr ".repeat(columnWidth || 1),
    gap: "$5",
  };

  const CheckboxOtherInput: CSS = {
    ml: 10,
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
        orientation="horizontal"
        name={field.name}
        value={
          items.find((item) =>
            typeof item == "string"
              ? item === field.value
              : item.value == field.value
          )
            ? field.value
            : field.value
            ? "other"
            : ""
        }
        onChange={(value: string[]) => {
          field.onChange(value);
        }}
        aria-label={"Checkbox input for " + name}
      >
        <Container css={CheckboxContainer}>
          {items.map((item: RadioAndCheckboxItemProps, idx: number) => (
            <Checkbox
              color={Error ? "error" : "secondary"}
            //   labelColor={Error ? "error" : "default"}
              size="xs"
              key={idx}
              value={typeof item == "string" ? item : item.value}
              //   description={
              //     typeof item == "string"
              //       ? ""
              //       : item.description
              //       ? item.description
              //       : ""
              //   }
            >
              {typeof item == "string"
                ? item
                : item.label
                ? item.label
                : item.value}
            </Checkbox>
          ))}
          {otherOpt && (
            <Checkbox
              value="other"
              size="xs"
              color={Error ? "error" : "secondary"}
            //   labelColor={Error ? "error" : "default"}
            >
              {!items.find((item) =>
                typeof item == "string"
                  ? item === field.value
                  : item.value == field.value
              ) && field.value ? (
                <Input
                  css={CheckboxOtherInput}
                  name={name}
                  bordered
                  aria-label="Other"
                  fullWidth
                  value={field.value !== "other" ? field.value : ""}
                  onChange={(e: ChangeEvent<FormElement>) => {
                    field.onChange(e.target.value);
                  }}
                />
              ) : (
                "Other"
              )}
            </Checkbox>
          )}
        </Container>
      </Checkbox.Group>
      {Error && (
        <Text css={ErrorMessageStyling}>
          {Error.message ? Error.message.toString() : ""}
        </Text>
      )}
      <Checkbox.Group aria-label={"Checkbox group for " + name}>
        <Container css={CheckboxContainer}>
          <Checkbox size="xs" color="secondary" value="A">
            A
          </Checkbox>
          <Checkbox size="xs" color="secondary" value="B">
            B
          </Checkbox>
          <Checkbox size="xs" color="secondary" value="C">
            C
          </Checkbox>
          <Checkbox size="xs" color="secondary" value="D">
            D
          </Checkbox>
          <Checkbox size="xs" color="secondary" value="E">
            E
          </Checkbox>
        </Container>
      </Checkbox.Group>
    </Fragment>
  );
}
