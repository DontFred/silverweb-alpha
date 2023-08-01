import { faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.$transaction(async (tx) => {
    const nonproject = await tx.projectTypes.create({
      data: {
        name: "No project type yet",
        id: "00000000-0000-0000-0000-000000000000",
      },
    });

    const nonaddress =await  tx.address.create({
      data: {
        id: "00000000-0000-0000-0000-000000000000",
        city: "non",
        country: "non",
        postCode: "non",
        streetNo: "non",
        coordinates: {
          create: {
            lat: 0,
            lng: 0,
          },
        },
      },
    });

    const noncontact = await tx.contact.create({
      data: {
        id: "00000000-0000-0000-0000-000000000000",
        firstName: "non",
        email: "non",
        lastName: "non",
        phoneNumber: "non",
      },
    });

    const departments = faker.helpers.uniqueArray(faker.commerce.department, 8);
    const departmentsPrisma = await Promise.all(
      departments.map(
        async (department) =>
          await tx.department.upsert({
            where: { name: department },
            update: {},
            create: {
              name: department,
            },
          })
      )
    );

    const userRolePrisma = await Promise.all(
      ["employee", "supervisor", "admin"].map(
        async (role) =>
          await tx.userRole.upsert({
            where: { name: role },
            update: {},
            create: {
              name: role,
            },
          })
      )
    );
    const avatarColorPrisma = await Promise.all(
      ["success", "error", "warning", "primary", "secondary"].map(
        async (color) =>
          await tx.avatarColor.upsert({
            where: { color: color },
            update: {},
            create: {
              color: color,
            },
          })
      )
    );

    const projectTypesPrisma = await Promise.all(
      [
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
      ].map(
        async (type) =>
          await tx.projectTypes.upsert({
            where: { name: type },
            update: {},
            create: {
              name: type,
            },
          })
      )
    );

    const workTypePrisma = await Promise.all(
      [
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
      ].map(
        async (type) =>
          await tx.workType.upsert({
            where: { name: type },
            update: {},
            create: {
              name: type,
            },
          })
      )
    );

    const trainingsCoursePrisma = await Promise.all(
      [
        "Confined space",
        "Construction safety",
        "Harness",
        "MEWP",
        "Manual handling",
        "SSG",
      ].map(
        async (course) =>
          await tx.trainingCourse.upsert({
            where: { name: course },
            update: {},
            create: {
              name: course,
            },
          })
      )
    );

    const addressPrisma = await Promise.all(
      Array.from({ length: 270 }).map(
        async (_, idx) =>
          await tx.address.create({
            data: {
              streetNo: faker.location.streetAddress(),
              postCode: faker.location.zipCode(),
              city: faker.location.city(),
              country: faker.location.country(),
              coordinates: {
                create: {
                  lat: faker.location.latitude({
                    max: 65,
                    min: 40,
                  }),
                  lng: faker.location.longitude({
                    max: 32,
                    min: -8,
                  }),
                },
              },
            },
          })
      )
    );
    const projectPrisma = await Promise.all(
      [
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[1].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[2].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[3].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[4].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[5].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[6].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[7].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[8].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[9].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },

        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[10].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[11].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[12].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[13].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[14].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[15].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[16].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[17].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[18].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[19].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[20].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[21].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[22].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[23].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[24].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[25].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[26].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[27].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[28].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[29].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[30].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[31].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
          size: faker.word.words({ count: { min: 4, max: 20 } }),
        },
      ].map(
        async (data) =>
          await tx.project.create({
            data: data,
          })
      )
    );

    const companyPrisma = await Promise.all(
      [
        {
          name: "SilverBack Staffing",
          addressID: addressPrisma[32].id,
          workingField: "Staffing",
          email: "work@silverback.ie",
          phone: "+353 123 123123",
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[32].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[33].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[34].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[35].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[36].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[37].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[38].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[39].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[40].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[41].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[42].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[43].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[44].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[45].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[46].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },

        {
          name: faker.company.name(),
          addressID: addressPrisma[47].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[48].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[49].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[50].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[51].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[52].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[53].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[54].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
        {
          name: faker.company.name(),
          addressID: addressPrisma[55].id,
          workingField: faker.company.buzzPhrase(),
          email:
            "mail@" +
            faker.company
              .name()
              .toLowerCase()
              .replace(/and /g, "")
              .replace(/, /g, "-")
              .replace(/\s/g, "-") +
            "." +
            faker.internet.domainSuffix(),
          phone: faker.phone.number("+## ## ### ## ##"),
        },
      ].map(
        async (data) =>
          await tx.company.create({
            data: data,
          })
      )
    );

    const officePrisma = await Promise.all(
      [
        {
          addressID: addressPrisma[56].id,
          name: "SilverBack" + faker.location.country(),
        },
        {
          addressID: addressPrisma[57].id,
          name: "SilverBack" + faker.location.country(),
        },
        {
          addressID: addressPrisma[58].id,
          name: "SilverBack" + faker.location.country(),
        },
        {
          addressID: addressPrisma[59].id,
          name: "SilverBack" + faker.location.country(),
        },
        {
          addressID: addressPrisma[60].id,
          name: "SilverBack" + faker.location.country(),
        },
        {
          addressID: addressPrisma[61].id,
          name: "SilverBack" + faker.location.country(),
        },
      ].map(
        async (data) =>
          await tx.office.create({
            data: data,
          })
      )
    );

    const contactPrisma = await Promise.all(
      [
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[0].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[0].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[0].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[0].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[0].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[0].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[0].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[0].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[1].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[1].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[1].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[1].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[1].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[1].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[2].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[2].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[2].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[2].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[2].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[2].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[2].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[2].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[2].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[3].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[3].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[3].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[4].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[4].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[4].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[4].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[4].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[4].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[5].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[5].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[5].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[5].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[5].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[5].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[6].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[6].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[6].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[6].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[6].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[6].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[6].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
          jobPosition: faker.person.jobTitle(),
          companyID: companyPrisma[6].id,
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
        },
        {
          email: faker.internet.email(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          phoneNumber: faker.phone.number("+## ## ### ## ##"),
        },
      ].map(
        async (data) =>
          await tx.contact.create({
            data: data,
          })
      )
    );

    const clientPrisma = await Promise.all(
      [
        {
          name: faker.company.name(),
          companyID: companyPrisma[1].id,
          addressID: addressPrisma[62].id,
        },
        {
          name: faker.company.name(),
          companyID: companyPrisma[2].id,
          addressID: addressPrisma[63].id,
        },
        {
          name: faker.company.name(),
          companyID: companyPrisma[3].id,
          addressID: addressPrisma[64].id,
        },
        {
          name: faker.company.name(),
          companyID: companyPrisma[4].id,
          addressID: addressPrisma[65].id,
        },
        {
          name: faker.company.name(),
          companyID: companyPrisma[5].id,
          addressID: addressPrisma[66].id,
        },
        {
          name: faker.company.name(),
          companyID: companyPrisma[6].id,
          addressID: addressPrisma[67].id,
        },
      ].map(async (data) => await tx.client.create({ data: data }))
    );

    const employeePrisma = await Promise.all(
      [
        {
          dob: faker.date.birthdate(),
          countryOfBirth: faker.location.country(),
          gender: faker.person.gender(),
          officeID: officePrisma[faker.number.int(officePrisma.length - 1)].id,
          contactID: contactPrisma[0].id,
          maritalStatus: faker.word.words(2),
          ppsn: faker.number.int(999999999999) + " ",
          nationality: faker.location.country(),
          addressID:
            addressPrisma[faker.number.int(addressPrisma.length - 1)].id,
          airport: faker.airline.airport().iataCode,
          airportComment: faker.word.words(5),
          a1Payroll: faker.word.words(5),
          avatar: faker.internet.avatar(),
          TrainingCertificate: {
            create: {
              trainingCourseID:
                trainingsCoursePrisma[
                  faker.number.int(trainingsCoursePrisma.length - 1)
                ].id,
            },
          },
          EmergencyContact: {
            create: {
              contactID:
                contactPrisma[
                  faker.number.int({
                    min: companyPrisma.length - 4,
                    max: companyPrisma.length,
                  })
                ].id,
              relation: "friend",
            },
          },
          ClothingSize: {
            create: {
              jacket: faker.helpers.arrayElement([
                "S",
                "M",
                "L",
                "Xl",
                "2xl",
                "3xl",
              ]),
              waist: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              leg: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              shoes: faker.helpers.arrayElement([
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
            },
          },
          BankInformation: {
            create: {
              iban: faker.finance.iban(),
              bicSwift: faker.finance.bic(),
              bankName: faker.company.name(),
              effectiveDate: faker.date.recent(),
            },
          },
          PassportInformation: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          NationalIDCard: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          DriversLicense: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
            },
          },
          EmployeeStatus: {
            create: {
              effectiveDate: faker.date.recent(),
              employmentStatus: faker.word.words(),
              comment: faker.word.words(15),
            },
          },
        },
        {
          dob: faker.date.birthdate(),
          countryOfBirth: faker.location.country(),
          gender: faker.person.gender(),
          officeID: officePrisma[faker.number.int(officePrisma.length - 1)].id,
          contactID: contactPrisma[1].id,
          maritalStatus: faker.word.words(2),
          ppsn: faker.number.int(999999999999) + " ",
          nationality: faker.location.country(),
          addressID:
            addressPrisma[faker.number.int(addressPrisma.length - 1)].id,
          airport: faker.airline.airport().iataCode,
          airportComment: faker.word.words(5),
          a1Payroll: faker.word.words(5),
          avatar: faker.internet.avatar(),
          TrainingCertificate: {
            create: {
              trainingCourseID:
                trainingsCoursePrisma[
                  faker.number.int(trainingsCoursePrisma.length - 1)
                ].id,
            },
          },
          EmergencyContact: {
            create: {
              contactID:
                contactPrisma[
                  faker.number.int({
                    min: companyPrisma.length - 4,
                    max: companyPrisma.length,
                  })
                ].id,
              relation: "friend",
            },
          },
          ClothingSize: {
            create: {
              jacket: faker.helpers.arrayElement([
                "S",
                "M",
                "L",
                "Xl",
                "2xl",
                "3xl",
              ]),
              waist: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              leg: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              shoes: faker.helpers.arrayElement([
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
            },
          },
          BankInformation: {
            create: {
              iban: faker.finance.iban(),
              bicSwift: faker.finance.bic(),
              bankName: faker.company.name(),
              effectiveDate: faker.date.recent(),
            },
          },
          PassportInformation: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          NationalIDCard: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          DriversLicense: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
            },
          },
          EmployeeStatus: {
            create: {
              effectiveDate: faker.date.recent(),
              employmentStatus: faker.word.words(),
              comment: faker.word.words(15),
            },
          },
        },
        {
          dob: faker.date.birthdate(),
          countryOfBirth: faker.location.country(),
          gender: faker.person.gender(),
          officeID: officePrisma[faker.number.int(officePrisma.length - 1)].id,
          contactID: contactPrisma[2].id,
          maritalStatus: faker.word.words(2),
          ppsn: faker.number.int(999999999999) + " ",
          nationality: faker.location.country(),
          addressID:
            addressPrisma[faker.number.int(addressPrisma.length - 1)].id,
          airport: faker.airline.airport().iataCode,
          airportComment: faker.word.words(5),
          a1Payroll: faker.word.words(5),
          avatar: faker.internet.avatar(),
          TrainingCertificate: {
            create: {
              trainingCourseID:
                trainingsCoursePrisma[
                  faker.number.int(trainingsCoursePrisma.length - 1)
                ].id,
            },
          },
          EmergencyContact: {
            create: {
              contactID:
                contactPrisma[
                  faker.number.int({
                    min: companyPrisma.length - 4,
                    max: companyPrisma.length,
                  })
                ].id,
              relation: "friend",
            },
          },
          ClothingSize: {
            create: {
              jacket: faker.helpers.arrayElement([
                "S",
                "M",
                "L",
                "Xl",
                "2xl",
                "3xl",
              ]),
              waist: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              leg: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              shoes: faker.helpers.arrayElement([
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
            },
          },
          BankInformation: {
            create: {
              iban: faker.finance.iban(),
              bicSwift: faker.finance.bic(),
              bankName: faker.company.name(),
              effectiveDate: faker.date.recent(),
            },
          },
          PassportInformation: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          NationalIDCard: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          DriversLicense: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
            },
          },
          EmployeeStatus: {
            create: {
              effectiveDate: faker.date.recent(),
              employmentStatus: faker.word.words(),
              comment: faker.word.words(15),
            },
          },
        },
        {
          dob: faker.date.birthdate(),
          countryOfBirth: faker.location.country(),
          gender: faker.person.gender(),
          officeID: officePrisma[faker.number.int(officePrisma.length - 1)].id,
          contactID: contactPrisma[3].id,
          maritalStatus: faker.word.words(2),
          ppsn: faker.number.int(999999999999) + " ",
          nationality: faker.location.country(),
          addressID:
            addressPrisma[faker.number.int(addressPrisma.length - 1)].id,
          airport: faker.airline.airport().iataCode,
          airportComment: faker.word.words(5),
          a1Payroll: faker.word.words(5),
          avatar: faker.internet.avatar(),
          TrainingCertificate: {
            create: {
              trainingCourseID:
                trainingsCoursePrisma[
                  faker.number.int(trainingsCoursePrisma.length - 1)
                ].id,
            },
          },
          EmergencyContact: {
            create: {
              contactID:
                contactPrisma[
                  faker.number.int({
                    min: companyPrisma.length - 4,
                    max: companyPrisma.length - 1,
                  })
                ].id,
              relation: "friend",
            },
          },
          ClothingSize: {
            create: {
              jacket: faker.helpers.arrayElement([
                "S",
                "M",
                "L",
                "Xl",
                "2xl",
                "3xl",
              ]),
              waist: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              leg: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              shoes: faker.helpers.arrayElement([
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
            },
          },
          BankInformation: {
            create: {
              iban: faker.finance.iban(),
              bicSwift: faker.finance.bic(),
              bankName: faker.company.name(),
              effectiveDate: faker.date.recent(),
            },
          },
          PassportInformation: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          NationalIDCard: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          DriversLicense: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
            },
          },
          EmployeeStatus: {
            create: {
              effectiveDate: faker.date.recent(),
              employmentStatus: faker.word.words(),
              comment: faker.word.words(15),
            },
          },
        },
        {
          dob: faker.date.birthdate(),
          countryOfBirth: faker.location.country(),
          gender: faker.person.gender(),
          officeID: officePrisma[faker.number.int(officePrisma.length - 1)].id,
          contactID: contactPrisma[4].id,
          maritalStatus: faker.word.words(2),
          ppsn: faker.number.int(999999999999) + " ",
          nationality: faker.location.country(),
          addressID:
            addressPrisma[faker.number.int(addressPrisma.length - 1)].id,
          airport: faker.airline.airport().iataCode,
          airportComment: faker.word.words(5),
          a1Payroll: faker.word.words(5),
          avatar: faker.internet.avatar(),
          TrainingCertificate: {
            create: {
              trainingCourseID:
                trainingsCoursePrisma[
                  faker.number.int(trainingsCoursePrisma.length - 1)
                ].id,
            },
          },
          EmergencyContact: {
            create: {
              contactID:
                contactPrisma[
                  faker.number.int({
                    min: companyPrisma.length - 4,
                    max: companyPrisma.length,
                  })
                ].id,
              relation: "friend",
            },
          },
          ClothingSize: {
            create: {
              jacket: faker.helpers.arrayElement([
                "S",
                "M",
                "L",
                "Xl",
                "2xl",
                "3xl",
              ]),
              waist: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              leg: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              shoes: faker.helpers.arrayElement([
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
            },
          },
          BankInformation: {
            create: {
              iban: faker.finance.iban(),
              bicSwift: faker.finance.bic(),
              bankName: faker.company.name(),
              effectiveDate: faker.date.recent(),
            },
          },
          PassportInformation: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          NationalIDCard: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          DriversLicense: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
            },
          },
          EmployeeStatus: {
            create: {
              effectiveDate: faker.date.recent(),
              employmentStatus: faker.word.words(),
              comment: faker.word.words(15),
            },
          },
        },
        {
          dob: faker.date.birthdate(),
          countryOfBirth: faker.location.country(),
          gender: faker.person.gender(),
          officeID: officePrisma[faker.number.int(officePrisma.length - 1)].id,
          contactID: contactPrisma[5].id,
          maritalStatus: faker.word.words(2),
          ppsn: faker.number.int(999999999999) + " ",
          nationality: faker.location.country(),
          addressID:
            addressPrisma[faker.number.int(addressPrisma.length - 1)].id,
          airport: faker.airline.airport().iataCode,
          airportComment: faker.word.words(5),
          a1Payroll: faker.word.words(5),
          avatar: faker.internet.avatar(),
          TrainingCertificate: {
            create: {
              trainingCourseID:
                trainingsCoursePrisma[
                  faker.number.int(trainingsCoursePrisma.length - 1)
                ].id,
            },
          },
          EmergencyContact: {
            create: {
              contactID:
                contactPrisma[
                  faker.number.int({
                    min: companyPrisma.length - 4,
                    max: companyPrisma.length,
                  })
                ].id,
              relation: "friend",
            },
          },
          ClothingSize: {
            create: {
              jacket: faker.helpers.arrayElement([
                "S",
                "M",
                "L",
                "Xl",
                "2xl",
                "3xl",
              ]),
              waist: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              leg: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              shoes: faker.helpers.arrayElement([
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
            },
          },
          BankInformation: {
            create: {
              iban: faker.finance.iban(),
              bicSwift: faker.finance.bic(),
              bankName: faker.company.name(),
              effectiveDate: faker.date.recent(),
            },
          },
          PassportInformation: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          NationalIDCard: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          DriversLicense: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
            },
          },
          EmployeeStatus: {
            create: {
              effectiveDate: faker.date.recent(),
              employmentStatus: faker.word.words(),
              comment: faker.word.words(15),
            },
          },
        },
        {
          dob: faker.date.birthdate(),
          countryOfBirth: faker.location.country(),
          gender: faker.person.gender(),
          officeID: officePrisma[faker.number.int(officePrisma.length - 1)].id,
          contactID: contactPrisma[6].id,
          maritalStatus: faker.word.words(2),
          ppsn: faker.number.int(999999999999) + " ",
          nationality: faker.location.country(),
          addressID:
            addressPrisma[faker.number.int(addressPrisma.length - 1)].id,
          airport: faker.airline.airport().iataCode,
          airportComment: faker.word.words(5),
          a1Payroll: faker.word.words(5),
          avatar: faker.internet.avatar(),
          TrainingCertificate: {
            create: {
              trainingCourseID:
                trainingsCoursePrisma[
                  faker.number.int(trainingsCoursePrisma.length - 1)
                ].id,
            },
          },
          EmergencyContact: {
            create: {
              contactID:
                contactPrisma[
                  faker.number.int({
                    min: companyPrisma.length - 4,
                    max: companyPrisma.length,
                  })
                ].id,
              relation: "friend",
            },
          },
          ClothingSize: {
            create: {
              jacket: faker.helpers.arrayElement([
                "S",
                "M",
                "L",
                "Xl",
                "2xl",
                "3xl",
              ]),
              waist: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              leg: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              shoes: faker.helpers.arrayElement([
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
            },
          },
          BankInformation: {
            create: {
              iban: faker.finance.iban(),
              bicSwift: faker.finance.bic(),
              bankName: faker.company.name(),
              effectiveDate: faker.date.recent(),
            },
          },
          PassportInformation: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          NationalIDCard: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          DriversLicense: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
            },
          },
          EmployeeStatus: {
            create: {
              effectiveDate: faker.date.recent(),
              employmentStatus: faker.word.words(),
              comment: faker.word.words(15),
            },
          },
        },
        {
          dob: faker.date.birthdate(),
          countryOfBirth: faker.location.country(),
          gender: faker.person.gender(),
          officeID: officePrisma[faker.number.int(officePrisma.length - 1)].id,
          contactID: contactPrisma[7].id,
          maritalStatus: faker.word.words(2),
          ppsn: faker.number.int(999999999999) + " ",
          nationality: faker.location.country(),
          addressID:
            addressPrisma[faker.number.int(addressPrisma.length - 1)].id,
          airport: faker.airline.airport().iataCode,
          airportComment: faker.word.words(5),
          a1Payroll: faker.word.words(5),
          avatar: faker.internet.avatar(),
          TrainingCertificate: {
            create: {
              trainingCourseID:
                trainingsCoursePrisma[
                  faker.number.int(trainingsCoursePrisma.length - 1)
                ].id,
            },
          },
          EmergencyContact: {
            create: {
              contactID:
                contactPrisma[
                  faker.number.int({
                    min: companyPrisma.length - 4,
                    max: companyPrisma.length,
                  })
                ].id,
              relation: "friend",
            },
          },
          ClothingSize: {
            create: {
              jacket: faker.helpers.arrayElement([
                "S",
                "M",
                "L",
                "Xl",
                "2xl",
                "3xl",
              ]),
              waist: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              leg: faker.helpers.arrayElement([
                "30",
                "32",
                "34",
                "36",
                "38",
                "40",
                "42",
              ]),
              shoes: faker.helpers.arrayElement([
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
            },
          },
          BankInformation: {
            create: {
              iban: faker.finance.iban(),
              bicSwift: faker.finance.bic(),
              bankName: faker.company.name(),
              effectiveDate: faker.date.recent(),
            },
          },
          PassportInformation: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          NationalIDCard: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
              number: faker.number.int(10100101001101) + "",
            },
          },
          DriversLicense: {
            create: {
              expiryDate: faker.date.future(),
              issuedDate: faker.date.recent(),
              countryOfIssue: faker.location.country(),
            },
          },
          EmployeeStatus: {
            create: {
              effectiveDate: faker.date.recent(),
              employmentStatus: faker.word.words(),
              comment: faker.word.words(15),
            },
          },
        },
      ].map(
        async (data) =>
          await tx.employee.create({
            data: data,
          })
      )
    );

    const userPrisma = await Promise.all(
      [
        {
          email: faker.internet.email(),
          name: faker.person.firstName(),
          avatar: faker.internet.avatar(),
          colorID:
            avatarColorPrisma[faker.number.int(avatarColorPrisma.length - 1)]
              .id,
          departmentID:
            departmentsPrisma[faker.number.int(departmentsPrisma.length - 1)]
              .id,
          employeeID: employeePrisma[2].id,
          userRoleID:
            userRolePrisma[faker.number.int(userRolePrisma.length - 1)].id,
        },
        {
          email: faker.internet.email(),
          name: faker.person.firstName(),
          avatar: faker.internet.avatar(),
          colorID:
            avatarColorPrisma[faker.number.int(avatarColorPrisma.length - 1)]
              .id,
          departmentID:
            departmentsPrisma[faker.number.int(departmentsPrisma.length - 1)]
              .id,
          employeeID: employeePrisma[3].id,
          userRoleID:
            userRolePrisma[faker.number.int(userRolePrisma.length - 1)].id,
        },
        {
          email: faker.internet.email(),
          name: faker.person.firstName(),
          avatar: faker.internet.avatar(),
          colorID:
            avatarColorPrisma[faker.number.int(avatarColorPrisma.length - 1)]
              .id,
          departmentID:
            departmentsPrisma[faker.number.int(departmentsPrisma.length - 1)]
              .id,
          employeeID: employeePrisma[4].id,
          userRoleID:
            userRolePrisma[faker.number.int(userRolePrisma.length - 1)].id,
        },
      ].map(
        async (data) =>
          await tx.user.create({
            data: data,
          })
      )
    );

    const jobPrisma = await Promise.all(
      [
        {
          hireDate: faker.date.past(),
          professionalTrade: faker.person.jobTitle(),
          employeeID:
            employeePrisma[faker.number.int(employeePrisma.length - 1)].id,
          recruitedByID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          hireDate: faker.date.past(),
          professionalTrade: faker.person.jobTitle(),
          employeeID:
            employeePrisma[faker.number.int(employeePrisma.length - 1)].id,
          recruitedByID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          hireDate: faker.date.past(),
          professionalTrade: faker.person.jobTitle(),
          employeeID:
            employeePrisma[faker.number.int(employeePrisma.length - 1)].id,
          recruitedByID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          hireDate: faker.date.past(),
          professionalTrade: faker.person.jobTitle(),
          employeeID:
            employeePrisma[faker.number.int(employeePrisma.length - 1)].id,
          recruitedByID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          hireDate: faker.date.past(),
          professionalTrade: faker.person.jobTitle(),
          employeeID:
            employeePrisma[faker.number.int(employeePrisma.length - 1)].id,
          recruitedByID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
      ].map(
        async (data) =>
          await tx.job.create({
            data: data,
          })
      )
    );

    const jobRolePrisma = await Promise.all(
      [
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
      ].map(
        async (data) =>
          await tx.jobRole.upsert({
            where: { name: data },
            update: {},
            create: {
              name: data,
            },
          })
      )
    );

    const orderPrisma = await Promise.all(
      [
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
        {
          orderCode:
            faker.airline.recordLocator() +
            faker.airline.airline().iataCode +
            faker.airline.flightNumber({ addLeadingZeros: true }),
          answered: true,
          commentToRotation: faker.word.words(20),
          commentToNumbersOfWorker: faker.word.words(20),
          clientProjectCode: faker.airline.recordLocator({ allowNumerics: true }),
          commentToGeneralInformation: faker.word.words(20),
          clientID: clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
          accountManagerID:
            userPrisma[faker.number.int(userPrisma.length - 1)].id,
          projectID:
            projectPrisma[faker.number.int(projectPrisma.length - 1)].id,
          projectAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          deliveryAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoicingAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          invoiceEmail: faker.internet.email(),
          inductionAddressID:
            addressPrisma[faker.number.int({ min: 80, max: 269 })].id,
          orgaNumber: faker.number.hex(100000000000).toUpperCase(),
          vatNumber: faker.number.hex(100000000000).toUpperCase(),
          payTerm: faker.helpers.arrayElement(["weekly", "monthly", "advance"]),
          rct: faker.word.words({ count: { min: 1, max: 5 } }),
          invoicingFrequency: faker.helpers.arrayElement([
            "weekly",
            "monthly",
            "daily",
          ]),
          commentToInvoicing: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          inductionDateTime: faker.date.future(),
          start: faker.date.future(),
          estimatedDuration: faker.number.int(50) + " weeks",
          end: faker.date.future(),
          commentToDuration: faker.word.words({
            count: { min: 5, max: 15 },
          }),
          breakTime: "1h / day",
          breaksPaid: faker.helpers.arrayElement(["unpaid", "paid"]),
          rotation: "6 weeks on / 2 weeks off",
          workingHours: {
            mo: faker.number.int({ min: 7, max: 12 }),
            tu: faker.number.int({ min: 7, max: 12 }),
            we: faker.number.int({ min: 7, max: 12 }),
            th: faker.number.int({ min: 7, max: 12 }),
            fr: faker.number.int({ min: 7, max: 12 }),
            sa: faker.number.int({ min: 3, max: 8 }),
            su: faker.number.int({ min: 1, max: 6 }),
          },
          meetingPersonID:
            contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
          ContactOrder: {
            createMany: {
              data: [
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
                {
                  orderNo: faker.number.int(10),
                  contactID:
                    contactPrisma[faker.number.int(contactPrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          PayChargeRate: {
            create: {
              payRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              chargeRate: {
                create: {
                  normal: faker.number.int({ min: 200, max: 300 }),
                  ot1: faker.number.int({ min: 300, max: 400 }),
                  ot2: faker.number.int({ min: 400, max: 500 }),
                  ot3: faker.number.int({ min: 500, max: 600 }),
                  ot4: faker.number.int({ min: 600, max: 700 }),
                },
              },
              currency: faker.finance.currencyCode(),
              appliedAt: faker.date.recent(),
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
              jobRole: {
                connect: {
                  id: jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                    .id,
                },
              },
            },
          },
          ProjectHistory: {
            createMany: {
              data: [
                {
                  employeeID:
                    employeePrisma[faker.number.int(employeePrisma.length - 1)]
                      .id,
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobPrisma.length - 1)].id,
                },
              ],
            },
          },
          TrainingCourseRequired: {
            createMany: {
              data: [
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
                {
                  courseID:
                    trainingsCoursePrisma[
                      faker.number.int(trainingsCoursePrisma.length - 1)
                    ].id,
                },
              ],
            },
          },
          InductionForm: {
            create: {
              file: {
                create: {
                  uri: faker.image.dataUri(),
                  name:
                    faker.system.commonFileName().replace(/\.[^/.]+$/, "") +
                    ".svg",
                },
              },
            },
          },
          WorkPerformed: {
            createMany: {
              data: [
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
                {
                  workTypeID:
                    workTypePrisma[faker.number.int(workTypePrisma.length - 1)]
                      .id,
                },
              ],
            },
          },
          WorkerRequired: {
            createMany: {
              data: [
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
                {
                  jobRoleID:
                    jobRolePrisma[faker.number.int(jobRolePrisma.length - 1)]
                      .id,
                  quantity: faker.number.int(20),
                },
              ],
            },
          },
        },
      ].map(
        async (data) =>
          await tx.order.create({
            data: data,
          })
      )
    );

    const commentPrisma = await Promise.all(
      [
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },

        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },

        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
        {
          comment: faker.lorem.paragraph(),
          userID: userPrisma[faker.number.int(userPrisma.length - 1)].id,
        },
      ].map(
        async (data) =>
          await tx.comment.create({
            data: data,
          })
      )
    );

    const contactCommentPrisma = await Promise.all(
      Array.from({ length: 50 }).map(
        async (_, idx) =>
          await tx.contactComment.upsert({
            where: { commentID: commentPrisma[idx].id },
            update: {},
            create: {
              commentID: commentPrisma[idx].id,
              contactID:
                contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
            },
          })
      )
    );

    const companyCommentPrisma = await Promise.all(
      Array.from({ length: 50 }).map(
        async (_, idx) =>
          await tx.companyComment.upsert({
            where: { commentID: commentPrisma[idx + 50].id },
            update: {},
            create: {
              commentID: commentPrisma[idx + 50].id,
              companyID:
                companyPrisma[faker.number.int(companyPrisma.length - 1)].id,
            },
          })
      )
    );

    const FREDDY = await tx.user.create({
      data: {
        id: "00000000-0000-0000-0000-000000000000",
        email: "fgrimm@silverback.ie",
        name: "Freddy",
        WebAuthN: {
          create:{
            secretOTP: "Halloitz12!",
            webauthnChallenge: "mLnDzF2xfOB4jDe3cjIugXypBV4FCg9L",
            otp: "$2a$09$pGCOpFB7FfVaawXBuNKEQe52XaAlsTEm07qrW51jAsQ6ziZ5YTYGW"
          }
        },
        color: {
          connect: {
            color: "error",
          },
        },
        department: {
          connectOrCreate: {
            where: {
              name: "Development",
            },
            create: {
              name: "Development",
            },
          },
        },
        userRole: {
          connect: {
            name: "admin",
          },
        },
        employee: {
          create: {
            a1Payroll: "",
            airport: "HAM",
            airportComment: "",
            avatar: "https://github.com/dontfred.png",
            countryOfBirth: "Germany",
            dob: new Date("2004-04-27"),
            gender: "male",
            maritalStatus: "single",
            nationality: "German",
            ppsn: "0000000000",
            address: {
              create: {
                city: "Kaltenkrichen",
                country: "Germany",
                postCode: "24568",
                streetNo: "Teinsiek 23a",
                coordinates: {
                  create: {
                    lat: 53.840383157597856,
                    lng: 9.953493626342087,
                  },
                },
              },
            },
            contact: {
              create: {
                email: "fgrimm@silverback.ie",
                firstName: "Frederik",
                lastName: "Grimm",
                phoneNumber: "+4917621915631",
                companyID: companyPrisma[0].id,
              },
            },
            office: {
              create: {
                name: "SilverBack Dublin",
                address: {
                  create: {
                    city: "Dublin",
                    country: "Ireland",
                    postCode: "D09 CC92",
                    streetNo: "Station Mews, Lindsay Grove",
                    coordinates: {
                      create: {
                        lat: 53.36530800259964,
                        lng: -6.270538831433026,
                      },
                    },
                  },
                },
              },
            },
            BankInformation: {
              create: {
                bankName: "C24",
                bicSwift: "DEFFDEFF XXX",
                effectiveDate: new Date(0),
                iban: "DE75512108001245126199",
              }
            },
            ClothingSize: {
              create: {
                jacket: "M",
                leg: "31",
                shoes: "43",
                waist: "32",
              }
            },
            DriversLicense: {
              create: {
                countryOfIssue: "Germany",
                expiryDate: new Date(),
                issuedDate: new Date(),
              }
            },
            EmergencyContact: {
              create: {
                relation: "Girlfirend",
                contact: {
                  create: {
                    firstName: "Lia",
                    lastName: "Wodtke",
                    email: "lia.wodtke2004@web.de",
                    phoneNumber: "+49454464654",
                  }
                }
              }
            },
            EmployeeStatus: {
              create: {
                comment: "",
                effectiveDate: new Date(),
                employmentStatus: "employed",
              }
            },
            NationalIDCard: {
              create: {
                countryOfIssue: "Germany",
                expiryDate: new Date(),
                issuedDate: new Date(),
                number: "465454654",
              }
            },
            PassportInformation: {
              create: {
                 countryOfIssue: "Germany",
                 expiryDate: new Date(),
                 issuedDate: new Date(),
                 number: "465454654",
              }
            },
            Job: {
              create: {
                hireDate: new Date(),
                professionalTrade: "Developer",
                recruitedBy: {
                  create: {
                    avatar: "https://github.com/paddy.png",
                    email: "plyons@silverback.ie",
                    name: "Paddy",
                    color: {
                      connect: {
                        color: "warning",
                      }
                    },
                    department: {
                      connectOrCreate: {
                        where: {
                          name: "Managment"
                        },
                        create: {
                          name: "Managment",
                        }
                      }
                    },
                    employee: {
                      create: {
                        a1Payroll: "",
                        airport: "DUB",
                        airportComment: "",
                        avatar: "https://github.com/paddy.png",
                        countryOfBirth: "Ireland",
                        dob: new Date("2004-04-27"),
                        gender: "male",
                        maritalStatus: "married",
                        nationality: "Irish",
                        ppsn: "0000000000",
                        address: {
                          create: {
                            city: "Dublin",
                            country: "Ireland",
                            postCode: "D09 CC92",
                            streetNo: "Station Mews, Lindsay Grove",
                            coordinates: {
                              create: {
                                lat: 0,
                                lng: 0,
                              }
                            }
                          }
                        },
                        contact: {
                          create: {
                            email: "plyons@silverback.ie",
                            firstName: "Paddy",
                            lastName: "Lyons",
                            phoneNumber: "+353655655",
                            companyID: companyPrisma[0].id,
                          }
                        },
                        office: {
                          create: {
                            name: "SilverBack Non Office",
                            address: {
                              create: {
                                city: "Dublin",
                                country: "Ireland",
                                postCode: "D09 CC92",
                                streetNo: "Station Mews, Lindsay Grove",
                                coordinates: {
                                  create: {
                                    lat: 0,
                                    lng: 0,
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    },
                    userRole: {
                      connect: {
                        name: "admin",
                      }
                    }
                  }
                }
              }
            },
          },
        },
        avatar: "https://github.com/dontfred.png",
      },
    });

    const SHANE = await tx.user.create({
       data: {
        email: "slindsay@silverback.ie",
        avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAeXRFWHRDb3B5cmlnaHQAIkF2YXRhYWFycyIgYnkgIlBhYmxvIFN0YW5sZXkiLCBsaWNlbnNlZCB1bmRlciAiRnJlZSBmb3IgcGVyc29uYWwgYW5kIGNvbW1lcmNpYWwgdXNlIi4gLyBSZW1peCBvZiB0aGUgb3JpZ2luYWwu9vD63gAAAu9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMi42MCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpjYz0naHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjJz4KICA8Y2M6bGljZW5zZSByZGY6cmVzb3VyY2U9J2h0dHBzOi8vYXZhdGFhYXJzLmNvbS8nLz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6Y3JlYXRvcj4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpPlBhYmxvIFN0YW5sZXk8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvZGM6Y3JlYXRvcj4KICA8ZGM6c291cmNlPmh0dHBzOi8vYXZhdGFhYXJzLmNvbS88L2RjOnNvdXJjZT4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5BdmF0YWFhcnM8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1w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",
        name: "Shane",
        color: {
          connect: {
            color: "error"
          },
        },
        department: {
          connectOrCreate: {
            where: {
              name: "Managment",
            },
            create: {
              name: "Managment",
            }
          }
        },
        WebAuthN: {
          create: {
            secretOTP: "aR278!!@m_8",
            webauthnChallenge: "xh6ewPsOSYTdK0GNtN9w45jzSWwVEJ2T",
            otp: "$2a$04$vPunW/YpahEsGHpUKf05huI3gNmaw63bzSl/zHuDPFZyNuZurD3MC"
          }
        },
        userRole: {
          connect: {
            name: "admin",
          },
        },
        employee: {
          create: {
            a1Payroll: "yes",
            airport: "DUB",
            airportComment: "2. Cork",
            avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgAAAAIACAYAAAD0eNT6AAAAeXRFWHRDb3B5cmlnaHQAIkF2YXRhYWFycyIgYnkgIlBhYmxvIFN0YW5sZXkiLCBsaWNlbnNlZCB1bmRlciAiRnJlZSBmb3IgcGVyc29uYWwgYW5kIGNvbW1lcmNpYWwgdXNlIi4gLyBSZW1peCBvZiB0aGUgb3JpZ2luYWwu9vD63gAAAu9pVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMi42MCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczpjYz0naHR0cDovL2NyZWF0aXZlY29tbW9ucy5vcmcvbnMjJz4KICA8Y2M6bGljZW5zZSByZGY6cmVzb3VyY2U9J2h0dHBzOi8vYXZhdGFhYXJzLmNvbS8nLz4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6ZGM9J2h0dHA6Ly9wdXJsLm9yZy9kYy9lbGVtZW50cy8xLjEvJz4KICA8ZGM6Y3JlYXRvcj4KICAgPHJkZjpTZXE+CiAgICA8cmRmOmxpPlBhYmxvIFN0YW5sZXk8L3JkZjpsaT4KICAgPC9yZGY6U2VxPgogIDwvZGM6Y3JlYXRvcj4KICA8ZGM6c291cmNlPmh0dHBzOi8vYXZhdGFhYXJzLmNvbS88L2RjOnNvdXJjZT4KICA8ZGM6dGl0bGU+CiAgIDxyZGY6QWx0PgogICAgPHJkZjpsaSB4bWw6bGFuZz0neC1kZWZhdWx0Jz5BdmF0YWFhcnM8L3JkZjpsaT4KICAgPC9yZGY6QWx0PgogIDwvZGM6dGl0bGU+CiA8L3JkZjpEZXNjcmlwdGlvbj4KPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KPD94cGFja2V0IGVuZD0ncic/PgiJbX8AAAFiZVhJZk1NACoAAAAIAAYBDgACAAAAjAAAAFYBGgAFAAAAAQAAAOIBGwAFAAAAAQAAAOoBKAADAAAAAQACAAACEwADAAAAAQABAACCmAACAAAAcAAAAPIAAAAAIkF2YXRhYWFycyIgYnkgIlBhYmxvIFN0YW5sZXkiLCBsaWNlbnNlZCB1bmRlciAiRnJlZSBmb3IgcGVyc29uYWwgYW5kIGNvbW1lcmNpYWwgdXNlIi4gLyBSZW1peCBvZiB0aGUgb3JpZ2luYWwuIC0gQ3JlYXRlZCB3aXRoIGRpY2ViZWFyLmNvbQAAAABIAAAAAQAAAEgAAAABIkF2YXRhYWFycyIgYnkgIlBhYmxvIFN0YW5sZXkiLCBsaWNlbnNlZCB1bmRlciAiRnJlZSBmb3IgcGVyc29uYWwgYW5kIGNvbW1lcmNpYWwgdXNlIi4gLyBSZW1peCBvZiB0aGUgb3JpZ2luYWwuANjak/EAAEjWSURBVHic7d0LeFXVve/9P9eEQDCQcBcJoQUBURSkglqlsndP1Xrp+7jdW3e9VX2svSj6qtV619a2HkXd1e2DtqLdeo51v/WOpz1QtCpQAUURECwhiIQACQkEcoPAO/6Lrhoha6051xxzrjnX/H6eZyX/FR4v3DJ+Y4z/GLPLbSv27hcAABArBAAAAGKIAAAAQAwRAAAAiCECAAAAMUQAAAAghggAAADEEAEAAIAYIgAAABBDBAAAAGKIAAAAQAwRAAAAiCECAAAAMUQAAAAghggAAADEEAEAAIAYIgAAABBDBAAAAGKIAAAAQAwRAAAAiCECAAAAMUQAAAAghggAAADEEAEAAIAYIgAAABBDBAAAAGKIAAAAQAwRAAAAiCECAAAAMUQAAAAghggAAADEEAEAQODamxql7u1XpOH9BdK0YY0Uj50s5VfcLd2Kis2PAggCAQBAYHTg3/rHZ2WLeWndUelJZ0n5lXebCkAQCAAAfKeDfaqBP6n4yMky+pYnTQUgCAQAAL7RwV6X+Te/+Li0bqs2X0lt4DcvlOEX3mAqAEEgAACwTgf9hmUHXhoCnBh7z/NSNGKMqVKre+eVxL+z+bM1iX6BEZffnfGfAdA5AgAAz3SQ10G/cfXSxACt791It/zfZlYOdODX18GrCOn+OQDpEQAAZKXxk6WySwd8M/BrJ78Xo29+MnESoCMNEdo3UG22D1IhAADZIwAAyEgH4yaz7K4Dvg78OtO35eDuf/1v6cCfrmEwaei5V8kQ83JKVxGSKxS6hTD8ghuk54Ch5keA+CEAAPgSHeB1gGw2s3qtdXav7/2gg/CEB+cmPisdoJ00DCY56RvQ//dUgUL/uxMff9tUQPwQAIAYSgzqzY2JGb0Oijq7b6utdjzw2jLqmllSMml6YhtBB379/3KqZ9nQRHhIRf9dW//07D9m/Kk4CRFAPiIAAHlGm+Za66oTg57O4pXO5JXNpXuvdP++9OtnJQb+bIKHHhnUo4Md6c89MeibQOH030kAQFwRAIAISQ7kOnNXrWbWrjN3FabB3W+6dK+zf/2sM/0dZsDXQV9rtyY9s9x8BOKHAACEhM7Yk0vxOpNNDu6Jr2cxsOUzPTGgWwC7TCByOtPvTMlx02XUtbNMBcQPAQAImA7uTRvXJJbnk4N8nGbvYaIPICo9+SxTAfFDAAB81HGw1+V7ncnrjB65p9sHyW0EII4IAIBFOuDrXrQO9jqrZ7APL20g1EZCIK4IAIBHOtjvWHZg0NcZPqJhwgNzuQQIsUYAALKgs/y6t19hlh9RegSRK4QRdwQAwCFd3teb6vTlpfMcuUfzH0AAADLSWb4O+jrjR37g8h+AAACkpIN+trfUIdy4/AcgAACHYODPfzQAAgQA4B90qX/Dk7cz8MeAPoBIH0QExBkBALGnA//mlx5PfEZ8aBOg3gPARUCIKwIAYkuP72189n6a+2JMGwFHXH534jMQNwQAxJLu82/8r/sTIQDxpisAuhKgKwJAnBAAECt6U9/nz93Pcj8OMeibF8rhJggAcUEAQGxoZ3+1eQGp6GOGtTlQVwWAfEcAQN7TG/zWPTIzMfsHMtHBX0OAhgEgnxEAkNe2/vHZxKyfvX64pX0B+sRAIF8RAJCXdMBf9/BM9vrhid4XoM8N0FUBIN8QAJB3dKm/0iz5c6EPbCgYMFQqfjyLo4LIOwQA5BU9069n+3UFALBFVwB0S4CjgsgnBADkjaonbk8EAMAvHBVEPiEAIPJ0tr/2vssTS/+A3/R0gJ4S0FUBIMoIAIg0Bn/kAn0ByAcEAESWDvo0+yFXdAVAVwJ0RQCIIgIAIqnJDP4689cVACCX9JggzYGIIgIAIofBH2GjAUCDABAlBABECoM/wooQgKghACAyGPwRdoQARAkBAJHA4I+oIAQgKggACD0Gf0QNIQBRQABAqOmgr4O/hgAgSggBCDsCAEJNn+jXsGyBqYDo0ecH8EhhhBUBAKGlD/XR5/kDUaarALoaAIQNAQChpA/10Yf7AFGnNwaOvvlJrg1G6BAAEDq636/7/rr/D+QDHfzH3vO8qYDwIAAgdFbfdn4iBAD5RHsBtCcACAsCAEJl84uPS7V5AflItwJ4eBDCggCA0NBZv87+gXyljxHWrQDtCwByjQCA0NDBX0MAkM+GnnuVDDEvINcIAAgFlv4RJxMemCs9zWoAkEsEAORc27ZqWXH96aYC4qFk0nQZdc0sUwG5QwBAzlXNvl3q3nnFVEDnJoyrkIryITJwQD/z+cDM+ejxFbJrd7NUVm2WxUtWystz3zVfjQ4aApFrBADkVOPqpYkz/4gvHdyTevcu/McArwP+oA4DfiaVVdXykztny+6mFvMu/HTw1xAA5AoBADmlg7+GgLAaaQahqcePN9UXdKDZvfvQQWbFqkrzMX/1LvpicO6MDti9e/cy1Rd0ANdZe0f6tUEDv/w1W/T3JkohQAOABgEgFwgAyBkd+DUAhJUO/r+440rpc9CglmvJZe9s9Okww85XH62slJvvmm2q8NPBX0MAkAsEAORMmI/9hXXwhzPPvjBPnjOvKNB7AfSqYCBoBADkRJhn/wz++eGHNz4s67NcKQlS6UlnSfmVd5sKCBYBADmhg7+GgLBh8M8fW7bWy49MCAh7P4DeCjjhwbmJz0CQCAAIXFjP/TP45595by6TWY+9YKpwK7/ibik9+SxTAcEhACBwYTz3z+Cfvx589AWZ/9YyU4WX9gBoLwAQJAIAAqXP+F9+1cmmCg893vbbR29i8M9TemriJ3fNDn0/gAYADQJAUAgACNTWPz4rG5+931ThoIP/L+68Mu+PxsVdFELAwG9eKMMvvMFUQDAIAAhU2I7+3WeW/fVKWeS/sIcAfVTwUQ/MNRUQDAIAAqMDvwaAsJh59Xky49RJpkJchD0EsA2AIBEAEBhd+tctgDA4+/QT5cpLvm0qxI2GgNlzXgtlYyDbAAgSAQCB+fj606V1W7Wpcuu0UybJdT84z1SIszCeDtDZv64CAEEgACAQeumPXv6Ta/rkOW36A1QY7wmY8MBc6TmAplT4jwCAQIRh+Z+z/uiMPjzo3vufCc2NgVwKhKAQABAIbf7TJsBc0UfS/sevfszgj07ptcH3/M9nQtEcyLMBEBQCAHyX66t/OesPJ8LSHMhxQASFAADf6dK/bgHkgs78b7vhuwz+cCwMfQH0ASAIBAD4bt1DM6Xh/QWmChZ7/shWZVW13HP/72TrtnrzLnj0ASAIBAD4btlFE83HYDH4wyvdEtCVgMVLVpl3weI+AASBAABf5eL4H4M/bJo951V5ee67pgpO8ZGTZfQtT5oK8A8BAL4Kev+fwR9+yEVfwKRnlpuPgH8IAPBVkPv/esnPrTd8l8Efvgj6vgC9EVBvBgT8QgCAr/TZ/+1NjabyF9f7IgjaHPiTO2cHEgJoBITfCADwjV78oxcA+U2X/X/9q2tMBfgvqBAw9NyrZIh5AX4hAMA3DcsWyLqHZ5rKP3rOnxv+ELQgQgCNgPAbAQC+2fzi41JtXn7hhj/kkt8hgBsB4TcCAHyz9ueXS+MnS03lD234m3r8eFMBueH36QBOAsBPBAD4xs8GwLNPP1GuvOTbpgJyy897AjgJAD8RAOALPx8AxL4/wka3AlasqjSVXaNvflKKx042FWAfAQC+8PMGwPvuuFKOHl9hKiAc9Nrgy37wS+v9AHodsF4LDPiBAABf+HUDIOf9EVaLlqyUe+//nans4Sgg/EQAgC82msFfQ4BN2vX/20dvYukfoXXP/c9YfXhQyXHTZdS1s0wF2EcAgC/8OAFwwXkz5ELzAsLK9lYAdwHATwQA+OLj60+X1m3VprKDxj9Ehc2jgdwFAD8RAOCLZRdNNB/tmXn1eTLj1EmmAsLvUrMKsHVbvam84y4A+IUAAOtsPwNAZ/9Pmb1/ICpsrgIQAOAXAgCss30EkNk/osjW3QBcBgS/EABgnXb/6ykAG7Tz//dz7hQgamwdC+QyIPiFAADrbD4EiM5/RJmNXgACAPxCAIB16x6aKQ3vLzCVNzr759w/ouyl19+RJ55+zVTZK7/ibik9+SxTAXYRAGCdrTsAuPUPUWfjXgBuA4RfCACwTk8A6EkAr/TcP8/6R9Q9+OgLMv+tZabKDgEAfiEAwDobdwCMLB8iv/7VNaYCoq2yqlp+dOMjpsoOAQB+IQDAOhsBgKN/yCdemgFLTzpLyq+821SAXQQAWNXe1CjLrzrZVNmj+Q/5ZvacV+Xlue+ayj2eBwC/EABglY1LgGj+Q77xsg1AAIBfCACwykYAuPWG78rU48ebCsgf2W4DEADgFwIArGpYtkDWPTzTVNnR5X9u/kM+ynYbgAAAvxAAYJXXWwDPPv1EufKSb5sKyC/ZXg1MAIBfCACwymsA4Ow/8pVeCnT+pXeZyp2CAUPlqAfmmgqwiwAAq7wEAB77i3yX7RMCeSQw/EAAgFVeAgDL/8h3z74wT54zL7cIAPADAQBWVc2+XereecVU7rH8j3z30cpKufmu2aZyhwAAPxAAYFW2DwJi+R9xkG0fAAEAfiAAwKpsAwCX/yAusrkPgAAAPxAAYFW2AYDLfxAX2TwdkAAAPxAAYFW2AeD13//CfATyXzaNgAQA+IEAAKuyCQAnHD9ObrvhIlMB+S+bRkACAPxAAIBV2QSAKy4+U8454yRTAflvy9Z6ueyHvzSVcwQA+IEAAKuyCQAc/0PcnPEvPzEfnSMAwA8EAFjlNgDw8B/EkdsbAQkA8AMBAFa5DQDs/yOOCAAIAwIArHIbANj/Rxy5PQlAAIAfCACwym0AYP8fcUQAQBgQAGCV2wDA+X/EkdujgAQA+IEAAKvcBIAJ4yrkF3deaSogXggACAMCAKxyEwB4/C/iys1DgYqOGCNj733eVIBdBABY5SYAzLz6PJlx6iRTAfHj9C6A4iMny+hbnjQVYBcBAFa5CQA0ACLOnD4VkAAAvxAAYJWbAEADoEhTc6ss+uATWb66Ukr7FcvUiUfKmIrDzY/knzWVn8ui5Z9IXX2jTBxbIVOPPVKKehWYH4knp3cBlJ50lpRfebepALsIALDKaQCgAfDA4P/TB5+RppZW8+4LF597mkw7bqyp8sf8hR/K799421RfKC3pK7defX5sQ8A99z8ji5esMlV6Q8+9SoaYF2AbAQBWOQ0ANACKzPnDvMTsvzOzbrkibwbG2vqdiaDTGV0FuOQ7M0wVP07vAii/4m4pPfksUwF2EQBgVdXs26XunVdMlR4NgObX4GdPHDL7T7ru0nPyZitAl/4ffOolUx2qqLBAZv30ClPFz0uvvyNPPP2aqdIbffOTUjx2sqkAuwgAsGrzi49LtXllEvcGwI2bt8m9jz1vqs7FJQAo3QYYPmSAqeLF6V0AEx9/W7oVFZsKsIsAAKucBoC4NwB2tifeUT5tAWivw8yfP2Gqzv3Lt06W06YdY6p4qayqlh/d+Iip0uMSIPiFAACrnASAkeVD5Ne/usZU8XXLA89IXcNOUx3q8MFlctsP/tVU+eOeR/+3fF5Ta6pD6exfVwHiKNNdAFwCBD8RAGCVkwAQ9xMAmZbEv3HCMXL+GSebKn88//rb8ufFH5qqc/m05eFGprsAuAMAfiIAwConAeC0UybJdT84z1Tx9MBvXpS1VZtM1bmfXXeRlPXra6r8kannYXT5MLn+e+eaKl4y3QUw8JsXyvALbzAVYB8BAFbVvf2KVD1xu6lSu+C8GXKhecVRptl/Pi7/J6XbBlBxXAWYPedVeXnuu6bqHHcAwE8EAFjVuHqprL3vclOlFtcAoM1wOgtOtfev8vESoKSF76+Wp1+cb6rOxfFioExHAUddM0tKJk03FWAfAQBWOQkAt97wXZl6/HhTxUumfXAdAH9+/UWmyl/pmh9VPvY/pJPpKCB3AMBPBABY5SQA3HfHlXL0+ApTxUem2a/6/gWnJ+7Iz2dOfh3yeRWkM+lOAhAA4CcCAKxbdtFE8zG1uF0ClKkBTsWpCS5TE6TSrQA9HhgHP7zxYVlftdlUhyIAwE8EAFiXKQDE6RIgHfwf/O1LKa/8Vb0KCuTWH5yfd53/qeizAe599Hlpbk39a6JXBF932TmxCAEPPvqCzH9rmakOxS2A8BMBANatvvV8afpsjakONXBAP3nq0ZtMlf90ufuFN95JO/iruC15K/21ybQVoCHg4u+clvfbIukaAbkFEH4iAMC6dQ/NlIb3F5jqUHG5BCjTVb9JcX4aXrqnIXaU71cFb9laL5f98JemOhQBAH4iAMC6dJcB5fsRQD3qpzPb5asrzbv08vnMv1OZ7gZI0lUAXSnJ1yOCqW4EJADATwQAWNewbIGse3imqQ6Vz0cAddB/+g/zMy75Kx38r7/s3Lwd0JzSwPTAb190FALyeUsgVR8AAQB+IgDAuvamRll+1cmmOtTzT90hfXr3MlX+0KY2HfgzdbYnMfh/mZsQoPTEhAaBfGqaXLRkpdx7/+9M9WUEAPiJAABfdNYHkG/PANCB/7UF7znax07SwUvP+zP4f5nbEKC0f+LM6VPyIgjs2t0sl5ltgN1NLebdFwgA8BMBAL7o7JkA+XL+X5f6tcnP6Yw/SQesuDb8OeW0MbAj3RLQX1v9HGUHbwPo8T89Bgj4hQAA3yRXAQqLiuSfTpkoV116lvmqXTpz1G775KCh58anTjxSjhk70urMcO36TYmBX/87Tvb4O9Jz/v9y+kmxO+qXLQ1X+nvqlvYIJIPA6JHDzFfs0JWeD1evl0XLP0nc66D0v6OnE2yu5OhpgB/d+PA/VgEGTTpJBl5wi6lEeg4Yaj4CdhEAYN3EbptkbNctUt51u3y6aq0MGtBPbr57tvz21/bP/+sNe8lvygfTMDDarDjoYKD77k4DgYYKXYrWGf7GzeazGfzdDvpJ+t+9xOxX6/8LnNPf0zl/mJ/4fciGhgH9fR8+pMz8GTjw++90sNYBX/+7+vu+tqo68f/SGf091RsLbdJegNlzXkv8ndGG2WUrN8iilZtk9L9fK8vb7YUaQBEAYEWh7JEju22V6d3/Jv26NJuvfEFnNnrO2fYzADI9Wrcz+k27V0FPUx2qubUt5Td7t3TWr2fXv/2NKeYdsvXqn99L9FnYYvv33+9HGOvjgiurNifuzqjf30sW7P2KfNI+UFqkh/lRwBsCADzT2f45PVZIry57zbtDJZ94ZvsOANuDgy3HHDnSLPmf7HjFAenpjNzNKYsg6TaABj2//OjGR0wAqP7S9dnN+7vLS3smyOp9g8w7IHsEAGRNZ/3f6vGJHGuW/NN59oV58px5nXD8OLnthovMV+zQ2ZpuAYSFLjWfOf14X2eEcaYrPq8tWBKqIKBbALqq4JfkkwI7Oz67aO+IxIoAqwHIFgEAWRncZaf8W88PDlnu74wuY748993ENzD9RmbTY8++Lh9+st5UuaMNYadNPcbXgQBf0OA3f9GHiYbMXNKVnqsvPMNU/kiunKlU22e6LfC/2o6Vmv2sNsE9AgBc08H/0p7vpVzyP9hP7pwtK1ZVmkoSjYCDBvYzlT26FaCDQV3DTvMuGNpUNu3YsYnB32lzGezSrQHtzl/4wepE015QSkv6Jn7f/e7vSK6cKW0ITHWDpm4JPNU2hRAA1wgAcMXt4K86BoCZV58nM06dZCr7dIlYj2otX7Ve0j1qNls64xsz8nDrRwzhXTIM6FFNP7YItKlz4riRga703HP/M7J4ySpTZX6GBiEA2SAAwDHd89fBf0jXRvPOueQ+pgrqNkAdEA4c49okdfWNZtm41lUo0P380n7FMnzwADPbL2VfP2I0DH5eUycba7Ylfv/1z4FTOtjr8UH9/dc/B3qcMBeB7/xL70rcEKgyBQC1eV9xIgTQEwCnCABw7FvdV8vU7htM5U7HAKA3AeqNgLmiA0M6DPT5LSq//9r5rycAkpw+RlsbA9/YO9ZUQGYEADgytuuWRNOfW8k7ADrqeKQJwKHmvblMZj32gqkOcBoAlK4CrN/X31RAegQAODKz4C1HHf8H69jJnJSqoxnAAcmTM0luVs70ZMCs1lNMBaRHAEBGes7/3B4rTOVeZwHgiovPlHPOOMlUADrTsXE2yc3K2Yt7JsgHXB2MDAgAyCjb2b86eClTBdUICERVx76ZJDcBgFUAOEEAQFrZ7v0ndTzLnORmOTPs3npvhZwyZYKpADsObgBMcnuHhl4QxHXBSIcAgLR06V+3ALLVWQBQbmYzYdGwc7e8PG+xvKSv/7vIfOXLzvmnqXLOjBPk4u+cZt4B2els1Uy57Z3hRAAyIQAgLS/L/+rBR1+Q+W8tM9WXuf1mlmv6MJo7/+M5qfp8i3mXXvnhg2TWLVeYQHCCeQe4c3ADYJLbvzNsAyATAgBSKjED/3UmAHjRWTOTilIj4KU/eUjm/H/zTOXOtZecLbN+eoWpAOdS/Z1Jdx1wKg+aANBgggDQGQIAUvK6/69SfTOLSiPguVf/rNPlfqcu+X9myFO/uNZUyJb2Wbz51xWyfPV6sw2zK1F3pCsu5cMGysSxFYnXKVOOSnwtqjprAFRObgM8GH0ASIcAgJSmd/9b4uVFqgAQhUbAOx95Tu4yy/5ePfXLa+WS77j7xh13Osg//PQric866Ls1cVyFnDplglxz8VmRCgOpGgBVNgFAHxesL6AzBACkpIO/vrxINZtRYW4E1L3+kdO/ZyrvSvr2kfULfmM+9zbvkI6bXgundBXmjh/+WySCQKoGQEUAgG0EAKTk9QSAShcAdAVAVwLC6JKbZiUGI1vu+NEFcuePLzAVOqNP8Zv5sycSM36/6K+//j6EWapTMyqbbTO9DEgvBQI6QwBASpf1fE/Ku243VfbSBQA/Hw3sVb9J/5rV0nMqOvvUVQAcSpf6r713tqn8p1sDLz7608TvRxil2jJTbp4HkFS1r7/8tm2KqYBDEQCQkt8BIJslzSDoLHT6v99sKrs+eOWRRJMaDtB7FWb+/ImsTlh4oVsyC/7r56H8vdAHZ+kDtDpDAIBtBACk5DUAdPYcgI6y+YYWhIfmvJxYjrZtwX/dJ6d+jeXYpGPP/rEsTzHbDULYApk++//8S+8yVeey+ftCAEA6BACk5HcA6NO7lzz/1B2mChdb3f8H0zsB9G4AZH+3gk1hWwnI9PdFrwHW64DdIAAgHQIAUvI7ACgNABoEwsSvAPDiY7dyO6Bx7b1PmH3/l02V2WHFvROrJjpIlx8+UMqHDUrUnZ2o0EZC3Vao2rQlsY2jrw2btpofSU17AT54+ZFO/31Be+n1d+SJp18zVWpuT84QAJAOAQApBREA3F5vGoSX/u9iOffqe01lF1sAkhiUM/VX6KCvQemcGVMTn73QQPDSvEVmW+cV+dAEhM7oMcEwXNaU6trsjggAsIkAgJS8BoB0R5qSwnglsJ5Bt3UHQEf1y54PxUwzV3Qw1n1//fXtzIhhAxNH9fy6NElXCLS/o7PjnWEIZ+lOACQRAGATAQApBREAsjnbHISJZ/045YwxG2fPOEFe+s9bTRVfqbZWdMb/0K1X+DbwH0wDyCU3PZS4YjhJ7wfQ8JFL6U7MJLndMiMAIB0CAFIKIgBk09kchDl/mCeXmkHClrjv/+vsX1dVDr5b4ZqLz04MvLlYGdGtHr3waUfj7pw3aOrRPz0CmInbLTMCANIhACClIAKAcrusGZTyUy/L2ETmxClTJsibz95nqvg6OFDprH/OL2fmPBRpMNGtgVwv/zvpl1EEANhEAEBKXgOAk6YmpUeb9IhT2CQGhgtvTswQs6UDnQ7+2rkeZx2X/48xvxZzfnlt7H9NOnIalgkAsIkAgJS8BgAnTU3K7Te1IB08c3VDB3/d98/17DIMdKZ97c9mJ47x6VJ7Lpb8w8xpWHb7d4UAgHQIAEgpqAAQ1iuBk7JZCdCOdh38meXCCad/V9yemiEAIB0CAFIKKgCcffqJcuUl3zZVeOkMVo+QJZexU9FZv85w9cUsF045OQGg3IZlAgDSIQAgpaACQFhPAqSi3eO6KqCX2igd6HWmr69cN7UhepyeAFAEANhEAEBKXgOA01mNnmvW881AHDk9AaAIALCJAICUggoASgOABgEgbpyeAFBut8sIAEiHAICUggwAbrubgXwxe86r8vLcd02VmdvtMgIA0iEAIKUgA4Db7mYgXzjtlVEEANhEAEBKXgKAm31N5XZvE8gX5196l+za3WyqzAgAsIkAgJSCDABuv7EB+UAHfg0ATlWUD5X/+NWPTeUMAQDpEACQUpABQK8C1iuBgThx+/dEuXl2BgEA6RAAkFKQAUC5+cYG5IN5by6TWY+9YCrn3Pw9IQAgHQIAUvISANwcbUriJADiJpu/JwQA2EIAQEpBB4Bbb/iuTD1+vKmAeHBzAiDJzZ0ZBACkQwBASkEHAE4CIG5+dOMjUllVbSrn3KyUEQCQDgEAKZ3bY4Uc222TqdzLJgCccPw4ue2Gi0wFxIObuzKS3ASAD9qHyYt7JpgKOBQBAClN7/63xCsbTp9v3hFHAREnOvPXFQC33ASABXu/kngBnSEAICUd/PWVjWz2NpWbBicgyrI5KaMIALCFAICUxnbdIv/W8wNTuZdtANC7APROACDfZbNNptw0yz5l9v/X7+tvKuBQBACkVNKlWa4reMtU7mUbANzMboAoy2abTLlpln2w9RRp2O/sxADihwCAtK7u+a4M7tpoKneyDQA8FAhxke3fEacBoGZfsTzWdqKpgM4RAJDWt7qvlqndN5jKnWy/ubl93jkQVfoMAH0WgFtOA8CivSPkjb1jTQV0jgCAtEZ23S6X9nzPVO5kc7xJcRIAcaADvwaAbDgNAI+1TpOa/X1NBXSOAICMsrkQKNsAoA2A2ggI5LNsTwAoJwGAC4DgBAEAGWVzGiDbAKA4Coh8l81DgJKcBAC6/+EEAQCO6GkAPRXglJcAwEmAQ+1uajEfo6N3UaH5iFSyPQKoMgUA7frX7n8gEwIAHHHbC+AlALg55xwXayo/l337o/FXtUf3bvKVEUNNhVSybZJVma7MZvYPpwgAcExvBdSXE14CQKYZThxt2LRVmlpaTRV+RYUFMmLYQFMhlct++EvZsrXeVO6la5TVW//0BThBAIArThsCvQSATDOcOKrZVi/1O3eZKvzK+vWVAf0PMxVS8fL3I1UAoPEPbhEA4Eqh7EmEgEyXA/nxDS7OWlrbZP3nW0wVfqOOGCI9e3Q3FTqT7UOAkjr7+6GX/ujg3yI9zDvAGQIAXHMSArwEAMVJgENFYRuA5f/MFi1ZKffe/ztTZefgAMDgj2wRAJCVTCHAawDQuwD0TgAcoPvFn2/eJpWf1Uj15lrzFZH6+p2yvf6LX//+/Yqln1l+V73MQDx0aJkMHVwqvXoVmK94t6m6NrESsa5yk3l3QLX5WvPfQ0kX8xo7eoT0LS4ylRmo/n6SY+SIIdKndy9TQXk5AaA6BgAGf3hBAIAn2hSor4N5DQBxPQqoA/36DZsTy8SVVZtli9n719qro8ygMapimIwfNzIRFJxYt75aPl5ZaT5vSgz0XmkgGDSgX+KldVyDwT33PyOLl6wyVXaSAUCb/fQFZIsAAM8Gd9kp3+mx4kurAV4DQFxOAujgvmLVellhBtrKDdWJAOC3/maVYPKkI+XkaUcfsjqgs/ul738iH5v/p+bmAzN7P1WUD02EgYryITJhrAkIMVj18XIEUI0Z91X5ys2/4ZpfeEYAgDXHdtuUeOkpAa8BIF8fCqR3wOvgqvvAOgvU97mig//k40wQOPGYxHbCn+YvSQSAXNIAcMLx42XGKceZUJCfdwl4/bsx8JsXyvALbzAV4A0BANbpisDr3/26qbKXXObMBzrIL166Sha/tyox8MMZ3R7QI6F6KZR+zge6wqN3AHgx9NyrZIh5AV4RAOCLtT+/XBo/WWqq7Og3/+efusNU0aUPfJn/1rLEve/wRlcGZpwySU4zL62jSv9MZPsQoCQCAGwhAMAXXgOA0gCgQSBKdLb/ytx3ZZ4Z+HW2B/u0Z2DGqZMSgSBqvJ4AUAQA2EIAgC9sBIAonQTQwf65/56X8339ONGVAG0WjVIQePDRFxKrQl7o/r/2AQBeEQDgCxsB4IqLz5RzzjjJVOGVHPhZ5s8dXSXSptGzzEvrMPN6AkCNvvlJKR472VSANwQA+KJq9u1S984rpsqeflMP60kABv7w0cH/ikvODPWKgNcTAIoAAFsIAPDF5hcfl2rz8iKMJwF0eV/3+HUvF+EU1q0BDY1eTwAoAgBsIQDAFzYCgM7otBEwLLSx74k5ryVCAMJPmwWvNNtIYblPwMYJAEUAgC0EAPjCRgBQGgA0COSSztxm/ecLidv6ED16o2QY+gN01cjrCQA16Znl5iPgHQEAvmhYtkDWPTzTVN7k+iSAfsPWb9yINt0WuPb75+X0z5KNEwCKAABbCADwRePqpbL2vstN5U2uTgLorP/e//m7xF39yB+6GqD9Abnwoxsf8fznqVtRsUx8/G1TAd4RAOCLpg1rZPVt55vKG7357bofnGeq4Oh1vQ899t/s9ecp7Q249f/9buBbAjZOABQfOVlG3/KkqQDvCADwzbKLJpqP3gR9EmD206/Jy6+/YyrkMx38f2pCQFBbAjrz1xUArwgAsIkAAN/YCADq9d//wnz0l872ddavs3/Ex8yrz0tcK+w3/XN17/2/M5U3egOg3gQI2EAAgG9WXHe6tNVWm8qb//jVj309yqWD/813PZGYpSF+gugL0EZSbSj1iucAwCYCAHxj4zpgdesN3008EtYPNPtB6SqArgb4xcYVwIoAAJsIAPCNrQCgszOdpdmmg77O/HUFAPAzBOgNgBo2veISINhEAIBvbF0G5EcjIIM/OuNHCNA/Y+dfepepvCMAwCYCAHxjKwBox7beCGgLgz/SsR0CbF0BrCY8MFd6DhhqKsA7AgB8U/f2K1L1xO2m8u63v74pcZubVwz+cMJmCLDVAKi4BRA2EQDgG1u3ASobjYAM/ofqXVQoZ59xUuLJedqkpo831s+wFwJsXQHMLYCwjQAA39i6DVB5bQTUQf/HNz1ipREr6gYO6Jfoq5g6ZVynoUp/jfTc+uIlq2IfBmyEAL0ASMOnV1wCBNsIAPCVrcuATjh+nNx2w0Wmck8Hf5352/gmHCQdpCvKhyQG7FT3IGzdVi9bzCsTnenrv0P/fdpT4Yb+uul/o7Jqs3mXmf5/d2Z3U3Pi36H/Pv2s/+9R4DUE2LgCWBEAYBsBAL5aftXJ0t7UaCpvdP9f+wDcitrgr4P92aefmBh0dKBuam6Vz2tqzY+I9C8plrJ+fU0VXrX1O2V7w4Hf78MHl0lRrwJTdU6b43TLwcbyuN/09yObEKA/R1sNgNwBANsIAPCVrbsAlJ4E0EHRqagN/rrNoYN/8ue4pvJzefx/vSFNLa3m3QEXn3uaTDturKnCZ+H7q+XpF+eb6oCiwgK56t++JWMqDjfvUtNBcvbTr8p6syoQZhoANAi48dLr78gTT79mKu8IALCNAABf2QwA991xpauHt8x67AXRGWbY6fL8rWZ7o+PPTWfSP3vs+S8N/km3Xn2+DB8ywFThsXHzNrnX/P8eTEPAT83/b6aVCw1rs+e8FvrVALchwFYDoOIOANhGAICvbN0FoHSG7LQRMEqDv15ypPvzHc1f+KH8/o3OO77PnD5Fvv2NKaYKj1f//J68tuA9Ux3qX751spw27RhTZWZzwPSLmxMpthoAFQEAthEA4Kutf3xWNj57v6m8O+2USXLdD84zVXpRGfxVqgcdpRtQS0v6ys+vz64h0i+3PPCM1DXsNNWh3AYWW/fm+0W3aO6744pOf98OZqsBUHEHAGwjAMBXNu8C0O5ynS2nE6XB/4qLz5RzzjjJVIdKFwBUmHoBDt77P5jbAKDbATpzDvMpASchQI9T6jMAbOAOAPiBAABftW2rlhXXn24q7/SbrjYCphKlwT9TmMk0qOoqgPYCpOuyD4KeUtC9/1Szf5VNWNHGQFvd835K1xNg8+fAEUD4gQAA39m6C0DpUUA9EtiRzhj1kb4rzDfcqEi19J+Uqqmuo9Hlw+T6751rqtx54DcvytqqTaZK7WfXXZSxCbAzYd8KSNK+FO1POZjNK4BLTzpLyq+821SAPQQA+G71redL02drTOXdwcvm895aJk/MeS0RAqLCaS9Dun31pKnHHplosgt6JUBn/rpCsXx1+gFa7wK47Qf/air3bC6h+23C+AqZ+f3zvhROdRvDVgMgRwDhBwIAfLfuoZnS8P4CU3mn2wCn/X3JdfGSlYlBImo6W8XoTKZtgCQ9Eqjn7bOZZWdDjyjq/QS6SpFJNsv/HUXhVEBHGgSONts7etOhXqdsCycA4AcCAHxn8yhg1Lm90tjJKkCSNtp944RjfFsN0Fn/nxd/mGhQdEL7FLyeVrC5jx5lY+95XopGjDEVYA8BAL5rWLZA1j0801Rwc4Zc6W2ADz71kqmc0Yt3jhk7Uk6bekxiZcAGnenPX/ShfLh6facXE6Vy3aXnZLwF0Ikf3vhw6G8J9BtHAOEHAgB8Z/OpgFGm9/w/9ehNpnJHZ9zpjgSmkgwDY0YebmbjxTJ65DDz1czWrt9kVh0aZc36z10P+kluj/6lY/M63SgqOmKMjL33eVMBdhEAEAibJwGiymnzX2fm/GGeLPrgE1N5o8vyGgZUab8Dn+vqG81H89kM+k63G9LRxsRLvnNoV3y2tM8jKs2AfuAEAPxCAEAgbD4TIKrcLv8fLN31wGGhJxKcXvvrxqU/+GWoLwby0/ALb5CB37zQVIBdBAAEYuOz9yeuBY4zvcRITzF4oT0B//ncG9Lc6n5Z3k+9Cgrk+xdkfvJftmbPeVVenvuuqeKHEwDwCwEAgdDBX0NAXI0sHyK//tU1pvJOu/G1L0A78sNATx7ofr9fpw+UHqm79/7fmSp+aACEXwgACETcGwHdHv9zQs/ja3Ogjd6AbOhevzb7BXH/QFyPA9IACD8RABCY5VedLO1NBxrO4kavitUrY/2gQUC79Rd+sFo+r6k1X/GP3uw37dixidMFQQz8Hdl8sl5U0AAIPxEAEJg4NwJ6bQB0KhkG9Ajf5zV1nrv69dTA4YNLE0cJczHodxTHRsDyK+6W0pPPMhVgHwEAgYnzjYD33XGlHD2+wlTB0n6BjZu3JcJA8jy/nvPvTPKeAD0mqC+9SMjPfX23ovJwIJsmPDBXeg4YairAPgIAAtO4eqmsve9yU8VPrgJAPolbAOhZNlQmPDjXVIA/CAAIVFwvBCIAeBe3AMD+P/xGAECgbD4ZMEoIAN7FLQCw/w+/EQAQqLjeB0AA8C5uAWDi429Lt6ID1zUDfiAAIFBxvQ/giovPlHPOOMlUyNb5l94lu3Y3myr/cf4fQSAAIHArrjtd2mqrTRUfft4DEBdxugdg6LlXyRDzAvxEAEDgdAtAtwLixI+bAOOksqpafnTjI6aKh7H3PC9FI8aYCvAPAQCBi+M2gD4ESB8GhOy89Po78sTTr5kq/3H8D0EhACAn4rgNQCNg9uLUAKiP/tVHAAN+IwAgJ+K4DXD26SfKlZd821RwQxv/tAEwLlj+R1AIAMiJtm3VsuL6000VH7oN8Jtf35j4DOeefWGePGdecUD3P4JEAEDOrL71fGn6bI2p4oNVAHe2bK2XH9/0SGIVIA506V+3AIAgEACQM3VvvyJVT9xuqnj57a9vkkED+5kqWDqIrt+wWbZsq5etZmBN+ijN3npF+VDpU1RoKpEJf+9fmDDuwOcgPPjoCzL/rWWmigcu/0GQCADImfamxkQzoH6OEx1U77vjCl+3ArRhrrJqs3lVJwb8FStTD/LZ0ABTMWKo+bkMSQSDkSOGWP/5zHtzmcx67AVTxQN3/yNoBADkVBybAdXU48fLrTd811Te6TK5zux1Jq8DvQ76uaDBRsPA0WaF4KhxIz0FAv05xOncv6L5D0EjACCn4tgMmKSD5czvn5eYTbuhS/kfr1qfGPAXL1mZCABhpIFg6vHjEj9PN9sGL899V2bPedVU8VF85GQZfcuTpgKCQwBAzlXNvl3q3nnFVPGjs2RtDDztlEkpg4DOhrdua0gM+Lmc4XulQUBXBzQY6JZBx5+vhpjFS1cllv2j+vPzYtQ1s6Rk0nRTAcEhACDn4rwK0JEOjL17H2i4S9IBH/mNm/+QKwQAhEKcVwEQb6NvflKKx042FRAsAgBCgVUAxBF7/8glAgBCg1UAxA2zf+QSAQChofcBxPFeAMRTyXHTZdS1s0wF5AYBAKES19sBES962582/ulnIFcIAAidtT+/XBo/WWoqID9x5z/CgACA0KEhEPmMxj+EBQEAoaTXA+s1wUA+0SX/cfc8Lz0HDDXvgNwiACC01j00UxreX2AqID9w4x/ChACA0NLTANoP0PTZGvMOiDbd89e9fyAsCAAItaYNa2TtfZcnwgAQVUVHjJGx9z5vKiA8CAAIvcbVSxMhAIgiHfy16U/3/4EwIQAgErgfAFGkgz7n/RFWBABEBiEAUaKDvl71WzRijHkHhA8BAJFCCEAUMPgjCggAiBxCAMJM9/xHXHE3gz9CjwCASNIQoBcFcToAYaKDPw1/iAoCACJLjwiue3imtNVWm3dAbpWedJYM//cbGPwRGQQARJquAOiNgTw8CLmkF/zoRT9AlBAAkBc2v/i4VJsXEKSeZUOl3Oz3F4+dbN4B0UIAQN7QLYENT9zO1cEIBEv+iDoCAPKKbgnoSoA+TRDwgw74OuvnoT6IOgIA8pKuBnz+7P30BsAq3ecfeu5ViRAARB0BAHmN44KwofjIyXL4hTdwth95hQCAvKeDv24JbDEvrQGnaPJDPiMAIDZ08Nf+AF0V0BpIRQd+XeovPfks8w7ITwQAxI4O/qwIoDMM/IgTAgBiSwd/DQK1ZkWA2wTjTff4tcGPzn7ECQEAMHRbQMMAdwjEi57l14Gf5j7EEQEA6ECPD2oQqHvnFfMO+UiX+cvMEr8O/BznQ5wRAIBO6PaArgponwDbA/mh5Ljpib19lvmBAwgAQAbJVYGG9xckggGiQ2f7g8xMXwf/ngOGmq8ASCIAAC7oqkDDsgWJMIBw0mV9HfB1iZ+9fSA1AgCQhbZt1YkQwBZBeOigr8v7uswPIDMCAOARWwS5wxI/kD0CAGDRhD/dIss/+jTxgj90iV9n+XqEjyV+IHsEAMCiO3vOld3NrVL1WY188OGnMu/NZVK3fYf5EXj1tcnjZMux/5oY/AF4RwAALLq78P+Yjwc0mSDQuLtZVn1SJQv/+nHiBXcGlJXIP02fLDNOmSSDBvaT21v+h/kqABsIAIBFHQNAUmvbnkQY2F6/U95d/DGrAg6MHztSzj3zJJl6/Hjz7gsEAMAeAgBgUWcBIGnfvn3S0mrCQEur/HXpapm3YKms/dtG8yNQRUWFZsAfJxee90+J2X5nCACAPQQAwKJ0AaCjvXvbTRhok08+/Uz+OH9JrLcHepuB/+wzTpKzTz9R+vTuZb6SGgEAsIcAAFhSsnePXNdnvqnc0ZWBzzZtk//93/Pl7UUfma/Ew8AB/cxsf4bMOHWSeecMAQCwhwAAWDBqX6tMHtBNxu+eZ95lb8vWevnjn9+TV//PImlqajFfyT/ZDPxJdzX9s7R37WoqAF4RAAAPurS1ywlFe+WIw7qZd+I5ACTt2t0sL899V15+/R3ZnSdBwMvAn7Sgyzdkya6usqtbd/MOgBcEACBLfdr3ymn990th9y7m3QG2AkCSBgE9NaBhYOu2evOV6JkwrkIuMAP/0eMrzDtvVvaeIS3mW9Y7W/dLXUFP8xUA2SIAAFkY0t4mU/p3+dLgr2wHgI4WLVmZCAOLl6wy78JNG/t0pn/26Sel7OjPhgaApLc37ZHqwvRNgwBSIwAALung//WBXU11KD8DQJL2Ccx7a5k894L//61snHD8OJl59XkZO/qz0TEAqE+2t8uH+wtMBcAtAgDgwoCWFvnGsO6m6lwQASCpsqpaZs95TVasqjTvck/3+HXgt7HUn8rBAUARAoDsEAAAh8plj3yttIupUgsyACR9tLLy71sDK3PSMKh7/GefcaIcfGufHzoLAIoQALhHAAAcSLfs31EuAkCSNgzqasCi91YlPvvVNKj7+xPMLF8HfB38be7xZ5IqAKg1DftkeTuNgYBTBAAgA73g55uD0s/8k3IZAA6mvQKVG6rNVsFm86qW3btbEsHAjZHlQ6RPUa/EgD/ILPFXmPcV5bl77n66AKD+snWfbO5GCACcIAAAaXR21C+dMAWAdHS1QINBZ3SgD3JW70amAKDmbt4njT0JAUAmBAAghW779sk/H9YufXs6G/xVVAJAVDkJAHpPwIKGbrKzS+YtGyDOCABACsd0aZUj+x+44c8pAoC/nAQAtbVpnyxoZhUASIcAAHSitLVNZgx1P4MkAPjLaQBQS7bslcruhaYC0BkCAGJn2L462bl7vwzp0iibdhyY4Zd0aZZNu3pI896u0qf7Pjn7+MOlR3cCQNi4CQDqsbcapLRrg7RLF2mTA7/XXylplYb9By4pGma2eDbvL5a+vbvIpq6l5itAfBAAkJfK2ndIj+Zd0rJ7r3RpbTWDe0/ZZ/6or9914Bt/Ohcc31fGDs5u+ZgA4C+3AWDzjnZ57C/Oj0MOLGyT4sJ9MqxPm+wvKJDC3t1lT68+UtvtMPOjQH4hACDyBrbVSdfGRtnT0i7VO7pKtRnsd+89MNtza2RpD7lsWvbf7AkA/nIbANQfljfKBxtbTeXNV0uapX/v/VLcp6vsKy6WrT1ZMUC0EQAQKYWyR3o31snenc2ywyzjr28oyHqw78xlUw+TkWU9TJUdAoC/sgkA9U375MH5201lV+/u7TK4zx4ZfNh+6d63l+wuLpUWyf7PDhA0AgBCb3BTjexrbJJNdSJrGorMV/zhdfavCAD+yiYAKFurAJmMKWmSYWZhoGtxkdQUDTZfAcKLAIDQ6dPeJAX1ddK4c4983tBdtrZktx/vltfZvyIA+CvbAODXKkA6ukIwpqxVSvt3l8biMtnVzb/wCmSDAIBQSA76Ddvb5MPa3uYrwRrSt7tcfUqJqbwhAPgr2wCggloFSOWYst1S0r+ntPYrJQwgFAgAyBk9etdtW23OBv2OTh/fW6ZWZD4hkAkBwF9eAsDqmjZ5bslOU+VeMgy0Dyj7x5FEIGgEAARO9/S31zTJmlq7DXxe/PR/lEphD+dX/qZCAPCXlwCgdBtAtwPCIrlN0H8wPQMIHgEAgdAl/qLaGvloUw+pbfG2z26bnvnXs/82EAD85TUAvLFytyysbDZV+JQV7pGxw/bJnrIBbBEgEAQA+GpQW53s/LxeltT0Me/C6TsTi+XY4QWm8o4A4C+vAcDtxUC5oKsC48qapdfgEtleVGa+AviDAABflDZUS011i6/H9my57rT+0q/I/bW/nSEA+MtrAFC3vVprPkaDHissHVgoO8uGmneAXQQAWKOX9JTUbZLlG7qFbpk/Fd331/1/WwgA/rIRAH67cIesr9tjqujQ7YGJI9qloXQYlw3BGgIAPEsO/B9u6CrbWoI5s2+Lzf1/RQDwl40AsGBtk/x5TZOpomdAYZscM2IfQQBWEACQtSgP/EnfGFMk00fb26YY1LBYynrsMhVsq93TR7aUnGAqb8J0HDBbBAHYQABAVgbXVUV64E/63rTDpLzU3jfQgu0fy1cKakwF2/7WOlha+x9lKm+i0AjoVDII1JSWC+AWAQCulDXWyOaNTZFo7nOCABAdtgKAilIjoBPaLDhkeJHUFg827wBnCABw5LDWBtmxYbt8XJsfA3+S7QCwt65SjimsNBVsW9oyRnqVDjeVd/kWAJJGlbTI4FElsqPA+7XWyH8EAKTVY2+r9N3yuby1IbdX9fpFTwDoSQBbdm/fLFMKVpoKti1uO0aK+w0wlXf5GgCSThmxW3YPO4L+AKRFAEBKQxo3yfJP2yO/z5/OPd8uMx/t2bmrSaZ2WWgq2PbXLidLnyI7FzaF7UpgP2h/wMSvdpPNxcPMO+BQBAAcQq/t3bWuJu+W+ztjOwCo8sa/SO+ubaaCLbv39ZSq4q+byo44BICko8qapHDEIGkpyM9VPGSPAIAv6bdlgyzb0F2aQvKQHr/Z3gJQXerWyLjCjaaCLatahsv+0jGmsiPftwAOVtS9XSZX7JPtZXZ6KJAfCABIKGvfIfXranP+WN6g2W4CVDsa6mVaj2Wmgi0L90ySw0r6mcqOuAWAJH0Mcb9RZVLb7TDzDnFHAIAMafhM3l3bLTaz/o78CACKC4HssXUBUEdxDQBKVwNOHN0um0uOMO8QZwSAGNMO/9bKallV28u8iye/AgCnAex5r3W89O4/xFR2VNXtkd8s3GGqeNMnDhZUDJU93QvMO8QRASCm+jfVyupPmvK6w98J21cBJ+3Zu0++2vwOzYAeafPfp71Okh7d7TytUeXDVcC26EmBsUcW8djhmCIAxNDALZXy53X2B70osv0woI4a67fJCT0/NBWyZfPsf1KUHwbkl5NHtUr9oBGmQpwQAGJEl/z3VG6KxfE+p/QEgJ4E8Evf+vdleM/tpoJbG9v6y85+x5nKrig+DjgIelywR8UwtgRihAAQE72bGmTz3xrks12F5h06uv60/lJSZG+JuaNdTa3ytf1vmwpu2bz4p6M4NwBmckSfFhnylRLZXcRVwnFAAIiBsoZqWbJ2v+yOYZe/E9+ZWCzHDrc/0CSxFeCeH0v/qmZnuzz6Vr2pkIqeEpgyuovUlgw175DPCAB5buiWv8mf1vUxFVLRwV9DgJ94SJBzH7ZUSPfSClPZ98bK3bKwstlUyOSfR+2S6kFfMRXyFQEgTxXKnsR+/4c1LPk7oX0A2g/gJ/oBMvNr3z8pTlcA23DM4JZEX4D5aN4h3xAA8pA2+21bVSOf7/JvWTvf6AqArgT4SY8GljYuJwSkoIN/XfFEq0f+OuL8f3YO79MqA8YNpjkwDxEA8oxe6Vu5sp5mP5eG9O0uV5/if+MTIaBzfg/+6g/LG+WDja2mglvaHFgxvh9XCOcZAkAe0U7/yk92xv5yn2z5eRqgIw0BXXZU0RPwd37u+Se17NkvD5jlf/2M7OilQRVH9uWEQB4hAOQJHfxXfLw7lvf52+LnpUCdaanbKJMK15gqvpa1jJHCUv+fUMflP3boCYEJR/UmBOQJAkAeGNJUI+9+3M7gb4FfzwZIZWdjkxwtS2N3ZbBe8fuRTJa+xf5fStXQtE8e/Us9s39LNARMPqqA64PzAAEg4kY0b5I3V5hvqAz+Vow0g/9lJgQESbcE+uxcJV8pqDHv8t/fWgfLrr7jfN3v74i9f/t6mxBw6gSRDb2GmXeIKgJAhDH4+yPoVYCkHTsbZfS+lXn7GGF9rO/aruPlsL7F5l0wdPave/+wjxAQfQSAiGLw90+/oq5y9df7+X4vQGd0NaB15xY5qsenebMtoMv9H+/5qhT0HRTYrD+Je//9RQiINgJABOmjfJd93Mrg76NpFb3kW+N7myo3dm/fLFMKVpoq+mw/z98pGv+CoSHgKBoDI4kAEDF0+wdHTwToyYBcyKeHCPn1UJ90uPM/WNoYyOmA6CEARAiDf7B0C0DvBtDPuTCoYXHk+wF0339LyQmmCtZjbzXI5p17TYWgEAKihwAQEXrD3/qV22XDrl7mHYIS1A2BnWmu2yiTI35PwNKWMdKr1P9z/h3R9Z87I/o0y8jx/bkxMCIIABHA3f65pc8I0GcFBK25abdM3r/IVNG1rNtJUlhYaKpg8LS/3OPZAdFBAIiA1lXr5dMGZv655EcIWF3TZvaqv1imHmxWG3r9fbuhsEdX876b1K1fLl8fWGu+Ej1/2VompSMnmp9ju7Ts2We+YkLNnv3m/Zd/zrb6LHTWr7N/5N5XS5qlYNxIUyHMCAAh162yikf6hoQGAA0CNriZqQ4sbJPpQ7bLmcO3JTquw0xPpry2cYAs2NxftrY4G9htnLjQMPXckp2mQljoo4TbK8oF4UUACLHhtevkjbXevjHCLq8hQK+j1YEqm7PpOvhPGbBDzi+vkYG9wnVHwNbmnvJ81WB5b9thiRDglt7AqKcusmm4ZOYfXjNGt0hNWbkgnAgAITW0cZP8aYX7b6TwX7YzVl0K/83ChkQI8Gpkn2YZ32+XTB+8XUYWO1tJsG19Yy9ZUNNfVtb3kfUWmlN18P/etBKzLeD8zz2Df/jpRUG1xYNNhbAhAIQQx/3CT1cBdDXAKT8HKt0i0DDwtbIdUm6CgV+rAzrLrzID/V9rD0sM+k6X+N3SX1f99c3Ez19T2MPxwPAiAIQMHf/Roc1rOljpzDUVne3PXbkrMVgF6aiSXVJuVgY0HOhqgdKQ4IQO7kpn9TrIV5mZ/scNB74WFA0A+mubipseCuQeJwPCiQAQMj0rK+X9Gv8fkQo79J6A7xxb3OmytT6IRvf7w3ohTTIY6EAfRvprq30BJUVfPD8g7L+mSO24wU3SVlFhKoQFASBEBtdWyby1dPxHja4AfGN0kUyt+GIgrarbI8+agUpXAJA9/bW90IQAfTojv6bRd8roPVJXNtxUCAMCQEjwgJ/oS24JLFrfzENoLNMtgaC3UWCfnmThwUHhQQAIAd33r1u1WT7bxew/6nTGygwVSO2IPi1SOm4I/QAhQAAIgaIN6+W9TV8sHwNAPpsyrFmaRow0FXKJAJBjZY018uYKUwBAjHA/QO4RAHKoT3uTfLSsnvP+AGJH7wc4elI/2dWNU0+5QgDIpbWV8nEtf/gBxNNRZU0iozkamCsEgBwpa6iWN1d1NRUAxNe0sSI7+7EVkAsEgBzQrv8179ey9A8g9nQrYMxxZZwKyAECQA703fA3Wbgp2KtVASCspg3bJTtHfMVUCBIBIGB0/QPAoaZN6C47i8tMhaAQAAJUKHtk60ebuPAHAA6iFwQNPHqYtEgP8w5BIAAEqN+WDfL2Ova5AKAzU0a0SdOwI0yFIBAAAsKZfwBITxsCuRsgOASAgHRbVyUfbmHpHwDSOWZQi7SPKhf4jwAQgEFtdTJ/6R5TAQAyOW1yD9nSs9RU8BMBIADNq6pkXQOzfwBwYlRJi/QaVy7wFwHAZ0MbN8mfVrDvDwBu/POEdqkuHmYq+IUA4LOdH1Vx7A8AXBpT0iQ9xlWYCn4hAPiob221LFzb1VQAALdYBfAXAcBHNe9vlNoWLrUAgGywCuAvAoBPmP0DgHesAviHAOCTPasqZU0Dl1kAgBesAviHAOADOv8BwB5WAfxBAPBB66r18mlDL1MBALziXgB/EAAs69tYKwtX7DUVAMCWr0/sLtuLeFywTQQAy3quq5T3t7D3DwA2HTeoSdpG0QtgEwHAosLW3bJ0WaOpAAC2TZ5ULC0FvU0FGwgAFvXftE7+soE/nADgh6+P2C3bh40yFWwgAFhSKHtk1Xtbed4/APikqHu7VEzhNIAtBABLuPgHAPw3bfQ+2Vk21FTwigBgCUf/AMB/HAm0hwBgAc1/ABAcmgHtIABY0HfTelm4gdk/AARh2ohm2TlspKngBQHAgi3vfybbWnqaCgDgtwGFbTLouCNMBS8IAB6VNdbImytMAQAIzLSxIjv7DTYVskUA8Kjbuir5cEuhqQAAQTlmUIu0jyoXZI8A4FHle5s4+w8AAeNOAO8IAB70ra+RhatNAQAI3KkTRGqL2QbIFgHAA5b/ASB3pgxrlqYRnAbIFgHAA7r/ASB3OA3gDQEgS/2bauUvy3nuPwDk0tcndpftRWWmglsEgCwVbKiSZZtY/geAXOJSoOwRALLU8NEG+XxXgakAALlyeJ9WKTl6hKngFgEgC33am2TxX3eaCgCQayd8ra/s6lZkKrhBAMgCj/4FgPDgEcHZIQBkoee6Snl/C2kTAMKAWwGzQwDIAsf/ACA8ygr3yODjhpsKbhAAXOLZ/wAQPpMnFUtLQW9TwSkCgEvs/wNA+NAH4B4BwKWiDevlvU29TAUACItJw1qkdUS5wDkCgEuc/weA8OE+APcIAC4Uyh5ZurDOVACAsJk8rVRapIep4AQBwIW+jbWycAX3/wNAGE2b0F12FvNcAKcIAC4UbfpM3tvA8T8ACKOpFXukcTDHAZ0iALjA8/8BILy4EMgdAoALravWy6cNnAAAgDAaVdIivcaVC5whALjw8cIa8xEAEFZHTRtsPsIJAoBDh7U2yLvLWkwFAAirEycVyo6CElMhEwKAQ2WNNfLmClMAAELr1AkitcWDTYVMCAAOcQIAAMJvyog2aRp2hKmQCQHAoYINVbJsU6GpAABhxZXAzhEAHGpeVSXrGggAABBmnARwjgDgEM8AAIDw45kAzhEAHOIIIABEA0cBnSEAONBjb6t88F69qQAAYXfslH6ypzsrtpkQABzgIUAAEB08FMgZAoADBAAAiA4CgDMEAAf61lbLwrVdTQUACLtpY0V29qMPIBMCgANcAgQA0cFlQM4QABwgAABAdBAAnCEAOEAAAIDoIAA4QwBwgFsAASA6jiprEhldYSqkQwBwgAAAANHBdcDOEAAcIAAAQHQQAJwhADhAAACA6CAAOEMAcIAAAADRQQBwhgDgAAEAAKKDAOAMAcABAgAARAcBwBkCgAMEAACIDgKAMwQABwgAABAdBABnCAAOEAAAIDoIAM4QABwgAABAdBAAnCEAOEAAAIDoIAA4QwBwgAAAANFBAHCGAOAAAQAAooMA4AwBwAECAABEBwHAGQKAAwQAAIgOAoAzBAAHCAAAEB0EAGcIAA4QAAAgOggAzhAAHCAAAEB0EACcIQA4QAAAgOggADhDAHCAAAAA0UEAcIYA4AABAACigwDgDAHAAQIAAEQHAcAZAoADBAAAiA4CgDP/P/XW7SxRvEwoAAAAAElFTkSuQmCC",
            dob: new Date("1990-01-01"),
            countryOfBirth: "Ireland",
            gender: "male",
            maritalStatus: "married",
            nationality: "irish",
            ppsn: "9292929292",
            address: {
              create: {
                city: "Dublin",
                country: "Ireland",
                postCode: "D09 CC92",
                streetNo: "Station Mews, Lindsay Grove",
                coordinates: {
                  create: {
                    lat: 53.36530800259964,
                    lng: -6.270538831433026,
                  },
                },
              },
            },
            contact: {
              create: {
                email: "slindsay@silverback.ie",
                firstName: "Shane",
                lastName: "Lindsay",
                phoneNumber: "+353 83 179 8318",
                companyID: companyPrisma[0].id,
                jobPosition: "Business Development Executive",
              }
            },
            office: {
              connect: {
                name: "SilverBack Dublin"
              }
            },
            
          }
        }
       }
    })
  },
  {
    maxWait: 5000, // default: 2000
    timeout: 1000000, // default: 5000
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
