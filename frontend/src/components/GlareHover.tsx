'use client';

import { useMemo, useState } from 'react';

interface GlareHoverProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlareHover({ children, className = '' }: GlareHoverProps) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [active, setActive] = useState(false);

  const glareStyle = useMemo(
    () => ({
      background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(56, 189, 248, 0.24), rgba(255, 255, 255, 0) 42%)`,
      opacity: active ? 1 : 0,
    }),
    [position, active],
  );

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      onMouseMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setPosition({ x, y });
      }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={glareStyle}
      />
      <div className="relative z-20">{children}</div>
    </div>
  );
}
