"use client"
import { api } from "@/lib/axiosConfig";
import React from "react";
import { SWRConfig } from "swr";
  
const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return <SWRConfig value={{
    // @ts-ignore
    fetcher:(...args) => api(...args).then((res) => res.data),
  }}>{children}</SWRConfig>;
};

export default SWRProvider;
