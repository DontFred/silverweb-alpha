import {
  faker as f,
  fakerDE,
  fakerEN_AU,
  fakerEN_GB,
  fakerEN_IE,
  fakerES,
  fakerIT,
  fakerNB_NO,
  fakerNL,
  fakerNL_BE,
  fakerPL,
  fakerPT_PT,
  fakerSV,
} from "@faker-js/faker";

/**
 * Returns a random instance of the faker library for different locales.
 *
 * @return {function} A function that can be used to generate fake data.
 */
function faker() {
  const randomIdx = f.number.int({ min: 0, max: 11 });
  const randomFaker = [
    fakerDE,
    fakerEN_AU,
    fakerEN_GB,
    fakerEN_IE,
    fakerES,
    fakerIT,
    fakerNB_NO,
    fakerNL,
    fakerNL_BE,
    fakerPL,
    fakerPT_PT,
    fakerSV,
  ];
  return randomFaker[randomIdx];
}

/**
 * Generates a random message object with id, read status, user, sourceUser, message,
 * and date properties using the faker library.
 *
 * @return {Object} Returns an object with id, read, user, sourceUser, message, and date properties.
 */
export function createRandomMessages() {
  return {
    id: faker().string.uuid(),
    read: faker().datatype.boolean(0.2),
    user: createRandomUser(),
    sourceUser: createRandomUser(),
    message: faker().word.words({ count: { min: 1, max: 5 } }),
    date: faker().date.recent(),
  };
}

/**
 * Generates a random user object with fake data.
 *
 * @return {Object} The generated user object with the following properties:
 *    - id: string
 *    - name: string
 *    - dept: object (generated by createRandomDepartment function)
 *    - userRole: object (generated by createRandomUserRole function)
 *    - employee: object (generated by createRandomEmployee function)
 *    - avatar: string (URL of a randomly generated avatar image)
 *    - color: string (randomly selected from ["success", "error", "warning", "primary", "secondary"])
 */
export function createRandomUser() {
  return {
    id: faker().string.uuid(),
    name: faker().person.fullName(),
    dept: createRandomDepartment(),
    userRole: createRandomUserRole(),
    employee: createRandomEmployee(),
    avatar: faker().internet.avatar(),
    color: faker().helpers.arrayElement([
      "success",
      "error",
      "warning",
      "primary",
      "secondary",
    ]) as "success" | "error" | "warning" | "primary" | "secondary",
  };
}

/**
 * Creates a random project object with a unique id, name, type, company, projectComment, address, and size.
 *
 * @return {{id: string, name: string, type: "Apartments" | "Battery Factory" | "Data Centre" | "Hospital" | "Mine" | "Museum" | "Paper Mill" | "Pre-Cast Factory" | "School" | "Shopping Centre" | "Windfarm", company: {name: string, catchPhrase: string, bs: string}, projectComment: string, address: {street: string, city: string, state: string, zipCode: string, country: string}, size: string}} The random project object
 */
export function createRandomProjects() {
  return {
    id: faker().string.uuid(),
    name: `${
      faker().airline.airport().iataCode
    }${faker().airline.flightNumber()}`,
    type: faker().helpers.arrayElement([
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
    projectComment: faker().word.words({ count: { min: 5, max: 15 } }),
    address: createRandomAddress(),
    size: faker().number.int(100000) + "m²",
  };
}

/**
 * Creates a random address object using faker.js library.
 *
 * @return {object} An address object containing id, streetNo, postCode, city,
 * country, and coordinates with lat and lng.
 */
export function createRandomAddress() {
  return {
    id: faker().string.uuid(),
    streetNo: faker().location.streetAddress(),
    postCode: faker().location.zipCode(),
    city: faker().location.city(),
    country: faker().location.country(),
    coordinates: {
      lat: faker().location.latitude({
        max: 65,
        min: 40,
      }),
      lng: faker().location.longitude({
        max: 32,
        min: -8,
      }),
    },
  };
}

/**
 * Returns a randomly generated training course object with an id and name.
 *
 * @return {object} The generated training course object with the following properties:
 * - id: string - A unique identifier for the training course.
 * - name: string - The name of the training course selected randomly from a pre-defined list of options.
 */
export function createRandomTrainingCourse() {
  return {
    id: faker().string.uuid(),
    name: faker().helpers.arrayElement([
      "Confined space",
      "Construction safety",
      "Harness",
      "MEWP",
      "Manual handling",
      "SSG",
    ]),
  };
}

/**
 * Generates a random job role object with a unique ID and a name randomly selected from a list of predefined job roles.
 *
 * @return {Object} Returns an object with the following properties:
 *  - id: a string representing a unique identifier generated with the faker library.
 *  - name: a string representing the randomly selected job role from a predefined list of job roles.
 */
export function createRandomJobRole() {
  return {
    id: faker().string.uuid(),
    name: faker().helpers.arrayElement([
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

/**
 * Generates a random work type object with a unique id and name.
 *
 * @return {Object} The randomly generated work type object with id and name.
 */
export function createRandomWorkType() {
  return {
    id: faker().string.uuid(),
    name: faker().helpers.arrayElement([
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

/**
 * Creates a random comment object with a unique id, a randomly generated user, 
 * a recent date, and a comment consisting of 5 to 15 words.
 *
 * @return {Object} Returns an object with the following properties:
 * - id: string
 * - user: object (generated by createRandomUser())
 * - date: Date
 * - comment: string
 */
export function createRandomComment() {
  return {
    id: faker().string.uuid(),
    user: createRandomUser(),
    date: faker().date.recent(),
    comment: faker().word.words({ count: { min: 5, max: 15 } }),
  };
}

/**
 * Generates a random company object with fake data.
 *
 * @return {object} An object with the following properties:
 *  - id: a unique identifier for the company (string)
 *  - name: the name of the company (string)
 *  - workingField: the buzz phrase of the company (string)
 *  - address: an object representing the address of the company (object)
 *  - email: the email address of the company (string)
 *  - phone: the phone number of the company (string)
 */
export function createRandomCompany() {
  return {
    id: faker().string.uuid(),
    name: faker().company.name(),
    workingField: faker().company.buzzPhrase(),
    address: createRandomAddress(),
    email: "mail@" + faker().company.name().toLowerCase().replace(/and /g, '').replace(/, /g, "-").replace(/\s/g, '-') +"."+ faker().internet.domainSuffix(),
    phone: faker().phone.number("+## ## ### ## ##"),
    // comment: createRandomComment(),
  };
}

/**
 * Generates a random contact object with fake data using the Faker library.
 *
 * @return {object} An object representing a contact with randomly generated data.
 */
export function createRandomContact() {
  return {
    id: faker().string.uuid(),
    firstName: faker().person.firstName(),
    lastName: faker().person.lastName(),
    email: faker().internet.email(),
    jobPosition: faker().person.jobTitle(),
    phoneNumber: faker().phone.number("+## ## ### ## ##"),
    company: createRandomCompany(),
    // comment: createRandomComment(),
  };
}

/**
 * Creates a random office object with a unique ID, a name generated from a random city,
 * and an address generated from the createRandomAddress function.
 *
 * @return {Object} The random office object with properties id, name, and address.
 */
export function createRandomOffice() {
  return {
    id: faker().string.uuid(),
    name: faker().location.city(),
    address: createRandomAddress(),
  };
}

/**
 * Generates a new random client object with a unique ID, a registered name,
 * a random company, and a registered address.
 *
 * @return {object} The newly generated client object.
 */
export function createRandomClient() {
  return {
    id: faker().string.uuid(),
    registerName: faker().company.name(),
    company: createRandomCompany(),
    registerAddress: createRandomAddress(),
  };
}

/**
 * Generates a random employee object with fake data using the faker library.
 *
 * @return {Object} An object containing the following properties:
 *   - id: a UUID string
 *   - office: an object generated by createRandomOffice()
 *   - contact: an object generated by createRandomContact()
 *   - birthday: a Date object representing the employee's birthdate
 *   - countryOfBirth: a string representing the country of birth
 *   - gender: a string representing the gender
 *   - maritalStatus: a string representing the marital status
 *   - ppsn: a string of 7 digits representing the employee's PPSN
 *   - nationality: a string representing the nationality
 *   - address: an object generated by createRandomAddress()
 *   - airport: a string representing the airport's IATA code
 *   - airportComment: a string describing the second closest airport
 *   - a1Payroll: an array of 1 to 5 words
 *   - avatar: a URL string representing the employee's avatar
 */
export function createRandomEmployee() {
  return {
    id: faker().string.uuid(),
    office: createRandomOffice(),
    contact: createRandomContact(),
    birthday: faker().date.birthdate(),
    countryOfBirth: faker().location.country(),
    gender: faker().person.sex(),
    maritalStatus: faker().helpers.arrayElement([
      "married",
      "widowed",
      "separated",
      "divorced",
      "single",
    ]),
    ppsn: faker().string.numeric(7),
    nationality: faker().location.country(),
    address: createRandomAddress(),
    airport: faker().airline.airport().iataCode,
    airportComment: `The second closest is ${faker().airline.airport().name}`,
    a1Payroll: faker().word.words({ count: { min: 1, max: 5 } }),
    avatar: faker().internet.avatar(),
  };
}

/**
 * Returns an object with a randomly generated UUID and a role that is randomly selected from
 * the list of "employee", "supervisor", or "admin".
 *
 * @return {Object} An object with properties "id" and "role".
 */
export function createRandomUserRole() {
  return {
    id: faker().string.uuid(),
    role: faker().helpers.arrayElement(["employee", "supervisor", "admin"]),
  };
}

/**
 * Creates a random department object with an id and name generated using faker.
 *
 * @return {Object} An object with id and name properties.
 */
export function createRandomDepartment() {
  return {
    id: faker().string.uuid(),
    name: faker().commerce.department(),
  };
}

/**
 * Creates a random order object with various properties such as id, orderCode, answered 
 * client, accountManager, project, commentToGeneralInformation, projectAddress,
 * deliveryAddress, invoicingAddress, invoicingEmail, inductionAddress, orgaNumber,
 * vatNumber, payTerm, rct, invoicingFrequency, commentToInvoicing, inductionDateTime,
 * start, estDuration, end, commentToDuration, meetingPerson, breakTime, breaksPaid,
 * rotation, and workingHours.
 *
 * @return {object} The random order object with all the above properties.
 */
export function createRandomOrder() {
  return {
    id: faker().string.uuid(),
    orderCode: `${
      faker().airline.airport().iataCode
    }${faker().airline.flightNumber()}`,
    answered: faker().datatype.boolean(),
    client: createRandomClient(),
    accountManager: createRandomEmployee(),
    project: createRandomProjects(),
    commentToGeneralInformation: faker().word.words({
      count: { min: 5, max: 15 },
    }),
    projectAddress: createRandomAddress(),
    deliveryAddress: createRandomAddress(),
    invoicingAddress: createRandomAddress(),
    invoicingEmail: faker().helpers.uniqueArray(faker().internet.email, 4).join("; ") ,
    inductionAddress: createRandomAddress(),
    orgaNumber: faker().number.int({min: 1000000, max: 9999999}),
    vatNumber: faker().location.countryCode().toUpperCase() + faker().number.int(100000) + faker().number.hex({ min: 0, max: 65535 }).toUpperCase(),
    payTerm: faker().helpers.arrayElement(["weekly", "monthly", "advance"]),
    rct: faker().word.words({ count: { min: 1, max: 5 } }),
    invoicingFrequency: faker().helpers.arrayElement([
      "weekly",
      "monthly",
      "daily",
    ]),
    commentToInvoicing: faker().word.words({
      count: { min: 5, max: 15 },
    }),
    inductionDateTime: faker().date.future(),
    start: faker().date.future(),
    estDuration: faker().number.int(50) + " weeks",
    end: faker().date.future(),
    commentToDuration: faker().word.words({ count: { min: 5, max: 15 } }),
    meetingPerson: createRandomContact(),
    breakTime: "1h / day",
    breaksPaid: faker().helpers.arrayElement(["unpaid", "paid"]),
    rotation: "6 weeks on / 2 weeks off",
    workingHours: {
      mo: faker().number.int({min: 7, max: 12}),
      tu: faker().number.int({min: 7, max: 12}),
      we: faker().number.int({min: 7, max: 12}),
      th: faker().number.int({min: 7, max: 12}),
      fr: faker().number.int({min: 7, max: 12}),
      sa: faker().number.int({min: 3, max: 8}),
      su: faker().number.int({min: 1, max: 6}),
    },
  };
}

/**
 * Generates a random employee status object with randomly generated values for id, employee, effectiveDate,
 * employmentStatus and comment using the faker library.
 *
 * @return {Object} The randomly generated employee status object with the following properties:
 * - id: string (uuid)
 * - employee: object (randomly generated using createRandomEmployee() function)
 * - effectiveDate: date (in the past)
 * - employmentStatus: string (either "active" or "inactive")
 * - comment: string (between 5 and 15 words)
 */
export function createRandomEmployeeStatus() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    effectiveDate: faker().date.past(),
    employmentStatus: faker().helpers.arrayElement(["active", "inactive"]),
    comment: faker().word.words({ count: { min: 5, max: 15 } }),
  };
}

/**
 * Creates a new random job object with a unique id, randomly generated employee, recent hire date,
 * professional trade, and a randomly generated recruiting employee.
 *
 * @return {object} The newly generated random job object.
 */
export function createRandomJob() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    hireDate: faker().date.recent(),
    professionalTrade: faker().person.jobTitle(),
    recruitedBy: createRandomEmployee(),
  };
}

/**
 * Generates a random driver's license object with a unique ID, employee, issuing date, expiry date, and country of issue.
 *
 * @return {object} The randomly generated driver's license object with the following properties:
 * - id: string - A unique identifier for the driver's license.
 * - employee: object - An object representing the employee associated with the driver's license.
 * - issuingDate: Date - The date the driver's license was issued.
 * - expiryDate: Date - The date the driver's license expires.
 * - countryOfIssue: string - The country where the driver's license was issued.
 */
export function createRandomDriversLicense() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    issuingDate: faker().date.past(),
    expiryDate: faker().date.future(),
    countryOfIssue: faker().location.country(),
  };
}

/**
 * Generates a random national ID card object with randomly generated properties.
 *
 * @return {Object} The generated national ID card object.
 */
export function createRandomNationalIDCard() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    issuingDate: faker().date.past(),
    expiryDate: faker().date.future(),
    countryOfIssue: faker().location.country(),
    cardNumber: faker().number.int(99999999999),
  };
}

/**
 * Generates a random passport information object with randomly generated details.
 *
 * @return {Object} The generated passport information object.
 */
export function createRandomPassportInformation() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    passportNumber: faker().number.int(99999999999),
    issuingDate: faker().date.past(),
    expiryDate: faker().date.future(),
    countryOfIssue: faker().location.country(),
  };
}

/**
 * Creates a random bank information object with randomly generated properties such as id, employee, iban,
 * bicSwift, bankName, and effectiveDate using faker.
 *
 * @return {Object} An object containing randomly generated bank information.
 */
export function createRandomBankInformation() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    iban: faker().finance.iban(),
    bicSwift: faker().finance.bic(),
    bankName: faker().company.name(),
    effectiveDate: faker().date.recent(),
  };
}

/**
 * Creates a random clothing size object with randomly generated values for jacketSize, waist, legLength, and shoeSize
 *
 * @return {Object} an object containing the following properties:
 *  - id: a string UUID generated by faker
 *  - employee: an object with randomly generated values for employee properties
 *  - jacketSize: a string representing a randomly selected jacket size
 *  - waist: a string representing a randomly selected waist size
 *  - legLength: a string representing a randomly selected leg length
 *  - shoeSize: a string representing a randomly selected shoe size
 */
export function createRandomClothingSize() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    jacketSize: faker().helpers.arrayElement([
      "S",
      "M",
      "L",
      "Xl",
      "2xl",
      "3xl",
    ]),
    waist: faker().helpers.arrayElement([
      "30",
      "32",
      "34",
      "36",
      "38",
      "40",
      "42",
    ]),
    legLength: faker().helpers.arrayElement([
      "30",
      "32",
      "34",
      "36",
      "38",
      "40",
      "42",
    ]),
    shoeSize: faker().helpers.arrayElement([
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

/**
 * Generates a random emergency contact object that includes an id, a randomly
 * generated employee object, a randomly generated contact object and a relation
 * to the employee. The relation is randomly selected from a list of options.
 *
 * @return {Object} The generated emergency contact object.
 */
export function createRandomEmergencyContact() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    contact: createRandomContact(),
    relation: faker().helpers.arrayElement([
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

/**
 * Generates a random training certificate object with a unique ID, a random employee,
 * a random training course, an effective date and an expiry date.
 *
 * @return {object} The generated training certificate object.
 */
export function createRandomTrainingCertificate() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    course: createRandomTrainingCourse(),
    effectiveDate: faker().date.recent(),
    expiryDate: faker().date.future(),
  };
}

/**
 * Generates a random trade certificate with a unique id and a randomly generated employee and trade certificate name.
 *
 * @return {object} An object containing the generated trade certificate with the following keys:
 * - id (string): A unique id for the trade certificate.
 * - employee (object): A randomly generated employee object.
 * - tradeCertificate (string[]): An array of randomly generated trade certificate names.
 */
export function createRandomTradeCertificate() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    tradeCertificate: faker().word.words({ count: { min: 1, max: 5 } }),
  };
}

/**
 * Creates a random induction form with a unique ID, a random order, and a random file.
 *
 * @return {object} An object containing the randomly generated ID, order, and file.
 */
export function createRandomInductionForm() {
  return {
    id: faker().string.uuid(),
    order: createRandomOrder(),
    file: createRandomFile(),
  };
}

/**
 * Generates a new random file object with a unique ID, a data URI, and a name
 * generated from a common file name and the SVG extension.
 *
 * @return {{id: string, fileUri: string, name: string}} The newly created file object.
 */
export function createRandomFile() {
  return {
    id: faker().string.uuid(),
    fileUri: faker().image.dataUri(),
    name:
      faker()
        .system.commonFileName()
        .replace(/\.[^/.]+$/, "") + ".svg",
  };
}

/**
 * Creates a random project history object with a unique ID, 
 * employee, order, and job role using faker.js.
 *
 * @return {Object} The created project history object.
 */
export function createRandomProjectHistory() {
  return {
    id: faker().string.uuid(),
    employee: createRandomEmployee(),
    order: createRandomOrder(),
    jobRole: createRandomJobRole(),
  };
}

/**
 * Creates an object containing the ID, order and course for a random training course that is required.
 *
 * @return {Object} An object containing the ID, order and course for a required training course.
 */
export function createRandomTrainingCourseRequired() {
  return {
    id: faker().string.uuid(),
    order: createRandomOrder(),
    course: createRandomTrainingCourse(),
  };
}

/**
 * Creates a random work performed object with a unique id, a random order, and a random work type.
 *
 * @return {Object} The newly created random work performed object.
 */
export function createRandomWorkPerformed() {
  return {
    id: faker().string.uuid(),
    order: createRandomOrder(),
    work: createRandomWorkType(),
  };
}

/**
 * Creates a random worker object with required properties.
 *
 * @return {object} The created worker object with the following properties:
 *  - id: a unique string identifier generated by faker
 *  - order: an object representing a random order generated by createRandomOrder
 *  - jobRole: an object representing a random job role generated by createRandomJobRole
 *  - quantity: a random integer between 0 and 20 generated by faker
 */
export function createRandomWorkerRequired() {
  return {
    id: faker().string.uuid(),
    order: createRandomOrder(),
    jobRole: createRandomJobRole(),
    quantity: faker().number.int(20),
  };
}

/**
 * Generates a random pay and charge rate object along with related order and job role details. 
 *
 * @return {Object} Returns an object with randomly generated pay and charge rates, order and job role details, 
 * applied date, old pay and charge rates, and currency.
 */
export function createRandomPayChargeRate() {
  return {
    id: faker().string.uuid(),
    order: createRandomOrder(),
    jobRole: createRandomJobRole(),
    payRate: {
      normal: faker().number.int({ min: 200, max: 300 }),
      ot1: faker().number.int({ min: 300, max: 400 }),
      ot2: faker().number.int({ min: 400, max: 500 }),
      ot3: faker().number.int({ min: 500, max: 600 }),
      ot4: faker().number.int({ min: 600, max: 700 }),
    },
    chargeRate: {
      normal: faker().number.int({ min: 400, max: 500 }),
      ot1: faker().number.int({ min: 500, max: 600 }),
      ot2: faker().number.int({ min: 600, max: 700 }),
      ot3: faker().number.int({ min: 700, max: 800 }),
      ot4: faker().number.int({ min: 800, max: 900 }),
    },
    appliedAt: faker().date.soon(),
    old: {
      payRate: {
        normal: faker().number.int({ min: 200, max: 300 }),
        ot1: faker().number.int({ min: 300, max: 400 }),
        ot2: faker().number.int({ min: 400, max: 500 }),
        ot3: faker().number.int({ min: 500, max: 600 }),
        ot4: faker().number.int({ min: 600, max: 700 }),
      },
      chargeRate: {
        normal: faker().number.int({ min: 400, max: 500 }),
        ot1: faker().number.int({ min: 500, max: 600 }),
        ot2: faker().number.int({ min: 600, max: 700 }),
        ot3: faker().number.int({ min: 700, max: 800 }),
        ot4: faker().number.int({ min: 800, max: 900 }),
      },
    },
    currency: faker().helpers.arrayElement(["EUR", "SEK", "NOK", "DKK", "PLN", "RON"]),
  };
}

/**
 * Generates a random contact order object consisting of an ID, a random order object,
 * a random contact object, and an order number.
 *
 * @return {Object} The generated random contact order object.
 */
export function createRandomContactOrder() {
  return {
    id: faker().string.uuid(),
    order: createRandomOrder(),
    contact: createRandomContact(),
    orderNo: faker().number.int(5),
  };
}
