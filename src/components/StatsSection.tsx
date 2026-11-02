"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useCallback, KeyboardEvent } from "react";
import { useInView, motion, PanInfo } from "framer-motion";

function AnimatedCounter({
  value,
  duration = 2,
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeProgress = 1 - (1 - progress) * (1 - progress);
      setCount(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString("id-ID")}</span>;
}

export default function StatsSection() {
  const stats = [
    {
      num: 4500,
      label: "Keluarga yang terlayani dengan penuh empati",
      icon: "/assets/icons/kedatangan_jenazah.svg",
    },
    {
      num: 2250,
      label: "Pengiriman jenazah & abu dalam / luar negeri",
      icon: "/assets/icons/pengiriman_jenazah.svg",
    },
    {
      num: 2179,
      label: "Penanganan kedatangan & pemakaman tuntas",
      icon: "/assets/icons/pelayanan_pemakaman.svg",
    },
    {
      num: 4500,
      label: "Perjalanan ambulance & armada siaga",
      icon: "/assets/icons/ambulance.svg",
    },
  ];

  // Data sumber gambar yang bervariasi
  const gallerySource = [
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

  // Membuat 12 item dengan memetakan sumber gambar secara berulang
  const baseItems = Array.from({ length: 12 }, (_, index) => {
    const sourceItem = gallerySource[index % gallerySource.length];
    return {
      id: index + 1,
      title: sourceItem.title,
      image: sourceItem.img,
    };
  });

  // Duplikasi 3 kali untuk infinite loop mulus ke depan
  const sliderItems = [...baseItems, ...baseItems, ...baseItems];

  const [currentIndex, setCurrentIndex] = useState(baseItems.length);
  const [isPaused, setIsPaused] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [visibleItems, setVisibleItems] = useState(3);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setVisibleItems(1);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(2);
      } else {
        setVisibleItems(3);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Auto-slide bertahap dengan jeda
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, nextSlide]);

  const handleAnimationComplete = () => {
    if (currentIndex >= baseItems.length * 2) {
      setIsResetting(true);
      setCurrentIndex(baseItems.length);
      requestAnimationFrame(() => setIsResetting(false));
    } else if (currentIndex < baseItems.length) {
      setIsResetting(true);
      setCurrentIndex(baseItems.length * 2 - 1);
      requestAnimationFrame(() => setIsResetting(false));
    }
  };

  const handleDragEnd = (
    _e: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const threshold = 50;
    if (info.offset.x < -threshold) {
      nextSlide();
    } else if (info.offset.x > threshold) {
      prevSlide();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (e.key === "ArrowRight") {
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      prevSlide();
    }
  };

  return (
    <section className="relative bg-[#fcfbf9] text-[#1a1a1a] pb-24 overflow-hidden">
      {/* top banner */}
      <div className="relative bg-[#193286] text-white pt-28 pb-80 md:pt-36 md:pb-96 px-6 md:px-16 overflow-hidden">
        {/* background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/assets/background.webp"
            alt="Latar Belakang Almeera"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#193286] via-[#193286]/85 to-[#193286]/40" />
        </div>

        {/* header */}
        <header className="max-w-7xl mx-auto text-center relative z-10">
          <span className="block text-3xl md:text-5xl text-[#d4af37] mb-1 drop-shadow-md font-normal tracking-wide font-script">
            Almeera Sejahtera Abadi
          </span>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-white">
            Kami telah melayani
          </h2>
        </header>

        {/* stats grid */}
        <div className="max-w-6xl mx-auto relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 text-center mt-14 px-4">
          {stats.map((stat, i) => (
            <article
              key={i}
              className="flex flex-col items-center justify-start text-center"
            >
              <div className="w-15 h-15 relative mb-3 filter invert-[74%] sepia-[97%] saturate-[637%] hue-rotate-[3deg] brightness-[73%] contrast-[26%]">
                <Image src={stat.icon} alt="" fill className="object-contain" />
              </div>
              <span className="block text-4xl lg:text-5xl font-black text-white tracking-tight">
                <AnimatedCounter value={stat.num} />
              </span>
              <div className="w-full max-w-[260px] h-[2px] bg-[#EBC54B]/70 my-4" />
              <p className="text-sm md:text-sm text-gray-100 font-medium leading-relaxed max-w-[220px]">
                {stat.label}
              </p>
            </article>
          ))}
        </div>
      </div>

      {/* bottom card container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12 relative z-20 -mt-48 md:-mt-64">
        <div className="bg-[#f5f2eb] rounded-lg overflow-hidden shadow-none border border-stone-200/60 pb-0">
          {/* card header */}
          <header className="text-center max-w-3xl mx-auto pt-10 pb-8 px-6 md:pt-14 md:pb-10 space-y-3">
            <span className="block text-3xl md:text-4xl text-[#b81424] font-normal tracking-wide font-script">
              Dokumentasi Kegiatan Kami
            </span>
            <p className="text-sm md:text-base text-stone-600 font-medium">
              Berikut beberapa foto kegiatan kami
            </p>
            <div>
              <a
                href="/gallery"
                className="text-xs sm:text-sm font-bold text-[#b81424] underline underline-offset-4 inline-flex items-center gap-1 pt-1"
              >
                Selengkapnya →
              </a>
            </div>
          </header>

          {/* interactive carousel container */}
          <section
            tabIndex={0}
            role="region"
            aria-label="Galeri Foto Pelayanan"
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            className="w-full outline-none focus:ring-2 focus:ring-[#b81424]/40 overflow-hidden pb-10 px-4 md:px-6"
          >
            <div className="overflow-hidden w-full m-0 p-0">
              <motion.div
                className="flex gap-4 cursor-grab active:cursor-grabbing touch-pan-y"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.1}
                onDragStart={() => setIsPaused(true)}
                onDragEnd={handleDragEnd}
                animate={{
                  x: `calc(-${currentIndex} * (100% / ${visibleItems} + 16px / ${visibleItems}))`,
                }}
                transition={
                  isResetting
                    ? { duration: 0 }
                    : { type: "tween", ease: "easeInOut", duration: 0.8 }
                }
                onAnimationComplete={handleAnimationComplete}
              >
                {sliderItems.map((sub, index) => (
                  <article
                    key={`${sub.id}-${index}`}
                    style={{
                      minWidth: `calc((100% - ${(visibleItems - 1) * 16}px) / ${visibleItems})`,
                    }}
                    className="bg-[#ffffff] rounded-none overflow-hidden flex flex-col justify-between flex-shrink-0 select-none p-4 pb-6 border border-stone-300/50"
                  >
                    <figure className="relative h-80 md:h-[300px] w-full bg-white p-2">
                      <Image
                        src={sub.image}
                        alt={`${sub.title} #${sub.id}`}
                        fill
                        className="object-cover pointer-events-none rounded-none"
                      />
                    </figure>
                  </article>
                ))}
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
