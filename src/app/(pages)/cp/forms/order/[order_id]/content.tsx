"use client";
import Footer from "@/comp/sb/ui/Footer";
import Nav from "@/comp/sb/ui/Nav";
import { Form, FormProps, Meta } from "@/comp/sw/app/FormBuilder";
import { Button, Modal, Text } from "@nextui-org/react";
import React, { Fragment, useState } from "react";

export default function OrderFormContent() {
  const [openSubmissionModal, setOpenSubmissionModal] = useState<boolean>(false);

  const fields: FormProps["fields"] = [
    {
      title: {
        type: "title",
        content: "SilverBack Order form",
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
      headingEins: {
        type: "heading",
        content: "The name or code",
      },
      subheadingEins: {
        type: "subheading",
        content: "of the project.",
      },
      projectName: {
        type: "text",
        label: "Project name",
        option: {
          required: {
            message: "Please enter the project name",
            value: true,
          },
        },
      },
      spacerZwei: {
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
      spacerVier: {
        type: "spacer",
        double: true,
      },
      headingDrei: {
        type: "heading",
        content: "What type",
      },
      subheadingDrei: {
        type: "subheading",
        content: "of the project",
      },
      typeOfProject: {
        type: "radio",
        items: [
          "Apartments",
          "Battery Factory",
          "Data Centre",
          "Hospital",
          "Mine",
          "Museum",
          "Paper Mill",
          "Pre-Cast Factory",
          "School",
          "Shopping Centre",
          "Windfarm",
        ],
        columnWidth: 2,
        option: {
          required: {
            value: true,
            message: "Please select a option",
          },
          validate: {
            OtherOption: (value: string) => {
              console.log(value);
              if (value == "other" || value == "") {
                return "Please enter something in the other field";
              } else {
                return true;
              }
            },
          },
        },
        otherOpt: true,
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
      spacerSechs: {
        type: "spacer",
        double: true,
      },
      headingFunf: {
        type: "heading",
        content: "Which workers",
      },
      subheadingFunf: {
        type: "subheading",
        content: "are needed from us",
      },
      workerNeeded: {
        type: "checkbox",
        items: [
          "Electrician",
          "Electrician Assistant",
          "Electrician Team Leader",
          "General Operative",
          "Skilled General Operative",
          "MEWP Spotter",
          "Mechanic",
          "Mechanic Team Leader",
          "Storeperson",
          "Teleporter Driver",
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
            than our teams which is why your consideration is import. Please
            confirm your understanding.
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
      headingSieben: {
        type: "heading",
        content: "The number of workers always on site,",
      },
      subheadingSieben: {
        type: "subheading",
        content: "due to the 6/2-Rotation schedule,",
      },
      subheadingAcht: {
        type: "subheading",
        content: "will always be a multiple of 3",
      },
      spacerNeun: {
        type: "spacer",
      },
      workerOnSite: {
        type: "relationNumber",
        relatedField: "workerNeeded",
      },
      spacerZehn: {
        type: "spacer",
        double: true,
      },
      headingAcht: {
        type: "heading",
        content: "When is the start",
      },
      subheadingNeun: {
        type: "subheading",
        content: "for the Silverback team",
      },
      projectStart: {
        type: "date",
        label: "Start Date",
        option: {
          required: {
            message: "Please enter a start date",
            value: true,
          },
        },
      },
      spacerElf: {
        type: "spacer",
        double: true,
      },
      headingNeun: {
        type: "heading",
        content: "How long",
      },
      subheadingZehn: {
        type: "subheading",
        content: "are we needed",
      },
      projectDuration: {
        type: "grid",
        justify: true,
        columnWidth: 0,
        properties: {
          weeks: {
            type: "number",
            label: "Weeks",
            option: {
              required: {
                message: "Please enter a duration",
                value: true,
              },
            },
          },
        },
      },
      spacerZwolf: {
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
          "Confined space",
          "Construction safety",
          "Harness",
          "MEWP",
          "Manual handling",
          "SSG",
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
      headingZwei: {
        type: "heading",
        content: "Induction Forms needed ",
      },
      subheadingDrei: {
        type: "subheading",
        content: "to be completed before staring on site",
      },
      inductionForms: {
        type: "file",
      },
      spacerZwei: {
        type: "spacer",
        double: true,
      },
      headingDrei: {
        type: "heading",
        content: "Meeting person contact details",
      },
      subheadingVier: {
        type: "subheading",
        content: "of who the SilverBack Team will meet",
      },
      subheadingFunf: {
        type: "subheading",
        content: "or call on the first day",
      },
      meetingPerson: {
        type: "contact",
        option: {
          required: {
            message: "Please enter the details",
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
        content: "Delivery address for ID06 cards,",
      },
      subheadingSechs: {
        type: "subheading",
        content: "if we have to deliver a new card ",
      },
      subheadingAcht: {
        type: "subheading",
        content: "for our staff onsite",
      },
      deliveryAddress: {
        type: "address",
        option: {
          required: {
            message: "Please enter the delivery address",
            value: true,
          },
        },
      },
      spacerVier: {
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
        content: "for the invoicing",
      },
      invoicingAddress: {
        type: "address",
        option: {
          required: {
            message: "Please enter the invoicing address",
            value: true,
          },
        },
      },
      spacerZwei: {
        type: "spacer",
        double: true,
      },
      headingDrei: {
        type: "heading",
        content: "The email(s)"
      },
      subheadingDrei: {
        type: "subheading",
        content: "for the invoice"
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
        double: true
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
                {
                  name: "Mechanic",
                  ncr: "100",
                  ot1: "150",
                  ot2: "200",
                  ot3: "250",
                  ot4: "300",
                  cy: "SEK",
                },
                {
                  name: "Mechanic",
                  ncr: "100",
                  ot1: "150",
                  ot2: "200",
                  ot3: "250",
                  ot4: "300",
                  cy: "SEK",
                },
                {
                  name: "Mechanic",
                  ncr: "100",
                  ot1: "150",
                  ot2: "200",
                  ot3: "250",
                  ot4: "300",
                  cy: "SEK",
                },
                {
                  name: "Mechanic",
                  ncr: "100",
                  ot1: "150",
                  ot2: "200",
                  ot3: "250",
                  ot4: "300",
                  cy: "SEK",
                },
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
                {
                  name: "Mechanic",
                  ncr: "100",
                  ot1: "150",
                  ot2: "200",
                  ot3: "250",
                  ot4: "300",
                  cy: "SEK",
                },
                {
                  name: "Mechanic",
                  ncr: "100",
                  ot1: "150",
                  ot2: "200",
                  ot3: "250",
                  ot4: "300",
                  cy: "SEK",
                },
                {
                  name: "Mechanic",
                  ncr: "100",
                  ot1: "150",
                  ot2: "200",
                  ot3: "250",
                  ot4: "300",
                  cy: "SEK",
                },
                {
                  name: "Mechanic",
                  ncr: "100",
                  ot1: "150",
                  ot2: "200",
                  ot3: "250",
                  ot4: "300",
                  cy: "SEK",
                },
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
  
  const meta: Meta = {
    title: "Order form",
    arg: {
      fields,
      onSubmit: (values: Record<string, any>) => {
        setOpenSubmissionModal(true);
        console.log("values", values);
      },
      defaultValues: {
        
      } as Record<string, any>,
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
          <Text css={{ p: "0 50px" }}>
            <b>Thank you</b> for providing us with the details of your project.
            We appreciate your business and are <b>grateful</b> for the
            opportunity to <b>work</b> with you. <br />
            Your account manager of the SilverBack Team will be in touch with
            you shortly to discuss your project further and to provide any
            additional information you or we may need. <br />
            In the meantime, please don&apos;t hesitate to <b>
              contact us
            </b> with <b>any questions</b> or concerns. We are here to help and
            want to ensure that your experience with our company is a{" "}
            <b>positive</b> one. <br />
            Thank you again for choosing to work with us. We look forward to
            partnering with you on your project.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button
           onPress={()=>{
            window.location.href= "https://silverback.ie"
           }}
           ghost
           css={{
            m: "auto"
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
