import { useState, useEffect } from "react";

export function CountUp({ value }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (value == null) return;

    let startTime = null;
    const duration = 1000;
    const end = Number(value) || 0;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      setDisplay(percent * end);
      if (percent < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [value]);

  return `$${display.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;
}