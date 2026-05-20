import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import { LanguageProvider } from "@/app/providers/LanguageProvider";
import { Analytics } from "@/app/components/analytics/Analytics";
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
    "Creando experiencias digitales en la intersección del diseño y la ingeniería. Desarrollador Full-Stack especializado en React, Next.js y tecnologías web modernas.",
  keywords: [
    "Desarrollador Full-Stack",
    "React",
    "Next.js",
    "TypeScript",
    "Web Development",
    "Portfolio",
    "Jhonacunn",
  ],
  authors: [{ name: "Jhonacunn", url: "https://github.com/Jhon-Acunn" }],
  creator: "Jhonacunn",
  metadataBase: new URL("https://jhonacunn.dev"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Portafolio de Jhonacunn",
    title: "Jhonacunn | Desarrollador Full-Stack",
    description:
      "Creando experiencias digitales en la intersección del diseño y la ingeniería.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jhonacunn | Desarrollador Full-Stack",
    description:
      "Creando experiencias digitales en la intersección del diseño y la ingeniería.",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon-32x32.png",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Jhonacunn",
    statusBarStyle: "black-translucent",
  },
  other: {
    "theme-color": "#07090D",
    "apple-mobile-web-app-capable": "yes",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Prevent flash of wrong theme before React hydrates */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var t = localStorage.getItem('portfolio-theme');
                  if (!t) t = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
                  document.documentElement.setAttribute('data-theme', t);
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfilePage",
              mainEntity: {
                "@type": "Person",
                name: "Jhonacunn",
                jobTitle: "Desarrollador Full-Stack",
                url: "https://jhonacunn.dev",
                sameAs: [
                  "https://github.com/Jhon-Acunn",
                  "https://linkedin.com/in/jhonacunn",
                ],
              },
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        {/* Skip to main content link — visible only on focus for keyboard users */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:bg-[#00D4FF] focus:text-black focus:rounded-lg focus:text-sm focus:font-medium focus:outline-none"
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <LanguageProvider>
            <Analytics />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
