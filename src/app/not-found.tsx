"use client";
import React, { ReactNode, useRef, useState } from "react";
import StyleObject from "csstype";
import { useRouter } from "next/navigation";

const TerminalStyling: StyleObject.Properties = {
  position: "absolute",
  width: "100vw",
  height: "100vh",
  font: "bold 16px Inconsolata, monospace",
};

const ContainerStyling: StyleObject.Properties = {
  margin: "50px",
};

const LineStyling: StyleObject.Properties = {
  margin: 0,
  lineHeight: 1.2,
};

const InputContainerStyling: StyleObject.Properties = {
  display: "flex",
  flexDirection: "row",
};

const InputStyling: StyleObject.Properties = {
  font: "bold 16px Inconsolata, monospace",
  outline: "none",
  border: "none",
  lineHeight: 1.2,
  background: "transparent",
  padding: 0,
  flex: 1,
};

export default function NotFound() {
  const InputRef = useRef<HTMLInputElement>(null);
  const [displayedItems, setDisplayedItems] = useState<ReactNode[]>([
    "    ___ _ _             ___          _           _ _  __  _ _  ",
    "   / __(_) |_ _____ _ _| _ ) __ _ __| |__  ___  | | |/  \\| | | ",
    "   \\__ \\ | \\ V / -_) '_| _ \\/ _` / _| / / |___| |_  _| () |_  _|",
    "   |___/_|_|\\_/\\___|_| |___/\\__,_\\__|_\\_\\         |_|\\__/  |_| ",
    " ",
    "    Maybe this page isn't implemented yet",
    "    or it will never be implemented",
    " ",
    "    --------------------------------------------------------- ",
    " ",
    (<div key="heading">    type <u>back</u> to go back to an implemented page</div>),
    " ",
    "    --------------------------------------------------------- ",
    " ",
    " ",

  ]);

  const router = useRouter();

  const [input, setInput] = useState<string>("");

  function commands(input: string) {
    const startLine = [...displayedItems, "visitor@silverback:~$ " + input];
    const [cmd, rest, ...err] = input.replace(/\s+/, "\x01").split("\x01");
    switch (cmd.toLowerCase()) {
      case "echo":
        setDisplayedItems([...startLine, rest, " "]);
        break;
      case "clear":
        setDisplayedItems([]);
        break;
      case "back":
        router.back();
        break;
      default:
        setDisplayedItems([...startLine, "command not found: " + cmd, " "]);
    }
  }

  return (
    <div
      style={TerminalStyling}
      onClick={(e) => {
        if (!InputRef.current?.contains(e.target as Node)) {
          InputRef.current?.focus();
        }
      }}
      onKeyDown={(e) => {
        if (e.key == "Enter") {
          commands(input);
          setInput("");
        }
      }}
    >
      <ul style={ContainerStyling}>
        {displayedItems.map((line, idx) => (
          <li key={idx} style={LineStyling}>
            {line}
          </li>
        ))}
        <li style={LineStyling}>
          <div style={InputContainerStyling}>
            visitor@silverback:~$ 
            <input
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              style={InputStyling}
              type="text"
              autoFocus
              ref={InputRef}
            />
          </div>
        </li>
      </ul>
    </div>
  );
}
