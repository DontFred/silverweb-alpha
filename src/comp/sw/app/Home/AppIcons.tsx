import { Avatar, Text } from "@nextui-org/react";
import React, { Fragment, ReactNode } from "react";

/**
 * Renders an app icon with a name and a link. It accepts an object containing
 * the following parameters:
 * - icon: the icon to display
 * - name: the name associated with the icon
 * - link: the link to redirect to when clicking the icon
 *
 * @param {ReactNode} icon - the icon to display
 * @param {string} name - the name associated with the icon
 * @param {string} link - the link to redirect to when clicking the icon
 * @return {JSX.Element} Returns the JSX element that represents the app icon.
 */
export default function AppIcons({
  icon,
  name,
  link,
}: {
  icon: ReactNode;
  name: string;
  link: string;
}) {
  return (
    <Fragment>
      <div
        onMouseEnter={(e) => {
          e.currentTarget.style.filter = "brightness(1.3)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.filter = "brightness(1)";
        }}
        style={{
          cursor: "pointer",
          transition: "all 0.3s",
          display: "grid",
          justifyContent: "center",
          position: "relative",
        }}
        onClick={() => {
          if (window) {
            location.href = link;
          }
        }}
      >
        <Avatar
          css={{
            cursor: "pointer",
            boxShadow: "3px 4px 14px 0 var(--nextui-colors-accents3)",
          }}
          squared
          size="xl"
          icon={icon}
        />
        <Text
          size={"$xs"}
          weight={"medium"}
          css={{
            position: "absolute",
            left: "50%",
            width: "max-content",
            bottom: "-25px",
            transform: "translateX(-50%)",
          }}
        >
          {name}
        </Text>
      </div>
    </Fragment>
  );
}
