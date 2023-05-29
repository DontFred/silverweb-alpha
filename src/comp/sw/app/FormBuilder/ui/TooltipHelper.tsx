import { Tooltip } from "@nextui-org/react";
import { HelpCircle } from "lucide-react";
import { Fragment } from "react";

export default function TooltipHelper({ content }: { content: string }) {
  return (
    <Fragment>
      <Tooltip content={content} trigger="hover" css={{ zIndex: 100000 }}>
        <HelpCircle color="var(--nextui-colors-border)" size="15px" />
      </Tooltip>
    </Fragment>
  );
}
