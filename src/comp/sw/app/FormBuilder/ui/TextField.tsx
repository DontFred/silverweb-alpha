import { Fragment } from "react";
import { TextFieldProps } from "../types";
import { useFormContext } from "react-hook-form";
import { Input } from "@nextui-org/react";

export default function TextField(props: TextFieldProps & { name: string }) {
  const { register, formState } = useFormContext();
  const { label, name, option } = props;
  return (
    <Fragment>
      <Input
        status={formState.errors[name] ? "error" : "default"}
        {...(formState.errors[name]?.message && {
          helperText: "" + formState.errors[name]?.message,
        })}
        fullWidth
        helperColor="error"
        bordered
        clearable
        labelPlaceholder={label}
        {...register(name, { ...option })}
      />
    </Fragment>
  );
}
