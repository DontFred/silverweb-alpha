import { Fragment, useEffect } from "react";
import { ArrayProps } from "../types";
import { useFieldArray, useFormContext } from "react-hook-form";
import TextField from "./TextField";
import PhoneField from "./PhoneField";
import SelectField from "./SelectField";
import AddressField from "./AddressField";
import PasswordField from "./PasswordField";
import ContactField from "./ContactField";
import HeadingField from "./HeadingField";
import { Button, Spacer } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";

const lookup: Record<ArrayProps["item"], any> = {
  text: TextField,
  number: <div />,
  select: SelectField,
  address: AddressField,
  phone: PhoneField,
  contact: ContactField,
  password: PasswordField,
};

export default function ArrayField(props: ArrayProps & { name: string }) {
  const { name, item, counterMessage, ...rest } = props;

  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: name,
  });

  const Component = lookup[item];

  useEffect(() => {
    update(0, { item: null });
  }, []);

  return (
    <Fragment>
      {fields.map((field, index) => (
        <Fragment key={field.id}>
          <HeadingField
            type="heading"
            content={
              index ? (counterMessage ? counterMessage : "") + (index + 1) : ""
            }
          />
          <Component name={name + "." + index + ".item"} {...rest} />
          <Spacer y={fields.length !== index + 1 ? 2 : 1} />
        </Fragment>
      ))}
      <Button.Group ghost rounded>
        <Button
          onPress={() => {
            append({ item: {} });
          }}
          css={{ p: 5, h: 25 }}
        >
          <Plus size={15} />
        </Button>
        <Button
          onPress={() => {
            remove(fields.length - 1);
          }}
          disabled={fields.length === 1}
          css={{ p: 5, h: 25 }}
        >
          <Minus size={15} />
        </Button>
      </Button.Group>
    </Fragment>
  );
}
