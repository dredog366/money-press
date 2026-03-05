import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FaceTea — Tea-Powered Skincare",
  description: "Premium tea-infused skincare products delivered to your door. Natural, effective, and eco-conscious.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSans.className} ${dmSerif.className}`}>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
