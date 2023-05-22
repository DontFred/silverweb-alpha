import {
  Button,
  Dropdown,
  FormElement,
  Input,
  Popover,
  Text,
} from "@nextui-org/react";
import React, {
  ChangeEvent,
  Fragment,
  forwardRef,
  useMemo,
  useRef,
  useState,
} from "react";
import { useController, useFormContext } from "react-hook-form";
import Select, { InputProps, components } from "react-select";

export default function SelectField() {
  const { control } = useFormContext();

  const { field } = useController({
    control,
    name: "Test",
  });
  const [selected, setSelected] = useState<any>(new Set([""]));

  const selectedValue = useMemo(
    () => Array.from(selected).join(", ").replaceAll("_", " "),
    [selected]
  );

  const buttonRef = useRef<any>();
  const textRef = useRef<any>();
  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Text
          ref={textRef}
          css={{
            fontSize: "var(--nextui-fontSizes-sm)",
            position: "absolute",
            left: "var(--nextui-space-6)",
            letterSpacing: "$normal",
            top: "20%",
            color: "var(--nextui-colors-accents6)",
            transition:
              "left 0.25s ease 0s, color 0.25s ease 0s, top 0.25s ease 0s",
          }}
        >
          Password
        </Text>
        <Dropdown
          disableTriggerPressedAnimation
          onOpenChange={(isOpen: boolean) => {
            if (isOpen) {
              buttonRef.current.style.transform = "translate(0, -2px)";
              buttonRef.current.style.border = "2px solid white";
              textRef.current.style.left = "var(--nextui-space-2)";
              textRef.current.style.color = "var(--nextui-colors-text)";
              textRef.current.style.top = "-72%";
            } else {
              buttonRef.current.style.transform = "translate(0px, 0px)";
              buttonRef.current.style.border =
                "2px solid var(--nextui-colors-border)";
            }
          }}
        >
          <Dropdown.Button
            ref={buttonRef}
            css={{
              w: "100%",
              br: "0.75rem",
              bg: "transparent",
              m: 0,
              p: "10px 16px",
              letterSpacing: "$normal",
              h: 44,
              color: "var(--nextui--inputTextColor)",
              fontSize: "var(--nextui-fontSizes-sm)",
              border: "2px solid $border",
              fontStyle: "normal",
              fontWeight: "$normal",
              "&:hover": {
                border: "2px solid white",
              },
              transition: "var(--nextui-transitions-default)",
              justifyContent: "space-between",
            }}
          >
            {selectedValue}
          </Dropdown.Button>
          <Dropdown.Menu
            containerCss={{
              bs: "0 0 10px 1px #000000a8",
            }}
            selectionMode="single"
            selectedKeys={field.value}
            onSelectionChange={(key: any) => {
              field.onChange(key);
              setSelected(key);
              if (!Array.from(key).join(", ").replaceAll("_", " ")) {
                textRef.current.style.color = "var(--nextui-colors-accents6)";
                textRef.current.style.left = "var(--nextui-space-6)";
                textRef.current.style.top = "20%";
              }
            }}
          >
            <Dropdown.Item
              css={{
                fontStyle: "normal",
                fontWeight: "$normal",
                fontSize: "$sm",
                padding: "$sm",
              }}
              key="JBSWY3DPEHPK3PXP"
            >
              Hello
            </Dropdown.Item>
            <Dropdown.Item key="values2">Hello</Dropdown.Item>
            <Dropdown.Item key="values3">Hello</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </Fragment>
  );
}
