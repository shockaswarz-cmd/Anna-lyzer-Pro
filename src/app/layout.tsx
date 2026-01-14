import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Providers } from "@/components/Providers";
import { FeedbackButton } from "@/components/feedback/FeedbackButton";
import { Analytics } from "@/components/analytics/Analytics";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anna Lyzer - Property Deal Analysis",
  description: "Professional deal sourcing and analysis for UK property investors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-slate-950 text-white`}
      >
        <Providers>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 min-h-screen transition-all duration-300">
              {children}
            </main>
          </div>
          <FeedbackButton />
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}

