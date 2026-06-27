import { useState, useEffect } from 'react';
import { TRADICIONAIS, ESPECIAIS, DOCES, BEIRUTES, CONTATO } from './data';
import { Pizza, Beirute, CartItem } from './types';
import Header from './components/Header';
import MenuCard from './components/MenuCard';
import CartModal from './components/CartModal';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Sparkles, 
  AlertCircle, 
  ChevronRight, 
  Flame, 
  Activity,
  ThumbsUp,
  Pizza as PizzaIcon,
  X
} from 'lucide-react';

const CATEGORIES = [
  { id: 'tradicionais', label: 'Tradicionais' },
  { id: 'especiais', label: 'Especiais' },
  { id: 'doces', label: 'Doces' },
  { id: 'beirutes', label: 'Beirutes' },
  { id: 'promocoes', label: 'Promoções' },
  { id: 'contato', label: 'Atendimento' },
];

export default function App() {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('sam_pizza_cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [activeCategory, setActiveCategory] = useState<string>('tradicionais');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Active selection for Meio a Meio (half and half)
  const [activeSelection, setActiveSelection] = useState<{
    cartItemId: string;
    cod1: string;
    nome1: string;
    ing1: string;
    size: 'normal' | 'broto';
    isSweet: boolean;
  } | null>(null);

  const handleStartMeioAMeio = (
    cartItemId: string,
    cod1: string,
    nome1: string,
    ing1: string,
    size: 'normal' | 'broto'
  ) => {
    const isSweet = DOCES.some((d) => d.cod === cod1);
    setActiveSelection({
      cartItemId,
      cod1,
      nome1,
      ing1,
      size,
      isSweet,
    });
    setIsCartOpen(false);

    // Scroll automatically to the category section
    const targetSection = isSweet ? 'doces' : 'tradicionais';
    setTimeout(() => {
      handleScrollToSection(targetSection);
    }, 150);
  };

  const handleSelectSecondFlavor = (pizza2: Pizza) => {
    if (!activeSelection) return;

    setCart((prev) =>
      prev.map((item) => {
        if (item.id === activeSelection.cartItemId) {
          const allPizzas = [...TRADICIONAIS, ...ESPECIAIS, ...DOCES];
          const p1 = allPizzas.find((p) => p.cod === activeSelection.cod1);
          if (!p1) return item;

          const size = activeSelection.size;
          const p1Price = size === 'broto' ? p1.broto : p1.normal;
          const p2Price = size === 'broto' ? pizza2.broto : pizza2.normal;
          const finalPrice = Math.max(p1Price, p2Price);

          return {
            ...item,
            cod2: pizza2.cod,
            nome2: pizza2.nome,
            ing2: pizza2.ing,
            price: finalPrice,
          };
        }
        return item;
      })
    );

    setActiveSelection(null);
    setIsCartOpen(true);
    triggerAdditionAnimation();
  };

  // Persist cart items in localStorage
  useEffect(() => {
    localStorage.setItem('sam_pizza_cart', JSON.stringify(cart));
  }, [cart]);

  // Handle active scroll category highlighting
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 180;
      for (const cat of CATEGORIES) {
        const el = document.getElementById(cat.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveCategory(cat.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const headerOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveCategory(id);
    }
  };

  // Cart operations
  const handleAddPizza = (pizza: Pizza, size: 'normal' | 'broto') => {
    setCart((prev) => {
      const itemKey = `pizza-${pizza.cod}-${size}`;
      const existingIdx = prev.findIndex((item) => item.id === itemKey);

      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }

      const price = size === 'broto' ? pizza.broto : pizza.normal;

      return [
        ...prev,
        {
          id: itemKey,
          type: 'pizza',
          cod1: pizza.cod,
          nome1: pizza.nome,
          size,
          ing1: pizza.ing,
          price,
          quantity: 1,
        },
      ];
    });

    // Automatically open the checkout/cart layout upon selecting the size
    setIsCartOpen(true);

    // Notify user with elegant status change
    triggerAdditionAnimation();
  };

  const handleUpdateItem = (id: string, updates: Partial<CartItem>) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  };

  const handleAddBeirute = (beirute: Beirute) => {
    setCart((prev) => {
      const itemKey = `beirute-${beirute.cod}`;
      const existingIdx = prev.findIndex((item) => item.id === itemKey);

      if (existingIdx !== -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += 1;
        return updated;
      }

      return [
        ...prev,
        {
          id: itemKey,
          type: 'beirute',
          cod1: beirute.cod,
          nome1: `Beirute ${beirute.nome}`,
          ing1: beirute.ing,
          price: beirute.preco,
          quantity: 1,
        },
      ];
    });

    triggerAdditionAnimation();
  };

  const handleUpdateQty = (id: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    if (window.confirm('Deseja realmente limpar todos os itens do carrinho?')) {
      setCart([]);
    }
  };

  // Addition anim alert state to give haptic feel
  const [showToast, setShowToast] = useState<boolean>(false);
  const triggerAdditionAnimation = () => {
    setShowToast(true);
    const audio = new Audio();
    // silent fallback or small beep if needed - otherwise purely visual
    setTimeout(() => setShowToast(false), 2000);
  };

  // Filter lists based on quick search query (Portuguese accents normalized)
  const normalize = (txt: string) => txt.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  const query = normalize(searchQuery);

  const filterPizzaList = (list: Pizza[]) => {
    if (!query) return list;
    return list.filter(
      (p) => 
        normalize(p.nome).includes(query) || 
        normalize(p.ing).includes(query) || 
        p.cod.includes(query)
    );
  };

  const filterBeiruteList = (list: Beirute[]) => {
    if (!query) return list;
    return list.filter(
      (b) => 
        normalize(b.nome).includes(query) || 
        normalize(b.ing).includes(query) || 
        b.cod.includes(query)
    );
  };

  const filteredTradicionais = filterPizzaList(TRADICIONAIS);
  const filteredEspeciais = filterPizzaList(ESPECIAIS);
  const filteredDoces = filterPizzaList(DOCES);
  const filteredBeirutes = filterBeiruteList(BEIRUTES);

  const cartTotalItems = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-brand-red selection:text-cream">
      {/* HEADER SECTION */}
      <Header />

      {/* STICKY NAV SYSTEM */}
      <nav className="sticky top-0 z-40 bg-cream/95 backdrop-blur-md border-b border-brand-brown/10 shadow-sm py-2 px-1 md:py-3 animate-fade-in">
        <div className="max-w-6xl mx-auto px-4 md:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          {/* Categories Horizontal Scroll */}
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap py-0.5 scrollbar-none scroll-smooth flex-1 min-w-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleScrollToSection(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-extrabold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-brand-red text-cream shadow-sm scale-102 font-black'
                    : 'bg-white/70 text-brand-brown/90 border border-brand-brown/10 hover:bg-brand-brown/5'
                }`}
                id={`nav-${cat.id}-btn`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Clean, sticky search input for both Mobile and Desktop */}
          <div className="relative w-full sm:max-w-[240px] shrink-0">
            <Search className="w-4 h-4 text-brand-brown/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar sabor no cardápio..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/80 border border-brand-brown/15 rounded-full pl-9 pr-8 py-1.5 text-xs text-brand-brown placeholder-brand-brown/40 focus:bg-white focus:outline-none focus:border-brand-red transition-all font-medium"
              id="sticky-search-input"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-brown/50 hover:text-brand-red p-0.5"
                id="sticky-clear-search"
                title="Limpar busca"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ACTIVE SELECTION FLOATING HEADER BANNER */}
      <AnimatePresence>
        {activeSelection && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-brand-gold text-brand-brown py-3 px-4 border-b border-brand-brown/10 font-sans shadow-inner overflow-hidden"
          >
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xl shrink-0">🍕</span>
                <p className="text-xs md:text-sm font-extrabold leading-tight text-center sm:text-left">
                  Modo Meio a Meio: Selecione o 2º sabor ({activeSelection.isSweet ? 'Doce' : 'Salgado'}) para combinar com <span className="underline italic">"{activeSelection.nome1}"</span> ({activeSelection.size === 'broto' ? 'Broto' : 'Grande'}).
                </p>
              </div>
              <button
                onClick={() => setActiveSelection(null)}
                className="bg-brand-red text-cream hover:bg-brand-red-dark text-xxs font-black uppercase tracking-wider py-1.5 px-4 rounded-full cursor-pointer transition shadow-2xs hover:scale-102"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER CONTENT */}
      <main className="max-w-6xl mx-auto px-4 md:px-6 py-6 flex-1 w-full space-y-16">
        
        {/* TRADICIONAIS SECTION */}
        <section id="tradicionais" className="scroll-mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="font-serif font-black text-3xl md:text-4xl italic text-brand-red-dark flex items-center gap-2">
              <PizzaIcon className="w-8 h-8 text-brand-red rotate-12" />
              Pizzas Tradicionais
            </h2>
            <div className="flex-1 h-0.5 bg-brand-brown/10 rounded" />
          </div>
          <p className="text-brand-brown/65 text-sm max-w-2xl font-medium leading-relaxed italic">
            Todas as pizzas contêm molho de tomate, azeitona e orégano de primeira linha. Massa fina e crocante artesanal, aberta na hora. Peça meio a meio sem custo adicional.
          </p>

          {filteredTradicionais.length === 0 ? (
            <div className="py-12 text-center text-brand-brown/50 bg-white/40 border border-dashed border-brand-brown/10 rounded-2xl text-xs md:text-sm">
              Nenhuma pizza tradicional encontrada para "{searchQuery}".
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {filteredTradicionais.map((pizza) => (
                <MenuCard
                  key={pizza.cod}
                  pizza={pizza}
                  category="tradicionais"
                  onAddPizza={handleAddPizza}
                  activeSelection={activeSelection}
                  onSelectSecondFlavor={handleSelectSecondFlavor}
                />
              ))}
            </div>
          )}
        </section>

        {/* ESPECIAIS SECTION */}
        <section id="especiais" className="scroll-mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="font-serif font-black text-3xl md:text-4xl italic text-brand-red-dark flex items-center gap-2">
              <Sparkles className="w-7 h-7 text-brand-red fill-brand-red/15" />
              Pizzas Especiais
            </h2>
            <div className="flex-1 h-0.5 bg-brand-brown/10 rounded" />
          </div>
          <p className="text-brand-brown/65 text-sm max-w-2xl font-medium leading-relaxed italic">
            Combinações premium exclusivas da Pizzaria Sam, elaboradas com ingredientes gourmet selecionados, queijos nobres e embutidos artesanais.
          </p>

          {filteredEspeciais.length === 0 ? (
            <div className="py-12 text-center text-brand-brown/50 bg-white/40 border border-dashed border-brand-brown/10 rounded-2xl text-xs md:text-sm">
              Nenhuma pizza especial encontrada para "{searchQuery}".
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {filteredEspeciais.map((pizza) => (
                <MenuCard
                  key={pizza.cod}
                  pizza={pizza}
                  category="especiais"
                  onAddPizza={handleAddPizza}
                  activeSelection={activeSelection}
                  onSelectSecondFlavor={handleSelectSecondFlavor}
                />
              ))}
            </div>
          )}
        </section>

        {/* DOCES SECTION */}
        <section id="doces" className="scroll-mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="font-serif font-black text-3xl md:text-4xl italic text-brand-red-dark flex items-center gap-2">
              <Flame className="w-7 h-7 text-brand-red fill-brand-red/15" />
              Pizzas Doces
            </h2>
            <div className="flex-1 h-0.5 bg-brand-brown/10 rounded" />
          </div>
          <p className="text-brand-brown/65 text-sm max-w-2xl font-medium leading-relaxed italic">
            Delícias preparadas com chocolates nobres de qualidade, frutas frescas selecionadas e confeitos para fechar sua refeição da melhor forma.
          </p>

          {filteredDoces.length === 0 ? (
            <div className="py-12 text-center text-brand-brown/50 bg-white/40 border border-dashed border-brand-brown/10 rounded-2xl text-xs md:text-sm">
              Nenhuma pizza doce encontrada para "{searchQuery}".
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {filteredDoces.map((pizza) => (
                <MenuCard
                  key={pizza.cod}
                  pizza={pizza}
                  category="doces"
                  onAddPizza={handleAddPizza}
                  activeSelection={activeSelection}
                  onSelectSecondFlavor={handleSelectSecondFlavor}
                />
              ))}
            </div>
          )}
        </section>

        {/* BEIRUTES SECTION */}
        <section id="beirutes" className="scroll-mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="font-serif font-black text-3xl md:text-4xl italic text-brand-red-dark flex items-center gap-2">
              <Activity className="w-7 h-7 text-brand-red" />
              Beirutes Especiais
            </h2>
            <div className="flex-1 h-0.5 bg-brand-brown/10 rounded" />
          </div>
          <p className="text-brand-brown/65 text-sm max-w-2xl font-medium leading-relaxed italic">
            Beirutes elaborados em pão sírio artesanal leve e macio, recheado com ingredientes grelhados e prensado na chapa com muito queijo derretido.
          </p>

          {filteredBeirutes.length === 0 ? (
            <div className="py-12 text-center text-brand-brown/50 bg-white/40 border border-dashed border-brand-brown/10 rounded-2xl text-xs md:text-sm">
              Nenhum beirute encontrado para "{searchQuery}".
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
              {filteredBeirutes.map((beirute) => (
                <MenuCard
                  key={beirute.cod}
                  beirute={beirute}
                  category="beirutes"
                  onAddBeirute={handleAddBeirute}
                />
              ))}
            </div>
          )}
        </section>

        {/* PROMOÇÕES CONTENT CARD */}
        <section id="promocoes" className="scroll-mt-12 bg-brand-brown text-cream border border-brand-brown/15 rounded-3xl p-6 md:p-8 space-y-6 shadow-md relative overflow-hidden">
          {/* Subtle background decoration */}
          <div className="absolute right-0 bottom-0 opacity-10 font-serif text-9xl font-black select-none pointer-events-none translate-x-10 translate-y-10">
            Pizzas
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1 bg-cream-2/20 border border-cream-2/30 rounded-full px-3.5 py-1 text-xs font-bold tracking-wider uppercase mb-1">
              ✨ combos e vantagens exclusivas
            </div>
            <h3 className="font-serif font-black italic text-3xl md:text-4xl text-brand-gold">
              Promoções da Semana
            </h3>
          </div>

          <ul className="space-y-3.5 text-sm md:text-base pr-4 relative z-10 font-sans">
            <li className="flex gap-2.5 items-start">
              <span className="text-xl shrink-0">🍕</span>
              <span>
                <strong>De Segunda a Quinta e aos Domingos:</strong> Na compra de 2 ou mais pizzas grandes de qualquer sabor, ganhe <strong>1 Refrigerante de 2 Litros inteiramente grátis</strong> para acompanhar seu jantar!
              </span>
            </li>
            <li className="flex gap-2.5 items-start">
              <span className="text-xl shrink-0">🍕</span>
              <span>
                Nossas promoções e combos variam com periodicidade durante a semana. <strong>Consulte qual a nossa oferta de brinde ou combo ativo no dia pelo WhatsApp!</strong>
              </span>
            </li>
          </ul>

          <div className="pt-4 border-t border-cream/15 text-xxs text-cream/70 leading-relaxed max-w-prose">
            <p className="flex items-center gap-1 text-brand-gold font-bold uppercase tracking-wider mb-1">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              Observações importantes:
            </p>
            Vésperas de feriados e feriados nacionais não dispõem de brindes vigentes. Promoções não válidas para atendimento presencial no salão. Limitado a rigorosamente um brinde por endereço a cada dia útil.
          </div>
        </section>

      </main>

      {/* FOOTER AREA */}
      <Footer />

      {/* FIXED FLOATING ACTIONS BAR (CART ACTIVATED) */}
      <AnimatePresence>
        {cartTotalItems > 0 && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-40 bg-brand-brown text-cream p-4 border-t border-brand-brown-dark shadow-2xl flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3">
              <div className="bg-brand-gold rounded-full w-10 h-10 flex items-center justify-center text-brand-brown font-extrabold relative shadow">
                <ShoppingBag className="w-5 h-5 text-brand-brown" />
                <span className="absolute -top-1 -right-1 bg-brand-red text-cream font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border border-brand-brown shadow-xs animate-pulse">
                  {cartTotalItems}
                </span>
              </div>
              <div>
                <span className="block text-[10px] uppercase font-bold text-cream/50 tracking-wider">
                  Total do carrinho
                </span>
                <span className="font-serif text-lg font-black text-brand-gold">
                  {cartTotalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="inline-flex items-center gap-1.5 bg-brand-red hover:bg-brand-red-dark text-cream font-bold text-sm px-6 py-2.5 rounded-full transition shadow-md cursor-pointer hover:scale-[1.02] active:scale-95"
              id="open-cart-floating"
            >
              Ver meu pedido
              <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TOAST ADDITION ALERT STATUS */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="fixed top-18 left-1/2 -translate-x-1/2 z-50 bg-brand-brown text-cream px-5 py-3 rounded-full shadow-lg font-bold text-xs md:text-sm flex items-center gap-2 border border-brand-red/10"
          >
            <ThumbsUp className="w-4 h-4 text-brand-gold fill-brand-gold" />
            ✓ Adicionado com sucesso ao carrinho!
          </motion.div>
        )}
      </AnimatePresence>

      {/* FLOATING DIRECT WHATSAPP BUTTON (FOR INSTANT SUPPORT) */}
      <a
        href={`https://wa.me/${CONTATO.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 right-5 md:right-8 z-30 w-12 h-12 md:w-14 md:h-14 bg-[#25D366] hover:bg-[#20ba59] text-cream rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
        aria-label="Atendimento Direto WhatsApp"
        title="Dúvidas? Chame no WhatsApp"
      >
        <svg className="w-6 h-6 md:w-7 md:h-7 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-1.746-.873-2.892-1.557-4.043-3.531-.305-.524.305-.486.872-1.617.099-.198.05-.371-.05-.52-.099-.149-.67-1.611-.917-2.16-.247-.546-.5-.471-.67-.471-.171 0-.371-.025-.57-.025-.198 0-.52.075-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.064 2.875 1.213 3.074.149.198 2.05 3.13 4.965 4.27 2.916 1.14 2.916.76 3.486.711.571-.05 1.758-.718 2.005-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12.012 2c-5.508 0-9.984 4.476-9.984 9.984 0 1.764.464 3.42 1.276 4.86L2 22l5.3-1.276c1.392.762 2.988 1.2 4.712 1.2 5.508 0 9.984-4.476 9.984-9.984S17.52 2 12.012 2zm0 18.176c-1.578 0-3.054-.426-4.32-1.17l-.31-.186-3.144.756.78-3.07-.198-.31C4.158 15.024 3.7 13.548 3.7 11.984c0-4.584 3.728-8.312 8.312-8.312s8.312 3.728 8.312 8.312-3.728 8.192-8.312 8.192z"/>
        </svg>
      </a>

      {/* MODULE MODAL: CART DETAILS AND CHECKOUT FORM */}
      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onUpdateItem={handleUpdateItem}
        onStartMeioAMeio={handleStartMeioAMeio}
      />
    </div>
  );
}
