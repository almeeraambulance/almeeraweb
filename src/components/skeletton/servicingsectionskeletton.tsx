"use client";

import React from "react";

interface ServicingSectionSkeletonProps {
  className?: string;
}

export default function ServicingSectionSkeleton({
  className = "",
}: ServicingSectionSkeletonProps) {
  return (
    <div
      className={`bg-white rounded-lg overflow-hidden border border-gray-100 flex flex-col justify-between shadow-sm relative w-[340px] sm:w-[340px] md:w-[360px] flex-shrink-0 ${className}`}
    >
      {/* Top Box Skeleton */}
      <div className="bg-neutral-200 p-6 md:p-8 flex flex-col justify-between h-[350px] relative overflow-hidden">
        {/* Shimmer Glare ala Netflix dari atas ke bawah */}
        <div className="absolute inset-0 skeleton-shimmer" />

        <div>
          {/* Header (Title & Icon placeholder) */}
          <div className="flex justify-between items-start mb-4 h-[64px] md:h-[72px]">
            <div className="w-3/5 h-6 bg-neutral-300 rounded-md" />
            <div className="w-12 h-12 bg-neutral-300 rounded-md flex-shrink-0" />
          </div>

          {/* Divider Line */}
          <div className="w-full h-[3px] bg-neutral-300/80 my-3" />

          {/* Description Lines */}
          <div className="space-y-2.5 mt-4">
            <div className="w-full h-3.5 bg-neutral-300 rounded" />
            <div className="w-5/6 h-3.5 bg-neutral-300 rounded" />
            <div className="w-4/6 h-3.5 bg-neutral-300 rounded" />
          </div>
        </div>

        {/* Button Placeholder */}
        <div className="mt-8">
          <div className="w-full h-11 bg-neutral-300 rounded-full" />
        </div>
      </div>

      {/* Bottom Image Box Skeleton */}
      <div className="relative h-52 md:h-62 w-full bg-neutral-200 overflow-hidden">
        <div className="absolute inset-0 skeleton-shimmer" />
      </div>

      <style jsx>{`
        .skeleton-shimmer {
          background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.7) 50%,
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
