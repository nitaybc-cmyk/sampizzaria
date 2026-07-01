import { Pizza, Beirute, Bebida } from '../types';
import { Plus, Sparkles } from 'lucide-react';

interface MenuCardProps {
  key?: string;
  pizza?: Pizza;
  beirute?: Beirute;
  bebida?: Bebida;
  category?: 'tradicionais' | 'especiais' | 'doces' | 'beirutes' | 'bebidas';
  onAddPizza?: (pizza: Pizza, size: 'normal' | 'broto') => void;
  onOpenHalf?: (pizza: Pizza, category: string) => void;
  onAddBeirute?: (beirute: Beirute) => void;
  onAddBebida?: (bebida: Bebida) => void;
  activeSelection?: {
    cartItemId: string;
    cod1: string;
    nome1: string;
    ing1: string;
    size: 'normal' | 'broto';
    isSweet: boolean;
  } | null;
  onSelectSecondFlavor?: (pizza: Pizza) => void;
}

export default function MenuCard({
  pizza,
  beirute,
  bebida,
  category,
  onAddPizza,
  onOpenHalf,
  onAddBeirute,
  onAddBebida,
  activeSelection,
  onSelectSecondFlavor,
}: MenuCardProps) {
  // Format local currency (Real BRL)
  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  if (pizza && category) {
    const isEditingMeio = !!activeSelection;
    const isCompatible = isEditingMeio && (
      (activeSelection!.isSweet && category === 'doces') ||
      (!activeSelection!.isSweet && category !== 'doces')
    );

    let cardClass = "flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 md:p-5 bg-white border rounded-2xl transition duration-200 shadow-xs";
    if (isEditingMeio) {
      if (isCompatible) {
        cardClass += " border-brand-gold bg-brand-gold/[0.03] shadow-md scale-[1.01] hover:border-brand-red/50";
      } else {
        cardClass += " opacity-40 border-brand-brown/5 cursor-not-allowed grayscale-[30%]";
      }
    } else {
      cardClass += " border-brand-brown/5 hover:border-brand-red/30 hover:shadow-sm";
    }

    return (
      <div 
        className={cardClass}
        id={`menu-item-${pizza.cod}`}
      >
        {/* LEFT COLUMN: Name, ingredients and badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Number Code Badge */}
            <span className="text-[10px] font-sans font-extrabold text-brand-brown bg-brand-gold px-1.5 py-0.5 rounded-md select-none shadow-2xs uppercase tracking-wide">
              #{pizza.cod}
            </span>
            <h3 className="font-sans font-semibold text-sm md:text-base text-brand-brown leading-tight">
              {pizza.nome}
            </h3>
            {category === 'especiais' && (
              <span className="text-[9px] bg-brand-red/10 text-brand-red font-bold uppercase px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0 animate-pulse">
                <Sparkles className="w-2.5 h-2.5 fill-brand-red/10" />
                Especial
              </span>
            )}
          </div>

          <p className="text-[11px] md:text-xs text-brand-brown/70 leading-relaxed font-sans font-light mt-1.5 select-none lines-clamp-2">
            {pizza.ing}
          </p>
        </div>

        {/* RIGHT COLUMN: Two beautiful explicit choice buttons OR single 2nd flavor button */}
        {isEditingMeio ? (
          <div className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-[150px]">
            {isCompatible ? (
              <button
                onClick={() => onSelectSecondFlavor?.(pizza)}
                className="w-full flex-1 min-h-[76px] py-3 px-3 flex flex-col items-center justify-center bg-brand-red hover:bg-brand-red-dark text-cream rounded-xl cursor-pointer transition-all border border-transparent shadow-xs hover:shadow-md hover:scale-[1.02]"
                id={`select-2nd-${pizza.cod}`}
                title={`Adicionar ${pizza.nome} como segundo sabor`}
              >
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-cream/80">
                  Meio a Meio
                </span>
                <span className="text-[11px] font-black text-center mt-1 leading-tight uppercase tracking-wider">
                  + Adicionar como 2º Sabor
                </span>
              </button>
            ) : (
              <div
                className="w-full flex-1 min-h-[76px] py-3 px-3 flex flex-col items-center justify-center bg-brand-brown/5 text-brand-brown/50 rounded-xl border border-dashed border-brand-brown/10 select-none cursor-not-allowed"
              >
                <span className="text-[9px] font-bold uppercase tracking-wider text-center leading-tight">
                  Incompatível com o 1º sabor
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-row sm:flex-col gap-2 shrink-0 w-full sm:w-[150px]">
            {/* Add Pizza Inteira button */}
            <button
              onClick={() => onAddPizza?.(pizza, 'normal')}
              className="flex-1 flex flex-col items-center justify-center bg-brand-brown/5 hover:bg-brand-red text-brand-brown hover:text-white py-2 px-3 rounded-xl cursor-pointer transition-all border border-transparent shadow-2xs hover:shadow-sm group/inteira"
              id={`add-normal-${pizza.cod}`}
              title="Adicionar Pizza Inteira ao pedido"
            >
              <span className="text-[9px] font-bold uppercase tracking-wider text-brand-brown/50 group-hover/inteira:text-white/80 font-serif">Pizza Inteira</span>
              <span className="text-xs font-bold font-sans mt-0.5 text-brand-red-dark group-hover/inteira:text-white">{formatMoney(pizza.normal)}</span>
            </button>

            {/* Add Broto button */}
            <button
              onClick={() => onAddPizza?.(pizza, 'broto')}
              className="flex-1 flex flex-col items-center justify-center bg-brand-brown/5 hover:bg-brand-red text-brand-brown hover:text-white py-2 px-3 rounded-xl cursor-pointer transition-all border border-transparent shadow-2xs hover:shadow-sm group/broto"
              id={`add-broto-${pizza.cod}`}
              title="Adicionar Pizza Broto ao pedido"
            >
              <span className="text-[9px] font-bold uppercase tracking-wider text-brand-brown/50 group-hover/broto:text-white/80 font-serif">Broto</span>
              <span className="text-xs font-bold font-sans mt-0.5 text-brand-red-dark group-hover/broto:text-white">{formatMoney(pizza.broto)}</span>
            </button>
          </div>
        )}
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
            <span className="text-[10px] font-sans font-extrabold text-brand-brown bg-brand-gold px-1.5 py-0.5 rounded-md select-none shadow-2xs uppercase tracking-wide">
              #{beirute.cod}
            </span>
            <h3 className="font-sans font-semibold text-sm md:text-base text-brand-brown leading-tight select-none">
              Beirute {beirute.nome}
            </h3>
          </div>
          <p className="text-[11px] md:text-xs text-brand-brown/70 leading-relaxed font-sans font-light mt-1 select-none whitespace-normal break-words">
            {beirute.ing}
          </p>
        </div>

        {/* RIGHT COLUMN: Beirute unique price action button */}
        <div className="flex flex-col gap-1 w-[125px] md:w-[145px] shrink-0 text-center">
          <div className="mb-1 leading-none">
            <span className="block text-[8px] uppercase font-bold text-brand-brown/40 tracking-wider font-serif">
              Preço único
            </span>
            <span className="font-sans font-bold text-xs md:text-sm text-brand-red-dark">
              {formatMoney(beirute.preco)}
            </span>
          </div>

          <button
            onClick={() => onAddBeirute?.(beirute)}
            className="flex items-center justify-center gap-1 bg-brand-red hover:bg-brand-red-dark text-cream font-bold text-[10px] md:text-xs py-1.5 px-2.5 rounded-xl cursor-pointer transition-colors shadow-2xs font-serif uppercase tracking-wider"
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

  if (bebida) {
    return (
      <div 
        className="flex gap-4 items-center bg-white border border-brand-brown/5 hover:border-brand-red-dark/30 rounded-2xl p-3 md:p-4 transition-all duration-200 shadow-xs hover:shadow-sm"
        id={`menu-item-bebida-${bebida.cod}`}
      >
        {/* CENTER COLUMN: Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Number Code Badge */}
            <span className="text-[10px] font-sans font-extrabold text-brand-brown bg-brand-gold px-1.5 py-0.5 rounded-md select-none shadow-2xs uppercase tracking-wide">
              #{bebida.cod}
            </span>
            <h3 className="font-sans font-semibold text-sm md:text-base text-brand-brown leading-tight select-none">
              {bebida.nome}
            </h3>
          </div>
          {/* Subcategory badge */}
          <span className="inline-block mt-1.5 text-[9px] uppercase tracking-wider font-extrabold text-brand-brown/50 bg-brand-brown/5 px-2.5 py-0.5 rounded-full select-none font-serif">
            {bebida.subcategoria}
          </span>
        </div>

        {/* RIGHT COLUMN: Price & Action */}
        <div className="flex flex-col gap-1 w-[125px] md:w-[145px] shrink-0 text-center">
          <div className="mb-1 leading-none">
            <span className="block text-[8px] uppercase font-bold text-brand-brown/40 tracking-wider font-serif">
              Preço
            </span>
            <span className="font-sans font-bold text-xs md:text-sm text-brand-red-dark">
              {formatMoney(bebida.preco)}
            </span>
          </div>

          <button
            onClick={() => onAddBebida?.(bebida)}
            className="flex items-center justify-center gap-1 bg-brand-red hover:bg-brand-red-dark text-cream font-bold text-[10px] md:text-xs py-1.5 px-2.5 rounded-xl cursor-pointer transition-colors shadow-2xs font-serif uppercase tracking-wider"
            id={`add-bebida-${bebida.cod}`}
            title="Adicionar Bebida ao pedido"
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
