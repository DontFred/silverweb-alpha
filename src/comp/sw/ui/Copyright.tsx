import { Text } from "@nextui-org/react";

/**
 * Renders the copyright information as a fixed text at the bottom right corner of 
 * the screen.
 *
 * @return {JSX.Element} The JSX element containing the copyright information
 */
export default function Copyright() {
  return (
    <div
      style={{
        position: "absolute",
        right: 10,
        bottom: 30,
        display: "flex",
        justifyContent: "flex-end"
      }}
    >
      <Text
        size={11}
        css={{
          color: "Grey",
          position: "fixed",
          zIndex: 2000,
        }}
      >
        © {new Date().getFullYear()} SilverBack Staffing Ltd. All rights
        reserved.
      </Text>
    </div>
  );
}
