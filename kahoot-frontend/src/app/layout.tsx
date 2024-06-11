import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "react-hot-toast";
import { SuspenseProvider } from "@/components/providers/suspense-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kahoot Clone",
  description: "Kahoot Clone made with Next.js and Spring Boot",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SuspenseProvider>
          <Toaster />
          <NextUIProvider>{children}</NextUIProvider>
        </SuspenseProvider>
      </body>
    </html>
  );
}
