import { useEffect, useRef, useState } from "react";

export const TRACKS = [
  { id: "ZAt8oxY0GQo", title: "Heavy Is the Crown — Linkin Park" },
  { id: "zwqrmEMB0wc", title: "Velha Infância — Tribalistas" },
  { id: "HD2sMiAwpCQ", title: "Eu Me Apaixonei — Vitinho Imperador" },
  { id: "YuByvjwo-HQ", title: "Ainda Bem — Thiaguinho" },
  { id: "TPm6YnDNyj0", title: "Eu Só Quero Um Xodó — Dominguinhos" },
  { id: "QpSOWQwpaBI", title: "Por Você — Barão Vermelho" },
];

export const PLAYLIST_URL =
  "https://www.youtube.com/watch_videos?video_ids=" + TRACKS.map((t) => t.id).join(",");

declare global {
  interface Window {
    YT?: any;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function loadApi(): Promise<any> {
  return new Promise((resolve, reject) => {
    if (window.YT?.Player) return resolve(window.YT);
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve(window.YT);
    };
    if (!document.getElementById("yt-iframe-api")) {
      const s = document.createElement("script");
      s.id = "yt-iframe-api";
      s.src = "https://www.youtube.com/iframe_api";
      s.onerror = () => reject(new Error("api"));
      document.head.appendChild(s);
    }
    setTimeout(() => (window.YT?.Player ? resolve(window.YT) : reject(new Error("timeout"))), 8000);
  });
}

export function VinylPlayer({ started }: { started: boolean }) {
  const playerRef = useRef<any>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    let watchdog: ReturnType<typeof setTimeout> | undefined;

    loadApi()
      .then((YT) => {
        if (cancelled) return;
        playerRef.current = new YT.Player("yt-hidden-player", {
          videoId: TRACKS[0]!.id,
          playerVars: { autoplay: 1, controls: 0, playsinline: 1, origin: window.location.origin },
          events: {
            onReady: (e: any) => {
              e.target.playVideo();
              watchdog = setTimeout(() => {
                const state = playerRef.current?.getPlayerState?.();
                if (state !== 1) setFailed(true);
              }, 4000);
            },
            onStateChange: (e: any) => {
              if (e.data === 1) {
                if (watchdog) clearTimeout(watchdog);
                setPlaying(true);
                setFailed(false);
              } else if (e.data === 2 || e.data === 0) {
                setPlaying(false);
                if (e.data === 0) next();
              }
            },
            onError: () => setFailed(true),
          },
        });
      })
      .catch(() => setFailed(true));

    return () => {
      cancelled = true;
      if (watchdog) clearTimeout(watchdog);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started]);

  const play = (i: number) => {
    const p = playerRef.current;
    setIndex(i);
    if (!p?.loadVideoById) return;
    p.loadVideoById(TRACKS[i]!.id);
    p.playVideo();
  };

  const next = () => setIndex((i) => {
    const n = (i + 1) % TRACKS.length;
    const p = playerRef.current;
    if (p?.loadVideoById) {
      p.loadVideoById(TRACKS[n]!.id);
      p.playVideo();
    }
    return n;
  });

  const prev = () => play((index - 1 + TRACKS.length) % TRACKS.length);

  const toggle = () => {
    const p = playerRef.current;
    if (!p?.playVideo) return setFailed(true);
    if (playing) {
      p.pauseVideo();
      setPlaying(false);
    } else {
      p.playVideo();
    }
  };

  const toggleMute = () => {
    const p = playerRef.current;
    if (!p?.mute) return;
    if (muted) {
      p.unMute();
      setMuted(false);
    } else {
      p.mute();
      setMuted(true);
    }
  };

  if (!started) return null;

  return (
    <>
      <div
        aria-hidden
        style={{
          position: "fixed",
          left: "-9999px",
          top: 0,
          width: 0,
          height: 0,
          opacity: 0,
          pointerEvents: "none",
          overflow: "hidden",
        }}
      >
        <div id="yt-hidden-player" />
      </div>

      <div className="fixed right-3 top-3 z-50 flex flex-col items-end gap-2 sm:right-5 sm:top-5">
        {failed ? (
          <a
            href={PLAYLIST_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gold/50 bg-card/90 px-4 py-2 text-xs font-medium text-wine shadow-md backdrop-blur transition hover:bg-secondary sm:text-sm"
          >
            🎵 Ouvir nossa playlist
          </a>
        ) : (
          <>
            <div className="flex items-center gap-2 rounded-full border border-gold/40 bg-card/85 p-1.5 shadow-md backdrop-blur">
              <button
                type="button"
                onClick={toggle}
                aria-label={playing ? "Pausar música" : "Tocar música"}
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full ${playing ? "disc-spin" : ""}`}
                  style={{
                    background:
                      "radial-gradient(circle at center, var(--gold) 0 12%, #2a2024 13% 46%, #3b3034 47% 62%, #241c20 63% 100%)",
                    boxShadow: "0 6px 16px -6px rgba(0,0,0,0.5)",
                  }}
                >
                  <span className="h-[7px] w-[7px] rounded-full bg-background" />
                </span>
              </button>
              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Ativar som" : "Silenciar"}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-base text-wine transition hover:bg-secondary"
              >
                {muted ? "🔇" : "🔊"}
              </button>
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-label="Escolher música"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-base text-wine transition hover:bg-secondary"
              >
                🎶
              </button>
            </div>

            <div className="flex max-w-[62vw] items-center gap-2 rounded-full border border-gold/30 bg-card/80 px-3 py-1.5 shadow-sm backdrop-blur sm:max-w-xs">
              <button
                type="button"
                onClick={prev}
                aria-label="Música anterior"
                className="shrink-0 text-rose"
              >
                ‹
              </button>
              <span className="min-w-0 truncate text-[11px] text-muted-foreground sm:text-xs">
                {TRACKS[index]!.title}
              </span>
              <button
                type="button"
                onClick={next}
                aria-label="Próxima música"
                className="shrink-0 text-rose"
              >
                ›
              </button>
            </div>

            {open && (
              <ul className="max-h-64 w-[68vw] overflow-auto rounded-2xl border border-gold/40 bg-card/95 p-2 shadow-lg backdrop-blur sm:w-72">
                {TRACKS.map((t, i) => (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => {
                        play(i);
                        setOpen(false);
                      }}
                      className={`w-full rounded-xl px-3 py-2 text-left text-xs transition hover:bg-secondary sm:text-sm ${
                        i === index ? "text-wine font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {t.title}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </>
  );
}
