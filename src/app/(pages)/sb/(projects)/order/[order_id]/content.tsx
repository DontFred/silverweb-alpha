"use client"
import Toolbar from "@/comp/sw/app/DataDisplay/Toolbar";
import Layout from "@/comp/sw/ui/Layout";
import ContainerCard from "@/comp/sw/ui/cards/ContainerCard";
import { Grid, Text } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Fragment, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import StyleObject from "csstype";
import ContactCard from "@/comp/sw/ui/cards/ContactCard";
import { createRandomContact } from "@/faker";


const FieldsetStyling: StyleObject.Properties = {
  margin: 0,
  padding: 0,
  border: 0,
  minInlineSize: "unset",
};

export default function OrderInterfaceContent() {
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
                    Project | 
                  </Text>
                </div>
              </Grid>
              <Grid xs={12} css={{ h: "calc(100% - 80px)" }}>
                <Grid.Container gap={1}>
                  <Grid xs={12}>
                    <div style={{ width: "100%" }}>
                      <Grid.Container alignContent="stretch">
                        <Grid xs={12} sm={6}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexFlow: "column",
                            }}
                          >
                            <Text css={{ flex: "0 1 auto" }} weight="light">
                              Contacts:
                            </Text>
                            <Grid.Container
                              gap={2}
                              justify="space-between"
                              css={{ flex: "1 1 auto" }}
                            >
                              <Grid xs={12}>
                                <ContainerCard>
                                  <Grid.Container gap={2} alignItems="stretch">
                                    <ContactCard contact={createRandomContact()}/>
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
                            <Text css={{ flex: "0 1 auto" }} weight="light">
                              Location
                            </Text>
                            <Grid.Container
                              gap={2}
                              justify="space-between"
                              css={{ flex: "1 1 auto" }}
                            >
                              <Grid xs={12}>
                                <ContainerCard>
                                  <Grid.Container gap={2} alignItems="stretch">
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
                              Clients on the project:
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
  )
}
