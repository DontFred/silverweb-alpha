import {
  createRandomAddress,
  createRandomMessages,
  createRandomProjects,
  createRandomUser,
  createRandomBankInformation,
  createRandomClient,
  createRandomClothingSize,
  createRandomCompany,
  createRandomContact,
  createRandomContactOrder,
  createRandomDepartment,
  createRandomDriversLicense,
  createRandomEmergencyContact,
  createRandomEmployee,
  createRandomEmployeeStatus,
  createRandomInductionForm,
  createRandomJob,
  createRandomJobRole,
  createRandomNationalIDCard,
  createRandomOffice,
  createRandomOrder,
  createRandomPassportInformation,
  createRandomPayChargeRate,
  createRandomProjectHistory,
  createRandomTradeCertificate,
  createRandomTrainingCertificate,
  createRandomTrainingCourse,
  createRandomTrainingCourseRequired,
  createRandomUserRole,
  createRandomWorkPerformed,
  createRandomWorkType,
  createRandomWorkerRequired,
} from "./faker";

export type MessageProps = ReturnType<typeof createRandomMessages>;

export type UserProps = ReturnType<typeof createRandomUser>;

export type ProjectProps = ReturnType<typeof createRandomProjects>;

export type AddressProps = ReturnType<typeof createRandomAddress>;

export type ClientProps = ReturnType<typeof createRandomClient>;

export type BankProps = ReturnType<typeof createRandomBankInformation>;

export type ClothingSizeProps = ReturnType<typeof createRandomClothingSize>;

export type CompanyProps = ReturnType<typeof createRandomCompany>;

export type ContactProps = ReturnType<typeof createRandomContact>;

export type ContactOrderProps = ReturnType<typeof createRandomContactOrder>;

export type DepartmentProps = ReturnType<typeof createRandomDepartment>;

export type DriversLicenseProps = ReturnType<typeof createRandomDriversLicense>;

export type EmergencyContactProps = ReturnType<
  typeof createRandomEmergencyContact
>;

export type EmployeeProps = ReturnType<typeof createRandomEmployee>;

export type EmployeeStatusProps = ReturnType<typeof createRandomEmployeeStatus>;

export type InductionFormProps = ReturnType<typeof createRandomInductionForm>;

export type JobProps = ReturnType<typeof createRandomJob>;

export type JobRoleProps = ReturnType<typeof createRandomJobRole>;

export type NationalIDCardProps = ReturnType<typeof createRandomNationalIDCard>;

export type OfficeProps = ReturnType<typeof createRandomOffice>;

export type OrderProps = ReturnType<typeof createRandomOrder>;

export type PassportProps = ReturnType<typeof createRandomPassportInformation>;

export type PayChargeRateProps = ReturnType<typeof createRandomPayChargeRate>;

export type ProjectHistoryProps = ReturnType<typeof createRandomProjectHistory>;

export type TradeCertificateProps = ReturnType<
  typeof createRandomTradeCertificate
>;

export type TrainingCertificateProps = ReturnType<
  typeof createRandomTrainingCertificate
>;

export type TrainingCourseProps = ReturnType<typeof createRandomTrainingCourse>;

export type TrainingCourseRequiredProps = ReturnType<
  typeof createRandomTrainingCourseRequired
>;

export type UserRoleProps = ReturnType<typeof createRandomUserRole>;

export type WorkPerformedProps = ReturnType<typeof createRandomWorkPerformed>;

export type WorkTypeProps = ReturnType<typeof createRandomWorkType>;

export type WorkerRequiredProps = ReturnType<typeof createRandomWorkerRequired>;
