"use client";

import TooltipHelper from "@/comp/sw/app/FormBuilder/ui/TooltipHelper";
import { Button, Grid, Popover, Text } from "@nextui-org/react";
import {
  addMonths,
  addYears,
  eachDayOfInterval,
  endOfMonth,
  endOfYear,
  format,
  getDay,
  isEqual,
  startOfMonth,
  startOfToday,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import { DateRangeFieldProps } from "../types";

export default function DateRageField(
  props: DateRangeFieldProps & { name: string }
) {
  const { label, name, option, helpText } = props;
  const { control, formState } = useFormContext();
  const { field } = useController({
    name: name,
    control: control,
    rules: option,
    defaultValue: {} as {
      from: Date;
      to: Date | undefined;
    },
  });

  const Error = name
    .split(".")
    .reduce((err, path): any => err && err[path], formState.errors);

  const Today = startOfToday();
  const DaysOfLastMonthTillEndOfNextYear = eachDayOfInterval({
    start: startOfWeek(startOfMonth(Today)),
    end: addMonths(endOfMonth(endOfYear(addYears(Today, 2))), 1),
  });
  const [startOfCurrentSelectedMonth, setStartOfCurrentSelectedMonth] =
    useState<Date>(startOfMonth(Today));
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [activeField, setActiveField] = useState<boolean>(false);
  const [firstSelectedDay, setFirstSelectedDay] = useState<Date | undefined>(
    new Date(field.value.from)
  );
  const [lastSelectedDay, setLastSelectedDay] = useState<Date | undefined>(
    new Date(field.value.to)
  );
  const [hoverDay, setHoverDay] = useState<Date | undefined>();

  const InputTriggerRef = useRef<HTMLDivElement>(null);
  const InputTriggerLabelRef = useRef<HTMLLabelElement>(null);

  useEffect(() => {
    Object.assign(InputTriggerRef.current?.style || {}, {
      boxShadow: activeField
        ? Error
          ? "0 0 0 2px var(--nextui-colors-error)"
          : "0 0 0 2px var(--nextui-colors-gray600)"
        : "0 0 0 2px var(--nextui-colors-border)",
      transform: activeField ? "translateY(-2px)" : "translateY(0)",
    });
    Object.assign(InputTriggerLabelRef.current?.style || {}, {
      color: Error
        ? "var(--nextui-colors-error)"
        : activeField || field.value.from
        ? "var(--nextui-colors-text)"
        : "var(--nextui-colors-accents6)",
      top: activeField || field.value.from ? "-50%" : "20%",
      left:
        activeField || field.value.from
          ? "var(--nextui-space-2)"
          : "var(--nextui-space-6)",
    });
  }, [activeField, field.value, Error]);

  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          position: "relative",
        }}
      >
        <Popover
          placement="bottom"
          shouldFlip={true}
          isOpen={openPopover}
          shouldCloseOnBlur={false}
          onOpenChange={(isOpen) => {
            if (!isOpen) field.onBlur;
            if (!isOpen && !lastSelectedDay) {
              setFirstSelectedDay(undefined);
              field.onChange({ from: undefined, to: undefined });
            }
            setOpenPopover(isOpen);
            setActiveField(isOpen);
          }}
        >
          <Popover.Trigger ref={field.ref}>
            <div
              ref={InputTriggerRef}
              onMouseEnter={(e) => {
                if (!activeField)
                  e.currentTarget.style.boxShadow = Error
                    ? "0 0 0 2px var(--nextui-colors-error)"
                    : "0 0 0 2px var(--nextui-colors-gray600)";
              }}
              onMouseLeave={(e) => {
                if (!activeField)
                  e.currentTarget.style.boxShadow =
                    "0 0 0 2px var(--nextui-colors-border)";
              }}
              style={{
                cursor: "pointer",
                transitionDuration: "250ms",
                transitionProperty: "all",
                transitionTimingFunction: "ease",
                padding: "4px 16px",
                width: "100%",
                boxShadow: "0 0 0 2px var(--nextui-colors-border)",
                height: "40px",
                borderRadius: "var(--nextui-space-6)",
                position: "relative",
                transform: "translateY(0)",
              }}
            >
              <label
                ref={InputTriggerLabelRef}
                style={{
                  position: "absolute",
                  top: field.value ? "-50%" : "20%",
                  transitionDuration: "250ms",
                  transitionProperty: "all",
                  transitionTimingFunction: "ease",
                  left: "var(--nextui-space-6)",
                  color: Error
                    ? "var(--nextui-colors-error) !important"
                    : "var(--nextui-colors-accents6)",
                  fontSize: "var(--nextui-fontSizes-sm)",
                  lineHeight: "var(--nextui-lineHeights-md)",
                  fontWeight: "var(--nextui-fontWeights-normal)",
                  userSelect: "none",
                }}
              >
                {label}
              </label>
              <div
                aria-label="value"
                style={{
                  fontSize: "var(--nextui-fontSizes-sm)",
                  alignContent: "center",
                  height: "100%",
                  display: "grid",
                }}
              >
                {field.value.from &&
                  format(new Date(field.value.from), "dd MMMM, yyyy") +
                    "  ⎯  " +
                    (field.value.to
                      ? format(new Date(field.value.to), "dd MMMM, yyyy")
                      : "")}
              </div>
            </div>
          </Popover.Trigger>
          <Popover.Content
            css={{
              bs: "0 2px 10px black",
            }}
          >
            <div
              style={{
                margin: "var(--nextui-space-sm)",
                maxWidth: "535.1px",
              }}
            >
              <Grid.Container gap={1}>
                <Grid xs={6}>
                  <Grid.Container>
                    <Grid
                      xs={12}
                      justify="space-between"
                      alignContent="center"
                      css={{
                        fw: "wrap",
                      }}
                    >
                      <Button
                        ghost
                        disabled={isEqual(
                          startOfCurrentSelectedMonth,
                          startOfMonth(Today)
                        )}
                        onPress={() => {
                          setStartOfCurrentSelectedMonth(
                            subMonths(startOfCurrentSelectedMonth, 1)
                          );
                        }}
                        size={"xs"}
                        css={{
                          w: "24px",
                          minWidth: "0",
                          p: "$0",
                        }}
                        icon={<ChevronLeft size="20px" />}
                      />
                      <div
                        style={{
                          fontSize: "var(--nextui-fontSizes-sm)",
                          userSelect: "none",
                        }}
                      >
                        {format(startOfCurrentSelectedMonth, "MMMM, yyyy")}
                      </div>
                      <div />
                    </Grid>
                    <Grid xs={12}>
                      <Grid.Container gap={1}>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Mo
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Tu
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            We
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Th
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Fr
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Sa
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Su
                          </Text>
                        </Grid>
                      </Grid.Container>
                    </Grid>
                    <Grid
                      xs={12}
                      css={{
                        border: "0.5px solid var(--nextui-colors-border)",
                      }}
                    />
                    <Grid xs={12}>
                      <Grid.Container gap={1}>
                        {Array.from({ length: 42 })
                          .fill("")
                          .map((_, idx) => {
                            const date =
                              DaysOfLastMonthTillEndOfNextYear[
                                idx +
                                  DaysOfLastMonthTillEndOfNextYear.findIndex(
                                    (d) =>
                                      isEqual(
                                        d,
                                        startOfWeek(
                                          startOfCurrentSelectedMonth,
                                          { weekStartsOn: 1 }
                                        )
                                      )
                                  )
                              ];

                            const isNotSelectableDate =
                              date < Today ||
                              date < startOfCurrentSelectedMonth ||
                              date > endOfMonth(startOfCurrentSelectedMonth);
                            return (
                              <Grid
                                key={idx}
                                xs={1.714}
                                justify="center"
                                css={{
                                  m: "3px 0",
                                  position: "relative",
                                  transition: "$default",
                                  borderRadius: "var(--nextui-space-6)",
                                  cursor: !isNotSelectableDate
                                    ? "pointer"
                                    : "default",
                                  background:
                                    (firstSelectedDay &&
                                      isEqual(firstSelectedDay, date)) ||
                                    (lastSelectedDay &&
                                      isEqual(lastSelectedDay, date))
                                      ? "$primary"
                                      : "transparent",
                                }}
                                onMouseEnter={() => {
                                  firstSelectedDay && setHoverDay(date);
                                }}
                                onMouseLeave={() => {
                                  setHoverDay(undefined);
                                }}
                                onClick={() => {
                                  if (isNotSelectableDate) return;
                                  if (
                                    !firstSelectedDay ||
                                    lastSelectedDay ||
                                    date < firstSelectedDay
                                  ) {
                                    setFirstSelectedDay(date);
                                    field.onChange({
                                      from: date,
                                      to: undefined,
                                    });
                                    setLastSelectedDay(undefined);
                                    return;
                                  } else {
                                    setLastSelectedDay(date);
                                    field.value?.from &&
                                      field.onChange({
                                        from: field.value.from,
                                        to: date,
                                      });
                                  }
                                }}
                              >
                                <time
                                  dateTime={format(date, "yyyy-MM-dd")}
                                  style={{
                                    transition:
                                      "var(--nextui-transitions-default)",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  <Text
                                    size={"$sm"}
                                    css={{
                                      userSelect: "none",
                                      color: isNotSelectableDate
                                        ? "$accents6"
                                        : getDay(date) == 6 || getDay(date) == 0
                                        ? "$accents8"
                                        : "$text",
                                    }}
                                  >
                                    {format(date, "d")}
                                  </Text>
                                  <div
                                    style={{
                                      zIndex: -10000,
                                      transition:
                                        "var(--nextui-transitions-defaul)",
                                      top: 0,
                                      left: 0,
                                      width: "100%",
                                      height: "100%",
                                      position: "absolute",
                                      userSelect: "none",
                                      background:
                                        firstSelectedDay &&
                                        ((lastSelectedDay &&
                                          date >= firstSelectedDay &&
                                          date <= lastSelectedDay) ||
                                          (!lastSelectedDay &&
                                            hoverDay &&
                                            date <= hoverDay &&
                                            date >= firstSelectedDay))
                                          ? "rgba(255,255,255,0.1)"
                                          : "none",
                                      ...(firstSelectedDay &&
                                        isEqual(firstSelectedDay, date) && {
                                          borderTopLeftRadius:
                                            "var(--nextui-space-6)",
                                          borderBottomLeftRadius:
                                            "var(--nextui-space-6)",
                                        }),
                                      ...(lastSelectedDay &&
                                        isEqual(lastSelectedDay, date) && {
                                          borderTopRightRadius:
                                            "var(--nextui-space-6)",
                                          borderBottomRightRadius:
                                            "var(--nextui-space-6)",
                                        }),
                                      ...(getDay(date) == 1 && {
                                        borderTopLeftRadius:
                                          "var(--nextui-space-2)",
                                        borderBottomLeftRadius:
                                          "var(--nextui-space-2)",
                                      }),
                                      ...(getDay(date) == 0 && {
                                        borderTopRightRadius:
                                          "var(--nextui-space-2)",
                                        borderBottomRightRadius:
                                          "var(--nextui-space-2)",
                                      }),
                                    }}
                                  />
                                </time>
                              </Grid>
                            );
                          })}
                      </Grid.Container>
                    </Grid>
                  </Grid.Container>
                </Grid>
                <Grid xs={6}>
                  <Grid.Container>
                    <Grid
                      xs={12}
                      justify="space-between"
                      alignContent="center"
                      css={{
                        fw: "wrap",
                      }}
                    >
                      <div />
                      <div
                        style={{
                          fontSize: "var(--nextui-fontSizes-sm)",
                        }}
                      >
                        {format(
                          addMonths(startOfCurrentSelectedMonth, 1),
                          "MMMM, yyyy"
                        )}
                      </div>
                      <Button
                        disabled={isEqual(
                          startOfCurrentSelectedMonth,
                          startOfMonth(
                            subMonths(
                              DaysOfLastMonthTillEndOfNextYear[
                                DaysOfLastMonthTillEndOfNextYear.length - 1
                              ],
                              2
                            )
                          )
                        )}
                        onPress={() => {
                          setStartOfCurrentSelectedMonth(
                            addMonths(startOfCurrentSelectedMonth, 1)
                          );
                        }}
                        ghost
                        size={"xs"}
                        css={{
                          w: "24px",
                          minWidth: "0",
                          p: "$0",
                        }}
                        icon={<ChevronRight size="20px" />}
                      />
                    </Grid>
                    <Grid xs={12}>
                      <Grid.Container gap={1}>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Mo
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Tu
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            We
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Th
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Fr
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Sa
                          </Text>
                        </Grid>
                        <Grid xs={1.714} justify="center">
                          <Text css={{ userSelect: "none" }} size={"$sm"}>
                            Su
                          </Text>
                        </Grid>
                      </Grid.Container>
                    </Grid>
                    <Grid
                      xs={12}
                      css={{
                        border: "0.5px solid var(--nextui-colors-border)",
                      }}
                    />
                    <Grid xs={12}>
                      <Grid.Container gap={1}>
                        {Array.from({ length: 42 })
                          .fill("")
                          .map((_, idx) => {
                            const date =
                              DaysOfLastMonthTillEndOfNextYear[
                                idx +
                                  DaysOfLastMonthTillEndOfNextYear.findIndex(
                                    (d) =>
                                      isEqual(
                                        d,
                                        startOfWeek(
                                          addMonths(
                                            startOfCurrentSelectedMonth,
                                            1
                                          ),
                                          { weekStartsOn: 1 }
                                        )
                                      )
                                  )
                              ];

                            const isNotSelectableDate =
                              date < Today ||
                              date <
                                addMonths(startOfCurrentSelectedMonth, 1) ||
                              date >
                                endOfMonth(
                                  addMonths(startOfCurrentSelectedMonth, 1)
                                );

                            return (
                              <Grid
                                key={idx}
                                xs={1.714}
                                justify="center"
                                css={{
                                  m: "3px 0",
                                  position: "relative",
                                  transition: "$default",
                                  borderRadius: "var(--nextui-space-6)",
                                  cursor: !isNotSelectableDate
                                    ? "pointer"
                                    : "default",
                                  background:
                                    (firstSelectedDay &&
                                      isEqual(firstSelectedDay, date)) ||
                                    (lastSelectedDay &&
                                      isEqual(lastSelectedDay, date))
                                      ? "$primary"
                                      : "transparent",
                                }}
                                onClick={() => {
                                  if (isNotSelectableDate) return;
                                  if (
                                    !firstSelectedDay ||
                                    lastSelectedDay ||
                                    date < firstSelectedDay
                                  ) {
                                    setFirstSelectedDay(date);
                                    field.onChange({
                                      from: date,
                                      to: undefined,
                                    });
                                    setLastSelectedDay(undefined);
                                    return;
                                  } else {
                                    setLastSelectedDay(date);
                                    field.value?.from &&
                                      field.onChange({
                                        from: field.value.from,
                                        to: date,
                                      });
                                  }
                                }}
                                onMouseEnter={() => {
                                  firstSelectedDay && setHoverDay(date);
                                }}
                                onMouseLeave={() => {
                                  setHoverDay(undefined);
                                }}
                              >
                                <time
                                  dateTime={format(date, "yyyy-MM-dd")}
                                  style={{
                                    transition:
                                      "var(--nextui-transitions-default)",
                                    width: "100%",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    display: "flex",
                                  }}
                                >
                                  <Text
                                    size={"$sm"}
                                    css={{
                                      userSelect: "none",
                                      color: isNotSelectableDate
                                        ? "$accents6"
                                        : getDay(date) == 6 || getDay(date) == 0
                                        ? "$accents8"
                                        : "$text",
                                    }}
                                  >
                                    {format(date, "d")}
                                  </Text>
                                  <div
                                    style={{
                                      zIndex: -10000,
                                      transition:
                                        "var(--nextui-transitions-default))",
                                      top: 0,
                                      left: 0,
                                      width: "100%",
                                      height: "100%",
                                      position: "absolute",
                                      userSelect: "none",
                                      // borderRadius: "var(--nextui-space-6)",
                                      background:
                                        firstSelectedDay &&
                                        ((lastSelectedDay &&
                                          date >= firstSelectedDay &&
                                          date <= lastSelectedDay) ||
                                          (!lastSelectedDay &&
                                            hoverDay &&
                                            date <= hoverDay &&
                                            date >= firstSelectedDay))
                                          ? "rgba(255,255,255,0.1)"
                                          : "none",
                                      ...(firstSelectedDay &&
                                        isEqual(firstSelectedDay, date) && {
                                          borderTopLeftRadius:
                                            "var(--nextui-space-6)",
                                          borderBottomLeftRadius:
                                            "var(--nextui-space-6)",
                                        }),
                                      ...(lastSelectedDay &&
                                        isEqual(lastSelectedDay, date) && {
                                          borderTopRightRadius:
                                            "var(--nextui-space-6)",
                                          borderBottomRightRadius:
                                            "var(--nextui-space-6)",
                                        }),
                                      ...(getDay(date) == 1 && {
                                        borderTopLeftRadius:
                                          "var(--nextui-space-2)",
                                        borderBottomLeftRadius:
                                          "var(--nextui-space-2)",
                                      }),
                                      ...(getDay(date) == 0 && {
                                        borderTopRightRadius:
                                          "var(--nextui-space-2)",
                                        borderBottomRightRadius:
                                          "var(--nextui-space-2)",
                                      }),
                                    }}
                                  />
                                </time>
                              </Grid>
                            );
                          })}
                      </Grid.Container>
                    </Grid>
                  </Grid.Container>
                </Grid>
              </Grid.Container>
            </div>
          </Popover.Content>
        </Popover>
        <div
          style={{
            position: "absolute",
            bottom: "calc(2 * calc(var(--nextui-space-5)*-1))",
            right: 10,
            display: !Error ? "none" : "inherit",
          }}
        >
          <Text
            css={{
              m: "var(--nextui-space-1) 0 0 var(--nextui-space-5)",
              fontSize: "var(--nextui-space-5)",
              color: "var(--nextui-colors-error)",
            }}
          >
            {Error && Error.message + ""}
          </Text>
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
