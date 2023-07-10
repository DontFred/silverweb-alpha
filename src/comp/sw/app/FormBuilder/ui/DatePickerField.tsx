import { Fragment } from "react";
import { DatePickerFieldProps } from "../types";
import { Input } from "@nextui-org/react";
import { useFormContext, useWatch } from "react-hook-form";
import TooltipHelper from "./TooltipHelper";

/**
 * Renders a customizable date/time picker input field with optional error and help text.
 *
 * @param {DatePickerFieldProps & { name: string }} props - An object containing props for the component.
 * @return {JSX.Element} A DatepickerField component.
 */
export default function DatePickerField(
  props: DatePickerFieldProps & { name: string }
) {
  const { register, formState, control } = useFormContext();
  const {label, date, time, name, option, helpText } = props;

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  const DATE = useWatch({
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
          inputMode="numeric"
          aria-label={"datepicker-"+ name}
          label={label}
          status={Error ? "error" : "default"}
          {...(Error && {
            helperText: "" + Error.message,
          })}
          type={date ? "date" : time ? "time" : "datetime-local"}
          fullWidth
          initialValue={DATE}
          helperColor="error"
          bordered
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
