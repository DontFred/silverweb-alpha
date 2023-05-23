import { Fragment } from "react";
import { PasswordFieldProps } from "../types";
import { useFormContext } from "react-hook-form";
import { Input } from "@nextui-org/react";

export default function PasswordField(
  props: PasswordFieldProps & { name: string }
) {
  const { register, formState } = useFormContext();
  const { label, name, option } = props;

  const Error = name.split('.').reduce((err, path): any => err && err[path], formState.errors)

  return (
    <Fragment>
      <Input.Password
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
    </Fragment>
  );
}
