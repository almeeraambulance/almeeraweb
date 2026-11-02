"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import GallerySkeleton from "../../components/skeletton/galleryskeletton";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

export default function GalleryPage() {
  // gallery items
  const galleryItems = [
    {
      title: "Pelayanan Jemput Antar Pasien",
      img: "/assets/card/antar_jemput.jpeg",
    },
    {
      title: "Pelayanan Pasien Kontrol",
      img: "/assets/card/pasien_control.jpeg",
    },
    {
      title: "Sewa Ambulance Jenazah Dalam & Luar Kota",
      img: "/assets/card/mobil_jenazah.jpeg",
    },
    {
      title: "Pelayanan Pasien Ventilator",
      img: "/assets/card/ventilator.jpeg",
    },
    {
      title: "Pelayanan Ambulance Evakuasi",
      img: "/assets/card/evakuasi.jpeg",
    },
    {
      title: "Sewa Ambulance Standar",
      img: "/assets/card/ambulance_standar.jpeg",
    },
    {
      title: "Sewa Ambulance VIP",
      img: "/assets/card/ambulance_vip.jpeg",
    },
    {
      title: "Sewa Ambulance Standby Event",
      img: "/assets/card/evakuasi.jpeg",
    },
    {
      title: "Pelayanan Kedukaan, Kremasi, & Formalin",
      img: "/assets/card/kremasi.jpeg",
    },
  ];

  // state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [readyImages, setReadyImages] = useState<{ [key: number]: boolean }>(
    {},
  );

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    // Memberikan jeda minimum yang pas agar skeleton langsung terpampang indah saat halaman pertama dibuka
    const timer = setTimeout(() => {
      const initialReady: { [key: number]: boolean } = {};
      galleryItems.forEach((_, idx) => {
        initialReady[idx] = true;
      });
      setReadyImages(initialReady);
    }, 700);

    return () => clearTimeout(timer);
  }, [galleryItems]);

  // body scroll lock
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedIndex]);

  // handlers
  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % galleryItems.length);
    }
  };

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + galleryItems.length) % galleryItems.length,
      );
    }
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 text-black">
      {/* breadcrumb */}
      <Breadcrumb items={[{ label: "Dokumentasi" }]} />

      {/* header section */}
      <header className="mb-12 text-left">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-[40px] font-black text-black tracking-tight mb-4"
        >
          Galeri Dokumentasi
        </motion.h1>
      </header>

      {/* photo grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="bg-white p-3 sm:p-4 rounded-sm shadow-md border border-gray-100 overflow-hidden cursor-pointer flex flex-col"
          >
            <div className="relative h-72 md:h-86 w-full overflow-hidden bg-neutral-100 rounded-sm">
              {/* Gallery Skeleton Shimmer - Tampil instan di awal */}
              {!readyImages[idx] && (
                <GallerySkeleton className="absolute inset-0 w-full h-full z-10" />
              )}
              <Image
                src={item.img}
                alt={item.title}
                fill
                priority={idx < 3}
                onLoad={() =>
                  setReadyImages((prev) => ({ ...prev, [idx]: true }))
                }
                className={`object-cover transition-opacity duration-500 ${
                  readyImages[idx] ? "opacity-100" : "opacity-0"
                }`}
              />
            </div>
          </div>
        ))}
      </div>

      {/* lightbox modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 w-screen h-dvh z-[99999] bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 touch-none overflow-hidden"
                onClick={() => setSelectedIndex(null)}
              >
                {/* close button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white p-2 transition-colors z-50 cursor-pointer hover:opacity-85"
                  aria-label="Tutup"
                >
                  <X className="w-12 h-12" />
                </button>

                {/* prev button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 sm:left-6 text-white p-2 sm:p-3 transition-colors z-50 cursor-pointer hover:opacity-85"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="w-16 h-16" />
                </button>

                {/* next button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 sm:right-6 text-white p-2 sm:p-3 transition-colors z-50 cursor-pointer hover:opacity-85"
                  aria-label="Selanjutnya"
                >
                  <ChevronRight className="w-16 h-16" />
                </button>

                {/* image container with swipe support (frameless) */}
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipeThreshold = 50;
                    if (offset.x > swipeThreshold || velocity.x > 500) {
                      handlePrev();
                    } else if (
                      offset.x < -swipeThreshold ||
                      velocity.x < -500
                    ) {
                      handleNext();
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-5xl h-[75vh] sm:h-[85vh] max-h-[90dvh] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={galleryItems[selectedIndex].img}
                    alt={galleryItems[selectedIndex].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 1000px"
                    className="object-contain"
                    priority
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </main>
  );
}
