import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PageTransitionProvider } from "@/components/page-transition";
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
  title: "GSAP Lab",
  description:
    "A collection of GSAP experiments and components to exhibit expertise in web animations and interactive UI elements.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased is-booting`}
    >
      <body className="min-h-full flex flex-col bg-stone-950 text-stone-100">
        {/* Runs before paint — keeps boot cover logic honest even if JS is slow */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('is-booting');`,
          }}
        />
        <PageTransitionProvider>{children}</PageTransitionProvider>
      </body>
    </html>
  );
}
