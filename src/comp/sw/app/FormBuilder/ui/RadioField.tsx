import { Fragment } from "react";
import { RadioFieldProps } from "../types";
import { Radio } from "@nextui-org/react";


export default function RadioField(props: RadioFieldProps & {name: string}) {
  return (
    <Fragment>
        <Radio.Group orientation="horizontal">
            <div>

            </div>
            <Radio value="1" size="sm" color="secondary">
                1
            </Radio>
            <Radio value="2" size="sm" color="secondary">
                2
            </Radio>
            <Radio value="3" size="sm" color="secondary">
                3
            </Radio>
            <Radio value="4" size="sm" color="secondary">
                4
            </Radio>
        </Radio.Group>
    </Fragment>
  )
}
