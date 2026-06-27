import { Pizza, Beirute } from '../types';
import { Plus, Sparkles } from 'lucide-react';

interface MenuCardProps {
  key?: string;
  pizza?: Pizza;
  beirute?: Beirute;
  category?: 'tradicionais' | 'especiais' | 'doces' | 'beirutes';
  onAddPizza?: (pizza: Pizza, size: 'normal' | 'broto') => void;
  onOpenHalf?: (pizza: Pizza, category: string) => void;
  onAddBeirute?: (beirute: Beirute) => void;
}

export default function MenuCard({
  pizza,
  beirute,
  category,
  onAddPizza,
  onOpenHalf,
  onAddBeirute,
}: MenuCardProps) {
  // Format local currency (Real BRL)
  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  if (pizza && category) {
    return (
      <div 
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 bg-white border border-brand-brown/5 hover:border-brand-red/30 rounded-2xl transition duration-200 shadow-xs hover:shadow-sm"
        id={`menu-item-${pizza.cod}`}
      >
        {/* LEFT COLUMN: Name, ingredients and badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Number Code Badge */}
            <span className="text-[10px] font-mono font-black text-brand-brown bg-brand-gold px-1.5 py-0.5 rounded-md select-none shadow-2xs">
              #{pizza.cod}
            </span>
            <h3 className="font-sans font-extrabold text-sm md:text-base text-brand-brown leading-tight">
              {pizza.nome}
            </h3>
            {category === 'especiais' && (
              <span className="text-[9px] bg-brand-red/10 text-brand-red font-bold uppercase px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0 animate-pulse">
                <Sparkles className="w-2.5 h-2.5 fill-brand-red/10" />
                Especial
              </span>
            )}
          </div>

          <p className="text-[11px] md:text-xs text-brand-brown/70 leading-normal font-sans italic mt-1.5 select-none lines-clamp-2">
            {pizza.ing}
          </p>
        </div>

        {/* RIGHT COLUMN: Two beautiful explicit choice buttons */}
        <div className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-[150px]">
          {/* Add Pizza Inteira button */}
          <button
            onClick={() => onAddPizza?.(pizza, 'normal')}
            className="flex-1 flex flex-col items-center justify-center bg-brand-brown/5 hover:bg-brand-red text-brand-brown hover:text-white py-2 px-3 rounded-xl cursor-pointer transition-all border border-transparent shadow-2xs hover:shadow-sm group/inteira"
            id={`add-normal-${pizza.cod}`}
            title="Adicionar Pizza Inteira ao pedido"
          >
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-brown/50 group-hover/inteira:text-white/80">Pizza Inteira</span>
            <span className="text-xs font-black font-serif mt-0.5">{formatMoney(pizza.normal)}</span>
          </button>

          {/* Add Broto button */}
          <button
            onClick={() => onAddPizza?.(pizza, 'broto')}
            className="flex-1 flex flex-col items-center justify-center bg-brand-brown/5 hover:bg-brand-red text-brand-brown hover:text-white py-2 px-3 rounded-xl cursor-pointer transition-all border border-transparent shadow-2xs hover:shadow-sm group/broto"
            id={`add-broto-${pizza.cod}`}
            title="Adicionar Pizza Broto ao pedido"
          >
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-brown/50 group-hover/broto:text-white/80">Broto</span>
            <span className="text-xs font-black font-serif mt-0.5">{formatMoney(pizza.broto)}</span>
          </button>
        </div>
      </div>
    );
  }

  if (beirute) {
    return (
      <div 
        className="flex gap-4 items-start sm:items-center bg-white border border-brand-brown/5 hover:border-brand-red-dark/30 rounded-2xl p-3 md:p-4 transition-all duration-200 shadow-xs hover:shadow-sm"
        id={`menu-item-b-${beirute.cod}`}
      >
        {/* CENTER COLUMN: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Number Code Badge */}
            <span className="text-[10px] font-mono font-black text-brand-brown bg-brand-gold px-1.5 py-0.5 rounded-md select-none shadow-2xs">
              #{beirute.cod}
            </span>
            <h3 className="font-sans font-extrabold text-sm md:text-base text-brand-brown leading-tight select-none">
              Beirute {beirute.nome}
            </h3>
          </div>
          <p className="text-[11px] md:text-xs text-brand-brown/70 leading-normal font-sans italic mt-1 line-clamp-2 md:line-clamp-3 select-none">
            {beirute.ing}
          </p>
        </div>

        {/* RIGHT COLUMN: Beirute unique price action button */}
        <div className="flex flex-col gap-1 w-[125px] md:w-[145px] shrink-0 text-center">
          <div className="mb-1 leading-none">
            <span className="block text-[8px] uppercase font-bold text-brand-brown/40 tracking-wider">
              Preço único
            </span>
            <span className="font-serif font-black text-xs md:text-sm text-brand-red-dark">
              {formatMoney(beirute.preco)}
            </span>
          </div>

          <button
            onClick={() => onAddBeirute?.(beirute)}
            className="flex items-center justify-center gap-1 bg-brand-red hover:bg-brand-red-dark text-cream font-bold text-[10px] md:text-xs py-1.5 px-2.5 rounded-xl cursor-pointer transition-colors shadow-2xs"
            id={`add-beirute-${beirute.cod}`}
            title="Adicionar Beirute ao pedido"
          >
            <Plus className="w-3 h-3 shrink-0" />
            Adicionar
          </button>
        </div>
      </div>
    );
  }

  return null;
}
