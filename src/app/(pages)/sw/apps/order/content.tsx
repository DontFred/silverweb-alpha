"use client";
import Layout from "@/comp/sw/ui/Layout";
import ThreeRowCard from "@/comp/sw/ui/cards/ThreeRowCard";
import TwoRowCard from "@/comp/sw/ui/cards/TwoRowCard";
import { Grid, Modal, Pagination, Spacer, Text } from "@nextui-org/react";
import React, { Fragment, useState } from "react";
import { OrderProps } from "./page";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import TextField from "@/comp/sw/app/FormBuilder/ui/TextField";
import SelectField from "@/comp/sw/app/FormBuilder/ui/SelectField";
import HeadingField from "@/comp/sw/app/FormBuilder/ui/HeadingField";
import SubheadingField from "@/comp/sw/app/FormBuilder/ui/SubheadingField";

type AddOrderProps = {};

export default function OrderFormContent({
  orderData,
}: {
  orderData: OrderProps[];
}) {
  const form = useForm({
    defaultValues: {} as AddOrderProps,
  });
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  function handleAddOrder(data: AddOrderProps) {}
  return (
    <Fragment>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        width="40%"
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
                  <Text h3>Add order</Text>
                  <Spacer y={2} />
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
                  <HeadingField content="Project reference" type="heading" />
                  <SubheadingField
                    content="if not select, it generate automatically"
                    type="subheading"
                  />
                  <SelectField
                    type="select"
                    name="projectRef"
                    label="Project reference (opt.)"
                    items={[]}
                  />
                  <Spacer y={2} />
                  <HeadingField content="Client reference" type="heading" />
                  <SelectField
                    type="select"
                    name="clientRef"
                    label="Client reference"
                    items={[]}
                  />
                  <Spacer y={2} />
                  <HeadingField
                    content="Register name of the client"
                    type="heading"
                  />
                  <SubheadingField
                    content="if not select, it generate automatically"
                    type="subheading"
                  />
                  <SelectField
                    type="select"
                    name="registerName"
                    label="Register name (opt.)"
                    items={[]}
                  />
                </form>
              </FormProvider>
            </Grid>
            <Grid xs={12} justify="center">
              <Pagination loop size="lg" onlyDots rounded total={5} bordered />
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
