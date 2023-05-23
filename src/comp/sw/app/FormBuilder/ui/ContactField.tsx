import { Fragment } from "react";
import { ContactFieldProps } from "../types";
import { Grid, Spacer } from "@nextui-org/react";
import TextField from "./TextField";

export default function ContactField(
  props: ContactFieldProps & { name: string }
) {
  const { name } = props;
  return (
    <Fragment>
      <Grid.Container>
        <Grid xs>
          <TextField
            name={`${name}.firstName`}
            label="First name"
            type="text"
          />
        </Grid>
        <Grid>
          <Spacer y={1} />
        </Grid>
        <Grid xs>
          <TextField name={`${name}.lastName`} label="Last name" type="text" />
        </Grid>
        <Grid xs={12}>
          <Spacer x={1} />
        </Grid>
        <Grid xs={12}>
          <TextField
            name={`${name}.jobPosition`}
            label="Job position"
            type="text"
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
          />
        </Grid>
        <Grid>
          <Spacer y={1} />
        </Grid>
        <Grid xs>
          <TextField name={`${name}.phone`} label="Phone" type="text" />
        </Grid>
      </Grid.Container>
    </Fragment>
  );
}
