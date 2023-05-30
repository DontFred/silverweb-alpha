import { ChangeEvent, Fragment } from "react";
import { RadioFieldProps, RadioItemProps } from "../types";
import {
  CSS,
  Container,
  FormElement,
  Input,
  Radio,
  Text,
} from "@nextui-org/react";
import {
  FieldErrors,
  FieldValues,
  useController,
  useFormContext,
} from "react-hook-form";

export default function RadioField(props: RadioFieldProps & { name: string }) {
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

  const RadioContainer: CSS = {
    w: "100%",
    display: "grid",
    gridTemplateColumns: "1fr ".repeat(columnWidth || 1),
    gap: "$5",
  };

  const RadioGroup: CSS = {
    w: "100%",
  };

  const RadioOtherInput: CSS = {
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
      <style jsx global>
        {`
          .nextui-radio-container {
            width: 100%;
          }
          .nextui-radio-text {
            width: 100%;
            margin-left: 7px;
          }
          .nextui-radio-point{
            width: 16.395px
          }
        `}
      </style>
      <Radio.Group
        css={RadioGroup}
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
        onChange={(value: string) => {
          field.onChange(value);
        }}
        aria-label={"Radio input for " + name}
      >
        <Container css={RadioContainer}>
          {items.map((item: RadioItemProps, idx: number) => (
            <Radio
              color={Error ? "error" : "secondary"}
              labelColor={Error ? "error" : "secondary"}
              size="xs"
              key={idx}
              arial-label={item.toString}
              value={typeof item == "string" ? item : item.value}
              description={
                typeof item == "string"
                  ? ""
                  : item.description
                  ? item.description
                  : ""
              }
            >
              {typeof item == "string"
                ? item
                : item.label
                ? item.label
                : item.value}
            </Radio>
          ))}
          {otherOpt && (
            <Radio
              value="other"
              size="xs"
              color={Error ? "error" : "secondary"}
              labelColor={Error ? "error" : "secondary"}
            >
              {!items.find((item) =>
                typeof item == "string"
                  ? item === field.value
                  : item.value == field.value
              ) && field.value ? (
                <Input
                  css={RadioOtherInput}
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
            </Radio>
          )}
        </Container>
      </Radio.Group>
      {Error && (
        <Text css={ErrorMessageStyling}>
          {Error.message ? Error.message.toString() : ""}
        </Text>
      )}
    </Fragment>
  );
}
