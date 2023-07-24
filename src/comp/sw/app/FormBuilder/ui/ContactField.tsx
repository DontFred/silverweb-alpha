import { Fragment } from "react";
import { ContactFieldProps } from "../types";
import { Grid, Spacer } from "@nextui-org/react";
import TextField from "./TextField";
import PhoneField from "./PhoneField";
import EmailField from "./EmailField";

/**
 * Renders a contact field with multiple text and phone input fields.
 *
 * @param {ContactFieldProps & { name: string }} props - The props object containing the name and the option
 * @return {JSX.Element} A fragment containing multiple input fields
 */
export default function ContactField(
  props: ContactFieldProps & { name: string }
) {
  const { name, option } = props;
  return (
    <Fragment>
      <Grid.Container gap={2}>
        <Grid xs={6}>
          <TextField
            name={`${name}.firstName`}
            label="First name"
            type="text"
            option={option}
          />
        </Grid>
        <Grid xs={6}>
          <TextField
            name={`${name}.lastName`}
            label="Last name"
            type="text"
            option={option}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            name={`${name}.jobPosition`}
            label="Job position"
            type="text"
            option={option}
          />
        </Grid>
        <Grid xs={6}>
          <EmailField
            name={`${name}.email`}
            label="Email"
            type="email"
            option={option}
          />
        </Grid>
        <Grid xs={6}>
          <PhoneField
            name={`${name}.phone`}
            label="Phone"
            type="phone"
            option={option}
          />
        </Grid>
      </Grid.Container>
    </Fragment>
  );
}
