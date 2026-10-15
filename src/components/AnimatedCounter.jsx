import React, { useEffect, useState } from 'react';
import { formatINR } from '../utils/formatters';

export default function AnimatedCounter({ value = 0, duration = 800, prefix = '₹', isCurrency = true }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    const startValue = displayValue;
    const targetValue = Number(value) || 0;

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValue + (targetValue - startValue) * easeProgress);
      setDisplayValue(current);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    const animId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animId);
  }, [value, duration]);

  if (isCurrency) {
    return <span>{formatINR(displayValue)}</span>;
  }

  return <span>{prefix}{displayValue.toLocaleString('en-IN')}</span>;
}
