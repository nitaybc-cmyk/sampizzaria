import { Phone, Instagram, ShieldCheck, Heart } from 'lucide-react';
import { CONTATO } from '../data';

export default function Header() {
  return (
    <header className="relative bg-brand-red text-cream pt-14 pb-20 px-4 md:px-8 text-center overflow-hidden">
      {/* Wave bottom decoration */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[140%] h-[70px] bg-cream rounded-t-[50%] scale-x-[1.3] pointer-events-none"
        style={{ borderTop: '1px solid rgba(46,26,15,0.06)' }}
      />

      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
        {/* Brand Name */}
        <h1 className="text-5xl md:text-7xl font-serif font-black italic tracking-tight leading-none text-cream mb-3 drop-shadow-sm select-none">
          {CONTATO.nome}
        </h1>

        {/* Slogan */}
        <p className="text-base md:text-lg font-medium text-cream/90 max-w-prose italic">
          {CONTATO.slogan}
        </p>
      </div>
    </header>
  );
}
