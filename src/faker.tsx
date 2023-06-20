import { faker } from "@faker-js/faker";

export function createRandomMessages() {
  return {
    id: faker.string.uuid(),
    read: faker.datatype.boolean(0.2),
    user: createRandomUser(),
    sourceUser: createRandomUser(),
    message: faker.lorem.words(),
    date: faker.date.recent(),
  };
}

export function createRandomUser() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    dept: createRandomDepartment(),
    userRole: createRandomUserRole(),
    employee: createRandomEmployee(),
    avatar: faker.internet.avatar(),
    color: faker.helpers.arrayElement([
      "success",
      "error",
      "warning",
      "primary",
      "secondary",
    ]) as "success" | "error" | "warning" | "primary" | "secondary",
  };
}

export function createRandomProjects() {
  return {
    id: faker.string.uuid(),
    name: `${faker.airline.airport().iataCode}${faker.airline.flightNumber()}`,
    type: faker.helpers.arrayElement([
      "Apartments",
      "Battery Factory",
      "Data Centre",
      "Hospital",
      "Mine",
      "Museum",
      "Paper Mill",
      "Pre-Cast Factory",
      "School",
      "Shopping Centre",
      "Windfarm",
    ]) as
      | "Apartments"
      | "Battery Factory"
      | "Data Centre"
      | "Hospital"
      | "Mine"
      | "Museum"
      | "Paper Mill"
      | "Pre-Cast Factory"
      | "School"
      | "Shopping Centre"
      | "Windfarm",
    company: createRandomCompany(),
    projectComment: faker.lorem.sentence(),
    address: createRandomAddress(),
    size: faker.lorem.words(),
  };
}

export function createRandomAddress() {
  return {
    id: faker.string.uuid(),
    streetNo: faker.location.streetAddress(),
    postCode: faker.location.zipCode(),
    city: faker.location.city(),
    country: faker.location.country(),
    coordinates: {
      lat: faker.location.latitude({
        max: 65,
        min: 40,
      }),
      lng: faker.location.longitude({
        max: 32,
        min: -8,
      }),
    },
  };
}

export function createRandomTrainingCourse() {
  return {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      "Confined space",
      "Construction safety",
      "Harness",
      "MEWP",
      "Manual handling",
      "SSG",
    ]),
  };
}

export function createRandomJobRole() {
  return {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      "Electrician",
      "Electrician Assistant",
      "Electrician Team Leader",
      "General Operative",
      "Skilled General Operative",
      "MEWP Spotter",
      "Mechanic",
      "Mechanic Team Leader",
      "Storeperson",
      "Teleporter Driver",
    ]),
  };
}

export function createRandomWorkType() {
  return {
    id: faker.string.uuid(),
    name: faker.helpers.arrayElement([
      "1st & 2nd Fix",
      "CCTV",
      "Cable pulling",
      "Commissioning",
      "Fire alarm",
      "General containment",
      "Glanding",
      "Installing switchgear",
      "Isolations and bussbar",
      "Ladder",
      "Metal conduit",
      "Non-FAB cable tray & trucking",
      "Pre-FAB cable tray & trucking",
      "Plastic conduit",
      "Quality control and assurance",
      "Rack",
      "Security door system",
      "Terminations of < 150m2",
      "Terminations of > 150m2",
      "Testing and inspection",
    ]),
  };
}

export function createRandomComment() {
  return {
    id: faker.string.uuid(),
    user: createRandomUser(),
    date: faker.date.recent(),
    comment: faker.lorem.sentence(),
  };
}

export function createRandomCompany() {
  return {
    id: faker.string.uuid(),
    name: faker.company.name(),
    workingField: faker.company.buzzPhrase(),
    address: createRandomAddress(),
    // comment: createRandomComment(),
  };
}

export function createRandomContact() {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    jobPosition: faker.person.jobTitle(),
    phoneNumber: faker.phone.number("+## ## ### ## ##"),
    company: createRandomCompany(),
    // comment: createRandomComment(),
  };
}

export function createRandomOffice() {
  return {
    id: faker.string.uuid(),
    name: faker.location.city(),
    address: createRandomAddress(),
  };
}

export function createRandomClient() {
  return {
    id: faker.string.uuid(),
    registerName: faker.company.name(),
    company: createRandomCompany(),
    registerAddress: createRandomAddress(),
  };
}

export function createRandomEmployee() {
  return {
    id: faker.string.uuid(),
    office: createRandomOffice(),
    contact: createRandomContact(),
    birthday: faker.date.birthdate(),
    countryOfBirth: faker.location.country(),
    gender: faker.person.sex(),
    maritalStatus: faker.helpers.arrayElement([
      "married",
      "widowed",
      "separated",
      "divorced",
      "single",
    ]),
    ppsn: faker.string.numeric(7),
    nationality: faker.location.country(),
    address: createRandomAddress(),
    airport: faker.airline.airport().iataCode,
    airportComment: `The second closest is ${faker.airline.airport().name}`,
    a1Payroll: faker.lorem.words(),
    avatar: faker.internet.avatar(),
  };
}

export function createRandomUserRole() {
  return {
    id: faker.string.uuid(),
    role: faker.helpers.arrayElement(["employee", "supervisor", "admin"]),
  };
}

export function createRandomDepartment() {
  return {
    id: faker.string.uuid(),
    name: faker.commerce.department(),
  };
}

export function createRandomOrder() {
  return {
    id: faker.string.uuid(),
    orderCode: `${
      faker.airline.airport().iataCode
    }${faker.airline.flightNumber()}`,
    client: createRandomClient(),
    accountManager: createRandomEmployee(),
    project: createRandomProjects(),
    commentToGeneralInformation: faker.lorem.sentence(),
    projectAddress: createRandomAddress(),
    deliveryAddress: createRandomAddress(),
    invoicingAddress: createRandomAddress(),
    invoicingEmail: faker.internet.email(),
    inductionAddress: createRandomAddress(),
    orgaNumber: faker.number.hex({ min: 0, max: 65535 }),
    vatNumber: faker.number.hex({ min: 0, max: 65535 }),
    payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
    rct: faker.lorem.words(),
    invoicingFrequency: faker.helpers.arrayElement([
      "weekly",
      "monthly",
      "daily",
    ]),
    inductionDateTime: faker.date.future(),
    start: faker.date.future(),
    estDuration: faker.number.int(50) + " weeks",
    end: faker.date.future(),
    commentToDuration: faker.lorem.sentence(),
    meetingPerson: createRandomContact(),
    breakTime: "1h / day",
    breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
    rotation: "6 weeks on / 2 weeks off",
    workingHours: {
      mo: faker.number.int(12),
      tu: faker.number.int(12),
      we: faker.number.int(12),
      th: faker.number.int(12),
      fr: faker.number.int(12),
      sa: faker.number.int(6),
      su: 0,
    },
  };
}

export function createRandomEmployeeStatus() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    effectiveDate: faker.date.past(),
    employmentStatus: faker.helpers.arrayElement(["active", "inactive"]),
    comment: faker.lorem.sentence(),
  };
}

export function createRandomJob() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    hireDate: faker.date.recent(),
    professionalTrade: faker.person.jobTitle(),
    recruitedBy: createRandomEmployee(),
  };
}

export function createRandomDriversLicense() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    issuingDate: faker.date.past(),
    expiryDate: faker.date.future(),
    countryOfIssue: faker.location.country(),
  };
}

export function createRandomNationalIDCard() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    issuingDate: faker.date.past(),
    expiryDate: faker.date.future(),
    countryOfIssue: faker.location.country(),
    cardNumber: faker.number.int(99999999999),
  };
}

export function createRandomPassportInformation() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    passportNumber: faker.number.int(99999999999),
    issuingDate: faker.date.past(),
    expiryDate: faker.date.future(),
    countryOfIssue: faker.location.country(),
  };
}

export function createRandomBankInformation() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    iban: faker.finance.iban(),
    bicSwift: faker.finance.bic(),
    bankName: faker.company.name(),
    effectiveDate: faker.date.recent(),
  };
}

export function createRandomClothingSize() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    jacketSize: faker.helpers.arrayElement(["S", "M", "L", "Xl", "2xl", "3xl"]),
    waist: faker.helpers.arrayElement([
      "30",
      "32",
      "34",
      "36",
      "38",
      "40",
      "42",
    ]),
    legLength: faker.helpers.arrayElement([
      "30",
      "32",
      "34",
      "36",
      "38",
      "40",
      "42",
    ]),
    shoeSize: faker.helpers.arrayElement([
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
    ]),
  };
}

export function createRandomEmergencyContact() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    contact: createRandomContact(),
    relation: faker.helpers.arrayElement([
      "Brother",
      "Sister",
      "Mother",
      "Father",
      "Son",
      "Daughter",
      "Friend",
    ]),
  };
}

export function createRandomTrainingCertificate() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    course: createRandomTrainingCourse(),
    effectiveDate: faker.date.recent(),
    expiryDate: faker.date.future(),
  };
}

export function createRandomTradeCertificate() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    tradeCertificate: faker.lorem.words(),
  };
}

export function createRandomInductionForm() {
  return {
    id: faker.string.uuid(),
    order: createRandomOrder(),
    file: createRandomFile(),
  };
}

export function createRandomFile() {
  return {
    id: faker.string.uuid(),
    fileUri: faker.image.dataUri(),
    name: faker.system.commonFileName().replace(/\.[^/.]+$/, "") + ".svg",
  };
}

export function createRandomProjectHistory() {
  return {
    id: faker.string.uuid(),
    employee: createRandomEmployee(),
    order: createRandomOrder(),
    jobRole: createRandomJobRole(),
  };
}

export function createRandomTrainingCourseRequired() {
  return {
    id: faker.string.uuid(),
    order: createRandomOrder(),
    course: createRandomTrainingCourse(),
  };
}

export function createRandomWorkPerformed() {
  return {
    id: faker.string.uuid(),
    order: createRandomOrder(),
    work: createRandomWorkType(),
  };
}

export function createRandomWorkerRequired() {
  return {
    id: faker.string.uuid(),
    order: createRandomOrder(),
    jobRole: createRandomJobRole(),
    quantity: faker.number.int(20),
  };
}

export function createRandomPayChargeRate() {
  return {
    id: faker.string.uuid(),
    order: createRandomOrder(),
    jobRole: createRandomJobRole(),
    payRate: {
      normal: faker.number.int({ min: 200, max: 300 }),
      ot1: faker.number.int({ min: 300, max: 400 }),
      ot2: faker.number.int({ min: 400, max: 500 }),
      ot3: faker.number.int({ min: 500, max: 600 }),
      ot4: faker.number.int({ min: 600, max: 700 }),
    },
    chargeRate: {
      normal: faker.number.int({ min: 400, max: 500 }),
      ot1: faker.number.int({ min: 500, max: 600 }),
      ot2: faker.number.int({ min: 600, max: 700 }),
      ot3: faker.number.int({ min: 700, max: 800 }),
      ot4: faker.number.int({ min: 800, max: 900 }),
    },
    appliedAt: faker.date.soon(),
    old: {
      payRate: {
        normal: faker.number.int({ min: 200, max: 300 }),
        ot1: faker.number.int({ min: 300, max: 400 }),
        ot2: faker.number.int({ min: 400, max: 500 }),
        ot3: faker.number.int({ min: 500, max: 600 }),
        ot4: faker.number.int({ min: 600, max: 700 }),
      },
      chargeRate: {
        normal: faker.number.int({ min: 400, max: 500 }),
        ot1: faker.number.int({ min: 500, max: 600 }),
        ot2: faker.number.int({ min: 600, max: 700 }),
        ot3: faker.number.int({ min: 700, max: 800 }),
        ot4: faker.number.int({ min: 800, max: 900 }),
      },
    },
    currency: faker.finance.currency().code,
  };
}

export function createRandomContactOrder() {
  return {
    id: faker.string.uuid(),
    order: createRandomOrder(),
    contact: createRandomContact(),
    orderNo: faker.number.int(5),
  };
}
