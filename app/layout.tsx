import "./globals.css";
import type { Metadata } from "next";
import ClientShell from "../components/ClientShell";

export const metadata: Metadata = {
  title: "Beyond Limits — Portfolio",
  description: "A cinematic developer portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
