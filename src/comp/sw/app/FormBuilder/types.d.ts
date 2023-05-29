import { HTMLInputTypeAttribute } from "react";
import {
  FieldValues,
  SubmitHandler,
  Validate,
  ValidationRule,
} from "react-hook-form";

type FieldSchema = {
  type:
    | "title"
    | "description"
    | "heading"
    | "subheading"
    | "spacer"
    | "text"
    | "number"
    | "select"
    | "address"
    | "contact"
    | "password"
    | "phone";
};

type DefaultPops = {
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
  content: string;
};

export type DescriptionProps = FieldSchema & {
  type: "description";
  content: string;
};

export type HeadingProps = {
  type: "heading";
  content: string;
};

export type SubheadingProps = {
  type: "subheading";
  content: string;
};

export type SpacerProps = FieldSchema & {
  type: "spacer";
  half?: boolean;
  double?: boolean;
};

export type TextFieldProps = FieldSchema &
  DefaultPops & {
    type: "text";
  };

export type SelectFieldProps = FieldSchema &
  DefaultPops & {
    type: "select";
    items: Array<string> | Record<string, Array<string>>;
  };

export type AddressFieldProps = FieldSchema &
  DefaultPops & {
    type: "address";
  };

export type ContactFieldProps = FieldSchema &
  DefaultPops & {
    type: "contact";
  };

export type PasswordFieldProps = FieldSchema &
  DefaultPops & {
    type: "password";
  };

export type PhoneFieldProps = FieldSchema &
  DefaultPops & {
    type: "phone"
  }

export type Field =
  | TitleProps
  | DescriptionProps
  | HeadingProps
  | SubheadingProps
  | SpacerProps
  | TextFieldProps
  | SelectFieldProps
  | AddressFieldProps
  | ContactFieldProps
  | PasswordFieldProps
  | PhoneFieldProps;

type Fields = Record<string, Field>;

export interface FormProps {
  fields: Array<Fields>;
  onSubmit: SubmitHandler<FieldValues>;
}

export interface Meta {
  title: string;
  arg: any;
}
