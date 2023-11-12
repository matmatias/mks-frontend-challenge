"use client";

import { Providers } from "@/providers";
import { Header } from "./_components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{
        display: "flex",
        flexDirection: "column",
        gap: "3rem",
      }}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
