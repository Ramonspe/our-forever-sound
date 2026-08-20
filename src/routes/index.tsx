import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { FloatingHearts } from "@/components/FloatingHearts";
import { HeartBurst } from "@/components/HeartBurst";
import { LiveCounter } from "@/components/LiveCounter";
import { Reveal } from "@/components/Reveal";
import { VinylPlayer } from "@/components/VinylPlayer";

import hero from "@/assets/hero.jpg.asset.json";
import conjunto1 from "@/assets/conjunto1.jpg.asset.json";
import ibira from "@/assets/ibira.jpg.asset.json";
import pedido from "@/assets/pedido_de_namoro.jpg.asset.json";
import flor1 from "@/assets/flor1.jpg.asset.json";
import anel2 from "@/assets/anel2.jpg.asset.json";
import intimidade from "@/assets/intimidade.jpg.asset.json";
import amadureceu from "@/assets/amadureceu.jpg.asset.json";
import melhoraram from "@/assets/melhoraram.jpg.asset.json";
import incondicionalmente2 from "@/assets/incondicionalmente-2.jpg.asset.json";
import sempre1 from "@/assets/sempre1.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "11 meses — Para todo o sempre, Raíla ❤️" },
      {
        name: "description",
        content:
          "Uma linha do tempo do nosso amor: 11 meses de histórias, fotos, datas e músicas. Te amo, Raíla.",
      },
      { property: "og:title", content: "11 meses — Para todo o sempre, Raíla ❤️" },
      {
        property: "og:description",
        content: "Nossa história em fotos, frases e datas. Um presente de 11 meses de namoro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const MOMENTS = [
  {
    img: conjunto1,
    alt: "Raíla segurando uma rosa branca em um casamento",
    text: "Começou me entregando às armadilhas de amor 🤣",
    date: "25/07/2025",
  },
  {
    img: ibira,
    alt: "O casal sentado no parque ao pôr do sol",
    text: "Passei a ficar ansioso para que conseguisse dar um beijo certo. 🤣",
    date: "23/08/2025",
  },
  {
    img: pedido,
    alt: "O casal no bar no dia do pedido de namoro",
    text: "Até que chegou o dia que você disse o primeiro SIM.",
    date: "29/09/2025",
  },
  {
    img: flor1,
    alt: "Raíla sorrindo com um buquê de flores e ursinho",
    text: "Então seu encanto de girassol passou 1 mês oficialmente comigo. 🌻",
    date: "30/10/2025",
  },
  {
    img: anel2,
    alt: "Mãos do casal com os anéis em um show",
    text: "Até que selei minha promessa com um anel, no show que foi nosso primeiro assunto.",
    date: "08/11/2025",
  },
  {
    img: intimidade,
    alt: "O casal cozinhando juntos",
    text: "Então nossa intimidade só evoluiu 🤣",
    date: "06/12/2025",
  },
  {
    img: amadureceu,
    alt: "O casal se beijando em casa",
    text: "Nosso amor amadureceu",
    date: "12/12/2025",
  },
  {
    img: melhoraram,
    alt: "Selfie do casal no espelho",
    text: "E as coisas só melhoraram",
    date: "20/12/2025",
  },
];

function Index() {
  const [started, setStarted] = useState(false);
  const [burst, setBurst] = useState(false);

  const begin = () => {
    setBurst(true);
    setStarted(true);
    window.setTimeout(() => setBurst(false), 1400);
  };

  return (
    <div className="relative min-h-screen">
      <FloatingHearts />
      {burst && <HeartBurst />}

      {!started && (
        <button
          type="button"
          onClick={begin}
          aria-label="Toque para começar"
          className="fixed inset-0 z-[70] flex flex-col items-center justify-center gap-8 bg-background px-6"
        >
          <span
            className="disc-spin grid h-40 w-40 place-items-center rounded-full sm:h-52 sm:w-52"
            style={{
              animationDuration: "8s",
              background:
                "radial-gradient(circle at center, var(--gold) 0 11%, #2a2024 12% 40%, #3d3236 41% 44%, #2a2024 45% 62%, #3d3236 63% 66%, #241c20 67% 100%)",
              boxShadow: "0 22px 50px -20px rgba(0,0,0,0.45)",
            }}
          >
            <span className="h-4 w-4 rounded-full bg-background" />
          </span>
          <span
            className="font-script text-3xl text-wine sm:text-5xl"
            style={{ animation: "pulse-soft 2.6s ease-in-out infinite" }}
          >
            Toque para começar 💛
          </span>
          <span className="text-xs uppercase tracking-[0.3em] text-rose">
            nossa história em 11 meses
          </span>
        </button>
      )}

      <VinylPlayer started={started} />

      <main
        className="mx-auto w-full max-w-5xl px-5 pb-24 sm:px-8"
        style={{
          opacity: started ? 1 : 0,
          transition: "opacity 1.4s ease",
        }}
      >
        {/* HERO */}
        <section className="flex min-h-screen flex-col items-center justify-center gap-7 py-16 text-center">
          <Reveal className="w-full">
            <img
              src={hero.url}
              alt="Raíla e Ramon abraçados em frente à árvore de Natal"
              loading="lazy"
              className="photo-frame mx-auto max-h-[62vh] w-full max-w-sm object-cover"
            />
          </Reveal>
          <Reveal delay={150} className="w-full">
            <h1 className="font-script text-4xl leading-tight text-wine sm:text-6xl">
              Eu te amo há mais de:
            </h1>
            <div className="mt-5">
              <LiveCounter />
            </div>
            <p className="mt-4 text-xs tracking-[0.22em] text-rose uppercase">
              desde 20 de setembro de 2025
            </p>
          </Reveal>
        </section>

        {/* MOMENTOS */}
        <div className="flex flex-col gap-20 sm:gap-28">
          {MOMENTS.map((m, i) => {
            const right = i % 2 === 1;
            return (
              <Reveal key={m.date + i}>
                <section
                  className={`flex flex-col items-center gap-6 sm:gap-10 ${
                    right ? "md:flex-row-reverse" : "md:flex-row"
                  } md:items-center`}
                >
                  <img
                    src={m.img.url}
                    alt={m.alt}
                    loading="lazy"
                    className="photo-frame w-full max-w-xs object-cover md:max-w-sm"
                  />
                  <div className="min-w-0 flex-1 text-center md:text-left">
                    <span aria-hidden className="text-lg text-gold">
                      ❦
                    </span>
                    <p className="font-script text-3xl leading-snug text-wine sm:text-4xl">
                      {m.text}
                    </p>
                    <p className="mt-3 text-xs tracking-[0.2em] text-rose uppercase sm:text-sm">
                      {m.date}
                    </p>
                  </div>
                </section>
              </Reveal>
            );
          })}
        </div>

        {/* SÓ FRASE */}
        <Reveal>
          <section className="flex flex-col items-center gap-6 sm:gap-10 md:flex-row md:items-center">
            <img
              src={incondicionalmente2.url}
              alt="O casal se espelhando juntos"
              loading="lazy"
              className="photo-frame w-full max-w-xs object-cover md:max-w-sm"
            />
            <div className="min-w-0 flex-1 text-center md:text-left">
              <span aria-hidden className="text-lg text-gold">
                ❦
              </span>
              <p className="font-script text-3xl leading-snug text-wine sm:text-4xl">
                De modo que passei a te amar incondicionalmente
              </p>
              <p className="mt-3 text-xs tracking-[0.2em] text-rose uppercase sm:text-sm">
                16/05/2026
              </p>
            </div>
          </section>
        </Reveal>

        {/* FINAL */}
        <Reveal>
          <section className="flex min-h-screen flex-col items-center justify-center gap-8 py-16 text-center">
            <img
              src={sempre1.url}
              alt="Raíla e Ramon juntos"
              loading="lazy"
              className="photo-frame mx-auto max-h-[60vh] w-full max-w-sm object-cover"
            />
            <p className="mx-auto max-w-2xl font-script text-4xl leading-tight text-wine sm:text-6xl">
              Para todo o sempre! Te amo, Raíla ❤️
            </p>
            <span
              aria-hidden
              className="text-2xl text-gold"
              style={{ animation: "pulse-soft 3s ease-in-out infinite" }}
            >
              ❦
            </span>
          </section>
        </Reveal>
      </main>
    </div>
  );
}
