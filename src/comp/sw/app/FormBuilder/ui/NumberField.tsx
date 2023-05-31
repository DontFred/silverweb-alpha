import { Fragment, useState } from "react";
import { NumberFieldProps } from "../types";
import { Button, CSS, Input } from "@nextui-org/react";
import { useController, useFormContext } from "react-hook-form";
import TooltipHelper from "./TooltipHelper";
import { Minus, Plus } from "lucide-react";

export default function NumberField(
  props: NumberFieldProps & { name: string }
) {
  const { formState, control } = useFormContext();
  const { label, name, option, helpText } = props;
  const { field } = useController({
    name: name,
    control: control,
    rules: option,
  });

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  const [focusInput, setFocusInput] = useState<boolean>(false);
  const [hoverInput, setHoverInput] = useState<boolean>(false);
  const [hoverButtonIn, setHoverButtonIn] = useState<boolean>(false);
  const [hoverButtonDe, setHoverButtonDe] = useState<boolean>(false);

  const InCreaseButton: CSS = {
    bg: "transparent",
    h: "auto",
    ml: -16,
    color: hoverButtonIn ? "white" : "$accents6",
    p: "4px 3.5px 2px 3.5px",
    borderWidth: "0px 0px 1px 2px",
    borderStyle: "solid",
    borderRadius: "0 var(--nextui-space-6)",
    borderColor: hoverInput ? "white" : "$border",
  };

  const DeCreaseButton: CSS = {
    bg: "transparent",
    h: "auto",
    ml: -16,
    color: hoverButtonDe ? "white" : "$accents6",
    p: "2px 3.5px 4px 3.5px",
    borderWidth: "1px 0px 0px 2px",
    borderStyle: "solid",
    borderRadius: "var(--nextui-space-6) 0",
    borderColor: hoverInput ? "white" : "$border",
  };
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
          //   .nextui-input-content--right{
          //     padding: 0px !important;
          //   }
        `}
      </style>

      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Input
          contentRightStyling={false}
          status={Error ? "error" : "default"}
          {...(Error && {
            helperText: "" + Error.message,
          })}
          onMouseEnter={() => {
            setHoverInput(true);
          }}
          onMouseLeave={() => {
            !focusInput && setHoverInput(false);
          }}
          onFocus={() => {
            setFocusInput(true);
            setHoverInput(true);
          }}
          onBlur={() => {
            setFocusInput(false);
            setHoverInput(false);
          }}
          type="number"
          inputMode="numeric"
          fullWidth
          helperColor="error"
          bordered
          contentRight={
            <Button.Group vertical size="xs" css={{ w: 0 }}>
              <Button
                css={InCreaseButton}
                onMouseEnter={() => {
                  setHoverButtonIn(true);
                  setHoverInput(true);
                }}
                onMouseLeave={() => {
                  setHoverButtonIn(false);
                  !focusInput && setHoverInput(false);
                }}
              >
                <Plus size={13} />
              </Button>
              <Button
                css={DeCreaseButton}
                onMouseEnter={() => {
                  setHoverButtonDe(true);
                  setHoverInput(true);
                }}
                onMouseLeave={() => {
                  setHoverButtonDe(false);
                  !focusInput && setHoverInput(false);
                }}
              >
                <Minus size={13} />
              </Button>
            </Button.Group>
          }
          labelPlaceholder={label}
          //   {...register(name, { ...option })}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translate(0, -50%)",
            right: -20,
            display: helpText ? "block" : "none",
          }}
        >
          <TooltipHelper content={helpText ? helpText : ""} />
        </div>
      </div>
    </Fragment>
  );
}
