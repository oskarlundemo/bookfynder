"use client"

import {QueryClientProvider, QueryClient} from "@tanstack/react-query";
import {ReactNode, useState} from "react";

interface Props {
    children: ReactNode;
}


export default function QueryProvider ({children}:Props) {
    const [queryClient] = useState(() => new QueryClient());

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}