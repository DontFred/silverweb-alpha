import { Fragment } from "react";
import { NumberFieldProps } from "../types";
import { Button, CSS, Input } from "@nextui-org/react";
import { useFormContext } from "react-hook-form";
import TooltipHelper from "./TooltipHelper";
import { Minus, Plus } from "lucide-react";

const InCreaseButton: CSS = {
    bg: "transparent",
    border: "2px solid $border",
    color: "red",
    p: 3

}

const DeCreaseButton: CSS = {
    p: 3
}

export default function NumberField(
  props: NumberFieldProps & { name: string }
) {

    const { register, formState } = useFormContext();
    const { label, name, option, helpText } = props;
  
    const Error = name
      .split(".")
      .reduce((err, path): any => err && err[path], formState.errors);
  return (
    <Fragment>
      <style jsx global>
        {`
          input[type="number"]::-webkit-inner-spin-button {
            display: none;
          }
          input[type="number"] {
            -moz-appearance: textfield;
          }
        `}
      </style>
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
          type="number"
          inputMode="numeric"
          fullWidth
          helperColor="error"
          bordered
          contentRight={(
            <Button.Group vertical size="xs">
                <Button css={InCreaseButton}><Plus size={15}/></Button>
                <Button css={DeCreaseButton}><Minus size={15}/></Button>
            </Button.Group>
          )}
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
