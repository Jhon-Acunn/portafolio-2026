import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Jhonacunn | Full-Stack Developer",
    template: "%s | Jhonacunn",
  },
  description:
    "Crafting digital experiences at the intersection of design and engineering. Full-Stack Developer specializing in React, Next.js, and modern web technologies.",
  keywords: [
    "Full-Stack Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "Jhonacunn",
  ],
  authors: [{ name: "Jhonacunn", url: "https://github.com/Jhon-Acunn" }],
  creator: "Jhonacunn",
  metadataBase: new URL("https://github.com/Jhon-Acunn/portafolio-2026"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Jhonacunn Portfolio",
    title: "Jhonacunn | Full-Stack Developer",
    description:
      "Crafting digital experiences at the intersection of design and engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jhonacunn | Full-Stack Developer",
    description:
      "Crafting digital experiences at the intersection of design and engineering.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
