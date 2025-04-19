import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import MobileBar from "@/components/MobileBar";
import React from "react";
import { UserProvider } from "@/components/UserContext";
import { SessionProvider } from "next-auth/react";
import ClientProviders from "@/components/ClientProviders";

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
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {/* <MobileBar /> */}
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
