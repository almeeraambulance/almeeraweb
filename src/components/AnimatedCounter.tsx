"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface CounterProps {
  value: number;
  duration?: number;
}

export default function AnimatedCounter({ value, duration = 2 }: CounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;
    const endValue = value;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      // Easing function (easeOutQuad)
      const easeProgress = 1 - (1 - progress) * (1 - progress);

      setCount(Math.floor(easeProgress * (endValue - startValue) + startValue));

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [isInView, value, duration]);

  return <span ref={ref}>{count.toLocaleString("en-US")}</span>;
}
