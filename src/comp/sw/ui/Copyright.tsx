import { Text } from "@nextui-org/react";

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
