import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from './routers/main';
export const trpc = createTRPCReact<AppRouter>();