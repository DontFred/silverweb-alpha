import { Fragment } from "react";
import { PasswordFieldProps } from "../types";
import { useFormContext } from "react-hook-form";
import { Input } from "@nextui-org/react";

export default function PasswordField(
  props: PasswordFieldProps & { name: string }
) {
  const { register, formState } = useFormContext();
  const { label, name, option } = props;
  return (
    <Fragment>
      <Input.Password
        status={formState.errors[name] ? "error" : "default"}
        {...(formState.errors[name]?.message && {
          helperText: "" + formState.errors[name]?.message,
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
