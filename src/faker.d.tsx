import { createRandomMessages, createRandomProjects, createRandomUser } from "./faker";

export type MessageProps = ReturnType< typeof createRandomMessages>;

export type UserProps = ReturnType<typeof createRandomUser>;

export type ProjectProps = ReturnType<typeof createRandomProjects>;