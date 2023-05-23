import { Fragment } from "react";
import { TextFieldProps } from "../types";
import { useFormContext } from "react-hook-form";
import { Input } from "@nextui-org/react";

export default function TextField(props: TextFieldProps & { name: string }) {
  const { register, formState } = useFormContext();
  const { label, name, option } = props;

  const Error = name.split('.').reduce((err, path): any => err && err[path], formState.errors)

  return (
    <Fragment>
      <Input
        status={Error ? "error" : "default"}
        {...(Error && {
          helperText: "" + Error.message,
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
