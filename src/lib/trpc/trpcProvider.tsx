"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import { trpc as TRPC } from "@/server/trpc";
import SuperJSON from "superjson";

export const TrpcProvider: React.FC<{ children: React.ReactNode }> = (p) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
  TRPC.createClient({
      transformer: SuperJSON,
      links: [
        httpBatchLink({
          url: process.env.NEXT_PUBLIC_HOST_DOMAIN + "/api/trpc",
        }),
      ],
    })
  );
  return (
    <TRPC.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        {p.children}
      </QueryClientProvider>
    </TRPC.Provider>
  );
};
