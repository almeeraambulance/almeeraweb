"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import FormModal from "../../components/FormModal";
import ServicesSkeleton from "../../components/skeletton/servicesskeletton";

function ServiceCard({
  card,
  onOpenModal,
}: {
  card: any;
  onOpenModal: (title: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(true);

  // Memastikan skeleton tampil instan di awal dan memberikan waktu visual yang pas sebelum konten asli terbuka
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 700); // Durasi skeleton tampil pas untuk efek visual high-end
    return () => clearTimeout(timer);
  }, []);

  return (
    <article className="relative bg-white rounded-lg overflow-hidden border border-gray-100 flex flex-col justify-between">
      {/* Skeleton muncul langsung secara instan sejak halaman dibuka */}
      <div
        className={`absolute inset-0 z-30 transition-opacity duration-500 ${
          isLoading
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <ServicesSkeleton className="w-full h-full" />
      </div>

      {/* Konten Asli Card */}
      <div
        className={`flex flex-col justify-between w-full h-full transition-opacity duration-500 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* top content */}
        <div className="bg-[#193286] text-white p-6 md:p-8 flex flex-col justify-between h-[350px] md:h-[360px]">
          <div>
            <div className="flex justify-between items-start mb-4 h-[64px] md:h-[72px]">
              <h3 className="text-xl md:text-xl font-bold max-w-[200px] leading-tight">
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

            <p className="text-sm text-gray-100 leading-relaxed">{card.desc}</p>
          </div>

          {/* button */}
          <div className="mt-8">
            <button
              onClick={() => onOpenModal(card.title)}
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
      </div>
    </article>
  );
}

export default function ServicesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedServiceTitle, setSelectedServiceTitle] = useState("");

  const cards = [
    {
      title: "Pelayanan Jemput Antar Pasien",
      desc: "Layanan transportasi medis untuk menjemput dan mengantar pasien dari rumah ke rumah sakit, klinik, puskesmas, atau fasilitas kesehatan lainnya dengan aman, nyaman, dan tepat waktu.",
      img: "/assets/card/antar_jemput.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Pelayanan Pasien Kontrol",
      desc: "Melayani kebutuhan transportasi pasien yang harus menjalani pemeriksaan atau kontrol rutin ke rumah sakit maupun klinik. Didukung armada yang nyaman untuk memastikan perjalanan pasien tetap aman.",
      img: "/assets/card/pasien_control.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Sewa Ambulance Jenazah Dalam & Luar Kota",
      desc: "Menyediakan layanan transportasi jenazah untuk tujuan dalam maupun luar kota dengan penanganan yang profesional, hormat, dan sesuai prosedur yang berlaku.",
      img: "/assets/card/mobil_jenazah.jpeg",
      icon: "/assets/icons/kedatangan_jenazah.svg",
    },
    {
      title: "Pelayanan Pasien Ventilator",
      desc: "Layanan ambulance khusus yang dilengkapi peralatan medis pendukung untuk pasien yang membutuhkan ventilator selama proses pemindahan atau rujukan antar fasilitas kesehatan.",
      img: "/assets/card/ventilator.jpeg",
      icon: "/assets/icons/ventilator.svg",
    },
    {
      title: "Pelayanan Ambulance Evakuasi",
      desc: "Layanan evakuasi pasien dalam kondisi darurat maupun non-darurat dari lokasi kejadian, rumah, kantor, atau fasilitas kesehatan menuju tempat perawatan yang dituju.",
      img: "/assets/card/evakuasi.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Sewa Ambulance Standar",
      desc: "Pilihan ambulance dengan fasilitas standar yang ideal untuk kebutuhan transportasi pasien umum, kontrol kesehatan, rujukan medis, maupun kebutuhan non-darurat lainnya.",
      img: "/assets/card/ambulance_standar.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Sewa Ambulance VIP",
      desc: "Layanan ambulance premium dengan fasilitas yang lebih lengkap dan nyaman untuk memberikan pengalaman perjalanan medis yang aman, eksklusif, dan berkualitas.",
      img: "/assets/card/ambulance_vip.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Sewa Ambulance Standby Event",
      desc: "Menyediakan unit ambulance dan tenaga medis yang siap siaga untuk berbagai kegiatan seperti seminar, konser, olahraga, acara perusahaan, kegiatan sosial, dan event lainnya.",
      img: "/assets/card/evakuasi.jpeg",
      icon: "/assets/icons/ambulance.svg",
    },
    {
      title: "Pelayanan Kedukaan, Kremasi, & Formalin",
      desc: "Memberikan layanan kedukaan secara menyeluruh mulai dari penanganan jenazah, proses formalin, hingga layanan kremasi dengan pendampingan yang profesional dan penuh empati.",
      img: "/assets/card/kremasi.jpeg",
      icon: "/assets/icons/kremasi.svg",
    },

  ];

  const handleOpenModal = (title: string) => {
    setSelectedServiceTitle(title);
    setIsModalOpen(true);
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 text-neutral-900">
      {/* breadcrumb */}
      <Breadcrumb items={[{ label: "Layanan Kami" }]} />

      {/* header section */}
      <header className="mb-14 text-left">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
          className="text-4xl md:text-[40px] font-black text-[#193286] mb-4 tracking-tight will-change-transform"
        >
          Layanan Kami
        </motion.h1>
      </header>

      {/* services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.map((card, idx) => (
          <ServiceCard key={idx} card={card} onOpenModal={handleOpenModal} />
        ))}
      </div>

      {/* modal */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedService={selectedServiceTitle}
      />
    </main>
  );
}
