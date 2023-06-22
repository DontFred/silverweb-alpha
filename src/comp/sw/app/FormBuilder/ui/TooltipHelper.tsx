import { Tooltip } from "@nextui-org/react";
import { HelpCircle } from "lucide-react";
import { Fragment } from "react";

/**
 * Returns a Tooltip component that displays the given content when hovered 
 * over a HelpCircle icon. 
 *
 * @param {string} content - The content to be displayed in the tooltip.
 * @return {JSX.Element} A Tooltip component.
 */
export default function TooltipHelper({ content }: { content: string }) {
  return (
    <Fragment>
      <Tooltip content={content} trigger="hover" css={{ zIndex: 100000 }}>
        <HelpCircle color="var(--nextui-colors-border)" size="15px" />
      </Tooltip>
    </Fragment>
  );
}
