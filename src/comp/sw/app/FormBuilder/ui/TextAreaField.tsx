import { Fragment, useEffect, useRef, useState } from "react";
import { TextAreaFieldProps } from "../types";
import { useController, useFormContext } from "react-hook-form";
import TooltipHelper from "./TooltipHelper";
import StyleObject from "csstype";

/**
 * Renders a textarea form field with label, clear button, and optional help text.
 *
 * @param {TextAreaFieldProps & { name: string }} props - Object containing props for the TextAreaField component.
 * @param {string} props.name - The name of the field.
 * @param {string} props.label - The label for the field.
 * @param {Record<string, unknown>} props.option - The rules for the field.
 * @param {string} props.helpText - The help text for the field.
 * @return {JSX.Element} The rendered TextAreaField component.
 */
export default function TextAreaField(
  props: TextAreaFieldProps & { name: string }
) {
  const { control, formState, watch } = useFormContext();

  const { label, name, option, helpText } = props;
  const { field } = useController({
    name: name,
    control: control,
    rules: option,
  });

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  const TextAreaRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState<boolean>(false);
  const [hover, setHover] = useState<boolean>(false);

  const [hoverButton, setHoverButton] = useState<boolean>(false);

  const [clearable, setClearable] = useState<boolean>();

  setTimeout(() => {
    setClearable(!TextAreaRef.current?.closest("fieldset")?.disabled);
  }, 10);

  const valueOfTextArea = watch(name)
  useEffect(() => {
    if(TextAreaRef.current){
      TextAreaRef.current.style.height = "auto";
      TextAreaRef.current.style.height = TextAreaRef.current.scrollHeight + "px";
    }
  }, [valueOfTextArea])

  const TextAreaContainerStyling: StyleObject.Properties = {
    width: "100%",
    display: "flex",
    background: "none",
    position: "relative",
    boxShadow:
      !hover && !focused
        ? "0 0 0 2px var(--nextui-colors-border)"
        : Error
        ? "0 0 0 2px var(--nextui-colors-error)"
        : "0 0 0 2px var(--nextui-colors-gray600)",
    borderRadius: "var(--nextui-space-6)",
    transition: "var(--nextui-transitions-default)",
    transform: focused
      ? "translateY(calc(var(--nextui-space-1) * -1))"
      : "none",
  };
  const TextAreaStyling: StyleObject.Properties = {
    width: "100%",
    background: "none",
    border: "none",
    padding: "8px var(--nextui-space-8) ",
    resize: "none",
    fontSize: "var(--nextui-fontSizes-sm)",
    lineHeight: "20px",
  };

  const ClearButtonIconStyling: StyleObject.Properties = {
    color: "currentcolor",
    width: "20px",
    height: "20px",
    transition: "var(--nextui-transitions-default)",
    opacity: field.value ? 1 : 0,
    position: "relative",
    right: field.value ? 0 : "-5px",
  };
  const ClearButtonStyling: StyleObject.Properties = {
    position: "absolute",
    background: "none",
    top: "9px",
    transition: "var(--nextui-transitions-default)",
    right: 0,
    padding: "0 6px",
    border: 0,
    cursor: "pointer",
    color: "var(--nextui-colors-accents6)",
    opacity: hoverButton ? 0.85 : 1,
    display:
      TextAreaRef.current?.readOnly ||
      TextAreaRef.current?.disabled ||
      !clearable
        ? "none"
        : "block",
  };
  const LabelStyling: StyleObject.Properties = {
    cursor: "text",
    position: "absolute",
    transition: "var(--nextui-transitions-default)",
    fontSize: "var(--nextui-fontSizes-sm)",
    lineHeight: "var(--nextui-lineHeights-md)",
    ...(!focused && !field.value
      ? {
          color: Error
            ? "var(--nextui-colors-errorLightContrast)"
            : "var(--nextui-colors-accents6)",
          left: "var(--nextui-space-8)",
          top: "8px",
        }
      : {
          color: Error
            ? "var(--nextui-colors-errorLightContrast)"
            : "var(--nextui-colors-gray900)",
          left: "var(--nextui-space-2)",
          top: "-14px",
        }),
  };

  const HelperTextContainerStyling: StyleObject.Properties = {
    position: "absolute",
    opacity: Error ? 1 : 0,
  };

  const HelperTextStyling: StyleObject.Properties = {
    margin: "var(--nextui-space-1) 0 0 var(--nextui-space-5)",
    fontSize: "var(--nextui-space-5)",
    color: "var(--nextui-colors-error)",
  };

  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <div
          style={TextAreaContainerStyling}
          onMouseEnter={() => {
            setHover(true);
          }}
          onMouseLeave={() => {
            setHover(false);
          }}
        >
          <textarea
            ref={TextAreaRef}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              field.onBlur();
              setFocused(false);
            }}
            name={name}
            style={TextAreaStyling}
            value={field.value}
            onChange={(e) => {
              field.onChange(e.target.value);
            }}
          />
          <label
            onClick={() => {
              TextAreaRef.current?.focus();
            }}
            style={LabelStyling}
          >
            {label}
          </label>
          <button
            style={ClearButtonStyling}
            type="button"
            onClick={() => {
              field.onChange("");
              if (TextAreaRef.current) {
                TextAreaRef.current.style.height = "auto";
              }
            }}
          >
            <span
              style={ClearButtonIconStyling}
              onMouseEnter={() => {
                setHoverButton(true);
              }}
              onMouseLeave={() => {
                setHoverButton(false);
              }}
            >
              <svg
                style={ClearButtonIconStyling}
                height="24"
                viewBox="0 0 24 24"
                width="24"
              >
                <path
                  d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
                  fill="currentColor"
                ></path>
              </svg>
            </span>
          </button>
        </div>
        <div style={HelperTextContainerStyling}>
          <p style={HelperTextStyling}>{Error && "" + Error.message}</p>
        </div>
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
