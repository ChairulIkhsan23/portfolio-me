import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Portfolio - Software Developer",
  description:
    "Personal portfolio showcasing projects, experience, education, and certificates.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn("antialiased", poppins.variable, geist.variable)}
    >
      <body className="bg-black text-white antialiased">
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}