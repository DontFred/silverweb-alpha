'use client';

import { trpc as trpcCS } from "@/server/trpc";

/**
 * trpc client for Client Side components ("use client")
 *
 */
const trpc = trpcCS;

export { trpc }