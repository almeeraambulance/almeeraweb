"use client";

import React from "react";

interface GallerySkeletonProps {
  className?: string;
}

export default function GallerySkeleton({
  className = "",
}: GallerySkeletonProps) {
  return (
    <div
      className={`relative overflow-hidden bg-neutral-200 rounded-sm w-full h-full ${className}`}
    >
      {/* Shimmer Glare dengan animasi bergerak */}
      <div className="absolute inset-0 skeleton-shimmer" />

      <style jsx>{`
        .skeleton-shimmer {
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(255, 255, 255, 0.1) 20%,
            rgba(255, 255, 255, 0.7) 50%,
            rgba(255, 255, 255, 0.1) 80%,
            transparent 100%
          );
          height: 200%;
          width: 100%;
          position: absolute;
          top: -100%;
          left: 0;
          animation: shimmerDown 1.4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes shimmerDown {
          0% {
            transform: translateY(0%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}
