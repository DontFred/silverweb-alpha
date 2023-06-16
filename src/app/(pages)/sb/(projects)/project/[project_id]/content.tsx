"use client";
import Toolbar from "@/comp/sw/app/DataDisplay/Toolbar";
import AddressField from "@/comp/sw/app/FormBuilder/ui/AddressField";
import Layout from "@/comp/sw/ui/Layout";
import ContainerCard from "@/comp/sw/ui/cards/ContainerCard";
import { Grid, Loading, Text } from "@nextui-org/react";
import { FormProvider, useForm } from "react-hook-form";
import StyleObject from "csstype";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import TextField from "@/comp/sw/app/FormBuilder/ui/TextField";
import TwoRowCard from "@/comp/sw/ui/cards/TwoRowCard";
import { useRouter } from "next/navigation";
import { ProjectDataProps } from "./page";
import TextAreaField from "@/comp/sw/app/FormBuilder/ui/TextAreaField";
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
});

const FieldsetStyling: StyleObject.Properties = {
  margin: 0,
  padding: 0,
  border: 0,
  minInlineSize: "unset",
};

export default function ProjectInterfaceContent({
  projectData,
}: {
  projectData: ProjectDataProps;
}) {
  const form = useForm({
    defaultValues: {
      projectAddress: {
        streetNo: projectData?.address?.streetNo,
        city: projectData?.address?.city,
        postalCode: projectData?.address?.postCode,
        country: projectData?.address?.country,
      },
      companyName: projectData?.company?.name,
      projectSize: projectData?.size,
      projectComment: projectData?.projectComment,
    },
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
            <Grid.Container gap={0} css={{ m: 30 }}>
              <Grid xs={12} css={{ h: "60px" }}>
                <div
                  style={{
                    textAlign: "end",
                  }}
                >
                  <Text h2 role="banner">
                    Project | {projectData.name}
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
                                      <ContainerCard noBorder noPadding>
                                        <Map
                                          centerMarker
                                          marker={[
                                            {
                                              name: projectData?.name,
                                              id: projectData?.id,
                                              company:
                                                projectData?.company?.name,
                                              type: projectData?.type,
                                              address:
                                                projectData?.address
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
                        <Grid xs={12} sm={6}>
                          <div
                            style={{
                              width: "100%",
                              display: "flex",
                              flexFlow: "column",
                            }}
                          >
                            <Text weight="light" css={{ flex: "0 1 auto" }}>
                              Information
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
                                      <TextField
                                        type="text"
                                        name="companyName"
                                        label="Company name"
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
                                      <TextField
                                        type="text"
                                        name="projectSize"
                                        label="Size"
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
                                        name="projectComment"
                                        label="Comment"
                                        option={{
                                          required: {
                                            message:
                                              "This field can't be empty",
                                            value: true,
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
                                    {projectData?.order?.map((order) => (
                                      <Grid key={order.id}>
                                        <TwoRowCard
                                          heading={order?.orderCode}
                                          description={order?.client?.company?.name}
                                          onPress={() => {
                                            router.push("/sb/order/"+order.id)
                                          }}
                                        />
                                      </Grid>
                                    ))}
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
