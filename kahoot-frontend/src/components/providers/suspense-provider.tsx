"use client";

import { Suspense } from "react";

export function SuspenseProvider({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
