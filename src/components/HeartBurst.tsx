import { useMemo } from "react";

export function HeartBurst() {
  const parts = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => {
        const angle = (i / 34) * Math.PI * 2;
        const dist = 140 + ((i * 29) % 220);
        return {
          bx: Math.cos(angle) * dist,
          by: Math.sin(angle) * dist,
          size: 16 + ((i * 11) % 26),
          gold: i % 3 === 0,
          delay: (i % 6) * 0.04,
        };
      }),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] grid place-items-center">
      {parts.map((p, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            fontSize: `${p.size}px`,
            color: p.gold ? "var(--gold)" : "var(--rose)",
            animation: `burst 1.1s ease-out ${p.delay}s forwards`,
            ["--bx" as string]: `${p.bx}px`,
            ["--by" as string]: `${p.by}px`,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
