import { Fragment, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Button, Spacer } from "@nextui-org/react";
import { Minus, Plus } from "lucide-react";
import { ArrayProps } from "../types";
import TextField from "./TextField";
import PhoneField from "./PhoneField";
import SelectField from "./SelectField";
import AddressField from "./AddressField";
import PasswordField from "./PasswordField";
import ContactField from "./ContactField";
import HeadingField from "./HeadingField";
import EmailField from "./EmailField";
import RadioField from "./RadioField";
import CheckboxField from "./CheckboxField";
import NumberField from "./NumberField";
import TextAreaField from "./TextAreaField";

const lookup: Record<ArrayProps["item"], any> = {
  text: TextField,
  number: NumberField,
  select: SelectField,
  textarea: TextAreaField,
  radio: RadioField,
  checkbox: CheckboxField,
  address: AddressField,
  phone: PhoneField,
  contact: ContactField,
  email: EmailField,
  password: PasswordField,
};

/**
 * Renders an array field and provides functionality to add or remove items
 *
 * @param {ArrayProps & { name: string }} props - An object containing properties for the array field
 * @return {JSX.Element} A fragment containing the array field and add/remove buttons
 */
export default function ArrayField(props: ArrayProps & { name: string }) {
  const { name, item, counterMessage, ...rest } = props;

  const { control } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: name,
  });

  const Component = lookup[item];
  
  useEffect(() => {
    function addNull(){
      if(fields.length === 0){
        update(0, {});
      }
    }
    addNull()
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <Component name={name + "." + index} {...rest} />
          <Spacer y={fields.length !== index + 1 ? 2 : 1} />
        </Fragment>
      ))}
      <Button.Group ghost rounded>
        <Button
          onPress={() => {
            append({});
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
