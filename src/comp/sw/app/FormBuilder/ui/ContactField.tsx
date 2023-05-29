import { Fragment } from "react";
import { ContactFieldProps } from "../types";
import { Grid, Spacer } from "@nextui-org/react";
import TextField from "./TextField";
import PhoneField from "./PhoneField";

export default function ContactField(
  props: ContactFieldProps & { name: string }
) {
  const { name, option } = props;
  return (
    <Fragment>
      <Grid.Container>
        <Grid xs>
          <TextField
            name={`${name}.firstName`}
            label="First name"
            type="text"
            option={option}
          />
        </Grid>
        <Grid>
          <Spacer y={1} />
        </Grid>
        <Grid xs>
          <TextField
            name={`${name}.lastName`}
            label="Last name"
            type="text"
            option={option}
          />
        </Grid>
        <Grid xs={12}>
          <Spacer x={1} />
        </Grid>
        <Grid xs={12}>
          <TextField
            name={`${name}.jobPosition`}
            label="Job position"
            type="text"
            option={option}
          />
        </Grid>
        <Grid xs={12}>
          <Spacer x={1} />
        </Grid>
        <Grid xs>
          <TextField
            name={`${name}.email`}
            label="Email"
            type="text"
            option={option}
          />
        </Grid>
        <Grid>
          <Spacer y={1} />
        </Grid>
        <Grid xs>
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
