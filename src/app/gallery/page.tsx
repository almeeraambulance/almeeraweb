"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumb from "../../components/Breadcrumb";
import GallerySkeleton from "../../components/skeletton/galleryskeletton";
import { useState, useEffect, useRef } from "react";
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
  const [activeCoverIndex, setActiveCoverIndex] = useState<number>(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const [readyImages, setReadyImages] = useState<{ [key: number]: boolean }>(
    {},
  );

  // Ref untuk mendeteksi drag agar tidak bentrok dengan klik lightbox
  const isDraggingRef = useRef(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const timer = setTimeout(() => {
      const initialReady: { [key: number]: boolean } = {};
      galleryItems.forEach((_, idx) => {
        initialReady[idx] = true;
      });
      setReadyImages(initialReady);
    }, 500);

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

  // handlers lightbox
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

  // handlers coverflow slider navigation (Infinite Loop)
  const handleCoverflowPrev = () => {
    setActiveCoverIndex((prev) =>
      prev > 0 ? prev - 1 : galleryItems.length - 1,
    );
  };

  const handleCoverflowNext = () => {
    setActiveCoverIndex((prev) =>
      prev < galleryItems.length - 1 ? prev + 1 : 0,
    );
  };

  return (
    <main className="max-w-7xl mx-auto px-6 md:px-12 py-10 text-black overflow-x-hidden">
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

      {/* 3D Coverflow Container (Infinite & Anti-Jitter) */}
      <div className="relative w-full py-12 overflow-hidden flex flex-col items-center select-none">
        <motion.div
          className="relative w-full h-[400px] sm:h-[480px] md:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={() => {
            isDraggingRef.current = true;
          }}
          onDragEnd={(e, { offset, velocity }) => {
            const swipeThreshold = 30;
            if (offset.x < -swipeThreshold || velocity.x < -200) {
              handleCoverflowNext();
            } else if (offset.x > swipeThreshold || velocity.x > 200) {
              handleCoverflowPrev();
            }
            setTimeout(() => {
              isDraggingRef.current = false;
            }, 100);
          }}
        >
          {galleryItems.map((item, idx) => {
            // Algoritma jarak sirkular untuk infinite loop tanpa batas
            const total = galleryItems.length;
            let diff = idx - activeCoverIndex;
            while (diff > total / 2) diff -= total;
            while (diff < -total / 2) diff += total;

            // Render item dalam radius jangkauan 3D agar performa tetap ringan
            if (Math.abs(diff) > 3) return null;

            const absDiff = Math.abs(diff);
            const rotateY = diff === 0 ? 0 : diff < 0 ? 30 : -30;
            const scale = diff === 0 ? 1 : Math.max(0.75, 1 - absDiff * 0.1);

            const translateX =
              diff *
              (typeof window !== "undefined" && window.innerWidth < 640
                ? 120
                : 260);
            const zIndex = 50 - absDiff;
            const opacity = diff === 0 ? 1 : Math.max(0.35, 1 - absDiff * 0.3);

            return (
              <motion.div
                key={idx}
                initial={false}
                animate={{
                  x: translateX,
                  scale: scale,
                  rotateY: rotateY,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                onClick={() => {
                  if (isDraggingRef.current) return;
                  if (diff === 0) {
                    setSelectedIndex(idx);
                  } else {
                    setActiveCoverIndex(idx);
                  }
                }}
                className="absolute w-[220px] sm:w-[290px] md:w-[350px] h-[340px] sm:h-[430px] md:h-[490px] bg-white p-3 sm:p-3 rounded-sm shadow-2xl border border-gray-200 overflow-hidden cursor-pointer origin-center will-change-transform flex flex-col"
              >
                {/* Gambar dengan Bingkai & Skeleton */}
                <div className="relative w-full h-[250px] sm:h-[330px] md:h-[390px] overflow-hidden bg-neutral-100 rounded-sm">
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
                    className={`object-cover transition-opacity duration-500 pointer-events-none ${
                      readyImages[idx] ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </div>

                {/* Title Card */}
                <div className="pt-3 pb-1 px-1 text-left flex items-center flex-grow">
                  <h3 className="text-xs sm:text-sm md:text-base font-bold text-gray-900 line-clamp-1">
                    {item.title}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Tombol Navigasi Circular (Bg transparan, putih saat hover, ukuran icon 8) */}
        <div className="flex items-center gap-6 mt-8 z-10">
          <button
            onClick={handleCoverflowPrev}
            className="w-14 h-14 rounded-full border border-gray-300 bg-transparent hover:bg-white shadow-none hover:shadow-md flex items-center justify-center text-gray-800 transition-all cursor-pointer"
            aria-label="Previous Cover"
          >
            <ChevronLeft className="w-8 h-8 stroke-[2.5]" />
          </button>
          <button
            onClick={handleCoverflowNext}
            className="w-14 h-14 rounded-full border border-gray-300 bg-transparent hover:bg-white shadow-none hover:shadow-md flex items-center justify-center text-gray-800 transition-all cursor-pointer"
            aria-label="Next Cover"
          >
            <ChevronRight className="w-8 h-8 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
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
                {/* Close Button */}
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white p-2 transition-colors z-50 cursor-pointer hover:opacity-85"
                  aria-label="Tutup"
                >
                  <X className="w-12 h-12 stroke-[2.5]" />
                </button>

                {/* Prev Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-2 sm:left-6 text-white p-2 sm:p-3 transition-colors z-50 cursor-pointer hover:opacity-85"
                  aria-label="Sebelumnya"
                >
                  <ChevronLeft className="w-16 h-16 stroke-[2.5]" />
                </button>

                {/* Next Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-2 sm:right-6 text-white p-2 sm:p-3 transition-colors z-50 cursor-pointer hover:opacity-85"
                  aria-label="Selanjutnya"
                >
                  <ChevronRight className="w-16 h-16 stroke-[2.5]" />
                </button>

                {/* Image container dengan swipe support */}
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
