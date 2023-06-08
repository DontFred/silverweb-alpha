"use client";
import Footer from "@/comp/sb/ui/Footer";
import Nav from "@/comp/sb/ui/Nav";
import { Form, FormProps, Meta } from "@/comp/sw/app/FormBuilder";
import { Text } from "@nextui-org/react";
import React, { Fragment } from "react";
import { useFormContext } from "react-hook-form";

export default function OrderForm() {
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
            OtherOption: (value: string[]) => {
              if (value.indexOf("other") !== -1 || value.indexOf("") !== -1) {
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
      confirmRoation: {
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
        double: true
      },
      headingZwei: {
        type: "heading",
        content: "Induction Forms needed "
      },
      subheadingDrei: {
        type: "subheading",
        content: "to be completed before staring on site"
      },
      inductionForms: {
        type: "file"
      },
      spacerZwei: {
        type: "spacer",
        double: true
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
            value: true
          }
        }
      },
      spacerDrei: {
        type: "spacer",
        double: true
      },
      headingVier: {
        type: "heading",
        content: "Delivery address for ID06 cards,",
      },
      subheadingSechs: {
        type: 
          "subheading",
        content: "if we have to deliver a new card "
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
            value: true
          }
        }
      }
    },
  ];
  const meta: Meta = {
    title: "Order form",
    arg: {
      fields,
      onSubmit: (values: Object) => {
        console.log("values", values);
      },
    },
  };
  return (
    <Fragment>
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
