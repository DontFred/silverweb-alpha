import { Fragment } from "react";
import { PasswordFieldProps } from "../types";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@nextui-org/react";
import TooltipHelper from "./TooltipHelper";

/**
 * Renders a password input field with label, validation, and help text.
 *
 * @param {PasswordFieldProps & { name: string }} props - The props object that contains the component's properties and the name of the field.
 * @return {JSX.Element} The password input field with label, validation, and help text.
 */
export default function PasswordField(
  props: PasswordFieldProps & { name: string }
) {
  const { register, formState, control } = useFormContext();
  const { label, name, option, helpText } = props;

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  const password = useWatch({
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
        <Input.Password
          initialValue={password}
          status={Error ? "error" : "default"}
          {...(Error && {
            helperText: "" + Error.message,
          })}
          helperColor="error"
          fullWidth
          bordered
          clearable
          labelPlaceholder={label}
          {...register(name, { ...option })}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
            right: -20,
            display: helpText ? "block" : "none",
          }}
        >
          <TooltipHelper content={helpText ? helpText : ""} />
        </div>
      </div>
    </Fragment>
  );
}
