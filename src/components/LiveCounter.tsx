import { useEffect, useState } from "react";

const START = new Date(2025, 8, 20, 0, 0, 0).getTime();

function diff(now: number) {
  const ms = Math.max(0, now - START);
  const total = Math.floor(ms / 1000);
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

export function LiveCounter() {
  const [t, setT] = useState(() => diff(Date.now()));

  useEffect(() => {
    const id = setInterval(() => setT(diff(Date.now())), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { v: t.days, l: "dias" },
    { v: t.hours, l: "horas" },
    { v: t.minutes, l: "minutos" },
    { v: t.seconds, l: "segundos" },
  ];

  return (
    <div className="mx-auto flex max-w-md flex-wrap items-stretch justify-center gap-2 sm:gap-3">
      {items.map((i) => (
        <div
          key={i.l}
          className="min-w-[68px] flex-1 rounded-2xl border border-gold/40 bg-card/70 px-2 py-3 shadow-sm backdrop-blur-sm sm:min-w-[80px]"
        >
          <div className="text-2xl font-semibold tabular-nums text-wine sm:text-3xl">
            {String(i.v).padStart(2, "0")}
          </div>
          <div className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-xs">
            {i.l}
          </div>
        </div>
      ))}
    </div>
  );
}
