import { Fragment, useEffect } from "react";
import { EmailFieldProps } from "../types";
import { useFormContext } from "react-hook-form";
import { Input } from "@nextui-org/react";
import TooltipHelper from "./TooltipHelper";

/**
 * Renders an email input field with validation.
 *
 * @param {EmailFieldProps & { name: string }} props - An object containing the props passed to the component.
 * @return {JSX.Element} A React component representing the email input field.
 */
export default function EmailField(props: EmailFieldProps & { name: string }) {
  const { register, formState, watch, setError } = useFormContext();
  const { label, name, option, helpText } = props;

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

    useEffect(() => {
        if (watch(name)) {
          if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(watch(name))){
            setError(name, {message: "Please enter a valid email", type: "pattern"})
          }
        }
      }, [formState.isValidating, watch, setError, name]);

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
          initialValue={watch(name)}
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
            display: helpText ? "block" : "none"
          }}
        >
          <TooltipHelper content={helpText ? helpText : ""} />
        </div>
      </div>
    </Fragment>
  );
}
