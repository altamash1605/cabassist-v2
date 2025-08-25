import "./globals.css";
import { Inter } from "next/font/google";
import AppToaster from "@/components/AppToaster";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-neutral-950 text-neutral-100">
        {children}
        <AppToaster />
      </body>
    </html>
  );
}
