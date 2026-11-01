"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import FormModal from "../../components/FormModal";

export default function ServicesPage() {
  // state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");

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
      title: "Kedatangan Jenazah",
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
  ];

  // modal handler
  const handleOpenModal = (title: string) => {
    setSelectedServiceTitle(title);
    setIsModalOpen(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 animate-fade-in text-neutral-900">
      {/* breadcrumb */}
      <Breadcrumb items={[{ label: "Layanan Kami" }]} />

      {/* header section */}
      <header className="mb-14 text-left">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-black text-[#193286] mb-4 tracking-tight"
        >
          Layanan Kami
        </motion.h1>
      </header>

      {/* services grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {cards.map((card, idx) => (
          <article
            key={idx}
            className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 flex flex-col justify-between"
          >
            {/* top content */}
            <div className="bg-[#193286] text-white p-6 md:p-8 flex flex-col justify-between min-h-[340px]">
              <div>
                <div className="flex justify-between items-start mb-4 h-[64px] md:h-[72px]">
                  <h3 className="text-xl md:text-2xl font-bold max-w-[200px] leading-tight">
                    {card.title}
                  </h3>
                  <div className="w-9 h-9 relative flex-shrink-0 mt-0.5 filter brightness-0 invert">
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
                  className="bg-[#b81424] hover:bg-[#9c0e1b] transition-colors py-3 px-6 rounded-lg text-center text-white text-sm font-semibold inline-flex items-center justify-center w-full cursor-pointer shadow"
                >
                  Pesan Sekarang
                </button>
              </div>
            </div>

            {/* image */}
            <div className="relative h-52 md:h-62 w-full bg-gray-100 overflow-hidden">
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

      {/* modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedServiceTitle}
      />
    </main>
  );
}
