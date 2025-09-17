import "./globals.css";
import { Inter } from "next/font/google";
import AppToaster from "@/components/AppToaster"; // your toaster wrapper
import SupabaseListener from "@/components/SupabaseListener"; // ⬅️ add this
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = { title: "CabAssist", description: "CSV Generator" };

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-neutral-950 text-neutral-100 overflow-x-hidden">
        <NextTopLoader
          color="#3b82f6"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={300}
          shadow="0 0 10px #3b82f6, 0 0 5px #3b82f6" // glowing effect
        />
        {children}
        <SupabaseListener /> {/* ⬅️ keeps server cookies in sync */}
        <AppToaster />
      </body>
    </html>
  );
}
