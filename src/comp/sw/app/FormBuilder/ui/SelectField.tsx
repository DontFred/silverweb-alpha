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
import TooltipHelper from "./TooltipHelper";

const DropdownMenuStyling: CSS = {
  bs: "0 2px 10px black",
  w: 250,
};

const SelectItemStyling: CSS = {
  cursor: "pointer",
  fontSize: "$sm",
  fontWeight: "$normal",
  p: "5px $sm",
  br: "$sm",
  h: "$13",
  m: "-5px 0",
  w: "100%",
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
  top: "40px",
};

/**
 * Renders a select field component.
 *
 * @param {SelectFieldProps & { name: string }} props - the props object which should have the following properties:
 *   * name: string - the name of the select field
 *   * label: string - the label of the select field
 *   * option?: Record<string, unknown> - the options for the select field
 *   * items: string[] | Record<string, string[]> - the items of the select field
 *   * helpText?: string - the help text of the select field
 * @return {JSX.Element} the select field component
 */
export default function SelectField(
  props: SelectFieldProps & { name: string } & { onAddOption?: () => void }
) {
  // Destruction
  const { name, label, option, items, helpText, autocomplete, onAddOption } =
    props;
  const rules = option || {};

  const { control, formState } = useFormContext();
  const { field } = useController({
    name: name,
    control: control,
    rules: {
      ...rules,
      validate: {
        ...rules.validate,
        ...((autocomplete === undefined || autocomplete === false) && {
          /**
           * Checks if a value is selectable.
           *
           * @param {string} value - The value to check.
           * @return {boolean | string} Returns true if the value is selectable, otherwise returns "Please select an option".
           */
          isSelectable: (value: string, formValues) => {
            if (Array.isArray(items)) {
              if (items.includes(value) || value === "") {
                return true;
              } else {
                return "Please select an option";
              }
            } else {
              const selectAbleOptions = ([] as string[]).concat(
                ...Object.values(items)
              );
              if (selectAbleOptions.includes(value) || value === "") {
                return true;
              } else {
                return "Please select an option";
              }
            }
          },
        }),
      },
    },
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

  useEffect(() => {
    const endingFocusItem = document.getElementById(sortedItems[focusedItem]);
    if (endingFocusItem) endingFocusItem.style.backgroundColor = "";
    setFocusedItem(-1);
    selectedOrSearchValue
      ? field.onChange(selectedOrSearchValue)
      : field.onChange("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOrSearchValue]);

  return (
    <Fragment>
      <div style={InputDropdownContainerStyling} ref={field.ref}>
        <Input
          status={Error ? "error" : "default"}
          {...(Error && {
            helperText: "" + Error.message,
          })}
          aria-label={name}
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
          <Popover.Content
            css={{
              ...DropdownMenuStyling,
              ...(sortedItems.length == 0 && { display: "none" }),
            }}
          >
            <ul style={ListStyling}>
   
              {onAddOption && (
                <li>
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
                      onAddOption();
                    }}
                    id={"onAddOption"}
                  >
                    <Grid css={{
                      bgColor: "transparent !important",
                      fontWeight: "600",
                      justifyContent: "center",
                      display: "flex",
                      width: "100%"
                    }}>
                      Add Option</Grid>
                  </Grid.Container>
                </li>
              )}
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
                                  onMouseEnter={(
                                    e: MouseEvent<HTMLDivElement>
                                  ) => {
                                    // hover
                                    const element = e.target as HTMLDivElement;
                                    element.style.backgroundColor =
                                      "var(--nextui-colors-neutralLight)";
                                  }}
                                  onMouseLeave={(
                                    e: MouseEvent<HTMLDivElement>
                                  ) => {
                                    // hover
                                    const element = e.target as HTMLDivElement;
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
