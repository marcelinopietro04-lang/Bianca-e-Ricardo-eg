import React, { useEffect } from 'react';
import {
  CalendarPlus,
  MapPin,
  Sparkles,
  WineOff,
  X,
} from 'lucide-react';

export const GARDEN_MAPS_URL =
  'https://www.google.com/maps/place/Garden/@-16.6887245,-49.3894393,17z/data=!3m1!4b1!4m6!3m5!1s0x935e5f3f0d128b59:0xf426ba4ce3a8dc3c!8m2!3d-16.6887297!4d-49.3868644!16s%2Fg%2F11c0p_fly7?entry=ttu&g_ep=EgoyMDI2MTExNS4wIKXMDSoASAFQAw%3D%3D';

export const RSVP_WHATSAPP_URL =
  'https://wa.me/5562994664485?text=Ol%C3%A1!%20Gostaria%20de%20confirmar%20minha%20presen%C3%A7a%20no%20casamento%20de%20Bianca%20e%20Ricardo.';

interface ModalShellProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

function ModalShell({ isOpen, onClose, title, subtitle, children }: ModalShellProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#263442]/60 backdrop-blur-[2px] p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
      onClick={onClose}
    >
      <div
        className="relative w-full sm:max-w-md bg-[#FAFBFD] text-[#3D5166] border border-[#CAA668]/65 rounded-t-2xl sm:rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-4 px-6 pt-5 pb-4 bg-[#FAFBFD]/95 backdrop-blur-sm border-b border-[#7D93AA]/25">
          <div>
            <h2 id="modal-heading" className="font-script text-3xl text-[#7D93AA] leading-tight">
              {title}
            </h2>
            {subtitle && (
              <p className="mt-0.5 text-sm text-[#5D738A]">{subtitle}</p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela"
            className="min-h-[44px] min-w-[44px] -mr-2 -mt-1 flex items-center justify-center rounded-full text-[#5D738A] hover:text-[#3D5166] hover:bg-[#EEF2F6] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#7D93AA]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function MoreInfoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const handleDownloadIcs = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Casamento 2027//PT',
      'BEGIN:VEVENT',
      'UID:casamento-2027@convite',
      'DTSTAMP:20261112T120000Z',
      'DTSTART:20270320T194500Z',
      'DTEND:20270321T030000Z',
      'SUMMARY:Casamento de Bianca & Ricardo',
      'DESCRIPTION:Chegada dos convidados às 16:45, Recepção às 18:30 e Jantar às 20:00 no Garden Espaço.',
      'LOCATION:Garden Espaço - Setor Conjunto Vera Cruz 2, Goiânia - GO',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'convite-casamento.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Mais Informações"
      subtitle="Orientações para o grande dia"
    >
      <div className="space-y-4 text-[#3D5166]">
        <div className="rounded-xl bg-[#EEF2F6] border border-[#CAA668]/45 p-4 space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-[#7D93AA] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#CAA668]" /> Traje Recomendado
          </p>
          <p className="text-base font-semibold">Passeio Completo</p>
          <p className="text-sm text-[#5D738A]">
            Sugerimos tons suaves e tecidos leves, evitando branco e marfim reservados à noiva.
          </p>
        </div>

        <div className="rounded-xl bg-[#EEF2F6] border border-[#CAA668]/45 p-4 space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-[#7D93AA] font-semibold">
            Pontualidade &amp; Recepção
          </p>
          <p className="text-sm text-[#5D738A]">
            A chegada dos convidados começa às 16:45, seguida pela recepção às 18:30 e jantar às 20:00.
          </p>
        </div>

        <div className="rounded-xl bg-[#EEF2F6] border border-[#CAA668]/45 p-4 space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-[#7D93AA] font-semibold flex items-center gap-1.5">
            <WineOff className="w-3.5 h-3.5 text-[#CAA668]" /> Bebidas &amp; Celebração
          </p>
          <p className="text-sm text-[#5D738A]">
            Não será permitido o consumo de bebidas alcoólicas durante o casamento.
          </p>
        </div>

        <div className="rounded-xl bg-[#EEF2F6] border border-[#CAA668]/45 p-4 space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-[#7D93AA] font-semibold flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#CAA668]" /> Local do Evento
          </p>
          <p className="text-base font-semibold">Garden Espaço</p>
          <p className="text-sm text-[#5D738A]">
            Setor Conjunto Vera Cruz 2 ·{' '}
            <a
              href={GARDEN_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-[#3D5166]"
            >
              Ver localização no mapa
            </a>
          </p>
        </div>

        <button
          type="button"
          onClick={handleDownloadIcs}
          className="w-full min-h-[46px] px-4 py-2.5 rounded-lg bg-[#7D93AA] text-white hover:bg-[#6A8098] border border-[#CAA668]/50 text-sm font-medium tracking-[0.14em] uppercase flex items-center justify-center gap-2 transition-colors"
        >
          <CalendarPlus className="w-4 h-4" />
          Salvar Data na Agenda
        </button>
      </div>
    </ModalShell>
  );
}
