"use client";

import React, { Fragment } from "react";
import Image from "next/image";
import {  Spacer } from "@nextui-org/react";
import { LineChart, LayoutDashboard, Newspaper, Send, Server } from "lucide-react";
import NavCard from "./cards/NavCard";

/**
 * Renders a sidebar component with multiple NavCards displaying the different pages of the website.
 *
 * @return {JSX.Element} The Sidebar component.
 */
export default function Sidebar({ compact }: { compact?: boolean }) {
  return (
    <Fragment>
      <div
        style={{
          height: "100vh",
          width: compact ? 46 : 150,
        }}
      >
        <div
          style={{
            position: "fixed",
            width: compact ? 46 : 150,
          }}
        >
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              ...compact && {
                padding: "35px 0",
              }
            }}
          >
            <Image
              priority
              style={{
                margin: "auto",
              }}
              src={`/svg/logo-silverweb${compact ? "-compact" : ""}.svg`}
              width={130}
              height={compact ? 30 : 100}
              alt="silverweb-logo"
              draggable={false}
            />
          </div>
          <NavCard name="Home" compact={compact} link="/sw" icon={<LineChart color="white" size={16} />}/>
          <Spacer y={0.5} />
          <NavCard name="SilverSuite" compact={compact} link="/sw/apps" icon={<LayoutDashboard color="white" size={16} />}/>
          <Spacer y={0.5} />
          <NavCard name="SilverBase" compact={compact} link="/sw" icon={<Server color="white" size={16} />}/>
          <Spacer y={0.5} />
          <NavCard name="SilverBoard" compact={compact} link="" disabled icon={<Send color="white" size={16} />}/>
          <Spacer y={0.5} />
          <NavCard name="SilverBlog" compact={compact} link="" disabled icon={<Newspaper color="white" size={16} />}/>
          <Spacer y={0.5} />
        </div>
      </div>
    </Fragment>
  );
}
