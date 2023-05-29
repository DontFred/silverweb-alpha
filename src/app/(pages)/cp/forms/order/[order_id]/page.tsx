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
    spacerZwei: {
      type: "spacer",
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
    spacerDrei: {
      type: "spacer",
      double: true,
    },
    headingZwei: {
      type: "heading",
      content: "Registered company address",
    },
    spacerVier: {
      type: "spacer",
    },
    companyAddress: {
      type: "address",
      label: "Company Address",
      option: {
        required: {
          value: true,
          message: "Please enter your company address",
        },
      },
    },
    spacerFunf: {
      type: "spacer",
      double: true,
    },
    headingDrei: {
      type: "heading",
      content: "Personal Contact Details",
    },
    spacerSechs: {
      type: "spacer",
    },
    personalContact: {
      type: "contact",
      label: "Personal Contact",
      option: {
        required: {
          message: "Please enter your details",
          value: true,
        }
      }
    },
    spacerSieben: {
      type: "spacer",
      double: true,
    },
    headingVier: {
      type: "heading",
      content: "Your Colleagues Contact Details"
    },
    subheadingZwei: {
      type: "subheading",
      content: "who will be involved in our collaboration."
    },
    spacerAcht: {
      type: "spacer",
    },
    colleagesContactDetails: {
      type: "contact",
    },
    TestArray: {
      type: "array",
      item: "contact"
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
