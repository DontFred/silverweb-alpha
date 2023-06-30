import { appRouter } from '@/server/routers/main';

/** This is a React Server Component */
    const caller = appRouter.createCaller({});

/**
 * trpc client for Client Server components ("use server")
 *
 */
const trpc = caller;

export { trpc }