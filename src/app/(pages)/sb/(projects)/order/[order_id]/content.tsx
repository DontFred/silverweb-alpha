"use client";
import Toolbar from "@/comp/sw/app/DataDisplay/Toolbar";
import Layout from "@/comp/sw/ui/Layout";
import ContainerCard from "@/comp/sw/ui/cards/ContainerCard";
import {
  Grid,
  Loading,
  Text,
  Table,
  Popover,
  Button,
  Spacer,
  Input,
} from "@nextui-org/react";
import { Fragment, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StyleObject from "csstype";
import ContactCard from "@/comp/sw/ui/cards/ContactCard";
import { createRandomComment } from "@/faker";
import { faker } from "@faker-js/faker";
import TextAreaField from "@/comp/sw/app/FormBuilder/ui/TextAreaField";
import AddressField from "@/comp/sw/app/FormBuilder/ui/AddressField";
import dynamic from "next/dynamic";
import { OrderDataProps } from "./page";
import DatePickerField from "@/comp/sw/app/FormBuilder/ui/DatePickerField";
import FileCard from "@/comp/sw/ui/cards/FileCard";
import { Pencil } from "lucide-react";
import TextField from "@/comp/sw/app/FormBuilder/ui/TextField";
import CompanyCard from "@/comp/sw/ui/cards/CompanyCard";
import NumberField from "@/comp/sw/app/FormBuilder/ui/NumberField";

const Map = dynamic(() => import("@/comp/sw/app/Map"), {
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        background: "var(--nextui-colors-gray100)",
      }}
    >
      <Loading
        css={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)" }}
      />
    </div>
  ),
  ssr: false,
});

const FieldsetStyling: StyleObject.Properties = {
  margin: 0,
  padding: 0,
  border: 0,
  minInlineSize: "unset",
};

export default function OrderInterfaceContent({
  orderData,
}: {
  orderData: OrderDataProps;
}) {
  const form = useForm({
    defaultValues: {
      generalComment: orderData?.commentToGeneralInformation,
      projectAddress: {
        streetNo: orderData?.projectAddress?.streetNo,
        city: orderData?.projectAddress?.city,
        postalCode: orderData?.projectAddress?.postCode,
        country: orderData?.projectAddress?.country,
      },
      startDate: orderData?.start.toISOString().split("T")[0],
      startTime: orderData?.start.toLocaleTimeString(),
      deliveryAddress: {
        streetNo: orderData?.deliveryAddress?.streetNo,
        city: orderData?.deliveryAddress?.city,
        postalCode: orderData?.deliveryAddress?.postCode,
        country: orderData?.deliveryAddress?.country,
      },
      inductionAddress: {
        streetNo: orderData?.inductionAddress?.streetNo,
        city: orderData?.inductionAddress?.city,
        postalCode: orderData?.inductionAddress?.postCode,
        country: orderData?.inductionAddress?.country,
      },
      inductionDate: orderData?.inductionDateTime.toISOString().split("T")[0],
      inductionTime: orderData?.inductionDateTime.toLocaleTimeString(),
      duration: orderData?.estDuration,
      endDate: orderData?.end.toISOString().split("T")[0],
      durationComment: orderData?.commentToDuration,
      projectType: orderData?.project?.type,
      workingHours: orderData?.workingHours,
      breakTime: orderData?.breakTime,
      breakPaid: orderData?.breaksPaid,
      rotation: orderData?.rotation,
      invoicingAddress: {
        streetNo: orderData?.invoicingAddress?.streetNo,
        city: orderData?.invoicingAddress?.city,
        postalCode: orderData?.invoicingAddress?.postCode,
        country: orderData?.invoicingAddress?.country,
      },
      invoicingEmail: orderData?.invoicingEmail,
      orgaNumber: orderData?.orgaNumber,
      vatNumber: orderData?.vatNumber,
      rct: orderData?.rct,
      invoicingFrequency: orderData?.invoicingFrequency,
      payTerm: orderData?.payTerm,
      invoicingComment: orderData?.commentToInvoicing,
    },
  });
  const {
    formState: { isSubmitting },
  } = form;
  async function saveChangedData(data: Record<string, any>) {
    await new Promise((res) => setTimeout(() => res(" "), 500)).then(() => {
      console.log(data);
    });
  }

  const [editable, setEditable] = useState<boolean>(false);
  const FormRef = useRef<HTMLFormElement>(null);
  return (
    <Layout>
      <FormProvider {...form}>
        <form ref={FormRef} onSubmit={form.handleSubmit(saveChangedData)}>
          <fieldset style={FieldsetStyling} disabled={!editable}>
            <Toolbar
              onSafe={async () => {
                FormRef.current?.requestSubmit();
              }}
              onModeChange={(seeMode) => {
                setEditable(!seeMode);
              }}
              isLoading={isSubmitting}
            />
            <Grid.Container gap={0} css={{ p: 30 }}>
              <Grid xs={12} css={{ h: "60px" }}>
                <div
                  style={{
                    textAlign: "end",
                  }}
                >
                  <Text h2 role="banner">
                    Order | {orderData?.orderCode}
                  </Text>
                </div>
              </Grid>
              <Grid xs={12} css={{ h: "30px" }}>
                <Text size="$sm" css={{ m: "0 0 0 24px" }}>
                  Created at 
                </Text>
                <Text weight="light" size="$sm">
                  {faker.date.past().toLocaleString("en-IE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </Text>
              </Grid>
              <Grid xs={12} css={{ h: "calc(100% - 120px)" }}>
                <Grid.Container gap={1}>
                  <Grid xs={12}>
                    <div style={{ width: "100%" }}>
                      <Grid.Container alignContent="stretch">
                        <Grid xs={12} sm={7.5}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexFlow: "column",
                            }}
                          >
                            <Text css={{ flex: "0 1 auto" }} weight="light">
                              Contacts
                            </Text>
                            <Grid.Container
                              gap={2}
                              justify="space-between"
                              css={{ flex: "1 1 auto" }}
                            >
                              <Grid xs={12}>
                                <ContainerCard>
                                  <Grid.Container gap={2} alignItems="stretch">
                                    {orderData?.contacts.map((contact, idx) => (
                                      <Fragment key={idx}>
                                        <Grid>
                                          <ContactCard
                                            contact={{
                                              ...contact.contact,
                                              ...{
                                                comment: createRandomComment(),
                                              },
                                            }}
                                          />
                                        </Grid>
                                      </Fragment>
                                    ))}
                                  </Grid.Container>
                                </ContainerCard>
                              </Grid>
                            </Grid.Container>
                          </div>
                        </Grid>
                        <Grid xs={12} sm={4.5}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexFlow: "column",
                            }}
                          >
                            <Text css={{ flex: "0 1 auto" }} weight="light">
                              SilverBack Information
                            </Text>
                            <Grid.Container
                              gap={2}
                              justify="space-between"
                              css={{ flex: "1 1 auto" }}
                            >
                              <Grid xs={12}>
                                <ContainerCard>
                                  <Grid.Container gap={2} alignItems="stretch">
                                    <Grid xs={12}>
                                      <ContactCard
                                        contact={{
                                          ...orderData?.accountManager?.contact,
                                          ...{ comment: createRandomComment() },
                                        }}
                                      />
                                    </Grid>
                                    <Grid xs={12}>
                                      <TextAreaField
                                        type="textarea"
                                        name="generalComment"
                                        label="Comment"
                                      />
                                    </Grid>
                                  </Grid.Container>
                                </ContainerCard>
                              </Grid>
                            </Grid.Container>
                          </div>
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                  <Grid xs={12}>
                    <div style={{ width: "100%" }}>
                      <Grid.Container alignContent="stretch">
                        <Grid xs={12}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexFlow: "column",
                            }}
                          >
                            <Text css={{ flex: "0 1 auto" }} weight="light">
                              Logistic
                            </Text>
                            <Grid.Container
                              gap={2}
                              justify="space-between"
                              css={{ flex: "1 1 auto" }}
                            >
                              <Grid xs={12}>
                                <ContainerCard>
                                  <Grid.Container
                                    gap={2}
                                    css={{
                                      minHeight: 140,
                                    }}
                                  >
                                    <Grid xs={6}>
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexFlow: "column",
                                        }}
                                      >
                                        <Text
                                          css={{ flex: "0 1 auto" }}
                                          weight="light"
                                        >
                                          Project Address
                                        </Text>
                                        <Grid.Container
                                          gap={2}
                                          justify="space-between"
                                          css={{ flex: "1 1 auto" }}
                                        >
                                          <Grid xs={12}>
                                            <ContainerCard>
                                              <Grid.Container
                                                gap={2}
                                                alignItems="stretch"
                                              >
                                                <Grid xs={6}>
                                                  <AddressField
                                                    type="address"
                                                    name="projectAddress"
                                                    option={{
                                                      required: {
                                                        message:
                                                          "This field can't be empty",
                                                        value: true,
                                                      },
                                                    }}
                                                  />
                                                </Grid>
                                                <Grid xs={6}>
                                                  <ContainerCard
                                                    noBorder
                                                    noPadding
                                                    overflowHidden
                                                  >
                                                    <Map
                                                      centerMarker
                                                      marker={[
                                                        {
                                                          name: orderData?.orderCode,
                                                          type: "Project Address",
                                                          address:
                                                            orderData
                                                              ?.projectAddress
                                                              ?.coordinates,
                                                        },
                                                      ]}
                                                    />
                                                  </ContainerCard>
                                                </Grid>
                                              </Grid.Container>
                                            </ContainerCard>
                                          </Grid>
                                        </Grid.Container>
                                      </div>
                                    </Grid>
                                    <Grid xs={6}>
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexFlow: "column",
                                        }}
                                      >
                                        <Text
                                          css={{ flex: "0 1 auto" }}
                                          weight="light"
                                        >
                                          Start
                                        </Text>
                                        <Grid.Container
                                          gap={2}
                                          justify="space-between"
                                          css={{ flex: "1 1 auto" }}
                                        >
                                          <Grid xs={12}>
                                            <ContainerCard>
                                              <Grid.Container
                                                gap={2}
                                                alignItems="stretch"
                                                css={{ height: "100%" }}
                                              >
                                                <Grid
                                                  xs={6}
                                                  alignItems="stretch"
                                                >
                                                  <Grid.Container>
                                                    <Grid
                                                      xs={12}
                                                      alignItems="center"
                                                    >
                                                      <DatePickerField
                                                        date
                                                        type="date"
                                                        name="startDate"
                                                        label="Date"
                                                      />
                                                    </Grid>
                                                    <Grid
                                                      xs={12}
                                                      alignItems="center"
                                                    >
                                                      <DatePickerField
                                                        time
                                                        type="date"
                                                        name="startTime"
                                                        label="Time"
                                                      />
                                                    </Grid>
                                                  </Grid.Container>
                                                </Grid>
                                                <Grid
                                                  xs={6}
                                                  alignItems="center"
                                                >
                                                  <ContactCard
                                                    contact={{
                                                      ...orderData?.meetingPerson,
                                                      ...{
                                                        comment:
                                                          createRandomComment(),
                                                      },
                                                    }}
                                                  />
                                                </Grid>
                                              </Grid.Container>
                                            </ContainerCard>
                                          </Grid>
                                        </Grid.Container>
                                      </div>
                                    </Grid>
                                    <Grid xs={6}>
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexFlow: "column",
                                        }}
                                      >
                                        <Text
                                          css={{ flex: "0 1 auto" }}
                                          weight="light"
                                        >
                                          ID06 Delivery Address
                                        </Text>
                                        <Grid.Container
                                          gap={2}
                                          justify="space-between"
                                          css={{ flex: "1 1 auto" }}
                                        >
                                          <Grid xs={12}>
                                            <ContainerCard>
                                              <Grid.Container
                                                gap={2}
                                                alignItems="stretch"
                                              >
                                                <Grid xs={6}>
                                                  <AddressField
                                                    type="address"
                                                    name="deliveryAddress"
                                                    option={{
                                                      required: {
                                                        message:
                                                          "This field can't be empty",
                                                        value: true,
                                                      },
                                                    }}
                                                  />
                                                </Grid>
                                                <Grid xs={6}>
                                                  <ContainerCard
                                                    noBorder
                                                    noPadding
                                                    overflowHidden
                                                  >
                                                    <Map
                                                      centerMarker
                                                      marker={[
                                                        {
                                                          name: orderData?.orderCode,
                                                          type: "Delivery Address",
                                                          address:
                                                            orderData
                                                              ?.deliveryAddress
                                                              ?.coordinates,
                                                        },
                                                      ]}
                                                    />
                                                  </ContainerCard>
                                                </Grid>
                                              </Grid.Container>
                                            </ContainerCard>
                                          </Grid>
                                        </Grid.Container>
                                      </div>
                                    </Grid>
                                    <Grid xs={6}>
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexFlow: "column",
                                        }}
                                      >
                                        <Text
                                          css={{ flex: "0 1 auto" }}
                                          weight="light"
                                        >
                                          Induction
                                        </Text>
                                        <Grid.Container
                                          gap={2}
                                          justify="space-between"
                                          css={{ flex: "1 1 auto" }}
                                        >
                                          <Grid xs={12}>
                                            <ContainerCard>
                                              <Grid.Container
                                                gap={2}
                                                alignItems="stretch"
                                              >
                                                <Grid xs={6}>
                                                  <AddressField
                                                    type="address"
                                                    name="inductionAddress"
                                                    option={{
                                                      required: {
                                                        message:
                                                          "This field can't be empty",
                                                        value: true,
                                                      },
                                                    }}
                                                  />
                                                </Grid>
                                                <Grid
                                                  xs={6}
                                                  alignItems="stretch"
                                                >
                                                  <Grid.Container>
                                                    <Grid
                                                      xs={12}
                                                      alignItems="center"
                                                    >
                                                      <DatePickerField
                                                        date
                                                        type="date"
                                                        name="inductionDate"
                                                        label="Date"
                                                      />
                                                    </Grid>
                                                    <Grid
                                                      xs={12}
                                                      alignItems="center"
                                                    >
                                                      <DatePickerField
                                                        time
                                                        type="date"
                                                        name="inductionTime"
                                                        label="Time"
                                                      />
                                                    </Grid>
                                                  </Grid.Container>
                                                </Grid>
                                              </Grid.Container>
                                            </ContainerCard>
                                          </Grid>
                                        </Grid.Container>
                                      </div>
                                    </Grid>
                                    <Grid xs={12}>
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexFlow: "column",
                                        }}
                                      >
                                        <Text
                                          css={{ flex: "0 1 auto" }}
                                          weight="light"
                                        >
                                          Induction Forms
                                        </Text>
                                        <Grid.Container
                                          gap={2}
                                          justify="space-between"
                                          css={{ flex: "1 1 auto" }}
                                        >
                                          <Grid xs={12}>
                                            <ContainerCard>
                                              <Grid.Container
                                                gap={2}
                                                alignItems="stretch"
                                              >
                                                {orderData?.inductionForms.map(
                                                  (form, idx) => (
                                                    <Grid key={idx}>
                                                      <FileCard
                                                        file={form.file}
                                                      />
                                                    </Grid>
                                                  )
                                                )}
                                              </Grid.Container>
                                            </ContainerCard>
                                          </Grid>
                                        </Grid.Container>
                                      </div>
                                    </Grid>
                                  </Grid.Container>
                                </ContainerCard>
                              </Grid>
                            </Grid.Container>
                          </div>
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                  <Grid xs={12}>
                    <div style={{ width: "100%" }}>
                      <Grid.Container alignContent="stretch">
                        <Grid xs={12}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexFlow: "column",
                            }}
                          >
                            <Text css={{ flex: "0 1 auto" }} weight="light">
                              Requirements and Project Information
                            </Text>
                            <Grid.Container
                              gap={2}
                              justify="space-between"
                              css={{ flex: "1 1 auto" }}
                            >
                              <Grid xs={12}>
                                <ContainerCard>
                                  <Grid.Container
                                    gap={0}
                                    css={{
                                      minHeight: 140,
                                    }}
                                  >
                                    <Grid xs={12}>
                                      <Grid.Container gap={0}>
                                        <Grid xs={8}>
                                          <Grid.Container gap={2}>
                                            <Grid xs={6}>
                                              <div
                                                style={{
                                                  width: "100%",
                                                  display: "flex",
                                                  flexFlow: "column",
                                                }}
                                              >
                                                <Text
                                                  css={{ flex: "0 1 auto" }}
                                                  weight="light"
                                                >
                                                  Worker required
                                                </Text>
                                                <Grid.Container
                                                  gap={2}
                                                  justify="space-between"
                                                  css={{ flex: "1 1 auto" }}
                                                >
                                                  <Grid xs={12}>
                                                    <ContainerCard noPadding>
                                                      <WorkerReqTable
                                                        workerRequired={
                                                          orderData?.workerRequired
                                                        }
                                                      />
                                                    </ContainerCard>
                                                  </Grid>
                                                </Grid.Container>
                                              </div>
                                            </Grid>
                                            <Grid xs={6}>
                                              <div
                                                style={{
                                                  width: "100%",
                                                  display: "flex",
                                                  flexFlow: "column",
                                                }}
                                              >
                                                <Text
                                                  css={{ flex: "0 1 auto" }}
                                                  weight="light"
                                                >
                                                  Duration
                                                </Text>
                                                <Grid.Container
                                                  gap={2}
                                                  justify="space-between"
                                                  css={{ flex: "1 1 auto" }}
                                                >
                                                  <Grid xs={12}>
                                                    <ContainerCard>
                                                      <Grid.Container
                                                        gap={2}
                                                        alignItems="stretch"
                                                      >
                                                        <Grid xs={12}>
                                                          <TextField
                                                            type="text"
                                                            label="Est. duration"
                                                            name="duration"
                                                          />
                                                        </Grid>
                                                        <Grid xs={12}>
                                                          <DatePickerField
                                                            type="date"
                                                            date
                                                            label="End date"
                                                            name="endDate"
                                                          />
                                                        </Grid>
                                                        <Grid xs={12}>
                                                          <TextAreaField
                                                            type="textarea"
                                                            label="Duration Comment"
                                                            name="durationComment"
                                                          />
                                                        </Grid>
                                                      </Grid.Container>
                                                    </ContainerCard>
                                                  </Grid>
                                                </Grid.Container>
                                              </div>
                                            </Grid>
                                            <Grid xs={12}>
                                              <div
                                                style={{
                                                  width: "100%",
                                                  display: "flex",
                                                  flexFlow: "column",
                                                }}
                                              >
                                                <Text
                                                  css={{ flex: "0 1 auto" }}
                                                  weight="light"
                                                >
                                                  Working hours
                                                </Text>
                                                <Grid.Container
                                                  gap={2}
                                                  justify="space-between"
                                                  css={{ flex: "1 1 auto" }}
                                                >
                                                  <Grid xs={12}>
                                                    <ContainerCard>
                                                      <Grid.Container
                                                        gap={2}
                                                        alignItems="stretch"
                                                      >
                                                        <Grid xs={6}>
                                                          <Grid.Container
                                                            gap={0}
                                                          >
                                                            <Grid xs>
                                                              <NumberField
                                                                type="number"
                                                                name="workingHours.mo"
                                                                label="Mo."
                                                              />
                                                            </Grid>
                                                            <Grid>
                                                              <Spacer x={0.5} />
                                                            </Grid>
                                                            <Grid xs>
                                                              <NumberField
                                                                type="number"
                                                                name="workingHours.tu"
                                                                label="Tu."
                                                              />
                                                            </Grid>
                                                            <Grid>
                                                              <Spacer x={0.5} />
                                                            </Grid>
                                                            <Grid xs>
                                                              <NumberField
                                                                type="number"
                                                                name="workingHours.we"
                                                                label="We."
                                                              />
                                                            </Grid>
                                                            <Grid xs={12}>
                                                              <Spacer y={0.5} />
                                                            </Grid>
                                                            <Grid xs>
                                                              <NumberField
                                                                type="number"
                                                                name="workingHours.th"
                                                                label="Th."
                                                              />
                                                            </Grid>
                                                            <Grid>
                                                              <Spacer x={0.5} />
                                                            </Grid>
                                                            <Grid xs>
                                                              <NumberField
                                                                type="number"
                                                                name="workingHours.fr"
                                                                label="Fr."
                                                              />
                                                            </Grid>
                                                            <Grid>
                                                              <Spacer x={0.5} />
                                                            </Grid>
                                                            <Grid xs>
                                                              <NumberField
                                                                type="number"
                                                                name="workingHours.sa"
                                                                label="Sa."
                                                              />
                                                            </Grid>
                                                            <Grid xs={12}>
                                                              <Spacer y={0.5} />
                                                            </Grid>
                                                            <Grid xs>
                                                              <NumberField
                                                                type="number"
                                                                name="workingHours.su"
                                                                label="Su."
                                                              />
                                                            </Grid>
                                                            <Grid>
                                                              <Spacer x={0.5} />
                                                            </Grid>
                                                            <Grid xs={8}>
                                                              <Input
                                                                bordered
                                                                fullWidth
                                                                labelPlaceholder="Total"
                                                                readOnly
                                                                value={
                                                                  Object.values(
                                                                    form.watch(
                                                                      "workingHours"
                                                                    )
                                                                  ).reduce(
                                                                    (a, b) =>
                                                                      a + b,
                                                                    0
                                                                  ) + "h"
                                                                }
                                                              />
                                                            </Grid>
                                                          </Grid.Container>
                                                        </Grid>
                                                        <Grid
                                                          xs={6}
                                                          alignItems="center"
                                                        >
                                                          <Grid.Container
                                                            gap={0}
                                                          >
                                                            <Grid xs={12}>
                                                              <TextField
                                                                type="text"
                                                                name="breakTime"
                                                                label="Breaks"
                                                              />
                                                              <Spacer x={1} />
                                                              <TextField
                                                                type="text"
                                                                name="breakPaid"
                                                              />
                                                            </Grid>
                                                            <Spacer y={1.17} />
                                                            <Grid xs={12}>
                                                              <TextField
                                                                type="text"
                                                                name="rotation"
                                                                label="Rotation"
                                                              />
                                                            </Grid>
                                                          </Grid.Container>
                                                        </Grid>
                                                      </Grid.Container>
                                                    </ContainerCard>
                                                  </Grid>
                                                </Grid.Container>
                                              </div>
                                            </Grid>
                                          </Grid.Container>
                                        </Grid>
                                        <Grid xs={4}>
                                          <Grid.Container gap={2}>
                                            <Grid xs={12}>
                                              <div
                                                style={{
                                                  width: "100%",
                                                  display: "flex",
                                                  flexFlow: "column",
                                                }}
                                              >
                                                <Text
                                                  css={{ flex: "0 1 auto" }}
                                                  weight="light"
                                                >
                                                  Project Information
                                                </Text>
                                                <Grid.Container
                                                  gap={2}
                                                  justify="space-between"
                                                  css={{ flex: "1 1 auto" }}
                                                >
                                                  <Grid xs={12}>
                                                    <ContainerCard>
                                                      <Grid.Container
                                                        gap={2}
                                                        alignItems="stretch"
                                                      >
                                                        <Grid xs={12}>
                                                          <CompanyCard
                                                            company={{
                                                              ...orderData?.client,
                                                              ...{
                                                                comment:
                                                                  createRandomComment(),
                                                              },
                                                            }}
                                                          />
                                                        </Grid>
                                                        <Grid xs={12}>
                                                          <TextField
                                                            type="text"
                                                            name="projectType"
                                                            label="Project type"
                                                          />
                                                        </Grid>
                                                        <Grid xs={12}>
                                                          <Text
                                                            size={"$sm"}
                                                            css={{
                                                              pl: "$3",
                                                            }}
                                                          >
                                                            <b>
                                                              Work being
                                                              performed
                                                            </b>
                                                            <br />
                                                            {orderData?.workPerformed?.map(
                                                              (work, idx) => (
                                                                <Fragment
                                                                  key={idx}
                                                                >
                                                                    • 
                                                                  {
                                                                    work?.work
                                                                      ?.name
                                                                  }
                                                                  <br />
                                                                </Fragment>
                                                              )
                                                            )}
                                                          </Text>
                                                        </Grid>

                                                        <Grid xs={12}>
                                                          <Text
                                                            size={"$sm"}
                                                            css={{
                                                              pl: "$3",
                                                            }}
                                                          >
                                                            <b>
                                                              Training courses
                                                              required
                                                            </b>
                                                            <br />
                                                            {orderData?.trainingCoursesRequired?.map(
                                                              (course, idx) => (
                                                                <Fragment
                                                                  key={idx}
                                                                >
                                                                    • 
                                                                  {
                                                                    course
                                                                      ?.course
                                                                      ?.name
                                                                  }
                                                                  <br />
                                                                </Fragment>
                                                              )
                                                            )}
                                                          </Text>
                                                        </Grid>
                                                      </Grid.Container>
                                                    </ContainerCard>
                                                  </Grid>
                                                </Grid.Container>
                                              </div>
                                            </Grid>
                                          </Grid.Container>
                                        </Grid>
                                      </Grid.Container>
                                    </Grid>
                                  </Grid.Container>
                                </ContainerCard>
                              </Grid>
                            </Grid.Container>
                          </div>
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                  <Grid xs={12}>
                    <div style={{ width: "100%" }}>
                      <Grid.Container alignContent="stretch">
                        <Grid xs={12}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexFlow: "column",
                            }}
                          >
                            <Text css={{ flex: "0 1 auto" }} weight="light">
                              Invoicing Information
                            </Text>
                            <Grid.Container
                              gap={2}
                              justify="space-between"
                              css={{ flex: "1 1 auto" }}
                            >
                              <Grid xs={12}>
                                <ContainerCard>
                                  <Grid.Container
                                    gap={2}
                                    css={{
                                      minHeight: 140,
                                    }}
                                  >
                                    <Grid xs={4}>
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexFlow: "column",
                                        }}
                                      >
                                        <Text
                                          css={{ flex: "0 1 auto" }}
                                          weight="light"
                                        >
                                          Invoicing Details
                                        </Text>
                                        <Grid.Container
                                          gap={2}
                                          justify="space-between"
                                          css={{ flex: "1 1 auto" }}
                                        >
                                          <Grid xs={12}>
                                            <ContainerCard>
                                              <Grid.Container
                                                gap={2}
                                                alignItems="stretch"
                                              >
                                                <Grid xs={12}>
                                                  <AddressField
                                                    type="address"
                                                    name="invoicingAddress"
                                                    option={{
                                                      required: {
                                                        message:
                                                          "This field can't be empty",
                                                        value: true,
                                                      },
                                                    }}
                                                  />
                                                </Grid>
                                                <Grid xs={12}>
                                                  <TextAreaField
                                                    type="textarea"
                                                    name="invoicingEmail"
                                                    label="Invoicing emails"
                                                  />
                                                </Grid>
                                              </Grid.Container>
                                            </ContainerCard>
                                          </Grid>
                                        </Grid.Container>
                                      </div>
                                    </Grid>
                                    <Grid xs={4}>
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexFlow: "column",
                                        }}
                                      >
                                        <Text
                                          css={{ flex: "0 1 auto" }}
                                          weight="light"
                                        >
                                          Legal Details
                                        </Text>
                                        <Grid.Container
                                          gap={2}
                                          justify="space-between"
                                          css={{ flex: "1 1 auto" }}
                                        >
                                          <Grid xs={12}>
                                            <ContainerCard>
                                              <Grid.Container
                                                gap={2}
                                                alignItems="stretch"
                                              >
                                                <Grid xs={12}>
                                                  <Input
                                                    bordered
                                                    fullWidth
                                                    labelPlaceholder="Order code"
                                                    readOnly
                                                    value={orderData?.orderCode}
                                                  />
                                                </Grid>
                                                <Grid xs={12}>
                                                  <TextField
                                                    type="text"
                                                    name="orgaNumber"
                                                    label="Orga. number"
                                                  />
                                                </Grid>
                                                <Grid xs={12}>
                                                  <TextField
                                                    type="text"
                                                    name="vatNumber"
                                                    label="VAT. number"
                                                  />
                                                </Grid>
                                                <Grid xs={12}>
                                                  <TextField
                                                    type="text"
                                                    name="rct"
                                                    label="Reverse RCT"
                                                  />
                                                </Grid>
                                              </Grid.Container>
                                            </ContainerCard>
                                          </Grid>
                                        </Grid.Container>
                                      </div>
                                    </Grid>
                                    <Grid xs={4}>
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexFlow: "column",
                                        }}
                                      >
                                        <Text
                                          css={{ flex: "0 1 auto" }}
                                          weight="light"
                                        >
                                          Extra Information
                                        </Text>
                                        <Grid.Container
                                          gap={2}
                                          justify="space-between"
                                          css={{ flex: "1 1 auto" }}
                                        >
                                          <Grid xs={12}>
                                            <ContainerCard>
                                              <Grid.Container
                                                gap={2}
                                                alignItems="stretch"
                                              >
                                                <Grid xs={12}>
                                                  <TextField
                                                    type="text"
                                                    name="invoicingFrequency"
                                                    label="Invoicing Frequency"
                                                  />
                                                </Grid>
                                                <Grid xs={12}>
                                                  <TextField
                                                    type="text"
                                                    name="payTerm"
                                                    label="Pay term"
                                                  />
                                                </Grid>
                                                <Grid xs={12}>
                                                  <TextAreaField
                                                    type="textarea"
                                                    name="invoicingComment"
                                                    label="Comment"
                                                  />
                                                </Grid>
                                              </Grid.Container>
                                            </ContainerCard>
                                          </Grid>
                                        </Grid.Container>
                                      </div>
                                    </Grid>
                                  </Grid.Container>
                                </ContainerCard>
                              </Grid>
                            </Grid.Container>
                          </div>
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                  <Grid xs={12}>
                    <div style={{ width: "100%" }}>
                      <Grid.Container alignContent="stretch">
                        <Grid xs={12}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexFlow: "column",
                            }}
                          >
                            <Text css={{ flex: "0 1 auto" }} weight="light">
                              Pay and Charge rates
                            </Text>
                            <Grid.Container
                              gap={2}
                              justify="space-between"
                              css={{ flex: "1 1 auto" }}
                            >
                              <Grid xs={12}>
                                <ContainerCard>
                                  <Grid.Container
                                    gap={2}
                                    css={{
                                      minHeight: 140,
                                    }}
                                  >
                                    <Grid xs={4}>
                                      <div
                                        style={{
                                          width: "100%",
                                          display: "flex",
                                          flexFlow: "column",
                                        }}
                                      >
                                        <Text
                                          css={{ flex: "0 1 auto" }}
                                          weight="light"
                                        >
                                          Legacy
                                        </Text>
                                        <Grid.Container
                                          gap={2}
                                          justify="space-between"
                                          css={{ flex: "1 1 auto" }}
                                        >
                                          <Grid xs={12}>
                                            <ContainerCard>
                                              <Grid.Container
                                                gap={2}
                                                alignItems="stretch"
                                              >
                                                <Grid xs={12}>
                                                  <div>
                                                    <Text
                                                      size={"$sm"}
                                                      css={{
                                                        pl: "$3",
                                                        lh: "$xs",
                                                        mb: "$3"
                                                      }}
                                                    >
                                                      <b>OT1</b>
                                                      <br />
                                                      1st 2 hours immediately
                                                      after normal working hours
                                                    </Text>
                                                    <Text
                                                      size={"$sm"}
                                                      css={{
                                                        pl: "$3",
                                                        lh: "$xs",
                                                        mb: "$3"
                                                      }}
                                                    >
                                                      <b>OT2</b>
                                                      <br />
                                                      Overtime hours after that
                                                      until midnight
                                                    </Text>
                                                    <Text
                                                      size={"$sm"}
                                                      css={{
                                                        pl: "$3",
                                                        lh: "$xs",
                                                        mb: "$3"
                                                      }}
                                                    >
                                                      <b>OT3</b>
                                                      <br />
                                                      After midnight on weekday
                                                      plus Sat and Sun plus
                                                      minor public holidays
                                                    </Text>
                                                    <Text
                                                      size={"$sm"}
                                                      css={{
                                                        pl: "$3",
                                                        lh: "$xs",
                                                        mb: "$3"
                                                      }}
                                                    >
                                                      <b>OT4</b>
                                                      <br />
                                                      Most public holidays
                                                    </Text>
                                                    <Text
                                                      size={"$sm"}
                                                      css={{
                                                        pl: "$3",
                                                        lh: "$xs",
                                                      }}
                                                    >
                                                      <b>Currency</b>
                                                      <br />
                                                      {orderData?.payChargeRate?.[0].currency}
                                                    </Text>
                                                  </div>
                                                </Grid>
                                              </Grid.Container>
                                            </ContainerCard>
                                          </Grid>
                                        </Grid.Container>
                                      </div>
                                    </Grid>
                                  </Grid.Container>
                                </ContainerCard>
                              </Grid>
                            </Grid.Container>
                          </div>
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                </Grid.Container>
              </Grid>
            </Grid.Container>
          </fieldset>
        </form>
      </FormProvider>
    </Layout>
  );
}


/**
 * Renders a table of worker requirements. Allows changing the worker quantity for each requirement.
 *
 * @param {object} props - The props object
 * @param {Array} props.workerRequired - An array of objects representing the worker requirements, each object should have an `id`, `quantity`, and `jobRole` property.
 * @param {function} [props.onChange] - An optional function that will be called whenever a worker quantity is changed. The function will be called with an object containing an `id` and `quantity` property.
 * @return {JSX.Element} A table element containing the worker requirements.
 */
function WorkerReqTable({
  workerRequired,
  onChange,
}: {
  workerRequired: OrderDataProps["workerRequired"];
  onChange?: ({
    id,
    quantity,
  }: {
    id: string;
    quantity: string | undefined;
  }) => void;
}) {
  const [value, setValue] = useState<string>();
  return (
    <Fragment>
      <Table
        shadow={false}
        aria-label="WorkerReqTable"
        compact
        css={{
          height: "auto",
          minWidth: "100%",
        }}
      >
        <Table.Header>
          <Table.Column>Job</Table.Column>
          <Table.Column>Quantity</Table.Column>
          <Table.Column> </Table.Column>
        </Table.Header>
        <Table.Body items={workerRequired}>
          {(workerRequirement) => (
            <Table.Row key={workerRequirement.id}>
              <Table.Cell>
                <Text size={"$sm"}>{workerRequirement?.jobRole?.name}</Text>
              </Table.Cell>
              <Table.Cell>
                <Text size={"$sm"}>
                  {workerRequirement?.quantity}/{workerRequirement?.quantity}
                </Text>
              </Table.Cell>
              <Table.Cell>
                <Popover
                  onClose={() => {
                    setValue("0");
                  }}
                >
                  <Popover.Trigger>
                    <Pencil size={15} />
                  </Popover.Trigger>
                  <Popover.Content
                    css={{
                      bs: "0 0 10px black",
                      p: 6,
                    }}
                  >
                    <Grid.Container gap={1} css={{ maxW: 200 }}>
                      <Grid xs={6}>
                        <Text
                          size={"$sm"}
                          css={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxW: "100%",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {workerRequirement?.jobRole?.name}
                        </Text>
                      </Grid>
                      <Grid alignItems="center" xs={6} justify="flex-end">
                        <Button
                          size="xs"
                          onPress={() => {
                            if (onChange) {
                              onChange({
                                id: workerRequirement.id,
                                quantity: value,
                              });
                            }
                          }}
                        >
                          Change
                        </Button>
                      </Grid>
                      <Spacer y={0.25} />
                      <Grid
                        xs={12}
                        css={{
                          h: 0,
                          border: "0.25px solid $border",
                          p: 0,
                        }}
                      />
                      <Spacer y={0.5} />
                      <Grid xs={12}>
                        <Input
                          bordered
                          size="sm"
                          type="text"
                          value={value}
                          labelPlaceholder={"Quantity"}
                          onChange={(e) => {
                            setValue(e.target.value);
                          }}
                        />
                      </Grid>
                    </Grid.Container>
                  </Popover.Content>
                </Popover>
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </Fragment>
  );
}
