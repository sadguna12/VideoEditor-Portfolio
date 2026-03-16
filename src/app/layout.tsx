import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cinematic Video Editing | Portfolio",
  description: "Turning ideas into visual stories.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.className} bg-background text-foreground antialiased overflow-x-hidden`}>
        <ScrollProgress />
        <Navbar />
        <main className="min-h-screen overflow-x-hidden">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
