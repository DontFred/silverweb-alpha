"use client";
import Footer from "@/comp/sb/ui/Footer";
import Nav from "@/comp/sb/ui/Nav";
import { Form, FormProps, Meta } from "@/comp/sw/app/FormBuilder";
import React, { Fragment } from "react";

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
      content: "contact details"
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
      double: true
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
          value: true
        }
      }
    },
    spacerZwei: {
      type: "spacer",
      double: true
    },
    headingZwei: {
      type: "heading",
      content: "The address"
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
          value: true
        }
      }
    },
    spacerVier: {
      type: "spacer",
      double: true
    },
    headingDrei: {
      type: "heading",
      content: "What type"
    },
    subheadingDrei: {
      type: "subheading",
      content: "of the project"
    },
    typeOfProject: {
      type: "radio",
      items: ["Apartments", "Battery Factory", "Data Centre", "Hospital", "Mine", "Museum", "Paper Mill", "Pre-Cast Factory", "School", "Shopping Centre", "Windfarm"],
      columnWidth: 2,
      option: {
        required: {
          value: true,
          message: "Please select a option"
        }
      },
      otherOpt: true
    },
    spacerFunf: {
      type: "spacer",
      double: true
    },
    headingVier: {
      type: "heading",
      content: "What type of work"
    },
    subheadingVier: {
      type: "subheading",
      content: "is being performed"
    },
    performedWork: {
      type: "checkbox",
      items: ["1st & 2nd Fix", "CCTV", "Cable pulling"],
      otherOpt: true,
      columnWidth: 2
    }
  },
];

export default function OrderForm() {
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
