import "./globals.css";
import { Inter } from "next/font/google";
import AppToaster from "@/components/AppToaster"; // your toaster wrapper
import SupabaseListener from "@/components/SupabaseListener"; // ⬅️ add this

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = { title: "Auth", description: "Login / Sign up" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-neutral-950 text-neutral-100 overflow-x-hidden">
        {children}
        <SupabaseListener />   {/* ⬅️ keeps server cookies in sync */}
        <AppToaster />
      </body>
    </html>
  );
}
