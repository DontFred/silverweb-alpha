import { createRandomDepartment } from "@/faker";
import { el, faker } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.$transaction(async (tx) => {
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
          name: faker.airline.airport().iataCode + faker.airline.flightNumber,
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[1].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[2].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[3].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[4].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[5].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[6].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[7].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[8].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[9].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },

        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[10].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[11].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[12].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[13].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[14].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[15].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[16].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[17].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[18].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[19].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[20].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[21].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[22].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[23].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[24].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[25].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[26].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[27].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[28].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[29].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[30].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
        },
        {
          name: faker.airline.airport().iataCode + faker.airline.flightNumber(),
          typeID:
            projectTypesPrisma[faker.number.int(projectTypesPrisma.length - 1)]
              .id,
          company: faker.company.name(),
          addressID: addressPrisma[31].id,
          comment: faker.word.words({ count: { min: 4, max: 20 } }),
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
                  faker.number.int(trainingsCoursePrisma.length-1)
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
                  faker.number.int(trainingsCoursePrisma.length-1)
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
                  faker.number.int(trainingsCoursePrisma.length-1)
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
                  faker.number.int(trainingsCoursePrisma.length-1)
                ].id,
            },
          },
          EmergencyContact: {
            create: {
              contactID:
                contactPrisma[
                  faker.number.int({
                    min: companyPrisma.length - 4,
                    max: companyPrisma.length-1,
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
                  faker.number.int(trainingsCoursePrisma.length-1)
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
                  faker.number.int(trainingsCoursePrisma.length-1)
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
                  faker.number.int(trainingsCoursePrisma.length-1)
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
                  faker.number.int(trainingsCoursePrisma.length-1)
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
          employeeID:
            employeePrisma[2].id,
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
          employeeID:
            employeePrisma[3].id,
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
          employeeID:
            employeePrisma[4].id,
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
      [{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      },{
        orderCode:
          faker.airline.recordLocator() +
          faker.airline.airline().iataCode +
          faker.airline.flightNumber({ addLeadingZeros: true }),
        answered: true,
        commentToGeneralInformation: faker.word.words(20),
        clientID:
          clientPrisma[faker.number.int(clientPrisma.length - 1)].id,
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
        payTerm: faker.helpers.arrayElement([
          "weekly",
          "monthly",
          "advance",
        ]),
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
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
              },
              {
                orderNo: faker.number.int(10),
                contactID:
                  contactPrisma[
                    faker.number.int(contactPrisma.length - 1)
                  ].id,
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
                id: jobRolePrisma[
                  faker.number.int(jobRolePrisma.length - 1)
                ].id,
              },
            },
          },
        },
        ProjectHistory: {
          createMany: {
            data: [
              {
                employeeID:
                  employeePrisma[
                    faker.number.int(employeePrisma.length - 1)
                  ].id,
                jobRoleID:
                  jobRolePrisma[faker.number.int(jobPrisma.length - 1)]
                    .id,
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
                        faker
                          .system.commonFileName()
                          .replace(/\.[^/.]+$/, "") + ".svg",
                  }
              }
          }
        },
        WorkPerformed: {
          createMany: {
              data: [
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
                  {workTypeID: workTypePrisma[faker.number.int(workTypePrisma.length -1)].id},
              ]
          }
        },
        WorkerRequired: {
          createMany: {
              data: [
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
                  {jobRoleID: jobRolePrisma[faker.number.int(jobRolePrisma.length -1)].id, quantity: faker.number.int(20)},
              ]
          }
        }
      }].map(
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
        Array.from({length: 50}).map(async (_,idx)=> await tx.contactComment.upsert({
            where: {commentID: commentPrisma[idx].id},
            update: {},
            create: {
                commentID: commentPrisma[idx].id,
                contactID: contactPrisma[faker.number.int(contactPrisma.length - 1)].id,
            }
        }))
    )

    const companyCommentPrisma = await Promise.all(
        Array.from({length: 50}).map(async (_,idx)=> await tx.companyComment.upsert({
            where: {commentID: commentPrisma[idx+50].id},
            update: {},
            create: {
                commentID: commentPrisma[idx+50].id,
                companyID: companyPrisma[faker.number.int(companyPrisma.length - 1)].id,
            }
        }))
    )
  });

  //   const alice = await prisma.user.upsert({
  //     where: { email: 'alice@prisma.io' },
  //     update: {},
  //     create: {
  //       email: 'alice@prisma.io',
  //       name: 'Alice',
  //       posts: {
  //         create: {
  //           title: 'Check out Prisma with Next.js',
  //           content: 'https://www.prisma.io/nextjs',
  //           published: true,
  //         },
  //       },
  //     },
  //   })
  //   const bob = await prisma.user.upsert({
  //     where: { email: 'bob@prisma.io' },
  //     update: {},
  //     create: {
  //       email: 'bob@prisma.io',
  //       name: 'Bob',
  //       posts: {
  //         create: [
  //           {
  //             title: 'Follow Prisma on Twitter',
  //             content: 'https://twitter.com/prisma',
  //             published: true,
  //           },
  //           {
  //             title: 'Follow Nexus on Twitter',
  //             content: 'https://twitter.com/nexusgql',
  //             published: true,
  //           },
  //         ],
  //       },
  //     },
  //   })
  //   console.log({ alice, bob })
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
