import { PrismaClient } from '@prisma/client';
import {initTRPC} from '@trpc/server';
import SuperJSON from 'superjson';
import { z } from 'zod';
const prisma = new PrismaClient()

const t = initTRPC.create({
    transformer: SuperJSON,
});

// this is our data store, used to respond to incoming RPCs from the client

interface User {
    id: string;
    name: string;
}
const userList: User[] = [
    {
        id: '1',
        name: 'KATT',
    },
    {
        id: '2',
        name: 'Foo',
    },
];

// this is our RPC API
export const appRouter = t.router({
    userById: t.procedure
        .input(z.number())
        .query((req) => {
            const { input } = req;
            return userList.find((u) => parseInt(u.id) === input);
        }),
    getAllProjects: t.procedure.query(async () => {
        console.log('getAllProjects')
        return await prisma.project.findMany({
            include: {
                address: {
                    include: {
                        coordinates: true
                    }
                },
                type: true
            }
        })
    })
});

export type AppRouter = typeof appRouter;