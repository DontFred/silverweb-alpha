import { Fragment } from "react";
import { TextFieldProps } from "../types";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@nextui-org/react";
import TooltipHelper from "./TooltipHelper";

/**
 * Renders a text input field with validation errors and help text.
 *
 * @param {TextFieldProps & { name: string }} props - The props for the TextField component.
 * @return {JSX.Element} A text input field with validation errors and help text.
 */
export default function TextField(props: TextFieldProps & { name: string }) {
  const { register, control, formState } = useFormContext();
  const { label, name, option, helpText, placeholder } = props;

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  const text = useWatch({
    control: control,
    name: name
  })

  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Input
          status={Error ? "error" : "default"}
          {...(Error && {
            helperText: "" + Error.message,
          })}
          fullWidth
          aria-label={"textfield-" + label + name }
          initialValue={text}
          helperColor="error"
          bordered
          clearable
          placeholder={!label ? placeholder : undefined}
          labelPlaceholder={label}
          {...register(name, { ...option })}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
            right: -20,
            display: helpText ? "block" : "none"
          }}
        >
          <TooltipHelper content={helpText ? helpText : ""} />
        </div>
      </div>
    </Fragment>
  );
}
