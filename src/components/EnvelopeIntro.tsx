import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface EnvelopeIntroProps {
  onStartOpen?: () => void;
  onComplete: () => void;
}

const IMGUR_SHARE_URL = 'https://imgur.com/ZpHw0yN';

function resolveImgurVideoUrl(url: string): string {
  const match = url.match(/imgur\.com\/(?:a\/|gallery\/)?([A-Za-z0-9]+)/i);
  if (match?.[1]) {
    return `https://i.imgur.com/${match[1]}.mp4`;
  }
  return url;
}

const PRIMARY_VIDEO_URL = resolveImgurVideoUrl(IMGUR_SHARE_URL);

export function EnvelopeIntro({ onStartOpen, onComplete }: EnvelopeIntroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'playing' | 'fading'>('idle');
  const [videoReady, setVideoReady] = useState(false);

  const triggerFadeOut = () => {
    setStatus((prev) => (prev === 'fading' ? prev : 'fading'));
  };

  useEffect(() => {
    if (status !== 'fading') return;
    const timer = window.setTimeout(() => {
      onComplete();
    }, 550);
    return () => window.clearTimeout(timer);
  }, [status, onComplete]);

  const handleOpen = async () => {
    if (status !== 'idle') return;
    onStartOpen?.();

    const video = videoRef.current;
    if (!video) {
      triggerFadeOut();
      return;
    }

    setStatus('playing');
    try {
      video.muted = true;
      video.currentTime = 0;
      await video.play();
    } catch {
      triggerFadeOut();
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || status !== 'playing') return;
    if (video.currentTime >= video.duration - 0.55) {
      triggerFadeOut();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: status === 'fading' ? 0 : 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#E5D1B4] sm:p-4"
      role="region"
      aria-label="Envelope de abertura do convite"
    >
      <div className="relative w-full h-full sm:w-auto sm:h-[min(92dvh,820px)] sm:aspect-[9/16] max-w-full overflow-hidden sm:rounded-xl sm:shadow-[0_28px_75px_rgba(53,39,26,0.28)] sm:border sm:border-[#D5C0A5] bg-[#C5D1DA] select-none">
        {/* Immediate poster layer so closed envelope is visible instantly */}
        {!videoReady && (
          <img
            src="/assets/invitation/envelope_poster.jpg"
            alt="Envelope fechado do convite de casamento"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover block"
          />
        )}

        <video
          ref={videoRef}
          poster="/assets/invitation/envelope_poster.jpg"
          playsInline
          preload="auto"
          onLoadedData={() => setVideoReady(true)}
          onTimeUpdate={handleTimeUpdate}
          onEnded={triggerFadeOut}
          className="relative z-10 w-full h-full object-cover block"
        >
          <source src={PRIMARY_VIDEO_URL} type="video/mp4" />
          <source src="/assets/invitation/envelope_h264.mp4" type="video/mp4" />
        </video>

        {/* Interactive Overlay While Envelope Is Closed */}
        {status === 'idle' && (
          <button
            type="button"
            onClick={handleOpen}
            aria-label="Abrir convite de casamento"
            className="absolute inset-0 z-20 cursor-pointer focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-[#35271A]"
          />
        )}
      </div>
    </motion.div>
  );
}
