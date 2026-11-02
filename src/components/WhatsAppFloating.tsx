"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function WhatsAppFloating() {
  const [showAlert, setShowAlert] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Efek untuk alert pop-up berkala
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
    }, 1000);

    const interval = setInterval(() => {
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 4000);
    }, 10000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  // Efek untuk mendeteksi apakah menu mobile di Header sedang terbuka
  useEffect(() => {
    const checkMenuState = () => {
      // Memeriksa apakah body terkunci (overflow: hidden) oleh Header saat menu mobile aktif
      const isBodyLocked = document.body.style.overflow === "hidden";
      setIsMenuOpen(isBodyLocked);
    };

    // MutationObserver untuk memantau perubahan style pada document.body
    const observer = new MutationObserver(checkMenuState);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["style"],
    });

    // Cek kondisi awal saat komponen dimuat
    checkMenuState();

    return () => observer.disconnect();
  }, []);

  // Jika menu mobile terbuka, jangan render komponen WhatsApp
  if (isMenuOpen) return null;

  return (
    // container utama 
    <div className="fixed bottom-10 right-6 z-50 flex items-center gap-3 group select-none">
      {/* teks bubble pop-up  */}
      <div
        className={`bg-white text-[#0b221d] px-4 py-2.5 rounded-2xl shadow-xl font-bold text-sm tracking-wide border border-gray-100 origin-right transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-1 ${
          showAlert
            ? "opacity-100 scale-100 translate-x-0 pointer-events-auto"
            : "opacity-0 scale-0 translate-x-8 pointer-events-none"
        }`}
      >
        Ada yg bisa dibantu?
      </div>

      {/* tombol whatsapp */}
      <Link
        href="https://wa.me/6281289264252"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp 24 Jam"
        className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20"
      >
        {/* logo  */}
        <div className="relative w-full h-full drop-shadow-xl transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:-translate-y-2 group-hover:scale-110">
          <Image
            src="/assets/whatsapp.png"
            alt="Logo WhatsApp"
            fill
            className="object-contain"
            priority
          />
        </div>
      </Link>
    </div>
  );
}
