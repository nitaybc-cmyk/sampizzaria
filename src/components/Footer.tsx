import { CONTATO } from '../data';
import { Phone, MapPin, Clock, CalendarDays, Receipt } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-brown text-cream pt-14 pb-10 px-4 md:px-8 border-t border-brand-brown-dark/20 relative">
      <div className="max-w-4xl mx-auto space-y-10 text-center">
        {/* Name brand display */}
        <div>
          <h2 className="font-serif text-3xl font-black italic tracking-tight text-brand-gold mb-2">
            {CONTATO.nome}
          </h2>
          <div className="w-12 h-1 bg-brand-red mx-auto rounded-full" />
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm max-w-3xl mx-auto">
          {/* Working Hours */}
          <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-1">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-cream">
              Horário de Funcionamento
            </h4>
            <p className="text-cream/80 text-xs leading-relaxed max-w-[200px]">
              Segunda: 18h às 23h<br />
              Terça: Fechado para descanso<br />
              Quarta a Domingo: 18h às 23h30
            </p>
          </div>

          {/* Location details */}
          <div className="space-y-3 bg-white/5 p-5 rounded-2xl border border-white/10 flex flex-col items-center">
            <div className="w-10 h-10 rounded-full bg-brand-gold/15 flex items-center justify-center text-brand-gold mb-1">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-serif font-bold text-base text-cream">
              Endereço Tradicional
            </h4>
            <p className="text-cream/80 text-xs leading-relaxed max-w-[250px]">
              {CONTATO.endereco}
            </p>
          </div>
        </div>

        {/* Extra Information Warning banner */}
        <div className="max-w-2xl mx-auto border border-dashed border-white/15 bg-white/5 rounded-2xl p-4 text-[11px] text-cream/70 leading-relaxed text-center space-y-1">
          <p>
            📌 <strong>Consulte a taxa de entrega para o seu bairro pelo WhatsApp.</strong>
          </p>
          <p>
            Fotos meramente ilustrativas. Aceitamos cartões de crédito, débito e PIX. Preços válidos até a próxima edição do cardápio.
          </p>
        </div>

        {/* Small copyright disclaimer */}
        <div className="pt-4 border-t border-white/5 text-[10px] text-cream/50">
          <p>© {new Date().getFullYear()} Pizzaria Sam. Todos os direitos reservados. Massa fina e crocante artesanal desde sempre.</p>
        </div>
      </div>
    </footer>
  );
}
