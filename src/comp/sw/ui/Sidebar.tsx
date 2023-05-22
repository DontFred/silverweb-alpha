"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import {  Spacer } from "@nextui-org/react";
import { LineChart, LayoutDashboard, Newspaper, Send, Server } from "lucide-react";
import NavCard from "./cards/NavCard";

export default function Sidebar() {
  return (
    <Fragment>
      <div
        style={{
          height: "100vh",
          width: 150,
        }}
      >
        <div
          style={{
            position: "fixed",
            width: 150,
          }}
        >
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Image
              priority
              style={{
                margin: "auto",
              }}
              src={"/svg/logo-silverweb.svg"}
              width={130}
              height={100}
              alt="silverweb-logo"
              draggable={false}
            />
          </div>
          <NavCard name="Home" link="/" icon={<LineChart color="white" size={16} />}/>
          <Spacer y={0.5} />
          <NavCard name="SilverSuite" link="/" icon={<LayoutDashboard color="white" size={16} />}/>
          <Spacer y={0.5} />
          <NavCard name="SilverBase" link="/" icon={<Server color="white" size={16} />}/>
          <Spacer y={0.5} />
          <NavCard name="SilverBoard" link="" disabled icon={<Send color="white" size={16} />}/>
          <Spacer y={0.5} />
          <NavCard name="SilverBlog" link="" disabled icon={<Newspaper color="white" size={16} />}/>
          <Spacer y={0.5} />
        </div>
      </div>
    </Fragment>
  );
}
