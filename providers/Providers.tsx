"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { ChartProvider } from "./Chart";

interface Props {
  children: ReactNode;
}

const client = new QueryClient();
export function Providers({ children }: Props) {
  return (
    <ChartProvider>
      <QueryClientProvider client={client}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ChartProvider>
  );
}
