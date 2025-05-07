"use client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { useState } from "react";

export default function QueryWrapper({ children }: { children: ReactNode }){
    const [client, setClient] = useState(() => new QueryClient());

    return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}