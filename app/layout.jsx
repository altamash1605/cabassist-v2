import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

export const metadata = {
  title: "Auth",
  description: "Login / Sign up"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-neutral-950 text-neutral-100 selection:bg-neutral-200 selection:text-neutral-900">
        {children}
      </body>
    </html>
  );
}
