import { Grid } from "@nextui-org/react";
import TextField from "./TextField";

export default function AddressField(props) {
    const { name } = props;
  return (
    <Grid.Container>
        <Grid xs={12}>
            <TextField name={`${name}.streetNo`} label="Street No." type="text" />
        </Grid>
        <Grid xs={6}>
            <TextField name={`${name}.city`} label="City" type="text" />
        </Grid>
        <Grid xs={6}>
            <TextField name={`${name}.streetNo`} label="Post. code" type="text" />
        </Grid>
    </Grid.Container>
  )
}
