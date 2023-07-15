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
  padding: "40px 0"
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

const helpCommandOutput = [
    " ",
    "    echo            - prints the input to the terminal",
    "    clear           - clears the terminal",
    "    back            - returns to the previous working page",
    "    home            - returns to the home page",
    "    about           - tells you something about us (flag --all to see all)",
    "    whoiam          - ******"
]

const aboutCommandOutput = [[
    " ",
    "    Comprehensive services",
    " ",
    "    We, SilverBack provide a full-service experience for ",
    "    clients with in-house departments for logistics, project",
    "    management, finance and accounting, IT and human resources,",
    "    ensuring that all aspects of the project are covered.",
    " "
], [
    " ",
    "    Expertise and innovation",
    " ",
    "    The company's team of professionals is experienced in ", 
    "    cutting-edge technologies for data center and battery ",
    "    factory construction, providing innovative solutions for our ",
    "    partners and clients.",
    " "
], [
    " ",
    "    Multilingual and communication-focused",
    " ",
    "    With a team that speaks six different languages, we ensures",
    "    that we communicate effectively with anybody to build strong",
    "    relationships with our partners, clients and employees.",
    " "
], [
    " ",
    "    Global presence",
    " ",
    "    With a presence in 8 countries, we provide local expertise",
    "    and support to our clients worldwide while maintaining",
    "    consistent quality and service.",
    " "
]]

const whoiamCommandOutput = [
    " ",
    "    It's not you it's me.",
    "    ",
    "    Hey, I'm Freddy",
    "    I'm a Full-Stack Developer at SilverBack.",
    "    The guy that developed this webapp and much more.",
    "    ",
    "    Here is my LinkedIn profile:",
    <a href="https://www.linkedin.com/in/frederik-willem-grimm-672a29230/">    Frederik W. Grimm</a>
]

export default function Console({error, errorCode, custom}: {error: string[], errorCode: number, custom?: { command: string, output: ReactNode[], function: () => void } }) {
    let welcome: string[] = []
    switch (errorCode) {
        case 404: 
            welcome = [
                "    ___ _ _             ___          _           _ _  __  _ _  ",
                "   / __(_) |_ _____ _ _| _ ) __ _ __| |__  ___  | | |/  \\| | | ",
                "   \\__ \\ | \\ V / -_) '_| _ \\/ _` / _| / / |___| |_  _| () |_  _|",
                "   |___/_|_|\\_/\\___|_| |___/\\__,_\\__|_\\_\\         |_|\\__/  |_| ",
                " ",
            ]
        break;
        case 500:
            welcome = [
                "    ___ _ _             ___          _           ___  __   __  ",
                "   / __(_) |_ _____ _ _| _ ) __ _ __| |__  ___  | __|/  \\ /  \\ ",
                "   \\__ \\ | \\ V / -_) '_| _ \\/ _` / _| / / |___| |__ \\ () | () |",
                "   |___/_|_|\\_/\\___|_| |___/\\__,_\\__|_\\_\\       |___/\\__/ \\__/ ",
                " ",
            ]
            break
        case 401: 
            welcome =[
                "    ___ _ _             ___          _           _ _  __  _ ",
                "   / __(_) |_ _____ _ _| _ ) __ _ __| |__  ___  | | |/  \\| |",
                "   \\__ \\ | \\ V / -_) '_| _ \\/ _` / _| / / |___| |_  _| () | |",
                "   |___/_|_|\\_/\\___|_| |___/\\__,_\\__|_\\_\\         |_|\\__/|_|",
                " ",
            ]
            break
        default: 
        welcome = [
            "    ___ _ _             ___          _           ___  __   __  ",
            "   / __(_) |_ _____ _ _| _ ) __ _ __| |__  ___  | __|/  \\ /  \\ ",
            "   \\__ \\ | \\ V / -_) '_| _ \\/ _` / _| / / |___| |__ \\ () | () |",
            "   |___/_|_|\\_/\\___|_| |___/\\__,_\\__|_\\_\\       |___/\\__/ \\__/ ",
            " ",
        ]

    }
  const InputRef = useRef<HTMLInputElement>(null);
  const [displayedItems, setDisplayedItems] = useState<ReactNode[]>([
    ...welcome,
    ...error,
    " ",
    "   ---------------------------------------------------------- ",
    " ",
    (<div key="heading">    type <u>back</u> to go back to an working page</div>),
    " ",
    "   ---------------------------------------------------------- ",
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
     case "help":
        setDisplayedItems([...startLine, ...helpCommandOutput, " "]);
        break;
      case "back":
        router.replace("javascript:history.back()")
        break;
    case "home":
        router.replace("/")
        break;
    case "about":
        if (rest == "--all"){
            setDisplayedItems([...startLine, ...aboutCommandOutput.flat(1), " "]);
        }else{
            setDisplayedItems([...startLine, ...aboutCommandOutput[Math.floor(Math.random() * 4)], " "]);
        }
        break;
    case "whoiam":
        setDisplayedItems([...startLine, ...whoiamCommandOutput, " "]);
        break;
    case "reload": 
        location.reload()
        break;
    case custom?.command: 
        custom?.function()
        setDisplayedItems([...startLine, ...custom ? custom.output : [""], " "]);
        break;
      default:
        setDisplayedItems([...startLine, "command not found: " + cmd, " "]);
    }
    setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    }, 100)
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
