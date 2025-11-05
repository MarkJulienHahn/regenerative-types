import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/_UI/nav";

export const metadata: Metadata = {
  title: "Regeneration Platform",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        {children}
      </body>
    </html>
  );
}
