"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HeroSection() {
  const menuItems = [
    {
      title: "Ambulance & Mobil Jenazah",
      href: "/",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Kargo Jenazah",
      href: "/",
      icon: "/assets/icons/peti_jenazah.svg",
    },
    {
      title: "Pengurus Jenazah",
      href: "/",
      icon: "/assets/icons/kedatangan_jenazah.svg",
    },
    {
      title: "Pelayanan Pemakaman",
      href: "/",
      icon: "/assets/icons/pelayanan_pemakaman.svg",
    },
  ];

  return (
    <section className="relative w-full text-white overflow-visible mb-6 sm:mb-20 lg:mb-16">
      {/* banner image */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-full h-[480px] sm:h-[420px] md:h-[500px] lg:h-[620px]"
      >
        <Image
          src="/assets/banner.jpg"
          alt="Banner Almeera Desktop"
          fill
          className="object-cover object-center hidden sm:block"
          priority
        />
        <Image
          src="/assets/banner_mobile.jpg"
          alt="Banner Almeera Mobile"
          fill
          className="object-cover object-center block sm:hidden"
          priority
        />
      </motion.div>

      {/* menu cards */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 relative sm:absolute sm:left-0 sm:right-0 -mt-20 sm:mt-0 sm:-bottom-28 lg:-bottom-36 z-30">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
          className="bg-[#b81424] text-white rounded-lg shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-red-500/40"
        >
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 sm:p-8 flex flex-row lg:flex-col items-center lg:items-center justify-start lg:justify-between text-left lg:text-center min-h-[auto] lg:min-h-[220px] hover:bg-[#9c0e1b] transition-colors duration-200 group gap-4 lg:gap-0"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 relative shrink-0 mb-0 lg:mb-2 filter brightness-0 invert">
                <Image
                  src={item.icon}
                  alt={item.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col items-start lg:items-center w-full">
                <span className="font-bold text-base sm:text-lg leading-snug my-0 lg:my-2">
                  {item.title}
                </span>
                <span className="text-sm md:text-base font-bold text-white underline underline-offset-4 group-hover:opacity-90 mt-1 lg:mt-0">
                  Selengkapnya →
                </span>
              </div>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
