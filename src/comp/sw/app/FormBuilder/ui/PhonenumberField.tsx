import { Grid, Input, Popover } from "@nextui-org/react";
import { Check, Play } from "lucide-react";
import Image from "next/image";
import React, { Fragment, useState } from "react";

type PrefixEntry = { country: string; name: string; prefix: string };

const NumberPrefix: PrefixEntry[] = [
  { country: "de", name: "Germany", prefix: "+49" },
];

export default function PhonenumberField() {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const [selectedPrefix, setSelectedPrefix] = useState<PrefixEntry>();
  console.log(openPopover);
  return (
    <Fragment>
      <Input
        aria-label="Prefix Selector"
        labelLeft={
          <div style={{width: 30, height: "100%"}}>
            <Grid.Container
            
                alignItems="center"
              justify="space-between"
              css={{ position: "absolute", zIndex: 100000, cursor: "pointer", height: "100%", pointerEvents: "all" }}
              onClick={() => {
                setOpenPopover(true);
              }}
            >
              <Grid>
                <Image
                  src={"/flags/de.svg"}
                  width={20}
                  height={15}
                  alt="Phone flag"
                />
              </Grid>
              <Grid>
                <Play size={10} style={{ transform: "rotate(90deg)" }} />
              </Grid>
            </Grid.Container>
          </div>
        }
        bordered
        fullWidth
      />
      <Popover
        isOpen={openPopover}
        onClose={() => {
          setOpenPopover(false);
        }}
      >
        <Popover.Trigger>
          <div />
        </Popover.Trigger>
        <Popover.Content>
          <ul>
            {NumberPrefix.map((PrefixEntry, idx) => (
              <li key={idx}>
                <Grid.Container>
                  <Grid>{PrefixEntry.name}</Grid>
                  <Grid>
                    <Check
                      size={15}
                      display={selectedPrefix != PrefixEntry ? "none" : ""}
                    />
                  </Grid>
                </Grid.Container>
              </li>
            ))}
          </ul>
        </Popover.Content>
      </Popover>
    </Fragment>
  );
}
