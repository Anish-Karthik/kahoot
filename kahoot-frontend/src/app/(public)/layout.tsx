import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen items-center justify-between p-12 h-full w-full">
      {children}
      <div className="bg-image fixed inset-0">
        <Image
          src="/background.png"
          alt="Background Image"
          layout="fill"
          objectFit="cover"
        />
      </div>
    </main>
  );
}
