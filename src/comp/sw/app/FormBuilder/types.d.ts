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
    | "textarea"
    | "radio"
    | "checkbox"
    | "date"
    | "date-range"
    | "file"
    | "address"
    | "contact"
    | "password"
    | "email"
    | "phone"
    | "array"
    | "grid"
    | "relationNumber";
};

export type DefaultProps = {
  label?: string;
  htmlType?: HTMLInputTypeAttribute;
  helpText?: string;
  placeholder?: string;
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
  readonly?: boolean;
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

export type TextAreaFieldProps = FieldSchema &
  DefaultProps & {
    type: "textarea"
  }

export type DateRangeFieldProps = FieldSchema &
  DefaultProps & {
    type: "date-range";
  }

export type NumberFieldProps = FieldSchema &
  DefaultProps & {
    type: "number";
  };

export type SelectFieldProps = FieldSchema &
  DefaultProps & {
    type: "select";
    items: Array<string> | Record<string, Array<string>>;
    autocomplete?: boolean;
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

export type DatePickerFieldProps = FieldSchema &
  DefaultProps & {
    type: "date";
    date?: boolean;
    time?: boolean;
  };

export type FileFieldProps = FieldSchema &
  DefaultProps & {
    type: "file"
  }

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
      | "textarea"
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
    justify?: boolean
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
  | TextAreaFieldProps
  | SelectFieldProps
  | RadioFieldProps
  | CheckboxFieldProps
  | DatePickerFieldProps
  | DateRangeFieldProps
  | AddressFieldProps
  | ContactFieldProps
  | FileFieldProps
  | PasswordFieldProps
  | EmailFieldProps
  | PhoneFieldProps
  | ArrayProps
  | RelationNumberProps;

export type Fields = Record<string, Field>;

export interface FormProps {
  fields: Array<Fields>;
  onSubmit: SubmitHandler<FieldValues>;
  defaultValues?: Record<string, any>;
  onChange?: (fv: FieldValues) => void;
}

export interface Meta {
  title: string;
  arg: FormProps;
}

export type RadioAndCheckboxItemProps =
  | string
  | { value: string; label?: string; description?: string };
