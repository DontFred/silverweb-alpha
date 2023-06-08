import { Fragment } from "react";
import { DatePickerFieldProps } from "../types";
import { Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import TooltipHelper from "./TooltipHelper";

export default function DatePickerField(
  props: DatePickerFieldProps & { name: string }
) {
  const { register, formState } = useFormContext();
  const { label, name, option, helpText } = props;

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Input
          aria-label={"datepicker-"+ name}
          status={Error ? "error" : "default"}
          {...(Error && {
            helperText: "" + Error.message,
          })}
          type="datetime-local"
          fullWidth
          helperColor="error"
          bordered
          clearable
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
    </Fragment>)}
