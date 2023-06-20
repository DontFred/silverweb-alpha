"use client";
import Toolbar from "@/comp/sw/app/DataDisplay/Toolbar";
import Layout from "@/comp/sw/ui/Layout";
import ContainerCard from "@/comp/sw/ui/cards/ContainerCard";
import { Grid, Loading, Text } from "@nextui-org/react";
import { useRouter } from "next/navigation";
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
    // defaultValues: {
    //   projectAddress: {
    //     streetNo: projectData?.address?.streetNo,
    //     city: projectData?.address?.city,
    //     postalCode: projectData?.address?.postCode,
    //     country: projectData?.address?.country,
    //   },
    //   companyName: projectData?.company?.name,
    //   projectSize: projectData?.size,
    //   projectComment: projectData?.projectComment,
    // },
  });
  const {
    formState: { isSubmitting },
  } = form;
  async function saveChangedData(data: Record<string, any>) {
    await new Promise((res) => setTimeout(() => res(" "), 500)).then(() => {});
  }

  const router = useRouter();

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
                              SB Information
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
                                                      ...orderData
                                                        ?.meetingPerson,
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
                                                {orderData?.inductionForms.map((form, idx)=> (
                                                  <Grid key={idx}>
                                                    <FileCard file={form.file}/>
                                                  </Grid>
                                                ))}
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
                              Other on the project:
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
                                    {/* <Grid>
                                    <TwoRowCard heading="JD4" description="Convergin" onPress={()=>{

                                    }}/>
                                  </Grid> */}
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
