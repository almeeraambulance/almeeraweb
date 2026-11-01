import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsAppFloating from "../components/WhatsAppFloating";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-jakarta",
});

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
  variable: "--font-script",
});

export const metadata: Metadata = {
  title: "Almeera | Layanan Ambulance & Mobil Jenazah",
  description:
    "Pusat evakuasi ambulans darurat dan pertolongan pertama profesional.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${jakarta.variable} ${dancingScript.variable} font-sans`}
    >
      <body className="antialiased flex flex-col min-h-screen bg-[#f5f2eb] text-[#1a1a1a] overflow-x-hidden m-0 p-0 relative">
        <Header>{children}</Header>
        <Footer />
        <WhatsAppFloating />
      </body>
    </html>
  );
}
