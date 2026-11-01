"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";
import FormModal from "../components/FormModal";

export default function ServicingSection() {
  // refs
  const containerRef = useRef<HTMLDivElement>(null);

  // state
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });
  const [maxScroll, setMaxScroll] = useState(0);
  const [currentDot, setCurrentDot] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");

  const x = useMotionValue(0);
  const totalDots = 4;

  // cards data
  const cards = [
    {
      title: "Pengiriman Jenazah",
      desc: "Layanan pengurusan dan pengiriman jenazah secara profesional untuk rute dalam negeri maupun luar negeri (international repatriation).",
      img: "/assets/ambulance.jpeg",
      icon: "/assets/icons/pengiriman_jenazah.svg",
    },
    {
      title: "Pengiriman Abu Jenazah",
      desc: "Prosedur penanganan dan pengiriman abu jenazah yang aman, legal, serta terpercaya baik domestik maupun internasional.",
      img: "/assets/abu.jpeg",
      icon: "/assets/icons/pengiriman_abu.svg",
    },
    {
      title: "Pengurusan Jenazah",
      desc: "Pengurusan dokumen, kepabeanan, dan penjemputan kedatangan jenazah dari luar atau dalam negeri secara tuntas.",
      img: "/assets/kedatangan.jpeg",
      icon: "/assets/icons/kedatangan_jenazah.svg",
    },
    {
      title: "Pelayanan Pemakaman",
      desc: "Pengaturan prosesi pemakaman lengkap dengan pendampingan penuh untuk meringankan keluarga yang ditinggalkan.",
      img: "/assets/pelayanan.jpeg",
      icon: "/assets/icons/pelayanan_pemakaman.svg",
    },
    {
      title: "Peti Jenazah",
      desc: "Penyediaan berbagai pilihan peti jenazah berkualitas tinggi, mulai dari standar hingga kelas khusus sesuai kebutuhan.",
      img: "/assets/cargo.jpg",
      icon: "/assets/icons/peti_jenazah.svg",
    },
    {
      title: "Mobil Jenazah & Ambulance",
      desc: "Armada kendaraan khusus jenazah dan ambulance siaga yang nyaman, bersih, serta dilengkapi standar medis kedukaan.",
      img: "/assets/card-workplace.webp",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Layanan Kremasi",
      desc: "Fasilitas dan pengurusan proses kremasi yang tertib, khidmat, serta sesuai dengan regulasi yang berlaku.",
      img: "/assets/kremasi.jpeg",
      icon: "/assets/icons/kremasi.svg",
    },
  ];

  // effect
  useEffect(() => {
    const updateLayout = () => {
      if (containerRef.current) {
        const totalWidth = containerRef.current.scrollWidth;
        const visibleWidth = containerRef.current.clientWidth;
        const scrollLimit = totalWidth - visibleWidth;

        setMaxScroll(scrollLimit);
        setDragConstraints({ left: -scrollLimit, right: 0 });
      }
    };

    updateLayout();
    window.addEventListener("resize", updateLayout);
    return () => window.removeEventListener("resize", updateLayout);
  }, []);

  // handlers
  const handleDragEnd = () => {
    if (!maxScroll) return;
    const currentX = x.get();
    const progress = Math.abs(currentX) / maxScroll;
    const rawDot = Math.round(progress * (totalDots - 1));
    const clampedDot = Math.max(0, Math.min(rawDot, totalDots - 1));

    setCurrentDot(clampedDot);
    const targetX = -(clampedDot / (totalDots - 1)) * maxScroll;

    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  const goToDot = (index: number) => {
    if (!maxScroll) return;
    setCurrentDot(index);
    const targetX = -(index / (totalDots - 1)) * maxScroll;

    animate(x, targetX, {
      type: "spring",
      stiffness: 300,
      damping: 30,
    });
  };

  const handleOpenModal = (title: string) => {
    setSelectedServiceTitle(title);
    setIsModalOpen(true);
  };

  return (
    <section
      className="py-20 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
      aria-label="Paket Layanan Transportasi"
    >
      {/* header */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-3xl md:text-4xl font-black text-[#193286] text-center mb-14"
      >
        Paket layanan transportasi
      </motion.h2>

      {/* carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="overflow-hidden py-4"
        ref={containerRef}
      >
        <motion.div
          drag="x"
          dragConstraints={dragConstraints}
          dragElastic={0.15}
          dragTransition={{ power: 0.2, timeConstant: 150 }}
          style={{ x }}
          onDragEnd={handleDragEnd}
          className="flex gap-4 md:gap-8 cursor-grab active:cursor-grabbing select-none"
        >
          {cards.map((card, idx) => (
            <article
              key={idx}
              className="card-item w-[340px] sm:w-[340px] md:w-[360px] flex-shrink-0 bg-white rounded-lg overflow-hidden border border-gray-100 flex flex-col justify-between"
            >
              {/* top content */}
              <div className="bg-[#193286] text-white p-6 md:p-8 flex flex-col justify-between min-h-[340px]">
                <div>
                  <div className="flex justify-between items-start mb-4 h-[64px] md:h-[72px]">
                    <h3 className="text-xl md:text-2xl font-bold max-w-[200px] leading-tight">
                      {card.title}
                    </h3>
                    <div className="w-15 h-15 relative flex-shrink-0 mt-0.5 filter brightness-0 invert">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>

                  <div className="w-full h-[3px] bg-[#2e50c0] my-3" />

                  <p className="text-sm text-gray-100 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* button */}
                <div className="mt-8">
                  <button
                    onClick={() => handleOpenModal(card.title)}
                    draggable={false}
                    className="bg-[#b81424] hover:bg-[#9c0e1b] transition-colors py-3 px-6 rounded-full text-center text-white text-sm font-semibold inline-flex items-center justify-center w-full cursor-pointer shadow"
                  >
                    Pesan Sekarang
                  </button>
                </div>
              </div>

              {/* image */}
              <div className="relative h-52 md:h-62 w-full bg-gray-100 overflow-hidden pointer-events-none">
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover"
                />
              </div>
            </article>
          ))}
        </motion.div>
      </motion.div>

      {/* dots */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="flex justify-center items-center gap-2 mt-10"
        role="tablist"
        aria-label="Carousel pagination dots"
      >
        {Array.from({ length: totalDots }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToDot(idx)}
            className={`h-5 w-5 rounded-full transition-all duration-300 cursor-pointer ${
              currentDot === idx
                ? "bg-[#b81424] scale-125"
                : "bg-gray-300 hover:bg-gray-400"
            }`}
            role="tab"
            aria-selected={currentDot === idx}
            aria-label={`Go to slide group ${idx + 1}`}
          />
        ))}
      </motion.div>

      {/* modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedServiceTitle}
      />
    </section>
  );
}
