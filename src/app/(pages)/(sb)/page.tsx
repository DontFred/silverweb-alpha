'use client'

import Footer from "@/comp/sb/ui/Footer";
import Nav from "@/comp/sb/ui/Nav";
import { Fragment } from "react";

export default function page() {
    throw new Error("Current page is not implemented yet");
    return (
      <Fragment>
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
        <Footer/>
        </div>
      </Fragment>
    );
  }
