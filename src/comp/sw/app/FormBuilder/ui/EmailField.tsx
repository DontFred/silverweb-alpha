import { Fragment } from "react";
import { EmailFieldProps } from "../types";
import { useFormContext, useWatch } from "react-hook-form";
import { Input } from "@nextui-org/react";
import TooltipHelper from "./TooltipHelper";

/**
 * Renders an email input field with validation.
 *
 * @param {EmailFieldProps & { name: string }} props - An object containing the props passed to the component.
 * @return {JSX.Element} A React component representing the email input field.
 */
export default function EmailField(props: EmailFieldProps & { name: string }) {
  const { register, formState, control } = useFormContext();
  const { label, name, option, helpText } = props;

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

    const email = useWatch({
      control: control,
      name: name,
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
          helperColor="error"
          bordered
          initialValue={email}
          clearable
          labelPlaceholder={label}
          {...register(name, { ...option, ...option && {validate: (value: string) => value.includes("@") ? true : "Please enter a valid email address" }}) }
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
