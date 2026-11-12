import React, { useEffect, useState } from 'react';
import {
  CalendarPlus,
  Check,
  Copy,
  Gift,
  Heart,
  MapPin,
  Navigation,
  Sparkles,
  Users,
  X,
} from 'lucide-react';

export interface RsvpSubmission {
  name: string;
  contact: string;
  attending: 'yes' | 'no';
  guests: number;
  message: string;
  submittedAt: string;
}

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

export function MapModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const fullAddress = 'Igreja Santa Luzia — Rua das Flores, 123, Jardim Paulista';

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Local da Cerimônia"
      subtitle="20 de Março de 2027 · 15:00"
    >
      <div className="space-y-5">
        <div className="rounded-xl border border-[#7D93AA]/30 bg-[#EEF2F6] p-4 space-y-2">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-[#CAA668] shrink-0 mt-0.5" />
            <div>
              <p className="text-base font-semibold tracking-wide uppercase text-[#3D5166]">
                Igreja Santa Luzia
              </p>
              <p className="text-sm text-[#5D738A] mt-0.5">
                Rua das Flores, 123 · Jardim Paulista
              </p>
              <p className="text-xs text-[#6B8096] mt-1">
                Estacionamento com serviço de manobrista na entrada lateral.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl overflow-hidden border border-[#CAA668]/45 bg-[#EEF2F6]">
          <div className="p-4 flex items-center justify-between gap-3">
            <span className="text-sm text-[#3D5166] truncate">{fullAddress}</span>
            <button
              type="button"
              onClick={handleCopy}
              className="min-h-[40px] px-3 py-1.5 rounded-lg border border-[#CAA668] bg-[#FAFBFD] hover:bg-white text-xs font-medium tracking-wide uppercase text-[#3D5166] flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors focus-visible:outline-2 focus-visible:outline-[#7D93AA]"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#7D93AA]" /> : <Copy className="w-3.5 h-3.5 text-[#CAA668]" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <a
            href="https://maps.google.com/?q=Igreja+Santa+Luzia+Rua+das+Flores+123"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2.5 rounded-lg bg-[#7D93AA] text-white hover:bg-[#6A8098] text-sm font-medium tracking-wider uppercase flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
          >
            <Navigation className="w-4 h-4" />
            Google Maps
          </a>
          <a
            href="https://waze.com/ul?q=Rua+das+Flores+123"
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] px-4 py-2.5 rounded-lg border border-[#CAA668] text-[#3D5166] hover:bg-[#EEF2F6] text-sm font-medium tracking-wider uppercase flex items-center justify-center gap-2 whitespace-nowrap transition-colors"
          >
            <MapPin className="w-4 h-4 text-[#CAA668]" />
            Abrir no Waze
          </a>
        </div>
      </div>
    </ModalShell>
  );
}

interface RsvpModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedRsvp: RsvpSubmission | null;
  onSaveRsvp: (data: RsvpSubmission) => void;
}

export function RsvpModal({ isOpen, onClose, savedRsvp, onSaveRsvp }: RsvpModalProps) {
  const [editing, setEditing] = useState(!savedRsvp);
  const [name, setName] = useState(savedRsvp?.name ?? '');
  const [contact, setContact] = useState(savedRsvp?.contact ?? '');
  const [attending, setAttending] = useState<'yes' | 'no'>(savedRsvp?.attending ?? 'yes');
  const [guests, setGuests] = useState(savedRsvp?.guests ?? 2);
  const [message, setMessage] = useState(savedRsvp?.message ?? '');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setEditing(!savedRsvp);
      setName(savedRsvp?.name ?? '');
      setContact(savedRsvp?.contact ?? '');
      setAttending(savedRsvp?.attending ?? 'yes');
      setGuests(savedRsvp?.guests ?? 2);
      setMessage(savedRsvp?.message ?? '');
      setError('');
    }
  }, [isOpen, savedRsvp]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    const submission: RsvpSubmission = {
      name: name.trim(),
      contact: contact.trim(),
      attending,
      guests: attending === 'yes' ? guests : 0,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };
    onSaveRsvp(submission);
    setEditing(false);
    setError('');
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Presença"
      subtitle="Por favor, confirme até 20 de Fevereiro de 2027"
    >
      {!editing && savedRsvp ? (
        <div className="space-y-5 text-center py-2">
          <div className="w-12 h-12 rounded-full bg-[#7D93AA] text-white border-2 border-[#CAA668] flex items-center justify-center mx-auto">
            <Check className="w-6 h-6" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-xl font-semibold text-[#3D5166]">
              {savedRsvp.attending === 'yes'
                ? 'Presença Confirmada!'
                : 'Resposta Registrada'}
            </h3>
            <p className="text-base text-[#5D738A]">
              {savedRsvp.attending === 'yes'
                ? `Agradecemos muito, ${savedRsvp.name}. Será uma alegria celebrar esse dia com ${savedRsvp.guests === 1 ? 'você' : `vocês (${savedRsvp.guests} convidados)`}!`
                : `Sentiremos sua falta, ${savedRsvp.name}, mas agradecemos imensamente pelo carinho.`}
            </p>
          </div>
          {savedRsvp.message && (
            <blockquote className="rounded-xl bg-[#EEF2F6] border border-[#CAA668]/45 p-4 text-sm italic text-[#4E647B]">
              “{savedRsvp.message}”
            </blockquote>
          )}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => setEditing(true)}
              className="flex-1 min-h-[44px] px-4 py-2 rounded-lg border border-[#CAA668] text-[#3D5166] hover:bg-[#EEF2F6] text-sm font-medium tracking-wider uppercase transition-colors"
            >
              Alterar Resposta
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 min-h-[44px] px-4 py-2 rounded-lg bg-[#7D93AA] text-white hover:bg-[#6A8098] text-sm font-medium tracking-wider uppercase transition-colors"
            >
              Fechar
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-[#9F3E3E]/10 border border-[#9F3E3E]/30 px-3.5 py-2.5 text-sm text-[#852E2E]">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="rsvp-name" className="block text-xs uppercase tracking-[0.16em] text-[#5D738A] font-semibold mb-1.5">
              Nome Completo *
            </label>
            <input
              id="rsvp-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Ex.: Mariana Oliveira"
              className="w-full min-h-[44px] px-3.5 py-2 rounded-lg bg-white border border-[#7D93AA]/45 text-base text-[#3D5166] placeholder:text-[#98A8B8] focus:outline-none focus:border-[#7D93AA]"
            />
          </div>

          <div>
            <label htmlFor="rsvp-contact" className="block text-xs uppercase tracking-[0.16em] text-[#5D738A] font-semibold mb-1.5">
              WhatsApp ou E-mail
            </label>
            <input
              id="rsvp-contact"
              type="text"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full min-h-[44px] px-3.5 py-2 rounded-lg bg-white border border-[#7D93AA]/45 text-base text-[#3D5166] placeholder:text-[#98A8B8] focus:outline-none focus:border-[#7D93AA]"
            />
          </div>

          <div>
            <span className="block text-xs uppercase tracking-[0.16em] text-[#5D738A] font-semibold mb-1.5">
              Você poderá comparecer?
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => setAttending('yes')}
                className={`min-h-[44px] px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  attending === 'yes'
                    ? 'bg-[#7D93AA] text-white border-[#7D93AA]'
                    : 'bg-white text-[#5D738A] border-[#7D93AA]/40 hover:bg-[#EEF2F6]'
                }`}
              >
                Sim, estarei lá
              </button>
              <button
                type="button"
                onClick={() => setAttending('no')}
                className={`min-h-[44px] px-3 py-2 rounded-lg border text-sm font-medium transition-colors ${
                  attending === 'no'
                    ? 'bg-[#7D93AA] text-white border-[#7D93AA]'
                    : 'bg-white text-[#5D738A] border-[#7D93AA]/40 hover:bg-[#EEF2F6]'
                }`}
              >
                Não poderei ir
              </button>
            </div>
          </div>

          {attending === 'yes' && (
            <div>
              <label htmlFor="rsvp-guests" className="block text-xs uppercase tracking-[0.16em] text-[#5D738A] font-semibold mb-1.5">
                Número de Convidados (incluindo você)
              </label>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#CAA668] shrink-0" />
                <div className="flex gap-1.5 flex-1">
                  {[1, 2, 3, 4, 5].map((count) => (
                    <button
                      key={count}
                      type="button"
                      onClick={() => setGuests(count)}
                      className={`flex-1 min-h-[44px] rounded-lg border text-sm font-semibold tabular-nums transition-colors ${
                        guests === count
                          ? 'bg-[#7D93AA] text-white border-[#7D93AA]'
                          : 'bg-white text-[#5D738A] border-[#7D93AA]/40 hover:bg-[#EEF2F6]'
                      }`}
                    >
                      {count}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div>
            <label htmlFor="rsvp-message" className="block text-xs uppercase tracking-[0.16em] text-[#5D738A] font-semibold mb-1.5">
              Recado aos Noivos (opcional)
            </label>
            <textarea
              id="rsvp-message"
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Deixe uma mensagem especial ou restrição alimentar..."
              className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-[#7D93AA]/45 text-base text-[#3D5166] placeholder:text-[#98A8B8] focus:outline-none focus:border-[#7D93AA] resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full min-h-[48px] px-4 py-2.5 rounded-lg bg-[#7D93AA] text-white hover:bg-[#6A8098] border border-[#CAA668]/50 text-sm font-semibold tracking-[0.15em] uppercase transition-colors"
          >
            Enviar Confirmação
          </button>
        </form>
      )}
    </ModalShell>
  );
}

const GIFT_ITEMS = [
  {
    id: 'lua-de-mel',
    title: 'Jantar Romântico na Lua de Mel',
    description: 'Um brinde especial em nossa viagem de recém-casados.',
    price: 'R$ 350,00',
  },
  {
    id: 'passeio-barco',
    title: 'Passeio ao Pôr do Sol',
    description: 'Momento inesquecível navegando pela costa.',
    price: 'R$ 500,00',
  },
  {
    id: 'tacas',
    title: 'Jogo de Taças de Cristal',
    description: 'Para celebrarmos muitas conquistas em casa.',
    price: 'R$ 240,00',
  },
  {
    id: 'cota-livre',
    title: 'Contribuição com Carinho',
    description: 'Qualquer valor escolhido por você via PIX.',
    price: 'Valor Livre',
  },
];

export function GiftsModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [selectedGift, setSelectedGift] = useState<string | null>(null);
  const [copiedPix, setCopiedPix] = useState(false);
  const pixKey = 'bianca.ricardo2027@casamento.com.br';

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixKey);
      setCopiedPix(true);
      window.setTimeout(() => setCopiedPix(false), 2600);
    } catch {
      setCopiedPix(false);
    }
  };

  return (
    <ModalShell
      isOpen={isOpen}
      onClose={onClose}
      title="Lista de Presentes"
      subtitle="Sua presença é o nosso maior presente"
    >
      <div className="space-y-4">
        <p className="text-sm text-[#5D738A] leading-relaxed">
          Caso deseje nos presentear, preparamos algumas cotas simbólicas para a nossa nova fase juntos.
        </p>

        <div className="space-y-2.5">
          {GIFT_ITEMS.map((item) => {
            const isSelected = selectedGift === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedGift(item.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-colors flex items-center justify-between gap-3 min-h-[60px] ${
                  isSelected
                    ? 'bg-[#7D93AA] text-white border-[#CAA668]'
                    : 'bg-white text-[#3D5166] border-[#7D93AA]/30 hover:bg-[#EEF2F6]'
                }`}
              >
                <div className="flex items-start gap-3">
                  <Gift className={`w-5 h-5 shrink-0 mt-0.5 ${isSelected ? 'text-[#F5E0B5]' : 'text-[#CAA668]'}`} />
                  <div>
                    <p className="text-base font-semibold leading-snug">{item.title}</p>
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-white/85' : 'text-[#5D738A]'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>
                <span className="text-sm font-semibold whitespace-nowrap shrink-0 tabular-nums">
                  {item.price}
                </span>
              </button>
            );
          })}
        </div>

        <div className="rounded-xl bg-[#EEF2F6] border border-[#CAA668]/60 p-4 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-[0.16em] text-[#4B6076] font-semibold">
              Chave PIX dos Noivos
            </span>
            {selectedGift && (
              <span className="text-xs text-[#5D738A] flex items-center gap-1">
                <Heart className="w-3 h-3 text-[#CAA668]" /> Selecionado
              </span>
            )}
          </div>
          <div className="flex items-center justify-between gap-2 bg-white rounded-lg px-3 py-2 border border-[#7D93AA]/30">
            <code className="text-xs sm:text-sm text-[#3D5166] truncate select-all">
              {pixKey}
            </code>
            <button
              type="button"
              onClick={handleCopyPix}
              className="min-h-[38px] px-3 py-1.5 rounded-md bg-[#7D93AA] text-white hover:bg-[#6A8098] text-xs font-medium tracking-wide uppercase flex items-center gap-1.5 whitespace-nowrap shrink-0 transition-colors"
            >
              {copiedPix ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedPix ? 'Copiada!' : 'Copiar PIX'}
            </button>
          </div>
        </div>
      </div>
    </ModalShell>
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
      'DTSTART:20270320T180000Z',
      'DTEND:20270321T030000Z',
      'SUMMARY:Casamento de Bianca & Ricardo',
      'DESCRIPTION:Cerimônia na Igreja Santa Luzia às 15:00 seguida de Coquetel e Recepção.',
      'LOCATION:Igreja Santa Luzia - Rua das Flores, 123',
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
            A cerimônia terá início pontualmente às 15:00. Chegue com 20 minutos de antecedência para acomodação tranquila.
          </p>
        </div>

        <div className="rounded-xl bg-[#EEF2F6] border border-[#CAA668]/45 p-4 space-y-1">
          <p className="text-xs uppercase tracking-[0.16em] text-[#7D93AA] font-semibold">
            Hospedagem Sugerida
          </p>
          <p className="text-sm text-[#5D738A]">
            Hotel Villa Jardim (a 5 min da igreja) · Tarifa especial com o código CONVITE2027.
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
