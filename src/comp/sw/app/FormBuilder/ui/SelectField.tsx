import {
  CSS,
  FormElement,
  Grid,
  Input,
  Popover,
  Text,
} from "@nextui-org/react";
import {
  ChangeEvent,
  Fragment,
  KeyboardEvent,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import StyleObject from "csstype";
import { Check } from "lucide-react";
import { useController, useFormContext } from "react-hook-form";
import { SelectFieldProps } from "../types";

const DropdownMenuStyling: CSS = {
  bs: "0 0 10px black",
  w: 250,
};

const SelectItemStyling: CSS = {
  cursor: "pointer",
  fontSize: "$sm",
  fontWeight: "$normal",
  p: "5px $sm",
  br: "$sm",
  h: "$13",
  m: -5,
  transition: "$dropdownItem",
  userSelect: "none",
};

const GridContainerStyling: CSS = {
  bgColor: "transparent !important",
};

const GroupNameStyling: CSS = {
  userSelect: "none",
  fontSize: 12,
  pt: "$2",
  color: "$accents6",
};

const ListStyling: StyleObject.Properties = {
  margin: "var(--nextui-space-sm)",
};

const InputDropdownContainerStyling: StyleObject.Properties = {
  position: "relative",
  width: "100%",
};

const TriggerStyling: StyleObject.Properties = {
  position: "absolute",
  top: "40px"
};

export default function Select_Field(
  props: SelectFieldProps & { name: string }
) {
  // Destruction
  const { name, label, option, items } = props;
  const rules = option || {};
  const ValidationRule = rules.validate || {};
  Object.assign(ValidationRule, {
    isSelectable: (value: string) => {
      if (Array.isArray(items)) {
        if (items.includes(value)) {
          return true;
        } else {
          return "Please select a option";
        }
      } else {
        if (
          Object.entries(items)
            .map((groups) => groups[1].includes(value))
            .includes(true)
        ) {
          return true;
        } else {
          return "Please select a option";
        }
      }
    },
  }),
    (rules.validate = ValidationRule);

  const { control, formState } = useFormContext();
  const { field } = useController({
    name: name,
    control: control,
    rules: rules,
  });

  // Errors

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [shouldClose, setShouldClose] = useState<boolean>(false);

  const [focusedItem, setFocusedItem] = useState<number>(-1);

  const [selectedOrSearchValue, setSelectedOrSearchValue] = useState<string>(
    field.value || ""
  );

  useEffect(() => {
    const endingFocusItem = document.getElementById(sortedItems[focusedItem]);
    if (endingFocusItem) endingFocusItem.style.backgroundColor = "";
    setFocusedItem(-1);
    selectedOrSearchValue
      ? field.onChange(selectedOrSearchValue)
      : field.onChange();
  }, [selectedOrSearchValue]);

  // For external blur and react-hook-form
  const InputTriggerRef = useRef<HTMLInputElement>(null);

  // Search mechanic
  // Check firstly if the items is grouped
  // If its grouped search for string
  // If not destruct the items
  const searchedList: (string | [string, string[]])[] = Array.isArray(items)
    ? items.filter((value: string) =>
        items
          .map((value: string) => value.toLowerCase())
          .indexOf(selectedOrSearchValue.toLowerCase()) === -1 &&
        selectedOrSearchValue !== ""
          ? value.toLowerCase().includes(selectedOrSearchValue.toLowerCase())
          : value
      )
    : Object.entries(items).map(
        ([groupName, values]: [string, unknown]) =>
          [
            groupName,
            (values as string[]).filter((value: string) =>
              (values as string[])
                .map((value: string) => value.toLowerCase())
                .indexOf(selectedOrSearchValue.toLowerCase()) === -1 &&
              selectedOrSearchValue !== ""
                ? value
                    .toLowerCase()
                    .includes(selectedOrSearchValue.toLowerCase())
                : value
            ),
          ] as [string, string[]]
      );

  const sortedItems = !Array.isArray(items)
    ? searchedList.flatMap((item) => item[1]).flat()
    : (searchedList as Array<string>);

  return (
    <Fragment>
      <div style={InputDropdownContainerStyling} ref={field.ref}>
        <div id="1"  className="3"/>
        <div id="1" className="2"/>
        <Input
          status={Error ? "error" : "default"}
          {...(Error && {
            helperText: "" + Error.message,
          })}
          name={field.name}
          helperColor="error"
          inputMode="search"
          ref={InputTriggerRef}
          bordered
          labelPlaceholder={label}
          fullWidth
          value={selectedOrSearchValue}
          onKeyDown={(e: KeyboardEvent<FormElement>) => {
            // Accessability for Dropdown
            if (e.key == "ArrowDown") {
              const endingFocusItem = document.getElementById(
                sortedItems[focusedItem]
              );
              if (endingFocusItem) endingFocusItem.style.backgroundColor = "";
              const applingFocusItem = document.getElementById(
                sortedItems[focusedItem + 1]
              );
              if (applingFocusItem)
                applingFocusItem.style.backgroundColor =
                  "var(--nextui-colors-neutralLight)";
              if (focusedItem <= sortedItems.length)
                setFocusedItem(focusedItem + 1);
            } else if (e.key == "ArrowUp") {
              const endingFocusItem = document.getElementById(
                sortedItems[focusedItem]
              );
              if (endingFocusItem) endingFocusItem.style.backgroundColor = "";
              const applingFocusItem = document.getElementById(
                sortedItems[focusedItem - 1]
              );
              if (applingFocusItem)
                applingFocusItem.style.backgroundColor =
                  "var(--nextui-colors-neutralLight)";
              if (focusedItem >= 0) setFocusedItem(focusedItem - 1);
            } else if (e.key == "Enter") {
              if (focusedItem >= 0 && focusedItem <= sortedItems.length) {
                setSelectedOrSearchValue(sortedItems[focusedItem]);
                InputTriggerRef.current?.blur();
              } else {
                sortedItems[0];
              }
            }
          }}
          onFocus={(e) => {
            if (!shouldClose && !openPopover) {
              // When the popover gets opened it's blur the
              // input so that the focus animation gets stopt
              // this prevent it.
              setOpenPopover(true);
              setTimeout(() => {
                e.target?.focus();
              }, 10);
            } else if (shouldClose) {
              e.target?.blur();
            }
          }}
          onBlur={(e) => {
            // bc the input gets blur, when opened the
            // popover. It's getting a timeout to
            // insure sooth ux.
            field.onBlur();
            setTimeout(() => {
              if (document.activeElement != e.target) {
                setShouldClose(true);
                setOpenPopover(false);
                setTimeout(() => {
                  setShouldClose(false);
                }, 300);
              }
            }, 100);
          }}
          onChange={(e: ChangeEvent<FormElement>) => {
            setSelectedOrSearchValue(e.target.value);
          }}
        />

        <Popover
          placement="bottom-left"
          shouldFlip={false}
          isOpen={openPopover}
          shouldCloseOnBlur={false}
          onClose={() => {
            // s. onBlur :60
            setOpenPopover(false);
            setShouldClose(true);
            setTimeout(() => {
              setShouldClose(false);
            }, 300);
            setTimeout(() => {
              InputTriggerRef.current?.blur();
            }, 10);
          }}
        >
          {/* A  Popover need a trigger with a element, so this is necessary*/}
          <Popover.Trigger>
            <div style={TriggerStyling} />
          </Popover.Trigger>
          <Popover.Content css={DropdownMenuStyling}>
            <ul style={ListStyling}>
              {/* Checking if items is grouped or not */}
              {Array.isArray(items)
                ? searchedList.map((item, idx) => (
                    <li key={idx}>
                      <Grid.Container
                        justify="space-between"
                        css={SelectItemStyling}
                        onMouseEnter={(e) => {
                          // hover
                          // gave type as HTMLDivElement
                          // bc e.target doesn't have
                          // style property
                          const target = e.target as HTMLDivElement;
                          target.style.backgroundColor =
                            "var(--nextui-colors-neutralLight)";
                        }}
                        onMouseLeave={(e) => {
                          // hover
                          // s. MouseEnter :100
                          const target = e.target as HTMLDivElement;
                          target.style.backgroundColor = "";
                        }}
                        onClick={() => {
                          // select and deselect mechanic
                          if (selectedOrSearchValue === item) {
                            setSelectedOrSearchValue("");
                          } else {
                            setSelectedOrSearchValue(item.toString());
                          }
                        }}
                        id={item as string}
                      >
                        <Grid css={GridContainerStyling}>
                          {item.toString()}
                        </Grid>
                        <Grid css={GridContainerStyling}>
                          <Check
                            size={15}
                            display={
                              selectedOrSearchValue != item ? "none" : ""
                            }
                          />
                        </Grid>
                      </Grid.Container>
                    </li>
                  ))
                : searchedList.map((groups, idx) => (
                    <Fragment key={idx}>
                      {groups[1].length > 0 && (
                        <Fragment>
                          <li>
                            <Text css={GroupNameStyling}>{groups[0]}</Text>
                          </li>
                          {/* Check if Array for typescript */}
                          {Array.isArray(groups[1]) &&
                            groups[1].map((item, indx) => (
                              <li key={indx}>
                                <Grid.Container
                                  justify="space-between"
                                  css={SelectItemStyling}
                                  onMouseEnter={(e: MouseEvent<HTMLDivElement>) => {
                                    // hover
                                    const element = e.target as HTMLDivElement
                                    element.style.backgroundColor =
                                      "var(--nextui-colors-neutralLight)";
                                  }}
                                  onMouseLeave={(e: MouseEvent<HTMLDivElement>) => {
                                    // hover
                                    const element = e.target as HTMLDivElement
                                    element.style.backgroundColor = "";
                                  }}
                                  onClick={() => {
                                    // select and deselect mechanic
                                    if (selectedOrSearchValue === item) {
                                      setSelectedOrSearchValue("");
                                    } else {
                                      setSelectedOrSearchValue(item);
                                    }
                                  }}
                                  id={item as string}
                                >
                                  <Grid css={GridContainerStyling}>{item}</Grid>
                                  <Grid css={GridContainerStyling}>
                                    <Check
                                      size={15}
                                      display={
                                        selectedOrSearchValue != item
                                          ? "none"
                                          : ""
                                      }
                                    />
                                  </Grid>
                                </Grid.Container>
                              </li>
                            ))}
                        </Fragment>
                      )}
                    </Fragment>
                  ))}
            </ul>
          </Popover.Content>
        </Popover>
      </div>
    </Fragment>
  );
}
