import { CONTATO } from '../data';

export default function Header() {
  return (
    <header className="w-full flex flex-col bg-cream relative select-none overflow-hidden" id="main-header">
      {/* Red Main Banner (Fluid Horizontal Block) */}
      <div className="relative w-full bg-gradient-to-r from-[#C8102E] via-[#E51B1B] to-[#C8102E] py-6 md:py-8 px-4 flex flex-col items-center justify-center shadow-sm">
        {/* Glamour gloss glow effect in background */}
        <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
        
        {/* Subtle decorative curved lines to evoke the original branding */}
        <div className="absolute bottom-[10%] left-[-10%] right-[-10%] h-[20px] border-b border-white/10 rounded-[50%] pointer-events-none" />
        <div className="absolute bottom-[30%] left-[-20%] right-[-20%] h-[30px] border-b border-white/5 rounded-[50%] pointer-events-none" />

        {/* Content Container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* PIZZARIA label (smaller, elegant, uppercase, spaced, nested above) */}
          <span className="text-[10px] md:text-xs font-sans font-black tracking-[0.45em] text-black select-none uppercase mb-1">
            PIZZARIA
          </span>

          {/* "Sam" in sophisticated Brush Calligraphy with sharp white stroke outline */}
          <div className="relative flex items-center justify-center select-none h-14 md:h-16">
            {/* White outline backdrop */}
            <span 
              className="font-cursive text-5xl md:text-6xl font-extrabold italic select-none text-white text-center leading-none"
              style={{
                fontFamily: '"Playball", cursive',
                WebkitTextStroke: '6px white',
                paintOrder: 'stroke fill',
              }}
            >
              Sam
            </span>
            {/* Sharp black fill */}
            <span 
              className="absolute font-cursive text-5xl md:text-6xl font-extrabold italic select-none text-black text-center leading-none"
              style={{
                fontFamily: '"Playball", cursive',
              }}
            >
              Sam
            </span>
          </div>
        </div>
      </div>

      {/* Sleek Black Ribbon */}
      <div className="w-full bg-[#0d0d0d] border-t border-white/10 py-3 px-4 shadow-md flex items-center justify-center relative z-10">
        <p className="text-[9px] md:text-xs font-sans font-bold tracking-[0.18em] md:tracking-[0.28em] text-white text-center leading-tight uppercase select-none italic">
          MASSA FINA E CROCANTE <span className="text-[#E51B1B] mx-1 md:mx-2">•</span> NÃO CONTÉM FERMENTO
        </p>
      </div>
    </header>
  );
}
