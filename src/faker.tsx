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
