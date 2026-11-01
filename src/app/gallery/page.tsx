"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { createPortal } from "react-dom";

export default function GalleryPage() {
  // gallery items
  const galleryItems = [
    {
      title: "Pengiriman Jenazah",
      img: "/assets/ambulance.jpeg",
    },
    {
      title: "Pengiriman Abu Jenazah",
      img: "/assets/abu.jpeg",
    },
    {
      title: "Kedatangan Jenazah",
      img: "/assets/kedatangan.jpeg",
    },
    {
      title: "Pelayanan Pemakaman",
      img: "/assets/pelayanan.jpeg",
    },
    {
      title: "Peti Jenazah",
      img: "/assets/cargo.jpg",
    },
    {
      title: "Mobil Jenazah & Ambulance",
      img: "/assets/card-workplace.webp",
    },
  ];

  // state
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

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
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 animate-fade-in text-black">
      {/* breadcrumb */}
      <Breadcrumb items={[{ label: "Dokumentasi" }]} />

      {/* header section */}
      <header className="mb-12 text-left">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-black text-black tracking-tight mb-4"
        >
          Galeri Dokumentasi
        </motion.h1>
      </header>

      {/* photo grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-2"
      >
        {galleryItems.map((item, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative h-80 md:h-120 w-full overflow-hidden bg-neutral-100 cursor-pointer"
          >
            <Image
              src={item.img}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </motion.div>

      {/* lightbox modal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {selectedIndex !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 w-screen h-dvh z-[99999] bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 touch-none overflow-hidden"
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

                {/* image container with swipe support */}
                <motion.div
                  key={selectedIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
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
                  className="relative w-full max-w-4xl h-[70vh] sm:h-[80vh] max-h-[85dvh] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing"
                >
                  <Image
                    src={galleryItems[selectedIndex].img}
                    alt={galleryItems[selectedIndex].title}
                    fill
                    sizes="(max-width: 768px) 100vw, 800px"
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
