"use client";
import Layout from "@/comp/sw/ui/Layout";
import ThreeRowCard from "@/comp/sw/ui/cards/ThreeRowCard";
import TwoRowCard from "@/comp/sw/ui/cards/TwoRowCard";
import { Button, Grid, Modal, Pagination, Spacer, Text } from "@nextui-org/react";
import React, { Fragment, useEffect, useState } from "react";
import { CompanyProps, JobRolesProps, OrderProps, ProjectProps } from "./page";
import { useRouter } from "next/navigation";
import { FormProvider, useFieldArray, useForm, useFormContext } from "react-hook-form";
import TextField from "@/comp/sw/app/FormBuilder/ui/TextField";
import SelectField from "@/comp/sw/app/FormBuilder/ui/SelectField";
import HeadingField from "@/comp/sw/app/FormBuilder/ui/HeadingField";
import SubheadingField from "@/comp/sw/app/FormBuilder/ui/SubheadingField";
import AddressField from "@/comp/sw/app/FormBuilder/ui/AddressField";
import ContactField from "@/comp/sw/app/FormBuilder/ui/ContactField";
import { DefaultProps } from "@/comp/sw/app/FormBuilder/types";
import { Minus, Plus } from "lucide-react";
import { trpc } from "@/lib/trpc/csTRPC";
import NumberField from "@/comp/sw/app/FormBuilder/ui/NumberField";

type AddOrderProps = {
  orderCode: string;
  projectRef: string;
  clientRef: string;
  registerName: string;
  registerAddress: {
    streetNo: string;
    postCode: string;
    city: string;
    country: string;
  };
  salesContact: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
  currency: string;
  payChargeRates: {
    jobRole: string;
    payRate: {
      normal: string
    }
  }
};

export default function OrderFormContent({
  orderData,
  projectsData,
  companiesData,
  jobRolesData
}: {
  orderData: OrderProps[];
  projectsData: ProjectProps[];
  companiesData: CompanyProps[];
  jobRolesData: JobRolesProps[];
}) {
  const form = useForm({
    defaultValues: {
      orderCode: "",
    } as AddOrderProps,
  });
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const router = useRouter();

  function handleAddOrder(data: any) {}
  return (
    <Fragment>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        width="30%"
        css={{ p: "$sm" }}
      >
        <Modal.Body>
          <Grid.Container gap={2}>
            <Grid xs={12}>
              <FormProvider {...form}>
                <form
                  onSubmit={form.handleSubmit(handleAddOrder)}
                  style={{ width: "100%" }}
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
                            checkIfUnique: () => {
                              return true;
                            },
                          },
                        }}
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
                            .find(
                              (company) =>
                                company.name === form.watch("clientRef")
                            )
                            ?.ClientProfiles.map((client) => client.name) ||
                            []),
                        ]}
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
                      <TextField type="text" name="currency" label="Currency"/>
                      <Spacer y={2} />
                      <HeadingField content="Pay and charge rates" type="heading" />
                      <SubheadingField content="the job roles selected, pre fill the needed workers" type="subheading" />
                      <PayChargeRatesField name="payChargeRates" jobRoles={jobRolesData.map((jobRole) => jobRole.name)}   />
                    </Fragment>
                  )}
                </form>
              </FormProvider>
            </Grid>
            <Grid xs={12} justify="center">
              <Pagination
                onChange={(page) => setPage(page)}
                page={page}
                loop
                size="xl"
                onlyDots
                rounded
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
                            <Grid.Container gap={2}>
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
                            <Grid.Container gap={2}>
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


function PayChargeRatesField(props: { name: string, jobRoles: string[], option?: DefaultProps["option"], helpText?: string }) {
  const { name, option, jobRoles } = props;

  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: name,
  });
  
  useEffect(() => {
    function addNull(){
      update(0, { item: null });
    }
    addNull()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Fragment>
      {fields.map((field, index) => (
        <Fragment key={field.id}>
      <Grid.Container gap={1} css={{
        w: "calc(100% + 24px)",
        ml: "-12px"
      }}>
        <Grid xs={2.5} alignItems="center">
          <Text>
            Job role
          </Text>
        </Grid>
        <Grid xs={9.5}>
          <SelectField
            option={option} type="select"
            name={name + "."+ index + ".jobRole"}
            items={jobRoles}
          />
        </Grid>
        <Grid xs={12}>
          <Spacer y={0.5} />
        </Grid>
        <Grid xs={2.5}/>
        <Grid xs={4.75}>
          <Text>
            Pay rate
          </Text>
        </Grid>
        <Grid xs={4.75}>
          <Text>
            Charge rate
          </Text>
        </Grid>
        <Grid xs={2.5} alignItems="center">
          <Text>
            Normal
          </Text>
        </Grid>
        <Grid xs={4.75}>
          <NumberField option={option} type="number" name={name + "."+ index + ".payRate.normal"}/>
        </Grid>
        <Grid xs={4.75}>
          <NumberField option={option} type="number" name={name + "."+ index + ".chargeRate.normal"}/>
        </Grid>
        <Grid xs={2.5} alignItems="center">
          <Text>
            OT1
          </Text>
        </Grid>
        <Grid xs={4.75}>
          <NumberField option={option} type="number" name={name + "."+ index + ".payRate.ot1"}/>
        </Grid>
        <Grid xs={4.75}>
          <NumberField option={option} type="number" name={name + "."+ index + ".chargeRate.ot1"}/>
        </Grid>
        <Grid xs={2.5} alignItems="center">
          <Text>
            OT2
          </Text>
        </Grid>
        <Grid xs={4.75}>
          <NumberField option={option} type="number" name={name + "."+ index + ".payRate.ot2"}/>
        </Grid>
        <Grid xs={4.75}>
          <NumberField option={option} type="number" name={name + "."+ index + ".chargeRate.ot2"}/>
        </Grid>
        <Grid xs={2.5} alignItems="center">
          <Text>
            OT3
          </Text>
        </Grid>
        <Grid xs={4.75}>
          <NumberField option={option} type="number" name={name + "."+ index + ".payRate.ot3"}/>
        </Grid>
        <Grid xs={4.75}>
          <NumberField option={option} type="number" name={name + "."+ index + ".chargeRate.ot3"}/>
        </Grid>
        <Grid xs={2.5} alignItems="center">
          <Text>
            OT4
          </Text>
        </Grid>
        <Grid xs={4.75}>
          <NumberField option={option} type="number" name={name + "."+ index + ".payRate.ot4"}/>
        </Grid>
        <Grid xs={4.75}>
          <NumberField option={option} type="number" name={name + "."+ index + ".chargeRate.ot4"}/>
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
  )
}