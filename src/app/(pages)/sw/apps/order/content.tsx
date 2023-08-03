"use client";
import {
  Button,
  Grid,
  Loading,
  Modal,
  Pagination,
  Spacer,
  Text,
} from "@nextui-org/react";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { Minus, Plus } from "lucide-react";
import { useSession } from "next-auth/react";

import Layout from "@/comp/sw/ui/Layout";
import ThreeRowCard from "@/comp/sw/ui/cards/ThreeRowCard";
import TwoRowCard from "@/comp/sw/ui/cards/TwoRowCard";
import TextField from "@/comp/sw/app/FormBuilder/ui/TextField";
import SelectField from "@/comp/sw/app/FormBuilder/ui/SelectField";
import HeadingField from "@/comp/sw/app/FormBuilder/ui/HeadingField";
import SubheadingField from "@/comp/sw/app/FormBuilder/ui/SubheadingField";
import AddressField from "@/comp/sw/app/FormBuilder/ui/AddressField";
import ContactField from "@/comp/sw/app/FormBuilder/ui/ContactField";
import { DefaultProps } from "@/comp/sw/app/FormBuilder/types";
import NumberField from "@/comp/sw/app/FormBuilder/ui/NumberField";
import {
  AddOrderProps,
  CompanyProps,
  JobRolesProps,
  OrderProps,
  ProjectProps,
} from "./type";
import { DevTool } from "@hookform/devtools";

//DEV
import { trpc } from "@/lib/trpc/csTRPC";
import EmailField from "@/comp/sw/app/FormBuilder/ui/EmailField";
import PhoneField from "@/comp/sw/app/FormBuilder/ui/PhoneField";

export default function OrderFormContent({
  orderData,
  projectsData,
  companiesData,
  jobRolesData,
}: {
  orderData: OrderProps[];
  projectsData: ProjectProps[];
  companiesData: CompanyProps[];
  jobRolesData: JobRolesProps[];
}) {
  const form = useForm({
    defaultValues: {} as AddOrderProps,
  });

  const addCompanyForm = useForm({
    defaultValues: {} as {
      companyName: string;
      companyWorkingField: string;
      companyPhone: string;
      companyEmail: string;
      companyAddress: {
        streetNo: string;
        city: string;
        postalCode: string;
        country: string;
      };
    },
  });
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [openAddCompany, setOpenAddCompany] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const submitButtonRef = useRef<HTMLButtonElement>(null);
  const addCompanyFormRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const pathRouter = usePathname();
  const Order = trpc.addOrder.useMutation({});
  const AddCompany = trpc.addCompany.useMutation({
    onSuccess() {
      router.refresh();
    },
  });

  const {status, data: session} = useSession();
  useEffect(() => {
    if (status === "unauthenticated" ) {
      router.push("/auth/login-admin");
    }
  }, [status, router]);


  async function handleAddOrder(data: AddOrderProps) {
    setSubmitting(true);
    const order = await Order.mutateAsync({
      accountManager: session?.user.id || "00000000-0000-0000-0000-000000000000",
      clientProjectCode: data.ClientProjectRef,
      clientRef: data.clientRef,
      currency: data.currency,
      orderCode: data.orderCode,
      payChargeRates: data.payChargeRates,
      projectRef: data.projectRef,
      registerName: data.registerName,
      registerAddress: data.registerAddress,
      salesContact: data.salesContact,
    });
    setSubmitting(false);
    form.setValue(
      "formUrl",
      process.env.NEXT_PUBLIC_HOST_DOMAIN + "/cp/forms/order/" + order.id
    );
    form.setValue("password", order.password);
  }

  const clientRef = useWatch({
    control: form.control,
    name: "clientRef",
  });
  return (
    <Fragment>
      {process.env.NODE_ENV !== "production" && (
        // Form state tool for react-hook-form
        <DevTool control={form.control} />
      )}
      <Modal open={openAddCompany} onClose={() => setOpenAddCompany(false)}>
        <Modal.Body>
          <FormProvider {...addCompanyForm}>
            <form
              ref={addCompanyFormRef}
              style={{ width: "100%" }}
              onSubmit={addCompanyForm.handleSubmit(
                async (data) => {
                  await AddCompany.mutateAsync({
                    address: data.companyAddress,
                    email: data.companyEmail,
                    name: data.companyName,
                    phone: data.companyPhone,
                    workingField: data.companyWorkingField,
                  });
                  setOpenAddCompany(false);
                },
                (e) => console.error(e)
              )}
            >
              <Grid.Container gap={2}>
                <Grid xs={12}>
                  <Text h3>Add company</Text>
                </Grid>
                <Grid xs={12}>
                  <TextField
                    type="text"
                    name="companyName"
                    label="Company name"
                    option={{
                      required: {
                        message: "Company name is required",
                        value: true,
                      },
                    }}
                  />
                </Grid>
                <Grid xs={12}>
                  <TextField
                    type="text"
                    name="companyWorkingField"
                    label="Working field"
                    option={{
                      required: {
                        message: "Working field is required",
                        value: true,
                      },
                    }}
                  />
                </Grid>
                <Grid xs={12}>
                  <PhoneField
                    type="phone"
                    name="companyPhone"
                    label="Phone"
                    option={{
                      required: {
                        message: "Phone number is required",
                        value: true,
                      },
                    }}
                  />
                </Grid>
                <Grid xs={12}>
                  <EmailField
                    type="email"
                    name="companyEmail"
                    label="Email"
                    option={{
                      required: {
                        message: "Email is required",
                        value: true,
                      },
                    }}
                  />
                </Grid>
                <Grid xs={12}>
                  <AddressField
                    type="address"
                    name="companyAddress"
                    label="Address"
                    option={{
                      required: {
                        message: "Address is required",
                        value: true,
                      },
                    }}
                  />
                </Grid>
                <Grid xs={12} justify="flex-end">
                  <Button type="submit" ghost color={"primary"} size={"sm"}>
                    Add
                  </Button>
                </Grid>
                <Grid />
              </Grid.Container>
            </form>
          </FormProvider>
        </Modal.Body>
      </Modal>
      <Modal
        open={open}
        onClose={() => {
          form.unregister([
            "clientRef",
            "currency",
            "orderCode",
            "payChargeRates",
            "projectRef",
            "registerAddress",
            "registerName",
            "salesContact",
          ]);
          setPage(1);
          setOpen(false);
          window.location.reload();
        }}
        width="30%"
        css={{ p: "$sm" }}
      >
        <Modal.Body>
          <Grid.Container gap={2}>
            <Grid xs={12}>
              <FormProvider {...form}>
                <form
                  style={{ width: "100%" }}
                  onSubmit={form.handleSubmit(
                    (data) => handleAddOrder(data),
                    (e) => console.error(e)
                  )}
                >
                  {page === 1 && (
                    <Fragment>
                      <HeadingField content="Order code" type="heading" />
                      <TextField
                        type="text"
                        name="orderCode"
                        label="Unique order code"
                        option={{
                          required: {
                            value: true,
                            message: "Please enter a order code",
                          },
                          validate: {
                            checkIfUnique: (value: string) => {
                              const orderCode = orderData.find(
                                (o) => o.orderCode === value
                              );
                              if (orderCode !== undefined) {
                                return "Order code already exists";
                              } else {
                                return undefined;
                              }
                            },
                          },
                        }}
                      />
                      <Spacer y={2} />
                      <HeadingField
                        content="Clients project reference"
                        type="heading"
                      />
                      <TextField
                        type="text"
                        name="ClientProjectRef"
                        label="Reference"
                      />
                      <Spacer y={2} />
                      <HeadingField
                        content="Project reference"
                        type="heading"
                      />
                      <SubheadingField
                        content="is optional"
                        type="subheading"
                      />
                      <SubheadingField
                        content="if not select, it generate automatically"
                        type="subheading"
                      />
                      <SelectField
                        type="select"
                        name="projectRef"
                        label="Project reference"
                        items={projectsData.reduce(
                          (result: Record<string, Array<string>>, obj) => {
                            const {
                              type: { name: typeName },
                              name,
                            } = obj;
                            if (result[typeName]) {
                              result[typeName].push(name);
                            } else {
                              result[typeName] = [name];
                            }

                            return result;
                          },
                          {}
                        )}
                        autocomplete
                      />
                      <Spacer y={2} />
                      <HeadingField
                        content="Reference of the client"
                        type="heading"
                      />
                      <SubheadingField content="or company" type="subheading" />
                      <SelectField
                        type="select"
                        name="clientRef"
                        label="Client reference"
                        items={companiesData.map((company) => company.name)}
                        option={{
                          required: {
                            value: true,
                            message:
                              "Please select a client or company reference",
                          },
                        }}
                        onAddOption={() => setOpenAddCompany(true)}
                      />
                      <Spacer y={2} />
                      <HeadingField
                        content="Register name of the client"
                        type="heading"
                      />
                      <SubheadingField
                        content="is optional"
                        type="subheading"
                      />
                      <SubheadingField
                        content="if not select, it generate automatically"
                        type="subheading"
                      />
                      <SelectField
                        type="select"
                        name="registerName"
                        label="Register name"
                        items={[
                          ...(companiesData
                            .find((company) => company.name === clientRef)
                            ?.ClientProfiles.map((client) => client.name) ||
                            []),
                        ]}
                        autocomplete
                      />
                      <Spacer y={2} />
                    </Fragment>
                  )}
                  {page === 2 && (
                    <Fragment>
                      <HeadingField
                        content="Register address of the client"
                        type="heading"
                      />
                      <SubheadingField
                        content="is optional"
                        type="subheading"
                      />
                      <AddressField type="address" name="registerAddress" />
                      <Spacer y={2} />
                      <HeadingField content="Sales contact" type="heading" />
                      <SubheadingField
                        content="is optional"
                        type="subheading"
                      />
                      <ContactField type="contact" name="salesContact" />
                      <Spacer y={2} />
                    </Fragment>
                  )}
                  {page === 3 && (
                    <Fragment>
                      <HeadingField
                        content="Currency of Pay and Charge rates"
                        type="heading"
                      />
                      <SubheadingField
                        content="you can only choose one for the hole order"
                        type="subheading"
                      />
                      <TextField
                        type="text"
                        name="currency"
                        label="Currency"
                        option={{
                          required: {
                            value: true,
                            message: "Please enter a currency",
                          },
                        }}
                      />
                      <Spacer y={2} />
                      <HeadingField
                        content="Pay and charge rates"
                        type="heading"
                      />
                      <SubheadingField
                        content="the job roles selected, pre fill the needed workers"
                        type="subheading"
                      />
                      <PayChargeRatesField
                        name="payChargeRates"
                        jobRoles={jobRolesData.map((jobRole) => jobRole.name)}
                      />
                    </Fragment>
                  )}
                  {page === 4 && (
                    <Fragment>
                      {submitting ? (
                        <Fragment>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              height: 200,
                              width: "100%",
                            }}
                          >
                            <Loading size="lg" />
                          </div>
                        </Fragment>
                      ) : (
                        <Fragment>
                          <HeadingField type="heading" content="Form URL" />
                          <fieldset
                            disabled
                            style={{
                              margin: 0,
                              padding: 0,
                              border: 0,
                              minInlineSize: "unset",
                            }}
                          >
                            <TextField
                              type="text"
                              name="formUrl"
                              placeholder="URL"
                            />
                            <Spacer y={2} />
                            <HeadingField type="heading" content="Password" />
                            <TextField
                              type="text"
                              name="password"
                              placeholder="Password"
                            />
                          </fieldset>
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                  <button
                    ref={submitButtonRef}
                    type="submit"
                    style={{ display: "none" }}
                  />
                </form>
              </FormProvider>
            </Grid>
            <Grid xs={12} justify="center">
              <Pagination
                onChange={async (newPage) => {
                  if (page == 1) {
                    await form.trigger([
                      "orderCode",
                      "projectRef",
                      "clientRef",
                      "registerName",
                    ]);
                  } else if (page == 2) {
                    await form.trigger(["salesContact", "registerAddress"]);
                  } else if (page == 3) {
                    await form.trigger(["currency", "payChargeRates"]);
                  }
                  if (Object.keys(form.formState.errors).length === 0) {
                    if (newPage == 4) {
                      submitButtonRef.current?.click();
                    }
                    setPage(newPage);
                  }
                }}
                page={page}
                size="sm"
                total={4}
                bordered
              />
            </Grid>
          </Grid.Container>
        </Modal.Body>
      </Modal>
      <Layout compact>
        <Grid.Container gap={0} css={{ p: 30, height: "100%" }}>
          <Grid xs={12} css={{ h: "60px" }}>
            <div
              style={{
                textAlign: "end",
              }}
            >
              <Text h2 role="banner">
                Order
              </Text>
            </div>
          </Grid>
          <Grid xs={12} css={{ h: "calc(100% - 80px)" }}>
            <Grid.Container gap={1}>
              <Grid xs={12}>
                <Grid.Container
                  gap={2}
                  justify="space-between"
                  css={{ h: "fit-content" }}
                >
                  <Grid xs={12}>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <Grid.Container css={{ h: "100%", display: "block" }}>
                        <Grid xs={12}>
                          <div style={{ width: "100%" }}>
                            <Text weight="light"> </Text>
                            <Grid.Container gap={2} justify="space-between">
                              <Grid>
                                <TwoRowCard
                                  heading={"Add"}
                                  description="new order"
                                  onPress={() => {
                                    setOpen(true);
                                  }}
                                />
                              </Grid>
                            </Grid.Container>
                          </div>
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                  <Grid xs={12}>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <Grid.Container css={{ h: "100%", display: "block" }}>
                        <Grid xs={12}>
                          <div style={{ width: "100%" }}>
                            <Text weight="light">Answered forms</Text>
                            <Grid.Container gap={2} justify="space-between">
                              {orderData.map((order, idx) => (
                                <Fragment key={idx}>
                                  {order.answered && (
                                    <Grid>
                                      <ThreeRowCard
                                        heading={order.orderCode}
                                        description={order.client.company.name}
                                        subdescription={order.Project.name}
                                        onPress={() => {
                                          router.push("/sb/order/" + order.id);
                                        }}
                                      />
                                    </Grid>
                                  )}
                                </Fragment>
                              ))}
                            </Grid.Container>
                          </div>
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                  <Grid xs={12}>
                    <div
                      style={{
                        width: "100%",
                      }}
                    >
                      <Grid.Container css={{ h: "100%", display: "block" }}>
                        <Grid xs={12}>
                          <div style={{ width: "100%" }}>
                            <Text weight="light">Not answered forms</Text>
                            <Grid.Container gap={2} justify="space-between">
                              {orderData.map((order, idx) => (
                                <Fragment key={idx}>
                                  {!order.answered && (
                                    <Grid>
                                      <ThreeRowCard
                                        heading={order.orderCode}
                                        description={order.client.company.name}
                                        subdescription={order.Project.name}
                                      />
                                    </Grid>
                                  )}
                                </Fragment>
                              ))}
                            </Grid.Container>
                          </div>
                        </Grid>
                      </Grid.Container>
                    </div>
                  </Grid>
                </Grid.Container>
              </Grid>
            </Grid.Container>
          </Grid>
        </Grid.Container>
      </Layout>
    </Fragment>
  );
}

function PayChargeRatesField(props: {
  name: string;
  jobRoles: string[];
  option?: DefaultProps["option"];
  helpText?: string;
}) {
  const { name, option, jobRoles } = props;

  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: name,
  });

  useEffect(() => {
    function addNull() {
      update(0, { item: null });
    }
    addNull();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <Grid.Container
            gap={1}
            css={{
              w: "calc(100% + 24px)",
              ml: "-12px",
            }}
          >
            <Grid xs={2.5} alignItems="center">
              <Text>Job role</Text>
            </Grid>
            <Grid xs={9.5}>
              <SelectField
                option={option}
                type="select"
                name={name + "." + index + ".jobRole"}
                items={jobRoles}
              />
            </Grid>
            <Grid xs={12}>
              <Spacer y={0.5} />
            </Grid>
            <Grid xs={2.5} />
            <Grid xs={4.75}>
              <Text>Pay rate</Text>
            </Grid>
            <Grid xs={4.75}>
              <Text>Charge rate</Text>
            </Grid>
            <Grid xs={2.5} alignItems="center">
              <Text>Normal</Text>
            </Grid>
            <Grid xs={4.75}>
              <NumberField
                option={option}
                type="number"
                name={name + "." + index + ".payRate.normal"}
              />
            </Grid>
            <Grid xs={4.75}>
              <NumberField
                option={option}
                type="number"
                name={name + "." + index + ".chargeRate.normal"}
              />
            </Grid>
            <Grid xs={2.5} alignItems="center">
              <Text>OT1</Text>
            </Grid>
            <Grid xs={4.75}>
              <NumberField
                option={option}
                type="number"
                name={name + "." + index + ".payRate.ot1"}
              />
            </Grid>
            <Grid xs={4.75}>
              <NumberField
                option={option}
                type="number"
                name={name + "." + index + ".chargeRate.ot1"}
              />
            </Grid>
            <Grid xs={2.5} alignItems="center">
              <Text>OT2</Text>
            </Grid>
            <Grid xs={4.75}>
              <NumberField
                option={option}
                type="number"
                name={name + "." + index + ".payRate.ot2"}
              />
            </Grid>
            <Grid xs={4.75}>
              <NumberField
                option={option}
                type="number"
                name={name + "." + index + ".chargeRate.ot2"}
              />
            </Grid>
            <Grid xs={2.5} alignItems="center">
              <Text>OT3</Text>
            </Grid>
            <Grid xs={4.75}>
              <NumberField
                option={option}
                type="number"
                name={name + "." + index + ".payRate.ot3"}
              />
            </Grid>
            <Grid xs={4.75}>
              <NumberField
                option={option}
                type="number"
                name={name + "." + index + ".chargeRate.ot3"}
              />
            </Grid>
            <Grid xs={2.5} alignItems="center">
              <Text>OT4</Text>
            </Grid>
            <Grid xs={4.75}>
              <NumberField
                option={option}
                type="number"
                name={name + "." + index + ".payRate.ot4"}
              />
            </Grid>
            <Grid xs={4.75}>
              <NumberField
                option={option}
                type="number"
                name={name + "." + index + ".chargeRate.ot4"}
              />
            </Grid>
          </Grid.Container>
          <Spacer y={fields.length !== index + 1 ? 2 : 1} />
        </Fragment>
      ))}
      <Button.Group ghost rounded>
        <Button
          onPress={() => {
            append({ item: {} });
          }}
          css={{ p: 5, h: 25 }}
        >
          <Plus size={15} />
        </Button>
        <Button
          onPress={() => {
            remove(fields.length - 1);
          }}
          disabled={fields.length === 1}
          css={{ p: 5, h: 25 }}
        >
          <Minus size={15} />
        </Button>
      </Button.Group>
    </Fragment>
  );
}
