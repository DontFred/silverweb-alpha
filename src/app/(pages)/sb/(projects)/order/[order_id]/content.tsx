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
  Switch,
  Modal,
  Pagination,
  Checkbox,
} from "@nextui-org/react";
import { Fragment, useRef, useState } from "react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import StyleObject from "csstype";
import ContactCard from "@/comp/sw/ui/cards/ContactCard";
import TextAreaField from "@/comp/sw/app/FormBuilder/ui/TextAreaField";
import AddressField from "@/comp/sw/app/FormBuilder/ui/AddressField";
import dynamic from "next/dynamic";
import { JobRolesProps, OrderDataProps } from "./page";
import DatePickerField from "@/comp/sw/app/FormBuilder/ui/DatePickerField";
import FileCard from "@/comp/sw/ui/cards/FileCard";
import { Pencil } from "lucide-react";
import TextField from "@/comp/sw/app/FormBuilder/ui/TextField";
import CompanyCard from "@/comp/sw/ui/cards/CompanyCard";
import NumberField from "@/comp/sw/app/FormBuilder/ui/NumberField";
import { Prisma } from "@prisma/client";
import { trpc } from "@/lib/trpc/csTRPC";

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
  jobRoles
}: {
  orderData: OrderDataProps;
  jobRoles: JobRolesProps[];
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
      startTime: orderData?.start.toTimeString().split(" ")[0],
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
      inductionTime: orderData?.inductionDateTime.toTimeString().split(" ")[0],
      duration: orderData?.estimatedDuration,
      endDate: orderData?.end.toISOString().split("T")[0],
      durationComment: orderData?.commentToDuration,
      projectType: orderData?.Project.type.name,
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
      invoicingEmail: orderData?.invoiceEmail,
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

  const [version, setVersion] = useState<"new" | "old">("new");
  const [openEditAddModal, setOpenEditAddModal] = useState<boolean>(false);
  const FormRef = useRef<HTMLFormElement>(null);
  const utils = trpc.useContext();

  const editPayChargeRates = trpc.editPayChargeRate.useMutation({
    onSuccess: () => {
      utils.getOrderById.invalidate()
      window.location.reload();
      setOpenEditAddModal(false);
    }
  })

  const workingHours = useWatch({
    control: form.control,
    name: "workingHours"
  })

  const addPayChargeRates = trpc.addPayChargeRate.useMutation({
    onSuccess: () => {
      utils.getOrderById.invalidate()
      window.location.reload();
      setOpenEditAddModal(false);
    }
  })
  return (
    <Layout>
      <FormProvider {...form}>
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
              {orderData?.createdAt.toLocaleString("en-IE", {
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
              <form ref={FormRef} onSubmit={form.handleSubmit(saveChangedData)}>
                <fieldset style={FieldsetStyling} disabled={!editable}>
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
                                    {orderData?.ContactOrder.map(
                                      (contact, idx) => (
                                        <Fragment key={idx}>
                                          <Grid>
                                            <ContactCard
                                              contact={contact.contact}
                                            />
                                          </Grid>
                                        </Fragment>
                                      )
                                    )}
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
                                      {orderData && (
                                        <ContactCard
                                          contact={
                                            orderData.User.employee.contact
                                          }
                                        />
                                      )}
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
                                    <Grid xs={12} sm={6}>
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
                                                          name:
                                                            orderData?.orderCode ||
                                                            "",
                                                          type: "Project Address",
                                                          address: orderData
                                                            ?.projectAddress
                                                            ?.coordinates || {
                                                            lat: 0,
                                                            lng: 0,
                                                          },
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
                                    <Grid xs={12} sm={6}>
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
                                                  {orderData && (
                                                    <ContactCard
                                                      contact={
                                                        orderData.meetingPerson
                                                      }
                                                    />
                                                  )}
                                                </Grid>
                                              </Grid.Container>
                                            </ContainerCard>
                                          </Grid>
                                        </Grid.Container>
                                      </div>
                                    </Grid>
                                    <Grid xs={12} sm={6}>
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
                                                          name:
                                                            orderData?.orderCode ||
                                                            "",
                                                          type: "Delivery Address",
                                                          address: orderData
                                                            ?.deliveryAddress
                                                            ?.coordinates || {
                                                            lat: 0,
                                                            lng: 0,
                                                          },
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
                                    <Grid xs={12} sm={6}>
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
                                                {orderData?.InductionForm.map(
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
                                        <Grid xs={12} sm={8}>
                                          <Grid.Container gap={2}>
                                            <Grid xs={12} sm={6}>
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
                                                      {orderData && (
                                                        <WorkerReqTable
                                                          workerRequired={
                                                            orderData.WorkerRequired
                                                          }
                                                        />
                                                      )}
                                                    </ContainerCard>
                                                  </Grid>
                                                </Grid.Container>
                                              </div>
                                            </Grid>
                                            <Grid xs={12} sm={6}>
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
                                                                    workingHours as Record<
                                                                      string,
                                                                      number
                                                                    >
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
                                        <Grid xs={12} sm={4}>
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
                                                          {orderData?.client
                                                            .company && (
                                                            <CompanyCard
                                                              company={
                                                                orderData.client
                                                                  .company
                                                              }
                                                              registerAddress={
                                                                orderData
                                                                  ?.client
                                                                  .address
                                                              }
                                                              registerName={
                                                                orderData
                                                                  ?.client.name
                                                              }
                                                            />
                                                          )}
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
                                                            {orderData?.WorkPerformed?.map(
                                                              (work, idx) => (
                                                                <Fragment
                                                                  key={idx}
                                                                >
                                                                    • 
                                                                  {
                                                                    work.work
                                                                      .name
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
                                                            {orderData?.TrainingCourseRequired?.map(
                                                              (course, idx) => (
                                                                <Fragment
                                                                  key={idx}
                                                                >
                                                                    • 
                                                                  {
                                                                    course
                                                                      .course
                                                                      .name
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
                                    <Grid xs={12} sm={4}>
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
                                    <Grid xs={12} sm={4}>
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
                                    <Grid xs={12} sm={4}>
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
                </fieldset>
              </form>
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
                                {orderData?.PayChargeRate?.map(
                                  (payChargeRate) => (
                                    <Fragment key={payChargeRate.id}>
                                      <Grid xs={12} sm={4}>
                                        <PayChargeRateTable
                                          payChargeRate={payChargeRate as any}
                                          version={version}
                                        />
                                      </Grid>
                                    </Fragment>
                                  )
                                )}
                                <Grid xs={12} sm={4}>
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
                                                    mb: "$3",
                                                  }}
                                                >
                                                  <b>OT1</b>
                                                  <br />
                                                  1st 2 hours immediately after
                                                  normal working hours
                                                </Text>
                                                <Text
                                                  size={"$sm"}
                                                  css={{
                                                    pl: "$3",
                                                    lh: "$xs",
                                                    mb: "$3",
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
                                                    mb: "$3",
                                                  }}
                                                >
                                                  <b>OT3</b>
                                                  <br />
                                                  After midnight on weekday plus
                                                  Sat and Sun plus minor public
                                                  holidays
                                                </Text>
                                                <Text
                                                  size={"$sm"}
                                                  css={{
                                                    pl: "$3",
                                                    lh: "$xs",
                                                    mb: "$3",
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
                                                  {
                                                    orderData
                                                      ?.PayChargeRate?.[0]
                                                      .currency
                                                  }
                                                </Text>
                                              </div>
                                            </Grid>
                                          </Grid.Container>
                                        </ContainerCard>
                                      </Grid>
                                    </Grid.Container>
                                  </div>
                                </Grid>
                                <Grid xs={12} sm={4}>
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
                                      Controller
                                    </Text>
                                    <Grid.Container
                                      gap={2}
                                      justify="space-between"
                                      css={{ flex: "1 1 auto" }}
                                    >
                                      <Grid xs={12}>
                                        <ContainerCard>
                                          <Grid.Container gap={2}>
                                            <Grid xs={6}>
                                              <Text weight={"light"}>
                                                New/ Old Version
                                              </Text>
                                            </Grid>
                                            <Grid xs={6}>
                                              <Switch
                                                css={{
                                                  m: "auto",
                                                }}
                                                initialChecked
                                                color={"secondary"}
                                                bordered
                                                onChange={(ev) => {
                                                  if (ev.target.checked) {
                                                    setVersion("new");
                                                  } else {
                                                    setVersion("old");
                                                  }
                                                }}
                                              />
                                            </Grid>
                                            <Grid xs={12} justify="center">
                                              {orderData && (
                                                <EditAddPayChargeRates
                                                  open={openEditAddModal}
                                                  payChargeRates={
                                                    orderData.PayChargeRate
                                                  }
                                                  onClose={() =>
                                                    setOpenEditAddModal(false)
                                                  }
                                                  onAdd={async (selected) => {
                                                    try {
                                                      await addPayChargeRates.mutateAsync({
                                                        currency: orderData.PayChargeRate[0].currency,
                                                        id: orderData.id,
                                                        jobRole: selected[0],
                                                      });
                                                    } catch (cause) {
                                                      console.error({ cause }, 'Failed to add pay charge rates');
                                                    }
                                                  }}
                                                  onEdit={async (values) => {
                                                    try {
                                                      await editPayChargeRates.mutateAsync({
                                                        id: values.rateID,
                                                        chargeRate: values.charge,
                                                        payRate: values.pay,
                                                        appliedAt: values.appliedAt,
                                                        old: values.old
                                                      });
                                                    } catch (cause) {
                                                      console.error({ cause }, 'Failed to add post');
                                                    }
                                                  }}
                                                  jobRoles={jobRoles}
                                                />
                                              )}
                                              <Button
                                                size={"sm"}
                                                type="button"
                                                onPress={() =>
                                                  setOpenEditAddModal(true)
                                                }
                                              >
                                                Edit / Add
                                              </Button>
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
  workerRequired: Prisma.WorkerRequiredGetPayload<{
    include: {
      jobRole: true;
    };
  }>[];
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
          <Table.Column>JOB</Table.Column>
          <Table.Column>QUANTITY</Table.Column>
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

/**
 * Renders a table with the pay and charge rates of an order, formatted based on the value of the version parameter.
 *
 * @param {Object} props - An object containing the pay and charge rate data and the version string indicating the table format.
 * @param {Object} props.payChargeRate - An object containing the order's pay and charge rate data.
 * @param {string} props.version - A string indicating the format of the table.
 * @param {Array} props.payChargeRate.chargeRate - An array containing the charge rate data for the order.
 * @param {Array} props.payChargeRate.payRate - An array containing the pay rate data for the order.
 * @param {string} props.payChargeRate.old.chargeRate - An array containing the charge rate data for the old format of the order.
 * @param {string} props.payChargeRate.old.payRate - An array containing the pay rate data for the old format of the order.
 * @return {Array} An array of objects containing the type, charge rate, and pay rate of the order.
 */
function PayChargeRateTable({
  payChargeRate,
  version,
}: {
  payChargeRate: Prisma.PayChargeRateGetPayload<{
    include: {
      jobRole: true;
      payRate: true;
      chargeRate: true;
    };
  }> & {
    old: {
      chargeRate: {
        normal: number;
        ot1: number;
        ot2: number;
        ot3: number;
        ot4: number;
      };
      payRate: {
        normal: number;
        ot1: number;
        ot2: number;
        ot3: number;
        ot4: number;
      };
    };
  };
  version: "old" | "new";
}) {
  /**
   * Generates a table friendly version of pay and charge rates based on the version of the rates object.
   *
   * @return {Array} An array of objects containing the type, charge rate, and pay rate.
   */
  const payChargeRateTableFriendly = () => {
    if (version === "new") {
      const payChargeRateTableFriendlyData: {
        type: string;
        ch: number;
        pay: number;
      }[] = [];
      Object.entries(payChargeRate.chargeRate).map(([key, value]) => {
        if (typeof value !== "number") return;
        payChargeRateTableFriendlyData.push({
          type: key,
          ch: value,
          pay: 0,
        });
      });
      Object.entries(payChargeRate.payRate).map(([key, value]) => {
        Object.assign(
          payChargeRateTableFriendlyData[
            payChargeRateTableFriendlyData.findIndex(
              (item) => item.type === key
            )
          ] || {},
          { pay: value }
        );
      });
      return payChargeRateTableFriendlyData;
    } else if (version === "old") {
      const payChargeRateTableFriendlyData: {
        type: string;
        ch: number;
        pay: number;
      }[] = [];
      Object.entries(
        payChargeRate.old?.chargeRate as {
          normal: number;
          ot1: number;
          ot2: number;
          ot3: number;
          ot4: number;
        }
      ).map(([key, value]) => {
        payChargeRateTableFriendlyData.push({
          type: key,
          ch: value,
          pay: 0,
        });
      });
      Object.entries(payChargeRate.old.payRate).map(([key, value]) => {
        Object.assign(
          payChargeRateTableFriendlyData[
            payChargeRateTableFriendlyData.findIndex(
              (item) => item.type === key
            )
          ] || {},
          { pay: value }
        );
      });
      return payChargeRateTableFriendlyData;
    }
  };

  return (
    <Fragment>
      <div
        style={{
          width: "100%",
          display: "flex",
          flexFlow: "column",
        }}
      >
        <Grid.Container css={{ flex: "0 1 auto" }}>
          <Grid>
            <Text weight="light">{payChargeRate?.jobRole?.name}</Text>
          </Grid>
          <Grid alignItems="flex-end" justify="flex-end" xs>
            <Text
              weight="light"
              color="$accents7"
              size={"$sm"}
              css={{
                pr: "$5",
              }}
            >
              {version == "new" ? "at " : "before "}
              {payChargeRate?.appliedAt?.toLocaleString("en-IE", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          </Grid>
        </Grid.Container>
        <Grid.Container
          gap={2}
          justify="space-between"
          css={{ flex: "1 1 auto" }}
        >
          <Grid xs={12}>
            <ContainerCard noPadding>
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
                  <Table.Column
                    css={{ height: "calc(30px - 7.53333px) !important" }}
                  >
                    TYPE
                  </Table.Column>
                  <Table.Column
                    css={{ height: "calc(30px - 7.53333px) !important" }}
                  >
                    CHARGE RATE
                  </Table.Column>
                  <Table.Column
                    css={{ height: "calc(30px - 7.53333px) !important" }}
                  >
                    PAY RATE
                  </Table.Column>
                </Table.Header>
                <Table.Body items={payChargeRateTableFriendly()}>
                  {(payChargeRate) => (
                    <Table.Row key={payChargeRate.type}>
                      <Table.Cell>
                        <Text size={"$xs"} weight={"bold"} color="$accents7">
                          {payChargeRate.type.toUpperCase()}
                        </Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text size={"$sm"}>{payChargeRate.ch}</Text>
                      </Table.Cell>
                      <Table.Cell>
                        <Text size={"$sm"}>{payChargeRate.pay}</Text>
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </ContainerCard>
          </Grid>
        </Grid.Container>
      </div>
    </Fragment>
  );
}

/**
 * Renders a modal component for editing and adding pay and charge rates for a job role.
 *
 * @param {object} props - An object containing the following properties:
 *    @param {boolean} props.open - Determines whether the modal is open or not.
 *    @param {function} props.onClose - A callback function to close the modal.
 *    @param {function} [props.onEdit] - A callback function to edit the pay and charge rates.
 *    @param {function} [props.onAdd] - A callback function to add new pay and charge rates.
 *    @param {object[]} props.payChargeRates - An array of objects containing pay and charge rate data.
 * @return {JSX.Element} The modal component.
 */
function EditAddPayChargeRates({
  open,
  onClose,
  onEdit,
  onAdd,
  payChargeRates,
  jobRoles
}: {
  open: boolean;
  payChargeRates: Prisma.PayChargeRateGetPayload<{
    include: {
      jobRole: true;
      payRate: true;
      chargeRate: true;
    };
  }>[];
  jobRoles: JobRolesProps[];
  onClose: () => void;
  onEdit?: ({} : {
    appliedAt: Date;
    rateID: string;
    pay: {
      normal: number;
      ot1: number;
      ot2: number;
      ot3: number;
      ot4: number;
    };
    charge: {
      normal: number;
      ot1: number;
      ot2: number;
      ot3: number;
      ot4: number;
    };
    old: {
      payRate: {
        normal: number;
        ot1: number;
        ot2: number;
        ot3: number;
        ot4: number;
      },
      chargeRate: {
        normal: number;
        ot1: number;
        ot2: number;
        ot3: number;
        ot4: number;
      }
    }
  }) => void;
  onAdd?: ([]: string[]) => void;
}) {
  const initValues = [
    ...payChargeRates.map((rate) => ({
      appliedAt: rate.appliedAt,
      rateID: rate.id,
      pay: rate.payRate,
      charge: rate.chargeRate,
    })),
  ];

  const [value, setValue] = useState<
    {
      appliedAt: Date;
      rateID: string;
      pay: {
        normal: number;
        ot1: number;
        ot2: number;
        ot3: number;
        ot4: number;
      };
      charge: {
        normal: number;
        ot1: number;
        ot2: number;
        ot3: number;
        ot4: number;
      };
    }[]
  >(initValues);
  const [page, setPage] = useState<number>(1);
  return (
    <Fragment>
      <Modal open={open} onClose={onClose}>
        <Modal.Body>
          <Grid.Container>
            <Grid xs={12}>
              {page <= payChargeRates.length ? (
                <Fragment>
                  <Grid.Container gap={2}>
                    <Grid xs={12} justify="center">
                      <div>
                        <Text size={"$lg"} weight={"bold"}>
                          Edit Pay and Charge Rates
                        </Text>
                        <Text>{payChargeRates[page - 1]?.jobRole?.name}</Text>
                      </div>
                    </Grid>
                    <Grid
                      xs={12}
                      css={{ h: 0, border: "0.25px solid $border", p: 0 }}
                    />
                    <Spacer y={1} />
                    <Grid xs={12}>
                      <ContainerCard>
                        <Grid.Container gap={1}>
                          <Grid xs={3} alignItems="center">
                            <Text size={"$sm"}>Apply at</Text>
                          </Grid>
                          <Grid xs>
                            <Input
                              aria-label={
                                "Apply at" + payChargeRates[page - 1].id
                              }
                              name={"appliedAt" + payChargeRates[page - 1].id}
                              value={
                                value[page - 1]?.appliedAt?.toISOString()
                                  .split("T")[0] || undefined
                              }
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      appliedAt: new Date(e.target.value),
                                    },
                                  };
                                });
                              }}
                              min={new Date().toISOString().split("T")[0]}
                              bordered
                              fullWidth
                              type="date"
                            />
                          </Grid>
                          <Grid xs={3} alignItems="center"></Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Text size={"$sm"}>Pay rate</Text>
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Text size={"$sm"}>Ch. rate</Text>
                          </Grid>
                          <Grid xs={3} alignItems="center">
                            <Text size={"$sm"}>Normal</Text>
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Input
                              aria-label={
                                "normalPay" + payChargeRates[page - 1]?.id
                              }
                              name={"normalPay" + payChargeRates[page - 1]?.id}
                              type="number"
                              bordered
                              placeholder={value[
                                page - 1
                              ]?.pay?.normal.toString()}
                              fullWidth
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      pay: {
                                        ...prev[page - 1]?.pay,
                                        normal: Number(e.target.value),
                                      },
                                    },
                                  };
                                });
                              }}
                              value={value[page - 1]?.pay.normal}
                            />
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Input
                              aria-label={
                                "normalCharge" + payChargeRates[page - 1]?.id
                              }
                              name={
                                "normalCharge" + payChargeRates[page - 1]?.id
                              }
                              type="number"
                              bordered
                              placeholder={value[
                                page - 1
                              ]?.pay?.normal.toString()}
                              fullWidth
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      charge: {
                                        ...prev[page - 1]?.charge,
                                        normal: Number(e.target.value),
                                      },
                                    },
                                  };
                                });
                              }}
                              value={value[page - 1]?.charge.normal}
                            />
                          </Grid>
                          <Grid xs={3} alignItems="center">
                            <Text size={"$sm"}>OT1</Text>
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Input
                              name={"ot1Pay" + payChargeRates[page - 1]?.id}
                              aria-label={
                                "ot1Pay" + payChargeRates[page - 1]?.id
                              }
                              type="number"
                              bordered
                              placeholder={value[page - 1]?.pay.ot1.toString()}
                              fullWidth
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      pay: {
                                        ...prev[page - 1]?.pay,
                                        ot1: Number(e.target.value),
                                      },
                                    },
                                  };
                                });
                              }}
                              value={value[page - 1]?.pay.ot1}
                            />
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Input
                              name={"ot1Charge" + payChargeRates[page - 1]?.id}
                              aria-label={
                                "ot1Charge" + payChargeRates[page - 1]?.id
                              }
                              type="number"
                              bordered
                              placeholder={value[page - 1]?.pay.ot1.toString()}
                              fullWidth
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      charge: {
                                        ...prev[page - 1]?.charge,
                                        ot1: Number(e.target.value),
                                      },
                                    },
                                  };
                                });
                              }}
                              value={value[page - 1]?.charge.ot1}
                            />
                          </Grid>
                          <Grid xs={3} alignItems="center">
                            <Text size={"$sm"}>OT2</Text>
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Input
                              name={"ot2Pay" + payChargeRates[page - 1]?.id}
                              aria-label={
                                "ot2Pay" + payChargeRates[page - 1]?.id
                              }
                              type="number"
                              bordered
                              placeholder={value[page - 1]?.pay.ot2.toString()}
                              fullWidth
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      pay: {
                                        ...prev[page - 1]?.pay,
                                        ot2: Number(e.target.value),
                                      },
                                    },
                                  };
                                });
                              }}
                              value={value[page - 1]?.pay.ot2}
                            />
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Input
                              name={"ot2Charge" + payChargeRates[page - 1]?.id}
                              aria-label={
                                "ot2Charge" + payChargeRates[page - 1]?.id
                              }
                              type="number"
                              bordered
                              placeholder={value[page - 1]?.pay.ot2.toString()}
                              fullWidth
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      charge: {
                                        ...prev[page - 1]?.charge,
                                        ot2: Number(e.target.value),
                                      },
                                    },
                                  };
                                });
                              }}
                              value={value[page - 1]?.charge.ot2}
                            />
                          </Grid>
                          <Grid xs={3} alignItems="center">
                            <Text size={"$sm"}>OT3</Text>
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Input
                              name={"ot3Pay" + payChargeRates[page - 1]?.id}
                              aria-label={
                                "ot3Pay" + payChargeRates[page - 1]?.id
                              }
                              type="number"
                              bordered
                              placeholder={value[page - 1]?.pay.ot3.toString()}
                              fullWidth
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      pay: {
                                        ...prev[page - 1]?.pay,
                                        ot3: Number(e.target.value),
                                      },
                                    },
                                  };
                                });
                              }}
                              value={value[page - 1]?.pay.ot3}
                            />
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Input
                              name={"ot3Charge" + payChargeRates[page - 1]?.id}
                              aria-label={
                                "ot3Charge" + payChargeRates[page - 1]?.id
                              }
                              type="number"
                              bordered
                              placeholder={value[
                                page - 1
                              ]?.charge.ot3.toString()}
                              fullWidth
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      charge: {
                                        ...prev[page - 1]?.charge,
                                        ot3: Number(e.target.value),
                                      },
                                    },
                                  };
                                });
                              }}
                              value={value[page - 1]?.charge.ot3}
                            />
                          </Grid>
                          <Grid xs={3} alignItems="center">
                            <Text size={"$sm"}>OT4</Text>
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Input
                              name={"ot4Pay" + payChargeRates[page - 1]?.id}
                              aria-label={
                                "ot4Pay" + payChargeRates[page - 1]?.id
                              }
                              type="number"
                              bordered
                              placeholder={value[page - 1]?.pay.ot4.toString()}
                              fullWidth
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      pay: {
                                        ...prev[page - 1]?.pay,
                                        ot4: Number(e.target.value),
                                      },
                                    },
                                  };
                                });
                              }}
                              value={value[page - 1]?.pay.ot4}
                            />
                          </Grid>
                          <Grid xs={4.5} alignItems="center">
                            <Input
                              name={"ot4Charge" + payChargeRates[page - 1]?.id}
                              aria-label={
                                "ot4Charge" + payChargeRates[page - 1]?.id
                              }
                              type="number"
                              bordered
                              placeholder={value[
                                page - 1
                              ]?.charge.ot4.toString()}
                              fullWidth
                              onChange={(e) => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    [page - 1]: {
                                      ...prev[page - 1],
                                      charge: {
                                        ...prev[page - 1]?.charge,
                                        ot4: Number(e.target.value),
                                      },
                                    },
                                  };
                                });
                              }}
                              value={value[page - 1]?.charge.ot4}
                            />
                          </Grid>
                        </Grid.Container>
                      </ContainerCard>
                    </Grid>
                    <Spacer y={1} />
                    <Grid
                      xs={12}
                      css={{ h: 0, border: "0.25px solid $border", p: 0 }}
                    />
                    <Spacer y={1} />
                  </Grid.Container>
                </Fragment>
              ) : (
                <Fragment>
                  <Grid.Container gap={2}>
                    <Grid xs={12} justify="center">
                      <div>
                        <Text size={"$lg"} weight={"bold"}>
                          Add Pay and Charge Rates
                        </Text>
                        <Text>{payChargeRates[page - 1]?.jobRole?.name}</Text>
                      </div>
                    </Grid>
                    <Grid
                      xs={12}
                      css={{ h: 0, border: "0.25px solid $border", p: 0 }}
                    />
                    <Spacer y={1} />
                    <Grid xs={12}>
                      <ContainerCard>
                        <Grid.Container gap={1}>
                          <Grid xs={12} alignItems="center">
                            <Checkbox.Group
                              aria-label="Checkbox group for rates"
                              onChange={(value) => {
                                if (onAdd) {
                                  console.log(value);
                                  onAdd(value);
                                }
                              }}
                            >
                              {jobRoles
                                .map((jobRole) => (
                                  <Fragment key={jobRole.id}>
                                    <Checkbox
                                      value={jobRole.id}
                                      size="xs"
                                      isDisabled={
                                        payChargeRates.findIndex(
                                          (item) =>
                                            item.jobRole.name === jobRole.name
                                        ) !== -1
                                      }
                                      label={jobRole.name}
                                      color="secondary"
                                    >
                                      {jobRole.name}
                                    </Checkbox>
                                  </Fragment>
                                ))}
                            </Checkbox.Group>
                          </Grid>
                        </Grid.Container>
                      </ContainerCard>
                    </Grid>
                  </Grid.Container>
                </Fragment>
              )}
            </Grid>
            <Grid xs={12}>
              <Grid.Container gap={2}>
                <Grid xs={12} justify="center">
                  <Pagination
                    page={page}
                    onChange={(newPage) => {
                      setPage(newPage);
                      if (onEdit && newPage > page && JSON.stringify(value) !== JSON.stringify(initValues)) {
                        onEdit({...value[newPage - 2], old: {
                          payRate: initValues[newPage - 2].pay,
                          chargeRate: initValues[newPage - 2].charge
                        }});
                      }
                    }}
                    loop
                    size="lg"
                    onlyDots
                    rounded
                    total={payChargeRates.length + 1}
                    bordered
                  />
                </Grid>
              </Grid.Container>
            </Grid>
          </Grid.Container>
        </Modal.Body>
      </Modal>
    </Fragment>
  );
}
