import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface BlueGoldEnvelopeProps {
  isOpen: boolean;
  className?: string;
}

export function BlueGoldEnvelope({
  isOpen,
  className = 'w-full',
}: BlueGoldEnvelopeProps) {
  const prefersReducedMotion = useReducedMotion();

  const springTransition = prefersReducedMotion
    ? { duration: 0.01 }
    : { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <motion.div
      animate={{ paddingTop: isOpen ? 132 : 14 }}
      transition={springTransition}
      className={`relative select-none ${className}`}
      style={{ perspective: 1100 }}
    >
      {/* Envelope Body Wrapper (aspect 340:232 — classic European wedding envelope proportions) */}
      <div className="relative w-full aspect-[340/232]">
        {/* 1. BACK POCKET & INTERIOR RECESS (z-10) */}
        <svg
          viewBox="0 0 340 232"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full z-10 pointer-events-none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ceremonyEnvBack" x1="170" y1="0" x2="170" y2="232" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#8399AF" />
              <stop offset="100%" stopColor="#6D839B" />
            </linearGradient>
          </defs>
          <rect
            x="2"
            y="2"
            width="336"
            height="228"
            rx="8"
            fill="url(#ceremonyEnvBack)"
            stroke="#7D93AA"
            strokeOpacity="0.4"
            strokeWidth="1"
          />
        </svg>

        {/* 2. WELCOME CARD TUCKED INSIDE (z-20) — matches Ceremony card double-border aesthetic */}
        <motion.div
          initial={false}
          animate={
            isOpen
              ? { y: -96, opacity: 1, scale: 1 }
              : { y: 18, opacity: 0, scale: 0.94 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0.01 }
              : {
                  duration: 0.52,
                  delay: isOpen ? 0.14 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }
          }
          className="absolute inset-x-[7.5%] top-[8%] z-20 pointer-events-none"
        >
          <div className="bg-[#FAFBFD] border border-[#7D93AA]/45 shadow-[0_10px_28px_rgba(61,81,102,0.14)] p-1.5 rounded-[2px]">
            <div className="border border-[#CAA668]/60 px-4 py-3.5 text-center">
              <p className="font-script text-[24px] sm:text-[26px] text-[#7D93AA] leading-tight">
                Queridos convidados,
              </p>
              <p className="mt-1.5 text-[12px] sm:text-[12.5px] leading-snug text-[#4E647B]">
                Com o coração cheio de alegria, esperamos vocês para celebrar o nosso amor.
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3. FRONT PORCELAIN & SLATE-MIST POCKET + SIDE FOLDS (z-30) */}
        <svg
          viewBox="0 0 340 232"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full z-30 pointer-events-none drop-shadow-[0_14px_28px_rgba(61,81,102,0.13)]"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ceremonySideLeft" x1="2" y1="16" x2="150" y2="132" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EFF4F8" />
              <stop offset="100%" stopColor="#E1E9F2" />
            </linearGradient>
            <linearGradient id="ceremonySideRight" x1="338" y1="16" x2="190" y2="132" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#EFF4F8" />
              <stop offset="100%" stopColor="#E1E9F2" />
            </linearGradient>
            <linearGradient id="ceremonyFrontPocket" x1="170" y1="108" x2="170" y2="230" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FAFBFD" />
              <stop offset="100%" stopColor="#EEF3F8" />
            </linearGradient>
            <clipPath id="envBodyClip">
              <rect x="2" y="2" width="336" height="228" rx="8" />
            </clipPath>
          </defs>

          <g clipPath="url(#envBodyClip)">
            {/* Soft slate-mist side folds for subtle tonal contrast */}
            <path
              d="M2 2 L152 124 L2 230 Z"
              fill="url(#ceremonySideLeft)"
              stroke="#7D93AA"
              strokeOpacity="0.22"
              strokeWidth="0.9"
            />
            <path
              d="M338 2 L188 124 L338 230 Z"
              fill="url(#ceremonySideRight)"
              stroke="#7D93AA"
              strokeOpacity="0.22"
              strokeWidth="0.9"
            />

            {/* Curved lower pocket rising gently */}
            <path
              d="M2 230 L138 116 C155 102, 185 102, 202 116 L338 230 Z"
              fill="url(#ceremonyFrontPocket)"
              stroke="#7D93AA"
              strokeOpacity="0.28"
              strokeWidth="1"
            />

            {/* Single delicate gold accent line echoing the V-pocket */}
            <path
              d="M16 226 L142 122 C156 110, 184 110, 198 122 L324 226"
              stroke="#CAA668"
              strokeOpacity="0.48"
              strokeWidth="0.85"
              fill="none"
            />
          </g>

          {/* Outer refined frame matching Ceremony card border */}
          <rect
            x="2"
            y="2"
            width="336"
            height="228"
            rx="8"
            fill="none"
            stroke="#7D93AA"
            strokeOpacity="0.34"
            strokeWidth="1.1"
          />
        </svg>

        {/* 4. HINGED TOP FLAP (rotates smoothly between closed -180deg and open 0deg) */}
        <motion.div
          initial={false}
          animate={{
            rotateX: isOpen ? 0 : -180,
            zIndex: isOpen ? 5 : 40,
          }}
          transition={{
            rotateX: springTransition,
            zIndex: { delay: isOpen ? 0.16 : 0.14 },
          }}
          style={{
            transformOrigin: '50% 100%',
            transformStyle: 'preserve-3d',
          }}
          className="absolute inset-x-0 bottom-[98.5%] h-[60%]"
        >
          {/* Open Inner Face (visible when isOpen === true, points up) */}
          <div
            style={{ backfaceVisibility: 'hidden' }}
            className="absolute inset-0"
          >
            <svg
              viewBox="0 0 340 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full pointer-events-none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ceremonyOpenLiner" x1="170" y1="12" x2="170" y2="140" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#8CA2B8" />
                  <stop offset="100%" stopColor="#7D93AA" />
                </linearGradient>
              </defs>
              {/* Ivory outer frame with rounded hinge corners */}
              <path
                d="M2 140 C2 134, 4 130, 10 125 L146 15 C160 4, 180 4, 194 15 L330 125 C336 130, 338 134, 338 140 Z"
                fill="#FAFBFD"
                stroke="#7D93AA"
                strokeOpacity="0.34"
                strokeWidth="1.1"
              />
              {/* Dusty slate-blue (#7D93AA) liner */}
              <path
                d="M15 140 L150 25 C161 15, 179 15, 190 25 L325 140 Z"
                fill="url(#ceremonyOpenLiner)"
              />
              {/* Delicate gold hairline */}
              <path
                d="M21 138 L152 28 C162 19, 178 19, 188 28 L319 138"
                stroke="#CAA668"
                strokeOpacity="0.65"
                strokeWidth="0.9"
                fill="none"
              />
            </svg>
          </div>

          {/* Closed Outer Face (visible when isOpen === false, points down over pocket) */}
          <div
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateX(180deg)',
            }}
            className="absolute inset-0"
          >
            <svg
              viewBox="0 0 340 140"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full pointer-events-none drop-shadow-[0_8px_14px_rgba(61,81,102,0.12)]"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="ceremonyClosedFlap" x1="170" y1="0" x2="170" y2="136" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FAFBFD" />
                  <stop offset="70%" stopColor="#F5F8FB" />
                  <stop offset="100%" stopColor="#EDF2F7" />
                </linearGradient>
              </defs>

              {/* Softly curved silk-ivory top flap pointing gracefully down */}
              <path
                d="M2 8 C2 3.5, 5.5 0, 10 0 L330 0 C334.5 0, 338 3.5, 338 8 L338 11 C338 15, 335 18, 330 22 L194 126 C180 137, 160 137, 146 126 L10 22 C5 18, 2 15, 2 11 Z"
                fill="url(#ceremonyClosedFlap)"
                stroke="#7D93AA"
                strokeOpacity="0.34"
                strokeWidth="1.05"
              />

              {/* Delicate gold V-trim along the flap fold only (no harsh bar on top edge) */}
              <path
                d="M14 14 L150 119 C161 128, 179 128, 190 119 L326 14"
                stroke="#CAA668"
                strokeOpacity="0.6"
                strokeWidth="0.9"
                strokeLinecap="round"
                fill="none"
              />
            </svg>

            {/* Subtle pulsing sculpted gold wax seal with harmonious calligraphic B & R */}
            <motion.div
              animate={
                !isOpen && !prefersReducedMotion
                  ? { scale: [1, 1.045, 1] }
                  : { scale: 1 }
              }
              transition={
                !isOpen && !prefersReducedMotion
                  ? { duration: 2.8, repeat: Infinity, ease: 'easeInOut' }
                  : { duration: 0.2 }
              }
              className="absolute left-1/2 -bottom-[18px] -translate-x-1/2 w-[58px] h-[58px] pointer-events-none"
            >
              <svg viewBox="0 0 72 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_5px_10px_rgba(61,81,102,0.2)]">
                <defs>
                  <radialGradient id="ceremonyGoldWax" cx="35%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#EAD1A1" />
                    <stop offset="52%" stopColor="#CAA668" />
                    <stop offset="100%" stopColor="#B08B4A" />
                  </radialGradient>
                  <radialGradient id="ceremonyGoldInner" cx="50%" cy="45%" r="55%">
                    <stop offset="0%" stopColor="#C8A364" />
                    <stop offset="100%" stopColor="#B79251" />
                  </radialGradient>
                </defs>
                {/* Organic sculpted wax seal silhouette */}
                <path
                  d="M36 4 C44 3, 52 7, 58 12 C64 17, 68 25, 68 34 C69 44, 65 53, 59 59 C53 65, 44 68, 36 68 C27 68, 18 65, 12 58 C6 52, 3 43, 4 33 C5 24, 9 15, 16 10 C22 5, 29 4, 36 4 Z"
                  fill="url(#ceremonyGoldWax)"
                  stroke="#9C783C"
                  strokeOpacity="0.65"
                  strokeWidth="0.9"
                />
                {/* Recessed inner medallion */}
                <circle cx="36" cy="36" r="22.5" fill="url(#ceremonyGoldInner)" stroke="#F6E5C5" strokeOpacity="0.65" strokeWidth="1" />
                <circle cx="36" cy="36" r="19.5" fill="none" stroke="#FAFBFD" strokeOpacity="0.38" strokeWidth="0.65" />

                {/* Harmonious slender italic B & R monogram */}
                <g transform="translate(0 0.6)" opacity="0.28">
                  <text
                    x="24.5"
                    y="40.5"
                    textAnchor="middle"
                    fill="#4A3818"
                    fontSize="15.5"
                    fontStyle="italic"
                    fontWeight="400"
                    fontFamily="Cormorant Garamond, Georgia, serif"
                  >
                    B
                  </text>
                  <text
                    x="36"
                    y="39.2"
                    textAnchor="middle"
                    fill="#4A3818"
                    fontSize="11"
                    fontStyle="italic"
                    fontWeight="400"
                    fontFamily="Cormorant Garamond, Georgia, serif"
                  >
                    &amp;
                  </text>
                  <text
                    x="47.5"
                    y="40.5"
                    textAnchor="middle"
                    fill="#4A3818"
                    fontSize="15.5"
                    fontStyle="italic"
                    fontWeight="400"
                    fontFamily="Cormorant Garamond, Georgia, serif"
                  >
                    R
                  </text>
                </g>
                <text
                  x="24.5"
                  y="40.5"
                  textAnchor="middle"
                  fill="#FAFBFD"
                  fontSize="15.5"
                  fontStyle="italic"
                  fontWeight="400"
                  fontFamily="Cormorant Garamond, Georgia, serif"
                >
                  B
                </text>
                <text
                  x="36"
                  y="39.2"
                  textAnchor="middle"
                  fill="#F7E8CC"
                  fontSize="11"
                  fontStyle="italic"
                  fontWeight="400"
                  fontFamily="Cormorant Garamond, Georgia, serif"
                >
                  &amp;
                </text>
                <text
                  x="47.5"
                  y="40.5"
                  textAnchor="middle"
                  fill="#FAFBFD"
                  fontSize="15.5"
                  fontStyle="italic"
                  fontWeight="400"
                  fontFamily="Cormorant Garamond, Georgia, serif"
                >
                  R
                </text>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export function BlueGoldScheduleFlap({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 380 164"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="schedEnvBack" x1="190" y1="6" x2="190" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6B829A" />
          <stop offset="100%" stopColor="#7D93AA" />
        </linearGradient>
        <linearGradient id="schedFlap" x1="190" y1="6" x2="190" y2="148" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#859BB2" />
          <stop offset="100%" stopColor="#7389A1" />
        </linearGradient>
        <radialGradient id="pearlClasp" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="55%" stopColor="#F4EFE7" />
          <stop offset="100%" stopColor="#CFC5B7" />
        </radialGradient>
        <filter id="flapShadow" x="-5%" y="-5%" width="110%" height="120%">
          <feDropShadow dx="0" dy="5" stdDeviation="5" floodColor="#2C3A48" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* Envelope Top Body (#7D93AA) */}
      <rect x="12" y="6" width="356" height="154" rx="2" fill="url(#schedEnvBack)" />

      {/* Pointed Top Flap (#7D93AA) */}
      <path
        d="M12 6 L368 6 L368 24 C368 32, 360 40, 348 50 L205 148 C196 154, 184 154, 175 148 L32 50 C20 40, 12 32, 12 24 Z"
        fill="url(#schedFlap)"
        stroke="#5E738B"
        strokeWidth="0.8"
        filter="url(#flapShadow)"
      />

      <defs>
        <linearGradient id="monogramGold" x1="145" y1="38" x2="235" y2="96" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E9CE99" />
          <stop offset="50%" stopColor="#CAA668" />
          <stop offset="100%" stopColor="#B08948" />
        </linearGradient>
      </defs>

      {/* Gold (#CAA668) embossed decorative crest & harmonious B & R monogram */}
      <path
        d="M36 46 L177 142 C185 147, 195 147, 203 142 L344 46"
        stroke="#CAA668"
        strokeWidth="1"
        strokeOpacity="0.6"
        fill="none"
      />

      <g transform="translate(190 68)">
        {/* Delicate symmetrical laurel framing arcs */}
        <path
          d="M-54 2 C-52 -16, -34 -29, -12 -31 M54 2 C52 -16, 34 -29, 12 -31"
          stroke="url(#monogramGold)"
          strokeWidth="1"
          strokeOpacity="0.58"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M-46 16 C-36 28, -18 33, 0 33 C18 33, 36 28, 46 16"
          stroke="url(#monogramGold)"
          strokeWidth="0.9"
          strokeOpacity="0.48"
          strokeLinecap="round"
          fill="none"
        />
        {/* Tiny center crest diamond */}
        <path d="M0 -34 L3.5 -30.5 L0 -27 L-3.5 -30.5 Z" fill="#CAA668" fillOpacity="0.65" />

        {/* Subtle embossed shadow behind letters */}
        <g transform="translate(0 1)" opacity="0.28">
          <text
            x="-23"
            y="8"
            textAnchor="middle"
            fill="#2C3A48"
            fontSize="36"
            fontStyle="italic"
            fontWeight="500"
            fontFamily="Cormorant Garamond, Georgia, serif"
          >
            B
          </text>
          <text
            x="0"
            y="6"
            textAnchor="middle"
            fill="#2C3A48"
            fontSize="22"
            fontStyle="italic"
            fontWeight="400"
            fontFamily="Cormorant Garamond, Georgia, serif"
          >
            &amp;
          </text>
          <text
            x="23"
            y="8"
            textAnchor="middle"
            fill="#2C3A48"
            fontSize="36"
            fontStyle="italic"
            fontWeight="500"
            fontFamily="Cormorant Garamond, Georgia, serif"
          >
            R
          </text>
        </g>

        {/* Gold foil B & R typography */}
        <text
          x="-23"
          y="8"
          textAnchor="middle"
          fill="url(#monogramGold)"
          fontSize="36"
          fontStyle="italic"
          fontWeight="500"
          fontFamily="Cormorant Garamond, Georgia, serif"
        >
          B
        </text>
        <text
          x="0"
          y="6"
          textAnchor="middle"
          fill="url(#monogramGold)"
          fillOpacity="0.92"
          fontSize="22"
          fontStyle="italic"
          fontWeight="400"
          fontFamily="Cormorant Garamond, Georgia, serif"
        >
          &amp;
        </text>
        <text
          x="23"
          y="8"
          textAnchor="middle"
          fill="url(#monogramGold)"
          fontSize="36"
          fontStyle="italic"
          fontWeight="500"
          fontFamily="Cormorant Garamond, Georgia, serif"
        >
          R
        </text>
      </g>

      {/* Luminous Pearl Clasp with subtle Gold bezel (#CAA668) */}
      <g transform="translate(190 144)" filter="url(#flapShadow)">
        <circle cx="0" cy="0" r="19" fill="#CAA668" />
        <circle cx="0" cy="0" r="16.5" fill="url(#pearlClasp)" />
        <ellipse cx="-5" cy="-5" rx="4.5" ry="3" fill="#FFFFFF" fillOpacity="0.85" transform="rotate(-25 -5 -5)" />
      </g>
    </svg>
  );
}

export function BlueGoldRsvpEnvelope({ className = 'w-full h-auto' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="rsvpEnvFlap" x1="150" y1="10" x2="150" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6B8299" />
          <stop offset="100%" stopColor="#7D93AA" />
        </linearGradient>
        <linearGradient id="rsvpEnvBody" x1="150" y1="120" x2="150" y2="246" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7D93AA" />
          <stop offset="100%" stopColor="#697F96" />
        </linearGradient>
        <filter id="rsvpShadow" x="-8%" y="-8%" width="116%" height="120%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#2C3A48" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Back Open Flap (#7D93AA) */}
      <path
        d="M28 112 L132 22 C143 13, 157 13, 168 22 L272 112 L272 238 L28 238 Z"
        fill="url(#rsvpEnvFlap)"
      />
      {/* Gold inner liner */}
      <path
        d="M42 112 L136 32 C144 25, 156 25, 164 32 L258 112 Z"
        fill="#E9D6B0"
        stroke="#CAA668"
        strokeWidth="1.2"
      />

      {/* RSVP Card inside Envelope (#FAFBFD with #CAA668 gold border) */}
      <g filter="url(#rsvpShadow)">
        <rect x="44" y="54" width="212" height="164" rx="2" fill="#FAFBFD" stroke="#CAA668" strokeWidth="2.5" />
        <rect x="50" y="60" width="200" height="152" rx="1" fill="none" stroke="#CAA668" strokeWidth="0.7" strokeOpacity="0.65" />

        <text
          x="150"
          y="96"
          textAnchor="middle"
          fill="#4A6077"
          fontSize="16"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontWeight="600"
          letterSpacing="2"
        >
          CONFIRMAR
        </text>
        <text
          x="150"
          y="116"
          textAnchor="middle"
          fill="#4A6077"
          fontSize="16"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontWeight="600"
          letterSpacing="2"
        >
          PRESENÇA
        </text>

        {/* RSVP Pill inside card */}
        <rect x="106" y="132" width="88" height="28" rx="14" fill="#EEF2F6" stroke="#CAA668" strokeWidth="1.4" />
        <text
          x="150"
          y="150"
          textAnchor="middle"
          fill="#4A6077"
          fontSize="11.5"
          fontFamily="Cormorant Garamond, Georgia, serif"
          fontWeight="700"
          letterSpacing="2.2"
        >
          RSVP
        </text>
      </g>

      {/* Front Envelope Pocket (#7D93AA) */}
      <path
        d="M28 118 L112 184 C122 192, 134 195, 150 195 C166 195, 178 192, 188 184 L272 118 L272 242 L28 242 Z"
        fill="url(#rsvpEnvBody)"
        stroke="#5E738B"
        strokeWidth="0.8"
      />
      {/* Gold pocket fold accent (#CAA668) */}
      <path
        d="M28 242 L116 186 C126 180, 174 180, 184 186 L272 242"
        stroke="#CAA668"
        strokeWidth="1.1"
        strokeOpacity="0.7"
        fill="none"
      />

      {/* Ivory & Gold Floral Accent Bouquet on Right Edge */}
      <g transform="translate(245 142)" filter="url(#rsvpShadow)">
        {/* Greenery & golden stems */}
        <path d="M12 15 C24 38, 22 72, 14 102" stroke="#7A9468" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <path d="M4 22 C10 48, 8 78, 2 106" stroke="#8FA87C" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M20 10 C32 34, 34 64, 24 96" stroke="#6B855A" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Leaves */}
        <ellipse cx="-14" cy="-8" rx="11" ry="5" transform="rotate(-30 -14 -8)" fill="#7E976D" />
        <ellipse cx="28" cy="-16" rx="12" ry="5" transform="rotate(28 28 -16)" fill="#6E885D" />
        <ellipse cx="32" cy="18" rx="11" ry="5" transform="rotate(22 32 18)" fill="#7E976D" />
        {/* White & Cream Roses with Gold Centers (#CAA668) */}
        <g transform="translate(-8 -32)">
          <circle cx="0" cy="0" r="15" fill="#FDFBF7" stroke="#E4DACB" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="9" fill="#F6EFE2" />
          <circle cx="0" cy="0" r="4" fill="#CAA668" />
        </g>
        <g transform="translate(22 -28)">
          <circle cx="0" cy="0" r="14" fill="#FAF7F1" stroke="#E4DACB" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="8" fill="#F2E9D8" />
          <circle cx="0" cy="0" r="3.5" fill="#CAA668" />
        </g>
        <g transform="translate(8 -2)">
          <circle cx="0" cy="0" r="19" fill="#FFFFFF" stroke="#E2D8C8" strokeWidth="0.9" />
          <circle cx="0" cy="0" r="12" fill="#F8F2E7" />
          <circle cx="0" cy="0" r="6" fill="#EAD6AE" />
          <circle cx="0" cy="0" r="2.5" fill="#CAA668" />
        </g>
        <g transform="translate(-14 14)">
          <circle cx="0" cy="0" r="12" fill="#FCF9F3" stroke="#E4DACB" strokeWidth="0.8" />
          <circle cx="0" cy="0" r="6.5" fill="#F3E9D6" />
          <circle cx="0" cy="0" r="2.5" fill="#CAA668" />
        </g>
      </g>
    </svg>
  );
}
