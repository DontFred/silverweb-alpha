import { Fragment } from "react";
import OrderInterfaceContent from "./content";
import {
  ContactOrderProps,
  InductionFormProps,
  OrderProps,
  PayChargeRateProps,
  TrainingCourseRequiredProps,
  WorkPerformedProps,
  WorkerRequiredProps,
} from "@/faker.d";
import {
  createRandomContactOrder,
  createRandomInductionForm,
  createRandomOrder,
  createRandomPayChargeRate,
  createRandomTrainingCourseRequired,
  createRandomWorkPerformed,
  createRandomWorkerRequired,
} from "@/faker";
import { faker } from "@faker-js/faker";

export type OrderDataProps = OrderProps & {
  payChargeRate: Array<PayChargeRateProps>;
  workerRequired: Array<WorkerRequiredProps>;
  workPerformed: Array<WorkPerformedProps>;
  trainingCoursesRequired: Array<TrainingCourseRequiredProps>;
  inductionForms: Array<InductionFormProps>;
  contacts: Array<ContactOrderProps>;
};

async function getOrderData() {
  const orderData = createRandomOrder();

  Object.assign(orderData, {
    payChargeRate: faker.helpers.uniqueArray(createRandomPayChargeRate, 5),
    workerRequired: faker.helpers.uniqueArray(createRandomWorkerRequired, 5),
    workPerformed: faker.helpers.uniqueArray(createRandomWorkPerformed, 5),
    trainingCoursesRequired: faker.helpers.uniqueArray(
      createRandomTrainingCourseRequired,
      5
    ),
    inductionForms: faker.helpers.uniqueArray(createRandomInductionForm, 5),
    contacts: faker.helpers.uniqueArray(createRandomContactOrder, 5),
  });

  return orderData as OrderDataProps;
}

export default async function OrderInterface() {
  const orderData = await getOrderData();
  return (
    <Fragment>
      <OrderInterfaceContent orderData={orderData} />
    </Fragment>
  );
}
