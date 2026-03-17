"use client";

import { useEffect, useState } from "react";
import { formatCurrency, formatNumber } from "@/lib/utils";

interface CountUpProps {
  value: number;
  duration?: number;
  format?: "currency" | "number";
}

export function CountUp({ value, duration = 900, format = "number" }: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = performance.now();
    let raf = 0;

    const step = (t: number) => {
      const progress = Math.min((t - start) / duration, 1);
      setCount(Math.floor(value * progress));
      if (progress < 1) raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, value]);

  return <>{format === "currency" ? formatCurrency(count) : formatNumber(count)}</>;
}
