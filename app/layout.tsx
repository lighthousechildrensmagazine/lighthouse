import type { Metadata } from "next";
import { Outfit, Love_Ya_Like_A_Sister } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const loveYaLikeASister = Love_Ya_Like_A_Sister({
  weight: "400",
  variable: "--font-sister",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lighthouse Children's Magazine",
  description: "A vibrant school magazine for students aged 10-14",
  icons: {
    icon: "/favicon3.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} ${loveYaLikeASister.variable} antialiased`}
      >
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
