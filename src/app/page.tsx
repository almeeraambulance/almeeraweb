import Link from "next/link";
import Image from "next/image";
import HeroSection from "../components/HeroSection";
import ServicingSection from "../components/ServicingSection";
import StatsSection from "../components/StatsSection";
import Location from "../components/Location";
import NewsroomSection from "../components/NewsroomSection";


export default function HomePage() {
  return (
    <div className="bg-[#f5f2eb] text-[#1a1a1a] font-sans antialiased relative">
      {/* Hero Section & Banner Merah */}
      <HeroSection />

      {/* Spacer */}
      <div className="h-32 md:h-40 bg-[#f5f2eb]"></div>

      {/* Intro Sub-Banner */}
      <section className="py-1 md:py-10 px-6 max-w-5xl mx-auto text-center">
        <p className="text-gray-800 text-2xl md:text-3xl leading-relaxed font-normal">
          Selamat datang di Almeera Sejahtera Abadi, kami adalah
          penyedia layanan transportasi medis dan kedukaan swasta yang siap membantu, kapan pun Anda butuhkan.
        </p>
      </section>

      {/* Servicing New South Wales */}
      <ServicingSection />

      {/* At A Glance & Impact */}
      <StatsSection />

      {/* Location (Formerly Get Involved) */}
      <Location />

      {/* Latest Newsroom */}
      <NewsroomSection />


    </div>
  );
}
