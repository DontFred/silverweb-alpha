import { CSS, Dropdown, FormElement, Input, Text } from "@nextui-org/react";
import React, {
  Fragment,
  Key,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useController, useFormContext } from "react-hook-form";
import StyleObject from "csstype";
import { SelectFieldProps } from "../types";

function SetConverter(set: Set<Key>) {
  // Set to string converter
  return Array.from(set).join(", ").replaceAll("_", " ");
}

export default function SelectField(
  props: SelectFieldProps & { name: string }
) {
  // Destruction
  const { name, label, option, items } = props;

  const { control, formState } = useFormContext();

  const { field } = useController({
    name: name,
    control: control,
    rules: option,
  });

  // useState
  const [selectedOption, setSelectedOption] = useState<Set<Key>>(new Set([]));
  const [searchInput, setSearchInput] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // useMemo
  const selectedValue = useMemo(
    () => SetConverter(selectedOption),
    [selectedOption]
  );

  const somethingIsSelected = useMemo(() => {
    if (SetConverter(selectedOption)) return true;
    else return false;
  }, [selectedOption]);

  // useRef
  const PlaceholderLabelRef = useRef<HTMLElement>(null);
  const TriggerInputRef = useRef<HTMLButtonElement>(null);

  // useEffect
  // This mechanic is for the animations and error handling
  useLayoutEffect(() => {
    if (PlaceholderLabelRef.current && TriggerInputRef.current) {
      if (somethingIsSelected) {
        Object.assign(
          PlaceholderLabelRef.current.style,
          PlaceholderLabelOnAnimation
        );
      } else if (!somethingIsSelected) {
        Object.assign(
          PlaceholderLabelRef.current.style,
          PlaceholderLabelOffAnimation
        );
      }
    }
  }, [somethingIsSelected, formState.errors[name]]);

  // Search mechanic

  const filteredItems = items.filter(
    (item) =>
      item.value.includes(searchInput) || item.label.includes(searchInput)
  );

  //CSS
  const PlaceholderLabelOnAnimation: StyleObject.Properties = {
    // Animation for placeholder when Dropdown menu is open or something is selected
    left: "var(--nextui-space-2)",
    color: formState.errors[name]
      ? "var(--nextui-colors-error)"
      : "var(--nextui-colors-text)",
    top: "-58%",
  };
  const PlaceholderLabelOffAnimation: StyleObject.Properties = {
    // Animation for placeholder when dropdown menu is not open and nothing is selected
    left: "var(--nextui-space-6)",
    color: formState.errors[name]
      ? "var(--nextui-colors-error)"
      : "var(--nextui-colors-accents6)",
    top: "24%",
  };

  const PlaceholderLabelClass: CSS = {
    // Class for placeholder
    fontSize: "$sm",
    position: "absolute",
    letterSpacing: "$normal",
    transition: "left 0.25s ease 0s, color 0.25s ease 0s, top 0.25s ease 0s",
    ...PlaceholderLabelOffAnimation,
  };

  const DropdownMenu: CSS = {
    bs: "0 0 10px black",
  };

  const TriggerInputOnAnimation: StyleObject.Properties = {
    // Animation for trigger input when dropdown menu is open
    transform: "translate(0, -2px)",
    border: formState.errors[name]
      ? "2px solid var(--nextui-colors-error)"
      : "2px solid white",
  };

  const TriggerInputOffAnimation: StyleObject.Properties = {
    // Animation for trigger input when dropdown menu is closed
    transform: "translate(0, 0)",
    border: "2px solid var(--nextui-colors-border)",
  };

  const TriggerInputClass: CSS = {
    // Class for trigger input
    w: "100%",
    br: "0.75rem",
    bg: "transparent",
    m: 0,
    p: "10px 16px",
    letterSpacing: "$normal",
    h: 44,
    color: "$text",
    fontSize: "$sm",
    margin: "2px",
    border: "2px solid $border",
    fontStyle: "normal",
    fontWeight: "$normal",
    transition: "var(--nextui-transitions-default)",
    justifyContent: "space-between",
  };

  const SearchBarClass: CSS = {
    // Class for searchbar
    position: "relative",
    top: 0,
    left: -8,
    bs: "0 1px 0 var(--nextui-colors-border)",
    br: 0,
    mb: 9,
    borderBottom: "9px solid transparent",
  };

  const ErrorMessageClass: CSS = {
    // Class for error message
    position: "absolute",
    m: "$1 0 0 $5",
    fontSize: "var(--nextui-space-5)",
    color: "$error",
  };

  return (
    <Fragment>
      <div
        aria-label="input-box"
        style={{ position: "relative", width: "100%" }}
      >
        <Text
          ref={PlaceholderLabelRef}
          css={PlaceholderLabelClass}
          aria-roledescription="label for select"
          role="note"
        >
          {label}
        </Text>
        <Dropdown
          isOpen={isOpen}
          disableTriggerPressedAnimation={true}
          onOpenChange={(isOpen: boolean) => {
            // This mechanic is for the animations and control the opening of the dropdown menu
            setIsOpen(isOpen);
            if (
              isOpen &&
              PlaceholderLabelRef.current &&
              TriggerInputRef.current
            ) {
              Object.assign(
                PlaceholderLabelRef.current.style,
                PlaceholderLabelOnAnimation
              );
              Object.assign(
                TriggerInputRef.current.style,
                TriggerInputOnAnimation
              );
            } else if (
              !somethingIsSelected &&
              PlaceholderLabelRef.current &&
              TriggerInputRef.current
            ) {
              Object.assign(
                PlaceholderLabelRef.current.style,
                PlaceholderLabelOffAnimation
              );
              Object.assign(
                TriggerInputRef.current.style,
                TriggerInputOffAnimation
              );
            } else if (TriggerInputRef.current) {
              Object.assign(
                TriggerInputRef.current.style,
                TriggerInputOffAnimation
              );
            }
          }}
        >
          <Dropdown.Button
            onMouseEnter={() => {
              if (TriggerInputRef.current)
                TriggerInputRef.current.style.border = formState.errors[name]
                  ? "2px solid var(--nextui-colors-error)"
                  : "2px solid white";
            }}
            onMouseLeave={() => {
              if (TriggerInputRef.current && !isOpen)
                TriggerInputRef.current.style.border =
                  "2px solid var(--nextui-colors-border)";
            }}
            ref={TriggerInputRef}
            css={TriggerInputClass}
            onBlur={field.onBlur}
          >
            {selectedValue}
          </Dropdown.Button>
          <Dropdown.Menu
            containerCss={DropdownMenu}
            disallowEmptySelection={option?.required ? true : false}
            selectionMode="single"
            selectedKeys={[field.value]}
            onSelectionChange={(keys: Set<Key> | any) => {
              setSelectedOption(keys);
              field.onChange(SetConverter(keys));
            }}
          >
            <Dropdown.Section
              items={filteredItems}
              title={
                <Input
                  fullWidth
                  aria-label="Searchbar"
                  role="searchbox"
                  placeholder="Search"
                  bordered
                  size="sm"
                  value={searchInput}
                  onChange={(e: React.ChangeEvent<FormElement>) => {
                    setSearchInput(e.target.value);
                  }}
                  css={SearchBarClass}
                />
              }
            >
              {(item) => (
                <Dropdown.Item
                  css={{
                    fontSize: "$sm",
                    fontWeight: "$normal",
                    p: "$sm",
                  }}
                  key={item.value}
                >
                  {item.label}
                </Dropdown.Item>
              )}
            </Dropdown.Section>
          </Dropdown.Menu>
        </Dropdown>
        <Text css={ErrorMessageClass}>
          {formState.errors[name]?.message &&
            "" + formState.errors[name]?.message}
        </Text>
      </div>
    </Fragment>
  );
}
