import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/Sidebar";
import WhoToFollow from "@/components/WhoToFollow";
import NotificationBar from "@/components/NotificationBar";
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes'
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cirqle",
  description: "The Best Social Media Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
        appearance={{
        baseTheme: [dark, neobrutalism],
        variables: { colorPrimary: 'blue' },
        signIn: {
          baseTheme: [shadesOfPurple],
          variables: { colorPrimary: 'green' },
        },
      }}
    >
      <Toaster/>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[var(--bg-color)]`}
        >
          <Navbar/>
          <div className="flex justify-center">

          <div className="flex w-[90%] gap-3">
          <Sidebar/>
          <div className="flex-1 ">
        {children}
          </div>
            <NotificationBar/>
          </div>
          </div>
      </body>
    </html>
        </ClerkProvider>
  );
}
