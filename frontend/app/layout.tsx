import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Chairul Ikhsan | Software Developer & AI/ML Engineer",
    template: "%s | Chairul Ikhsan",
  },
  description: "Portfolio Chairul Ikhsan - Software Developer, AI/ML Engineer, dan UI/UX Designer. Mahasiswa Sistem Informasi Kota Cerdas di Politeknik Negeri Indramayu. Berbasis di Majalengka, Jawa Barat.",
  keywords: [
    "Chairul Ikhsan",
    "Software Developer",
    "Software Engineer",
    "AI Engineer",
    "ML Engineer",
    "UI/UX Designer",
    "Fullstack Developer",
    "Web Developer",
    "React Developer",
    "Next.js Developer",
    "Laravel Developer",
    "Politeknik Negeri Indramayu",
    "Sistem Informasi Kota Cerdas",
    "Majalengka",
    "Jawa Barat",
    "Portfolio",
  ],
  authors: [{ name: "Chairul Ikhsan", url: "https://www.chairulikhsan.my.id" }],
  creator: "Chairul Ikhsan",
  publisher: "Chairul Ikhsan",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "manifest",
        url: "/site.webmanifest",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.chairulikhsan.my.id",
    siteName: "Chairul Ikhsan | Portfolio",
    title: "Chairul Ikhsan - Software Developer & AI/ML Engineer",
    description: "Portfolio Chairul Ikhsan - Software Developer, AI/ML Engineer, UI/UX Designer. Mahasiswa Sistem Informasi Kota Cerdas, Politeknik Negeri Indramayu.",
    images: [
      {
        url: "https://www.chairulikhsan.my.id/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Chairul Ikhsan - Software Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chairul Ikhsan - Software Developer & AI/ML Engineer",
    description: "Portfolio Chairul Ikhsan - Software Developer, AI/ML Engineer, UI/UX Designer",
    images: ["https://www.chairulikhsan.my.id/og-image.jpg"],
    creator: "@chairulikhsan",
  },
  alternates: {
    canonical: "https://www.chairulikhsan.my.id",
  },
  category: "technology",
  classification: "Personal Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={cn("antialiased", poppins.variable, geist.variable)}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Geo Tags */}
        <meta name="geo.region" content="ID-JB" />
        <meta name="geo.placename" content="Majalengka" />
        <meta name="geo.position" content="-6.836144;108.228698" />

        {/* Author */}
        <meta name="author" content="Chairul Ikhsan" />

        {/* Business/Profile Info */}
        <meta name="profile:first_name" content="Chairul" />
        <meta name="profile:last_name" content="Ikhsan" />
        <meta name="profile:username" content="chairulikhsan" />

        {/* Job Title */}
        <meta name="person:job_title" content="Software Developer & AI/ML Engineer" />
      </head>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}