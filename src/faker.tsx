import { faker } from "@faker-js/faker";

export function createRandomMessages() {
  return {
    id: faker.string.uuid(),
    read: faker.datatype.boolean(0.2),
    user: {
      name: faker.person.fullName(),
      dept: faker.person.jobType(),
      avatar: faker.internet.avatar(),
    },
    message: faker.lorem.words(),
    date: faker.date.recent(),
  };
}

export function createRandomUser() {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    dept: faker.person.jobType(),
    avatar: faker.internet.avatar(),
    color: faker.helpers.arrayElement(['success', 'error', 'warning', 'primary', 'secondary']) as 'success' | 'error'| 'warning' | 'primary'| 'secondary'
  };
}

export function createRandomOrder(){
  return {
    id: faker.string.uuid()
  }
}

export function createRandomProjects() {
  return {
    id: faker.string.uuid(),
    name: `${faker.airline.airline().iataCode}${faker.airline.flightNumber({ addLeadingZeros: true })}`,
    company: faker.company.name(),
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
      "Apartments" |
      "Battery Factory" |
      "Data Centre" |
      "Hospital" |
      "Mine" |
      "Museum" |
      "Paper Mill" |
      "Pre-Cast Factory" |
      "School" |
      "Shopping Centre" |
      "Windfarm"
    ,
    address: {
      lat: faker.location.latitude({
        max: 65,
        min: 40,
      }),
      lng: faker.location.longitude({
        max: 32,
        min: -8
      }),
    }
  }
}
