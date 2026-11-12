import React from 'react';

export function ChurchIllustration({ className = 'w-14 h-14' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Crosses */}
      <path d="M40 7V15M37.5 10H42.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M23 23V28M21.2 25H24.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M57 23V28M55.2 25H58.8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
      {/* Center spire */}
      <path d="M32 32L40 15L48 32" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <rect x="33" y="32" width="14" height="14" stroke="currentColor" strokeWidth="1.1" />
      <circle cx="40" cy="39" r="3" stroke="currentColor" strokeWidth="1.1" />
      {/* Side towers */}
      <path d="M17 38L23 28L29 38" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M51 38L57 28L63 38" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M18 38V68H62V38" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M29 38V68M51 38V68" stroke="currentColor" strokeWidth="1" />
      {/* Central gable & rose window */}
      <path d="M29 46L40 37L51 46" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="40" cy="48" r="2.5" stroke="currentColor" strokeWidth="1" />
      {/* Arched doors & side windows */}
      <path d="M35.5 68V59C35.5 56.5 37.5 54.5 40 54.5C42.5 54.5 44.5 56.5 44.5 59V68" stroke="currentColor" strokeWidth="1.2" />
      <path d="M40 54.5V68" stroke="currentColor" strokeWidth="0.9" />
      <path d="M22 52V46.5C22 45.4 22.7 44.5 23.5 44.5C24.3 44.5 25 45.4 25 46.5V52H22Z" stroke="currentColor" strokeWidth="1" />
      <path d="M55 52V46.5C55 45.4 55.7 44.5 56.5 44.5C57.3 44.5 58 45.4 58 46.5V52H55Z" stroke="currentColor" strokeWidth="1" />
      <path d="M22 63V58C22 57 22.7 56.2 23.5 56.2C24.3 56.2 25 57 25 58V63H22Z" stroke="currentColor" strokeWidth="1" />
      <path d="M55 63V58C55 57 55.7 56.2 56.5 56.2C57.3 56.2 58 57 58 58V63H55Z" stroke="currentColor" strokeWidth="1" />
      {/* Ground line */}
      <path d="M12 68H68" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function ScheduleChurchIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <path d="M24 5V10M22 7H26" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M18 20L24 10L30 20" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M10 25L18 20V41H30V20L38 25" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M10 25V41H38V25" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <circle cx="24" cy="23" r="2.2" stroke="currentColor" strokeWidth="1.1" />
      <path d="M21 41V34C21 32.3 22.3 31 24 31C25.7 31 27 32.3 27 34V41" stroke="currentColor" strokeWidth="1.2" />
      <path d="M13 33V30M15 33V30M33 33V30M35 33V30" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function ChampagneFlutesIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Left flute */}
      <path d="M15 11L19.5 9.5L22.5 21.5C23 23.5 21.8 25.5 19.8 26C17.8 26.5 15.8 25.3 15.3 23.3L15 11Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M19.8 26L22.5 36.5M18 37.5L26.5 35.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Right flute */}
      <path d="M33 11L28.5 9.5L25.5 21.5C25 23.5 26.2 25.5 28.2 26C30.2 26.5 32.2 25.3 32.7 23.3L33 11Z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M28.2 26L25.5 36.5M21.5 35.5L30 37.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Sparkle lines */}
      <path d="M24 5V7.5M20 6.5L21.5 8M28 6.5L26.5 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export function PlateCutleryIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Fork left */}
      <path d="M10 13V21C10 22.8 11.2 24 12.5 24V37" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 13V21M15 13V21C15 22.8 13.8 24 12.5 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      {/* Plate center */}
      <circle cx="24" cy="25" r="9" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="24" cy="25" r="5.5" stroke="currentColor" strokeWidth="1" />
      {/* Knife right */}
      <path d="M37 13C38.5 16 38.5 22 37 25V37" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M37 13V25" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function WeddingCakeIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      {/* Topper */}
      <path d="M24 9V13M22 10.5C22 9.4 23 8.5 24 9.5C25 8.5 26 9.4 26 10.5C26 12 24 13 24 13C24 13 22 12 22 10.5Z" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
      {/* Tier 1 */}
      <rect x="18" y="14" width="12" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" />
      {/* Tier 2 */}
      <rect x="14" y="21" width="20" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
      {/* Tier 3 */}
      <rect x="10" y="29" width="28" height="8" rx="1" stroke="currentColor" strokeWidth="1.2" />
      {/* Garland scallop */}
      <path d="M14 24.5C16 26.5 18 26.5 20 24.5C22 26.5 24 26.5 26 24.5C28 26.5 30 26.5 32 24.5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
      {/* Stand */}
      <path d="M8 37H40M24 37V41M17 41H31" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

export function GiftBoxIcon({ className = 'w-8 h-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="18" width="28" height="6" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <rect x="12" y="24" width="24" height="15" rx="1" stroke="currentColor" strokeWidth="1.3" />
      <path d="M24 18V39" stroke="currentColor" strokeWidth="1.3" />
      <path d="M24 18C24 18 19 17.5 17.5 14.5C16.5 12.5 18.2 10.5 20.5 11.5C22.5 12.4 24 18 24 18Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M24 18C24 18 29 17.5 30.5 14.5C31.5 12.5 29.8 10.5 27.5 11.5C25.5 12.4 24 18 24 18Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </svg>
  );
}
