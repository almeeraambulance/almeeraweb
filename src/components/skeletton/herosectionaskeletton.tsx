"use client";

import React from "react";

interface HeroSectionSkeletonProps {
  className?: string;
}

export default function HeroSectionSkeleton({
  className = "",
}: HeroSectionSkeletonProps) {
  return (
    <div
      className={`relative w-full text-white overflow-visible mb-6 sm:mb-20 lg:mb-16 ${className}`}
    >
      {/* Skeleton Banner Image  */}
      <div className="relative w-full h-[480px] sm:h-[420px] md:h-[500px] lg:h-[620px] bg-[#ececec] overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer" />
      </div>

      {/* Skeleton Menu Cards Grid  */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-12 relative sm:absolute sm:left-0 sm:right-0 -mt-20 sm:mt-0 sm:-bottom-28 lg:-bottom-36 z-30">
        <div className="bg-[#b81424] rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-red-500/40 relative">
          {/* Shimmer Glare melintasi card */}
          <div className="absolute inset-0 skeleton-shimmer pointer-events-none z-10" />

          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-8 flex flex-row lg:flex-col items-center lg:items-center justify-start lg:justify-between text-left lg:text-center min-h-[auto] lg:min-h-[220px] gap-4 lg:gap-0"
            >
              {/* Icon Placeholder */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-[#d11b2c] rounded-md shrink-0 mb-0 lg:mb-2 animate-pulse" />

              {/* Text & Link Placeholder */}
              <div className="flex flex-col items-start lg:items-center w-full space-y-2">
                <div className="w-4/5 h-5 bg-[#d11b2c] rounded animate-pulse" />
                <div className="w-1/2 h-4 bg-[#d11b2c]/75 rounded animate-pulse mt-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .skeleton-shimmer {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          transform: translateY(-100%);
          animation: shimmerDown 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes shimmerDown {
          0% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}
