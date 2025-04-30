import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import ClientProviders from "@/components/ClientProviders";
import { Analytics } from "@vercel/analytics/react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DevChat - Transform your online presence: AI powered chatbots for developers",
  description: "Revolutionize your portfolio: AI-Driven chatbots for instant answers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <MobileBar /> */}
        <ClientProviders>
          {children}
          <Analytics />
        </ClientProviders>
      </body>
    </html>
  );
}
