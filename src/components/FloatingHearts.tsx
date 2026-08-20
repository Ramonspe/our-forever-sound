import { useMemo } from "react";

type Heart = {
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  gold: boolean;
};

export function FloatingHearts({ count = 26 }: { count?: number }) {
  const hearts = useMemo<Heart[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: (i * 97) % 100,
        size: 10 + ((i * 13) % 26),
        duration: 16 + ((i * 7) % 18),
        delay: -((i * 3.1) % 24),
        opacity: 0.12 + ((i * 17) % 18) / 100,
        gold: i % 3 === 0,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {hearts.map((h, i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            color: h.gold ? "var(--gold)" : "var(--rose)",
            ["--h-op" as string]: h.opacity,
          }}
        >
          ❤
        </span>
      ))}
    </div>
  );
}
