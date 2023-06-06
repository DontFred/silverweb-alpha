import { Fragment } from "react";
import { DatePickerFieldProps } from "../types";
import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";

export default function DatePickerField(
  props: DatePickerFieldProps & { name: string }
) {
  const { name, option} = props
  const { register } = useFormContext()
  return <Fragment>
    <Input fullWidth type="datetime-local" bordered {...register(name, option)}/> 
  </Fragment>
}
