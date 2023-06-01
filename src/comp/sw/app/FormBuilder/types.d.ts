import { CSS } from "@nextui-org/react";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import {
  FieldValues,
  SubmitHandler,
  Validate,
  ValidationRule,
} from "react-hook-form";
import { ZodTypeAny } from "zod";

export type FieldSchema = {
  type:
    | "title"
    | "description"
    | "heading"
    | "subheading"
    | "spacer"
    | "text"
    | "number"
    | "select"
    | "radio"
    | "checkbox"
    | "address"
    | "contact"
    | "password"
    | "email"
    | "phone"
    | "array"
    | "grid"
    | "relationNumber";
};

type DefaultProps = {
  label?: string;
  htmlType?: HTMLInputTypeAttribute;
  helpText?: string;
  option?: {
    required?: ValidationRule<boolean>;
    min?: ValidationRule<number>;
    max?: ValidationRule<number>;
    maxLength?: ValidationRule<number>;
    minLength?: ValidationRule<number>;
    pattern?: any;
    validate?:
      | Validate<any, FieldValues>
      | Record<string, Validate<any, FieldValues>>
      | undefined;
    valueAsNumber?: any;
    valueAsDate?: any;
    disabled?: boolean;
    onChange?: (event: any) => void;
    onBlur?: (event: any) => void;
    value?: unknown;
    shouldUnregister?: boolean;
    deps?: string | string[];
  };
};

export type TitleProps = FieldSchema & {
  type: "title";
  content: ReactNode;
};

export type DescriptionProps = FieldSchema & {
  type: "description";
  content: ReactNode;
};

export type HeadingProps = {
  type: "heading";
  content: ReactNode;
};

export type SubheadingProps = {
  type: "subheading";
  content: ReactNode;
};

export type SpacerProps = FieldSchema & {
  type: "spacer";
  half?: boolean;
  double?: boolean;
};

export type TextFieldProps = FieldSchema &
  DefaultProps & {
    type: "text";
  };

export type NumberFieldProps = FieldSchema &
  DefaultProps & {
    type: "number";
  };

export type SelectFieldProps = FieldSchema &
  DefaultProps & {
    type: "select";
    items: Array<string> | Record<string, Array<string>>;
  };

export type RadioFieldProps = FieldSchema &
  DefaultProps & {
    type: "radio";
    items: RadioAndCheckboxItemProps[];
    columnWidth?: number;
    otherOpt?: boolean;
  };

export type CheckboxFieldProps = FieldSchema &
  DefaultProps & {
    type: "checkbox";
    items: RadioAndCheckboxItemProps[];
    columnWidth?: number;
    otherOpt?: boolean;
  };

export type AddressFieldProps = FieldSchema &
  DefaultProps & {
    type: "address";
  };

export type ContactFieldProps = FieldSchema &
  DefaultProps & {
    type: "contact";
  };

export type PasswordFieldProps = FieldSchema &
  DefaultProps & {
    type: "password";
  };

export type EmailFieldProps = FieldSchema &
  DefaultProps & {
    type: "email";
  };

export type PhoneFieldProps = FieldSchema &
  DefaultProps & {
    type: "phone";
  };

export type ArrayProps = FieldSchema &
  DefaultProps & {
    type: "array";
    item:
      | "text"
      | "number"
      | "select"
      | "radio"
      | "checkbox"
      | "address"
      | "contact"
      | "phone"
      | "email"
      | "password";
    counterMessage?: string;
  };

export type GirdProps = FieldSchema &
  DefaultProps & {
    type: "grid";
    properties: Fields;
    columnWidth: number;
    gap?: CSS["gap"];
  };

export type RelationNumberProps = FieldSchema &
  DefaultProps & {
    type: "relationNumber";
    relatedField: string;
  };

export type Field =
  | TitleProps
  | DescriptionProps
  | HeadingProps
  | SubheadingProps
  | SpacerProps
  | TextFieldProps
  | NumberFieldProps
  | SelectFieldProps
  | RadioFieldProps
  | CheckboxFieldProps
  | AddressFieldProps
  | ContactFieldProps
  | PasswordFieldProps
  | EmailFieldProps
  | PhoneFieldProps
  | ArrayProps
  | GirdProps
  | RelationNumberProps;

export type Fields = Record<string, Field>;

export interface FormProps {
  fields: Array<Fields>;
  onSubmit: SubmitHandler<FieldValues>;
}

export interface Meta {
  title: string;
  arg: any;
}

export type RadioAndCheckboxItemProps =
  | string
  | { value: string; label?: string; description?: string };
