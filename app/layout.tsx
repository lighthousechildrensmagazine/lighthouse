import type { Metadata } from "next";
import { Outfit, Patrick_Hand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingVideo from "@/components/LoadingVideo";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const patrickHand = Patrick_Hand({
  weight: "400",
  variable: "--font-patrick-hand",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lighthouse - The Voice of Your School",
  description: "A vibrant school magazine for students aged 10-14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${patrickHand.variable} font-sans antialiased`}
      >
        <LoadingVideo />
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
