"use client";
import Footer from "@/comp/sb/ui/Footer";
import Nav from "@/comp/sb/ui/Nav";
import { Form, FormProps, Meta } from "@/comp/sw/app/FormBuilder";
import { Button, Loading, Modal, Text } from "@nextui-org/react";
import { useParams } from "next/navigation";
import React, { Fragment, useState } from "react";
import { FormDataProps, OrderProps } from "./type";
import { trpc } from "@/lib/trpc/csTRPC";

export default function OrderFormContent({
  order,
  auth,
}: {
  order: OrderProps;
  auth: string;
}) {
  const [openSubmissionModal, setOpenSubmissionModal] =
    useState<boolean>(false);

  const submitForm = trpc.submitOrderForm.useMutation();

  const fields: FormProps["fields"] = [
    {
      title: {
        type: "title",
        content: "SilverBack Order for " + order.clientProjectCode,
      },
      descriptionEins: {
        type: "description",
        content:
          "Thank you for getting in touch with ourselves. We’re delighted to get the opportunity to assist in the resourcing of your project(s) and we look forward to working closely with you to make it a successful collaboration.",
      },
      descriptionZwei: {
        type: "description",
        content:
          "Please fill out upcoming the form, after you identify yourself with the Identification Number you got. Once completed a member of the SilverBack team will be in contact with you to go through all details so we can commence in an efficient manner.",
      },
      spacerEins: {
        type: "spacer",
        double: true,
      },
      authCode: {
        type: "password",
        label: "Password",
        option: {
          required: {
            value: true,
            message: "Please enter your password",
          },
          pattern: {
            value: /^[A-Z2-7]{16}$/,
            message: "Please enter a valid password",
          },
          validate: {
            password: async (value) => {
              if (auth == value) {
                return undefined;
              }
              return "Please enter your correct password";
            },
          },
        },
      },
      spacerZwei: {
        type: "spacer",
      },
    },
    {
      title: {
        type: "title",
        content: "About you",
      },
      description: {
        type: "description",
        content:
          "This section of the form is to give us an information on your company and colleagues who will be involved in our collaboration",
      },
      spacerEins: {
        type: "spacer",
        double: true,
      },
      headingEins: {
        type: "heading",
        content: "Official Company Name",
      },
      subheadingEins: {
        type: "subheading",
        content: "for contract purposes.",
      },
      officialCompanyName: {
        type: "text",
        label: "Company Name",
        option: {
          required: {
            value: true,
            message: "Please enter your company name",
          },
        },
      },
      spacerZwei: {
        type: "spacer",
        double: true,
      },
      headingZwei: {
        type: "heading",
        content: "Registered address",
      },
      subheadingZwei: {
        type: "subheading",
        content: "of the company",
      },
      companyAddress: {
        type: "address",
        option: {
          required: {
            value: true,
            message: "Please enter your company address",
          },
        },
      },
      spacerDrei: {
        type: "spacer",
        double: true,
      },
      headingDrei: {
        type: "heading",
        content: "Your",
      },
      subheadingDrei: {
        type: "subheading",
        content: "contact details",
      },
      personalContact: {
        type: "contact",
        label: "Personal Contact",
        option: {
          required: {
            message: "Please enter your details",
            value: true,
          },
        },
      },
      spacerVier: {
        type: "spacer",
        double: true,
      },
      headingVier: {
        type: "heading",
        content: "Your Colleagues Contact Details",
      },
      subheadingVier: {
        type: "subheading",
        content: "who will be involved in our collaboration.",
      },
      colleaguesContactDetails: {
        type: "array",
        item: "contact",
        counterMessage: "Colleague No.",
        option: {
          required: {
            message: "Please enter one details",
            value: true,
          },
        },
      },
      spacerFunf: {
        type: "spacer",
        double: true,
      },
    },
    {
      title: {
        type: "title",
        content: "Project Information",
      },
      description: {
        type: "description",
        content:
          "This section of the form is to give us an information on the project you are working on and ultimately know what SilverBack need to resource in order to solve the needs on your mission critical construction projects.",
      },
      spacerEins: {
        type: "spacer",
        double: true,
      },
      headingZwei: {
        type: "heading",
        content: "The address",
      },
      subheadingZwei: {
        type: "subheading",
        content: "of the project",
      },
      projectAddress: {
        type: "address",
        option: {
          required: {
            message: "Please enter the project address",
            value: true,
          },
        },
      },
      spacerFunf: {
        type: "spacer",
        double: true,
      },
      headingVier: {
        type: "heading",
        content: "What type of work",
      },
      subheadingVier: {
        type: "subheading",
        content: "is being performed",
      },
      performedWork: {
        type: "checkbox",
        items: [
          "1st & 2nd Fix",
          "CCTV",
          "Cable pulling",
          "Commissioning",
          "Fire alarm",
          "General containment",
          "Glanding",
          "Installing switchgear",
          "Isolations and bussbar",
          "Ladder",
          "Metal conduit",
          "Non-FAB cable tray & trucking",
          "Pre-FAB cable tray & trucking",
          "Plastic conduit",
          "Quality control and assurance",
          "Rack",
          "Security door system",
          "Terminations of < 150m2",
          "Terminations of > 150m2",
          "Testing and inspection",
        ],
        otherOpt: true,
        columnWidth: 2,
        option: {
          required: {
            value: true,
            message: "Please select a option",
          },
          validate: {
            OtherOption: (value: string[]) => {
              if (value.indexOf("other") !== -1 || value.indexOf("") !== -1) {
                return "Please enter something in the other field";
              } else {
                return true;
              }
            },
          },
        },
      },
      spacerSieben: {
        type: "spacer",
        double: true,
      },
      headingSechs: {
        type: "heading",
        content: "The rotation",
      },
      subheadingSechs: {
        type: "subheading",
        content: "will be",
      },
      descriptionZwei: {
        type: "description",
        content: (
          <Text size="$sm">
            The rotation will be 6 weeks on / 2 weeks off. The hours we work per
            week breaks down as follows which averages 40 p/w:
            <br />
            <b>W1 - W4 (54hrs):</b>
            <br />
            <i>Mon-Thurs: 11 hrs (07:00 - 19:00) &</i>
            <br />
            <i>Fri 10 hrs (07:00 - 18:00)</i>
            <br />
            <b>W5 - W6 (52hrs):</b>
            <br />
            <i>Mon-Thurs: 11 hrs (07:00 - 19:00) &</i>
            <br />
            <i>Fri 8 hrs (07:00 - 16:00)</i>
            <br />
            <b>W7 - W8 (0hrs):</b>
            <br />
            <i>Home on rotation</i>
            <br />
            We are conscious of likelihood that your direct staff finish earlier
            than our teams which is why your consideration is import. Do you
            have supervision to work on the schedule above? If so please
            confirm, if not please write your changes in the comment box.
          </Text>
        ),
      },
      confirmRotation: {
        type: "checkbox",
        items: ["I confirm"],
        option: {
          required: {
            value: true,
            message: "Please confirm the rotation.",
          },
        },
      },
      spacerAcht: {
        type: "spacer",
        double: true,
      },
      headingAcht: {
        type: "heading",
        content: "Comment to rotation",
      },
      subheadingAcht: {
        type: "subheading",
        content: "if you have any",
      },
      commentToRotation: {
        type: "textarea",
      },
      spacerZwolf: {
        type: "spacer",
        double: true,
      },
      headingZehn: {
        type: "heading",
        content: "How long",
      },
      subheadingElf: {
        type: "subheading",
        content: "are we needed",
      },
      projectDuration: {
        type: "date-range",
        label: "Duration",
        option: {
          validate: {
            duration: (value) => {
              if (value.from == undefined || value.to == undefined) {
                return "Please enter a duration";
              } else {
                return true;
              }
            },
          },
        },
      },
      spacerDreizehn: {
        type: "spacer",
        double: true,
      },
    },
    {
      titleEins: {
        type: "title",
        content: "Trainings and Inductions",
      },
      descriptionEins: {
        type: "description",
        content:
          "This part of the form is to give us information of the induction process and training courses required to have the SilverBack Team start in an efficient manner.",
      },
      descriptionZwei: {
        type: "description",
        content:
          "You will have access to all required documentation via a link to a secure client portal that we host on a system called Sharefile by Citrix. With the focus on data protection and GDPR compliance, this system enables us to share all relevant information about the SilverBack team with you in a controlled and secure manner. The information that we will share with you on this includes:",
      },
      descriptionDrei: {
        type: "description",
        content: (
          <Fragment>
            <ul>
              <li style={{ margin: 0 }}>
                ∙ Electrical qualification / certificates
              </li>
              <li style={{ margin: 0 }}>∙ Training courses</li>
              <li style={{ margin: 0 }}>∙ ID06</li>
              <li style={{ margin: 0 }}>∙ Induction forms</li>
            </ul>
          </Fragment>
        ),
      },
      headingEins: {
        type: "heading",
        content: "Are training courses required,",
      },
      subheadingEins: {
        type: "subheading",
        content: "with all employees having the Safe Construction course",
      },
      subheadingZwei: {
        type: "subheading",
        content: "done as a standard",
      },
      requiredTrainingCourses: {
        type: "checkbox",
        items: [
          "Confined space¹",
          "Construction safety²",
          "Harness³",
          "MEWP⁴",
          "Manual handling⁵",
          "SSG⁶",
        ],
        columnWidth: 2,
        otherOpt: true,
        option: {
          required: {
            value: true,
            message: "Please select an option",
          },
          validate: {
            OtherOption: (value: string[]) => {
              if (value.indexOf("other") !== -1 || value.indexOf("") !== -1) {
                return "Please enter something in the other field";
              } else {
                return true;
              }
            },
          },
        },
      },
      spacerEins: {
        type: "spacer",
        double: true,
      },
      descriptionSieben: {
        type: "description",
        content: (
          <Fragment>
            <Text
              css={{
                color: "$primary",
                fs: "$xs",
                lh: "$sm",
              }}
            >
              ¹: Entry or exit and is not designed for continuous occupancy.
              <br />
              ²: A principle adhered to and enforced by construction safety
              managers.
              <br />
              ³: Help to work safely at height through a harness's proper use.
              <br />
              ⁴: Mobile elevating work platforms
              <br />
              ⁵: An industry standard for a safer work environment at industrial
              plants.
              <br />
              ⁶: Standard Solutions Group - SSG Entre Basic Course
            </Text>
          </Fragment>
        ),
      },
      spacerZwei: {
        type: "spacer",
        double: true,
      },
      headingZwei: {
        type: "heading",
        content: "Documents needed ",
      },
      subheadingDrei: {
        type: "subheading",
        content: "to be completed before staring on site",
      },
      inductionForms: {
        type: "file",
      },
      spacerSechs: {
        type: "spacer",
        double: true,
      },
      headingSechs: {
        type: "heading",
        content: "Delivery address for ID06 cards,",
      },
      subheadingAcht: {
        type: "subheading",
        content: "if we have to deliver a new card for our staff onsite",
      },
      subheadingNeun: {
        type: "subheading",
        content: "leave blank if same then project address",
      },
      deliveryAddress: {
        type: "address",
      },
      spacerSieben: {
        type: "spacer",
        double: true,
      },
    },
    {
      titleEins: {
        type: "title",
        content: "Invoicing Details and Charge rates",
      },
      descriptionEins: {
        type: "description",
        content:
          "This part of the form is to give us invoice, billing and charge rates information",
      },
      heaingEins: {
        type: "heading",
        content: "Pay term",
      },
      subheadingEins: {
        type: "subheading",
        content: "will be",
      },
      descriptionZwei: {
        type: "description",
        content:
          "SilverBack will send a weekly invoice with a 30 days payment term. Please confirm your understanding.",
      },
      confirmPayterm: {
        type: "checkbox",
        items: ["I confirm"],
        option: {
          required: {
            value: true,
            message: "Please confirm the pay term.",
          },
        },
      },
      spacerZwei: {
        type: "spacer",
        double: true,
      },
      headingDrei: {
        type: "heading",
        content: "The email(s)",
      },
      subheadingDrei: {
        type: "subheading",
        content: "for the invoice",
      },
      invoicingEmail: {
        type: "textarea",
        label: "Invoicing email",
        option: {
          required: {
            message: "Please enter an invoicing email",
            value: true,
          },
        },
      },
      spacerDrei: {
        type: "spacer",
        double: true,
      },
      headingVier: {
        type: "heading",
        content: "The organization number",
      },
      subheadingVier: {
        type: "subheading",
        content: "of the company",
      },
      orgaNumber: {
        type: "text",
        label: "ORGANR",
        option: {
          required: {
            value: true,
            message: "Please enter the ORGA number",
          },
        },
      },
      spacerVier: {
        type: "spacer",
        double: true,
      },
      headingFunf: {
        type: "heading",
        content: "Company VAT",
      },
      subheadingFunf: {
        type: "subheading",
        content: "or MOMS number",
      },
      vatNumber: {
        type: "text",
        label: "VAT/ MOMS",
        option: {
          required: {
            value: true,
            message: "Please enter the VAT/ MOMS number",
          },
        },
      },
      spacerFunf: {
        type: "spacer",
        double: true,
      },
      headingSechs: {
        type: "heading",
        content: "The charge rates",
      },
      subheadingSechs: {
        type: "subheading",
        content: "will be",
      },
      descriptionDrei: {
        type: "description",
        content: (
          <Text size="$sm">
            Please confirm to the following hourly charge rate for the first 54
            hours Monday - Friday:
          </Text>
        ),
      },
      descriptionVier: {
        type: "description",
        content: (
          <Fragment>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                padding: "0 20px",
                gap: 10,
              }}
            >
              {[
                ...order.PayChargeRate.map((cr) => ({
                  name: cr.jobRole.name,
                  ncr: cr.chargeRate.normal,
                  cy: cr.currency,
                })),
              ].map((cr, idx) => (
                <Fragment key={idx}>
                  <Text size="$sm">
                    <b>{cr.name}:</b>
                    <br />
                    <i>
                      {cr.ncr} {cr.cy}
                    </i>
                  </Text>
                </Fragment>
              ))}
            </div>
          </Fragment>
        ),
      },
      confirmChargerates: {
        type: "checkbox",
        items: ["I confirm"],
        option: {
          required: {
            value: true,
            message: "Please confirm the charge rates",
          },
        },
      },
      spacerSechs: {
        type: "spacer",
        double: true,
      },
      headingSieben: {
        type: "heading",
        content: "The overtime charge rates",
      },
      subheadingSieben: {
        type: "subheading",
        content: "will be",
      },
      descriptionFunf: {
        type: "description",
        content: (
          <Text size={"$sm"}>
            Please confirm to the following overtime hourly charge rates:
          </Text>
        ),
      },
      descriptionSechs: {
        type: "description",
        content: (
          <Fragment>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                padding: "0 20px",
                gap: 10,
              }}
            >
              {[
                ...order.PayChargeRate.map((pc) => ({
                  name: pc.jobRole.name,
                  ot1: pc.chargeRate.ot1,
                  ot2: pc.chargeRate.ot2,
                  ot3: pc.chargeRate.ot3,
                  ot4: pc.chargeRate.ot4,
                  cy: pc.currency,
                })),
              ].map((cr, idx) => (
                <Fragment key={idx}>
                  <Text size="$sm">
                    <b>{cr.name}:</b>
                    <br />
                    <i>
                      OT1¹: {cr.ot1} {cr.cy}
                      <br />
                      OT2²: {cr.ot2} {cr.cy}
                      <br />
                      OT3³: {cr.ot3} {cr.cy}
                      <br />
                      OT4⁴: {cr.ot4} {cr.cy}
                    </i>
                  </Text>
                </Fragment>
              ))}
            </div>
          </Fragment>
        ),
      },
      confirmOTChargerates: {
        type: "checkbox",
        items: ["I confirm"],
        option: {
          required: {
            value: true,
            message: "Please confirm the overtime change rates",
          },
        },
      },
      spacerSieben: {
        type: "spacer",
        half: true,
      },
      descriptionSieben: {
        type: "description",
        content: (
          <Fragment>
            <Text
              css={{
                color: "$primary",
                fs: "$xs",
                lh: "$sm",
              }}
            >
              OT1¹: 1st 2nd hour immediately after normal working hours
              <br />
              OT2²: Overtime hours after OT1 until midnight
              <br />
              OT3³: After midnight on weekday plus Saturday and Sundays
              <br />
              OT4⁴: Most public holidays
            </Text>
          </Fragment>
        ),
      },
    },
  ];

  const params = useParams();
  const meta: Meta = {
    title: "Order form",
    arg: {
      fields,
      onSubmit: async (values: Record<string, any>) => {
        setOpenSubmissionModal(true);
        await submitForm.mutateAsync({
          orderId: order.id,
          ...(values as FormDataProps),
        });
      },
      onChange(fv) {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "SilverWeb-LS-" + params.order_id,
            ""
            // JSON.stringify(fv)
          );
        }
      },
      defaultValues: {
        ...{
          authCode: "",
          officialCompanyName: order.client.name,
          companyAddress: {
            ...(order.client.address.id !==
              "00000000-0000-0000-0000-000000000000" && {
              streetNo: order.client.address.streetNo,
              city: order.client.address.city,
              postalCode: order.client.address.postCode,
              country: order.client.address.country,
            }),
          },
          personalContact: {
            firstName: order.ContactOrder.find((c) => c.orderNo == 1)?.contact
              .firstName,
            lastName: order.ContactOrder.find((c) => c.orderNo == 1)?.contact
              .lastName,
            jobPosition: order.ContactOrder.find((c) => c.orderNo == 1)?.contact
              .jobPosition,
            email: order.ContactOrder.find((c) => c.orderNo == 1)?.contact
              .email,
            phone: order.ContactOrder.find((c) => c.orderNo == 1)?.contact
              .phoneNumber,
          },
          ...(order.Project.name !== "No Project yet" && {
            projectName: order.Project.name,
          }),
          projectAddress: {
            streetNo: "",
            city: "",
            postalCode: "",
            country: "",
          },
          performedWork: [],
          workerNeeded: [...order.PayChargeRate.map((pc) => pc.jobRole.name)],
          confirmRotation: [],
          projectDuration: {},
          requiredTrainingCourses: [],
          inductionForms: [],
          typeOfProject:
            order.Project.type.id !== "00000000-0000-0000-0000-000000000000" &&
            order.Project.type.name,
          meetingPerson: {
            firstName: "",
            lastName: "",
            jobPosition: "",
            email: "",
          },
          deliveryAddress: {
            streetNo: "",
            city: "",
            postalCode: "",
            country: "",
          },
          confirmPayterm: [],
          invoicingAddress: {
            streetNo: "",
            city: "",
            postalCode: "",
            country: "",
          },
          orgaNumber: "",
          vatNumber: "",
          confirmChargerates: [],
          confirmOTChargerates: [],
          colleaguesContactDetails: [
            {
              phone: null,
              firstName: null,
              lastName: "",
              jobPosition: "",
              email: "",
            },
          ],
        },

        ...(typeof window !== "undefined" &&
          JSON.parse(
            localStorage.getItem("SilverWeb-LS-" + params.order_id) || "{}"
          )),
      } as FormDataProps,
    },
  };
  return (
    <Fragment>
      <Modal
        width="100%"
        css={{
          width: "90%",
          m: "0 auto",
          "@sm": {
            width: "60%",
          },
          "@md": {
            width: "45%",
          },
          "@lg": {
            width: "45%",
          },
        }}
        blur
        open={openSubmissionModal}
        preventClose
      >
        <Modal.Header>
          <Text h2>Submitting form</Text>
        </Modal.Header>
        <Modal.Body>
          {submitForm.isLoading ? (
            <Loading size="xl" css={{ m: "auto", py: 100 }} />
          ) : (
            <Fragment>
              <Text css={{ p: "0 50px" }}>
                <b>Thank you</b> for providing us with the details of your
                project. We appreciate your business and are <b>grateful</b> for
                the opportunity to <b>work</b> with you.
              </Text>
              <Text css={{ p: "0 50px" }}>
                Your account manager of the SilverBack Team will be in touch
                with you shortly to discuss your project further and to provide
                any additional information you or we may need.
              </Text>
              <Text css={{ p: "0 50px" }}>
                In the meantime, please don&apos;t hesitate to <b>contact us</b>{" "}
                with <b>any questions</b> or concerns. We are here to help and
                want to ensure that your experience with our company is a{" "}
                <b>positive</b> one.
              </Text>
              <Text css={{ p: "0 50px" }}>
                Thank you again for choosing to work with us. We look forward to
                partnering with you on your project.
              </Text>
            </Fragment>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            onPress={() => {
              window.location.href =
                process.env.NEXT_PUBLIC_SILVERBACK_DOMAIN + "";
            }}
            size={"sm"}
            disabled={submitForm.isLoading}
            ghost
            css={{
              m: "auto",
              my: "$4",
            }}
          >
            Redirect
          </Button>
        </Modal.Footer>
      </Modal>
      <Form {...meta.arg} />
      <div
        style={{
          height: "100vh",
          position: "relative",
          top: 0,
          left: 0,
        }}
      >
        <Nav
          data={[
            { title: "Home", href: "#" },
            { title: "About", href: "#" },
            { title: "Method", href: "#" },
            { title: "Partnerships", href: "#" },
            { title: "Job board", href: "#" },
            { title: "Content", href: "#" },
          ]}
          active={0}
        />
        <Footer />
      </div>
    </Fragment>
  );
}
