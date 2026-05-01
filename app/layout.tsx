import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskBridge Studio",
  description:
    "Reliable admin, documentation, scheduling, and tech-savvy operations support for growing businesses.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}