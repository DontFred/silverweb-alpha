import { Button, CSS, Card, Loading } from "@nextui-org/react";
import { Eye, Pen, Save } from "lucide-react";
import { Fragment, useState } from "react";

const ToolbarContainerStyling: CSS = {
  position: "fixed",
  zIndex: 10000,
  right: 30,
  top: "50%",
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
    </Fragment>
  );
}
