import { FetchCreateContextFnOptions, fetchRequestHandler} from '@trpc/server/adapters/fetch';
import {appRouter} from '@/server/routers/main';

const handler = (request: Request) => {
    return fetchRequestHandler({
        endpoint: '/api/trpc',
        req: request,
        router: appRouter,
        createContext: function (opts: FetchCreateContextFnOptions): object | Promise<object> {
            // empty context
            return {}
        }
    });
}

export const GET = handler;
export const POST = handler;