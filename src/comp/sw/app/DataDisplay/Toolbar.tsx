import { Button, CSS, Card, Loading } from "@nextui-org/react";
import { Eye, Pen, Save } from "lucide-react";
import { Fragment, useState } from "react";

const ToolbarContainerStyling: CSS = {
  position: "fixed",
  zIndex: 10000,
  transform: "translate(0, -50%)",
  width: "fit-content",
  height: "fit-content",
};

const ButtonContainerStyling: CSS = {
  p: 0,
};

const ButtonGroupStyling: CSS = {
  m: 0,
};

const ButtonStyling: CSS = {
  border: 0,
  borderRadius: "var(--nextui-radii-sm)",
  p: 10,
  w: "fit-content",
  height: "fit-content",
  color: "$accents9",
  m: 0
};

const ButtonSeeStyling: CSS = {
  ...ButtonStyling,
  pb: 10,
};

const ButtonSaveStyling: CSS = {
  ...ButtonStyling,
  pt: 10,
};

const LoaderStyling: CSS = {
 width: 20,
 height: 20,
 justifyContent: "center",
 alignItems: "center",
}

/**
 * Renders a toolbar component with buttons for toggling the mode and saving content.
 *
 * @param {object} props - The props object containing the following properties:
 *   - onModeChange (optional): A callback function that takes a boolean argument indicating if the
 *     mode has been toggled.
 *   - onSafe (optional): A callback function that returns a promise or void.
 *   - isLoading (optional): A boolean indicating if the component is in a loading state.
 * @return {JSX.Element} The toolbar component.
 */
export default function Toolbar({
  onModeChange,
  onSafe,
  isLoading
}: {
  onModeChange?: (seeToggled: boolean) => void;
  onSafe?: () => Promise<void> | void;
  isLoading?: boolean;
}) {
  const [modeSee, setModeSee] = useState<boolean>(true);


  return (
    <Fragment>
      <div
        style={{
          position: "absolute",
          right: 30,
          top: "50%",
          display: "flex",
          justifyContent: "flex-end"
        }}
      >
      <Card css={ToolbarContainerStyling}>
        <Card.Body css={ButtonContainerStyling}>
          <Button.Group vertical css={ButtonGroupStyling}>
            <Button
              onPress={() => {
                setModeSee(!modeSee);
                if (onModeChange) {
                  onModeChange(!modeSee);
                }
              }}
              css={ButtonSeeStyling}
              bordered
              rounded
              icon={modeSee ? <Eye size={20} /> : <Pen size={20} />}
            />
            <Button
              onPress={async () => {
                setModeSee(true)
                if (onSafe) {
                  onSafe();
                }
              }}
              disabled={modeSee || isLoading}
              css={ButtonSaveStyling}
              bordered
              rounded
              {...((!isLoading && isLoading !== undefined) && { icon: <Save size={20}/> })}
            >
              {isLoading ? <Loading css={LoaderStyling} color="currentColor" size="xs" /> : []}
            </Button>
          </Button.Group>
        </Card.Body>
      </Card>
      </div>
    </Fragment>
  );
}
