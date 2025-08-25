import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "sonner"; // ⬅️ add this

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: "Auth",
  description: "Login / Sign up"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-neutral-950 text-neutral-100 selection:bg-neutral-200 selection:text-neutral-900">
        {children}
        {/* Global toast portal */}
        <Toaster position="top-right" richColors theme="dark" closeButton />
      </body>
    </html>
  );
}
