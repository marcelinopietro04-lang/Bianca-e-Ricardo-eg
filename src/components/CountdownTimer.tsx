import React, { useEffect, useState } from 'react';

const SAO_PAULO_TIMEZONE = 'America/Sao_Paulo';
// Target: 20 de Março de 2027 às 15:00 no horário de São Paulo
const TARGET_SP_WALL_MS = Date.UTC(2027, 2, 20, 15, 0, 0);

const saoPauloFormatter = new Intl.DateTimeFormat('en-US', {
  timeZone: SAO_PAULO_TIMEZONE,
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hourCycle: 'h23',
});

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function getSaoPauloNowWallMs(): number {
  try {
    const parts = saoPauloFormatter.formatToParts(new Date());
    const map: Record<string, number> = {};
    for (const part of parts) {
      if (part.type !== 'literal') {
        map[part.type] = Number(part.value);
      }
    }
    const hour = map.hour === 24 ? 0 : map.hour;
    return Date.UTC(map.year, map.month - 1, map.day, hour, map.minute, map.second);
  } catch {
    // Fallback to UTC-03:00 offset if Intl timeZone is unavailable
    return Date.now() - 3 * 60 * 60 * 1000;
  }
}

function calculateTimeLeft(): TimeLeft {
  const diff = TARGET_SP_WALL_MS - getSaoPauloNowWallMs();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
  };
}

function pad(n: number): string {
  return String(n).padStart(2, '0');
}

export function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft());

  useEffect(() => {
    const refresh = () => setTimeLeft(calculateTimeLeft());
    refresh();

    const timer = window.setInterval(refresh, 1000);
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);

    return () => {
      window.clearInterval(timer);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  if (timeLeft.isPast) {
    return (
      <p className="text-sm tracking-[0.2em] uppercase text-[#4B6076] font-medium">
        O grande dia chegou!
      </p>
    );
  }

  const units = [
    { value: String(timeLeft.days), label: 'DIAS' },
    { value: pad(timeLeft.hours), label: 'HORAS' },
    { value: pad(timeLeft.minutes), label: 'MINUTOS' },
    { value: pad(timeLeft.seconds), label: 'SEGUNDOS' },
  ];

  return (
    <div
      className="flex items-start justify-center gap-2.5 sm:gap-3.5 tabular-nums select-none"
      aria-label={`Faltam ${timeLeft.days} dias, ${timeLeft.hours} horas, ${timeLeft.minutes} minutos e ${timeLeft.seconds} segundos para 20 de março de 2027 no horário de São Paulo`}
    >
      {units.map((unit, index) => (
        <React.Fragment key={unit.label}>
          <div className="flex flex-col items-center min-w-[46px]">
            <span className="text-[22px] sm:text-[25px] leading-none font-normal text-[#3D5166] tracking-[0.04em]">
              {unit.value}
            </span>
            <span className="mt-1.5 text-[8.5px] sm:text-[9px] tracking-[0.18em] text-[#7D93AA] uppercase font-semibold">
              {unit.label}
            </span>
          </div>
          {index < units.length - 1 && (
            <span
              className="text-[20px] sm:text-[22px] leading-none text-[#CAA668] pt-0.5 font-semibold"
              aria-hidden="true"
            >
              :
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
