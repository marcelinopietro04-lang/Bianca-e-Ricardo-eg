/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import {
  BlueGoldEnvelope,
  BlueGoldRsvpEnvelope,
  BlueGoldScheduleFlap,
} from './components/BlueGoldEnvelope';
import { CountdownTimer } from './components/CountdownTimer';
import { EnvelopeIntro } from './components/EnvelopeIntro';
import {
  ChampagneFlutesIcon,
  ChurchIllustration,
  GiftBoxIcon,
  PlateCutleryIcon,
  ScheduleChurchIcon,
  WeddingCakeIcon,
} from './components/WeddingIcons';
import {
  GiftsModal,
  MapModal,
  MoreInfoModal,
  RsvpModal,
  type RsvpSubmission,
} from './components/WeddingModals';

interface ScheduleItem {
  time: string;
  title: string;
  detail: string;
  icon: React.ReactNode;
}

const SCHEDULE_ITEMS: ScheduleItem[] = [
  {
    time: '15:00',
    title: 'Cerimônia',
    detail: 'Igreja Santa Luzia · Recomendamos chegar com 20 min de antecedência.',
    icon: <ScheduleChurchIcon className="w-8 h-8 text-[#7D93AA]" />,
  },
  {
    time: '16:00',
    title: 'Coquetel',
    detail: 'Brinde de boas-vindas no jardim com música acústica ao vivo.',
    icon: <ChampagneFlutesIcon className="w-8 h-8 text-[#7D93AA]" />,
  },
  {
    time: '18:00',
    title: 'Recepção',
    detail: 'Abertura do salão principal e entrada dos noivos.',
    icon: <PlateCutleryIcon className="w-8 h-8 text-[#7D93AA]" />,
  },
  {
    time: '20:00',
    title: 'Jantar',
    detail: 'Menu especial servido à francesa acompanhado de carta de vinhos.',
    icon: <PlateCutleryIcon className="w-8 h-8 text-[#7D93AA]" />,
  },
  {
    time: '22:00',
    title: 'Festa',
    detail: 'Corte do bolo, abertura da pista de dança e muita celebração.',
    icon: <WeddingCakeIcon className="w-8 h-8 text-[#7D93AA]" />,
  },
];

const RSVP_STORAGE_KEY = 'bianca_ricardo_rsvp_v1';

export default function App() {
  const prefersReducedMotion = useReducedMotion();

  const heroVideoRef = useRef<HTMLVideoElement | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const [heroVideoReady, setHeroVideoReady] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [activeScheduleTime, setActiveScheduleTime] = useState<string | null>(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [giftsOpen, setGiftsOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);

  const [savedRsvp, setSavedRsvp] = useState<RsvpSubmission | null>(() => {
    try {
      const raw = window.localStorage.getItem(RSVP_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as RsvpSubmission) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (savedRsvp) {
        window.localStorage.setItem(RSVP_STORAGE_KEY, JSON.stringify(savedRsvp));
      }
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [savedRsvp]);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;
    if (introDone) {
      video.currentTime = 0;
      void video.play().catch(() => {
        // Autoplay fallback handled by muted attribute
      });
    }
  }, [introDone]);

  const handleEnvelopeStartOpen = () => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    audio.volume = 0.65;
    audio.muted = false;
    setIsMuted(false);
    setMusicStarted(true);
    void audio.play().catch(() => {
      // Ignored if audio element is blocked
    });
  };

  const toggleMusic = () => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    if (isMuted || audio.paused) {
      audio.muted = false;
      setIsMuted(false);
      setMusicStarted(true);
      void audio.play().catch(() => {});
    } else {
      audio.muted = true;
      setIsMuted(true);
    }
  };

  const fadeProps = prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
      };

  return (
    <div
      className={`bg-[#E5D1B4] text-[#35271A] flex flex-col ${
        introDone ? 'min-h-screen' : 'h-screen overflow-hidden'
      }`}
    >
      {/* Background wedding music (Vocaroo 1clXCbNQC5DZ + local MP3 fallback) */}
      <audio ref={bgAudioRef} loop preload="auto">
        <source src="https://media1.vocaroo.com/mp3/1clXCbNQC5DZ" type="audio/mpeg" />
        <source src="/assets/invitation/background_music.mp3" type="audio/mpeg" />
      </audio>

      {!introDone && (
        <EnvelopeIntro
          onStartOpen={handleEnvelopeStartOpen}
          onComplete={() => setIntroDone(true)}
        />
      )}

      {/* Subtle floating music control once invitation opens */}
      {introDone && musicStarted && (
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isMuted ? 'Ativar música de fundo' : 'Silenciar música de fundo'}
          className="fixed bottom-4 right-4 z-40 w-11 h-11 rounded-full bg-[#7D93AA]/95 hover:bg-[#6E859D] text-white border border-[#CAA668] shadow-lg backdrop-blur-sm flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D93AA]"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}

      {/* Main Invitation Stage */}
      <main className="flex-1 w-full flex justify-center sm:py-8 sm:px-4">
        <article
          aria-label="Convite Digital de Casamento — Bianca e Ricardo"
          className="w-full max-w-[450px] sm:max-w-[460px] paper-linen sm:shadow-[0_26px_70px_rgba(53,39,26,0.22)] sm:border sm:border-[#D5C0A5]/80 overflow-x-clip"
        >
          {/* 1. HERO ANIMATED VIDEO FRAME */}
          <section id="convite" className="relative w-full aspect-[9/16] bg-[#EAE0D0] overflow-hidden select-none">
            {!heroVideoReady && (
              <img
                src="/assets/invitation/hero_video_poster.jpg"
                alt="Convite animado de casamento com moldura clássica e paisagem ao lago"
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover block"
              />
            )}

            <video
              ref={heroVideoRef}
              poster="/assets/invitation/hero_video_poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              onLoadedData={() => setHeroVideoReady(true)}
              className="relative z-10 w-full h-full object-cover block"
            >
              <source src="https://i.imgur.com/mSkaGiZ.mp4" type="video/mp4" />
              <source src="/assets/invitation/hero_video.mp4" type="video/mp4" />
            </video>
          </section>

          {/* 2. INTERACTIVE WAX-SEAL ENVELOPE (CEREMONY PALETTE: #FAFBFD, #7D93AA & #CAA668) */}
          <motion.section
            {...fadeProps}
            className="px-6 pt-8 pb-8 flex flex-col items-center bg-[#EEF2F6]"
          >
            <button
              type="button"
              onClick={() => setEnvelopeOpen((prev) => !prev)}
              aria-expanded={envelopeOpen}
              aria-label={
                envelopeOpen
                  ? 'Fechar envelope da mensagem'
                  : 'Abrir envelope para ler a mensagem'
              }
              className="relative w-[84%] max-w-[330px] cursor-pointer outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7D93AA]/60 focus-visible:ring-offset-4 rounded-sm transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.99]"
            >
              <BlueGoldEnvelope isOpen={envelopeOpen} className="w-full" />
            </button>
          </motion.section>

          {/* 3. COUPLE PHOTOGRAPH (ORIGINAL DIMENSIONS) */}
          <motion.section {...fadeProps} className="bg-[#EEF2F6]">
            <div className="w-full overflow-hidden rounded-xl shadow-sm">
              <img
                src="https://i.imgur.com/NbgyFh1.jpeg"
                onError={(e) => {
                  e.currentTarget.src = '/assets/invitation/couple_photo_new.jpg';
                }}
                alt="Foto do casal com buquê de rosas vermelhas ao pôr do sol"
                referrerPolicy="no-referrer"
                className="w-full h-auto block"
              />
            </div>
          </motion.section>

          {/* 4. CONTAGEM REGRESSIVA & CERIMÔNIA CARD (#7D93AA & #CAA668) */}
          <motion.section
            {...fadeProps}
            id="cerimonia"
            className="pt-8 pb-12 px-5 bg-[#EEF2F6] flex flex-col items-center relative"
          >
            <h2 className="font-script text-[33px] sm:text-[36px] text-[#7D93AA] leading-tight text-center">
              Contagem Regressiva
            </h2>

            <div className="mt-3">
              <CountdownTimer />
            </div>

            {/* Ceremony Card with Overlapping Calla Lily Bouquet */}
            <div className="relative mt-7 w-[78%] max-w-[310px]">
              <div className="relative z-10 bg-[#FAFBFD] border border-[#7D93AA]/40 shadow-[0_10px_28px_rgba(61,81,102,0.12)] p-2">
                <div className="border border-[#CAA668]/60 px-5 pt-4 pb-6 text-center flex flex-col items-center">
                  <ChurchIllustration className="w-16 h-16 text-[#7D93AA]" />

                  <h3 className="mt-1 text-[15px] tracking-[0.2em] uppercase text-[#3D5166] font-semibold">
                    CERIMÔNIA
                  </h3>

                  <p className="mt-2 text-[15px] font-semibold text-[#3D5166] leading-snug">
                    Igreja Santa Luzia
                  </p>
                  <p className="text-[14px] text-[#5D738A] leading-snug">
                    Rua das Flores, 123
                  </p>

                  <button
                    type="button"
                    onClick={() => setMapOpen(true)}
                    className="mt-4 min-h-[42px] px-7 py-1.5 rounded-full border border-[#CAA668] bg-[#FAFBFD] hover:bg-[#7D93AA] hover:text-white hover:border-[#7D93AA] text-[13px] tracking-[0.06em] text-[#4A6077] font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D93AA]"
                  >
                    Ver no Mapa
                  </button>
                </div>
              </div>

              {/* Calla Lily botanical overlay */}
              <img
                src="/assets/invitation/calla_lily.png"
                alt=""
                aria-hidden="true"
                referrerPolicy="no-referrer"
                className="pointer-events-none select-none absolute -bottom-7 -right-10 w-[124px] sm:w-[134px] z-20 drop-shadow-[0_6px_14px_rgba(61,81,102,0.14)]"
              />
            </div>
          </motion.section>

          {/* 5. NOSSA PROGRAMAÇÃO (HANGING ENVELOPE CARD WITH PEARL CLASP) */}
          <motion.section
            {...fadeProps}
            id="programacao"
            className="pt-2 pb-10 px-4 bg-[#E6ECF2] flex flex-col items-center"
          >
            {/* Slate-Blue (#7D93AA) Monogram Flap & Pearl */}
            <div className="relative z-20 w-[92%] max-w-[395px]">
              <BlueGoldScheduleFlap className="w-full h-auto block" />
            </div>

            {/* Framed Ivory Schedule Card Hanging Underneath Pearl */}
            <div className="relative z-10 -mt-3.5 w-[84%] max-w-[360px] bg-[#FAFBFD] border-[4px] border-[#7D93AA] shadow-[0_14px_34px_rgba(61,81,102,0.16)] p-2">
              <div className="border border-[#CAA668]/65 px-5 pt-7 pb-8">
                <h2 className="font-script text-[32px] sm:text-[35px] text-[#7D93AA] text-center leading-tight mb-6">
                  Nossa Programação
                </h2>

                <ul className="space-y-4">
                  {SCHEDULE_ITEMS.map((item) => {
                    const isExpanded = activeScheduleTime === item.time;
                    return (
                      <li key={item.time}>
                        <button
                          type="button"
                          onClick={() =>
                            setActiveScheduleTime((prev) =>
                              prev === item.time ? null : item.time
                            )
                          }
                          aria-expanded={isExpanded}
                          className="w-full text-left flex items-center gap-3.5 py-1 px-2 -mx-2 rounded-lg hover:bg-[#EEF2F6] transition-colors min-h-[48px] focus-visible:outline-2 focus-visible:outline-[#7D93AA]"
                        >
                          <span className="w-9 flex justify-center shrink-0">
                            {item.icon}
                          </span>
                          <span
                            className="w-1.5 h-1.5 rounded-full bg-[#CAA668] shrink-0"
                            aria-hidden="true"
                          />
                          <div className="flex flex-col">
                            <span className="text-[16px] font-semibold text-[#3D5166] leading-tight tabular-nums">
                              {item.time}
                            </span>
                            <span className="text-[15px] text-[#5D738A] leading-tight">
                              {item.title}
                            </span>
                          </div>
                        </button>

                        {isExpanded && (
                          <p className="mt-1 ml-[62px] text-xs text-[#5D738A] leading-relaxed">
                            {item.detail}
                          </p>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </motion.section>

          {/* 6. DICAS DE PRESENTES, RSVP ENVELOPE & LISTA DE PRESENTES */}
          <motion.section
            {...fadeProps}
            id="presentes"
            className="pt-4 pb-10 px-6 bg-[#EEF2F6] flex flex-col items-center text-center"
          >
            <h2 className="font-script text-[33px] sm:text-[36px] text-[#7D93AA] leading-tight">
              Dicas de Presentes
            </h2>

            <p className="mt-2 max-w-[260px] text-[16px] leading-[1.35] text-[#4E647B]">
              Se preferir nos presentear, ficaremos muito felizes com sua contribuição.
            </p>

            {/* Interactive RSVP Envelope (#7D93AA & #CAA668) */}
            <div id="rsvp" className="mt-6 w-full flex flex-col items-center">
              <button
                type="button"
                onClick={() => setRsvpOpen(true)}
                aria-label="Confirmar presença — abrir formulário RSVP"
                className="relative w-[82%] max-w-[310px] group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#7D93AA] rounded-xl transition-transform duration-200 hover:-translate-y-1 active:scale-[0.99]"
              >
                <BlueGoldRsvpEnvelope className="w-full h-auto block drop-shadow-[0_12px_22px_rgba(61,81,102,0.16)]" />
              </button>

              {savedRsvp && (
                <button
                  type="button"
                  onClick={() => setRsvpOpen(true)}
                  className="mt-2 inline-flex items-center gap-1.5 text-xs tracking-wide text-[#4E647B] hover:text-[#3D5166] underline underline-offset-4 min-h-[36px]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#CAA668]" />
                  <span>
                    Confirmado por {savedRsvp.name} · Editar resposta
                  </span>
                </button>
              )}
            </div>

            {/* Interactive Lista de Presentes Card Button */}
            <button
              type="button"
              onClick={() => setGiftsOpen(true)}
              className="mt-6 w-[84%] max-w-[305px] min-h-[58px] bg-[#FAFBFD] hover:bg-white border border-[#CAA668]/80 rounded-xl px-4 py-3 shadow-sm flex items-center gap-3.5 text-left transition-all duration-150 hover:-translate-y-0.5 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D93AA]"
            >
              <GiftBoxIcon className="w-8 h-8 text-[#7D93AA] shrink-0" />
              <div className="min-w-0">
                <p className="text-[12px] font-semibold tracking-[0.09em] uppercase text-[#3D5166] leading-tight">
                  LISTA DE PRESENTES
                </p>
                <p className="mt-0.5 text-[12px] text-[#5D738A] leading-snug">
                  Clique aqui para acessar nossa lista de presentes
                </p>
              </div>
            </button>
          </motion.section>

          {/* 7. SLATE BLUE & GOLD FOOTER BAR */}
          <footer className="px-3 pb-3 bg-[#EEF2F6]">
            <button
              type="button"
              onClick={() => setInfoOpen(true)}
              className="w-full min-h-[72px] bg-[#7D93AA] hover:bg-[#6E859D] border-t-2 border-[#CAA668] text-white py-4 px-6 flex flex-col items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D93AA]"
            >
              <span className="font-script text-[24px] leading-tight text-[#FAFBFD]">
                Mais informações
              </span>
              <span className="mt-0.5 text-[13px] tracking-[0.22em] uppercase text-[#F4E1BA] font-normal">
                BIANCA &amp; RICARDO
              </span>
            </button>
          </footer>
        </article>
      </main>

      {/* Modals */}
      <MapModal isOpen={mapOpen} onClose={() => setMapOpen(false)} />
      <RsvpModal
        isOpen={rsvpOpen}
        onClose={() => setRsvpOpen(false)}
        savedRsvp={savedRsvp}
        onSaveRsvp={setSavedRsvp}
      />
      <GiftsModal isOpen={giftsOpen} onClose={() => setGiftsOpen(false)} />
      <MoreInfoModal isOpen={infoOpen} onClose={() => setInfoOpen(false)} />
    </div>
  );
}
