import { useState, useEffect } from 'react';
import { TRADICIONAIS, ESPECIAIS, DOCES, BEIRUTES, BEBIDAS, CONTATO } from './data';
import { Pizza, Beirute, Bebida, CartItem } from './types';
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
  { id: 'bebidas', label: 'Bebidas' },
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
  const [searchQuery, setSearchQuery] = useState<string>('');

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

  useEffect(() => {
    localStorage.setItem('sam_pizza_cart', JSON.stringify(cart));
  }, [cart]);

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

  const [animateCart, setAnimateCart] = useState<boolean>(false);
  const triggerAdditionAnimation = () => {
    setAnimateCart(true);
    setTimeout(() => setAnimateCart(false), 800);
  };

  const handleAddPizza = (pizza: Pizza, size: 'normal' | 'broto') => {
    const price = size === 'broto' ? pizza.broto : pizza.normal;
    const isSweet = DOCES.some((d) => d.cod === pizza.cod);

    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.type === 'pizza' &&
          item.cod1 === pizza.cod &&
          !item.cod2 &&
          item.size === size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: `${pizza.cod}-${size}-${Date.now()}`,
          type: 'pizza',
          cod1: pizza.cod,
          nome1: pizza.nome,
          ing1: pizza.ing,
          size,
          price,
          quantity: 1,
          isSweet,
        },
      ];
    });

    triggerAdditionAnimation();
  };

  const handleAddBeirute = (beirute: Beirute) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.type === 'beirute' && item.cod1 === beirute.cod
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: `${beirute.cod}-${Date.now()}`,
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

  const handleAddBebida = (bebida: Bebida) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.type === 'bebida' && item.cod1 === bebida.cod
      );

      if (existing) {
        return prev.map((item) =>
          item.id === existing.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }

      return [
        ...prev,
        {
          id: `${bebida.cod}-${Date.now()}`,
          type: 'bebida',
          cod1: bebida.cod,
          nome1: bebida.nome,
          ing1: bebida.subcategoria,
          price: bebida.preco,
          quantity: 1,
        },
      ];
    });

    triggerAdditionAnimation();
  };

  const filteredTradicionais = TRADICIONAIS.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ing.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cod.includes(searchQuery)
  );

  const filteredEspeciais = ESPECIAIS.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ing.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cod.includes(searchQuery)
  );

  const filteredDoces = DOCES.filter(
    (p) =>
      p.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.ing.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.cod.includes(searchQuery)
  );

  const filteredBeirutes = BEIRUTES.filter(
    (b) =>
      b.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.ing.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.cod.includes(searchQuery)
  );

  const filteredBebidas = BEBIDAS.filter(
    (b) =>
      b.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.cod.includes(searchQuery)
  );

  const totalItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  // Group drinks by subcategory
  const bebidasBySub = filteredBebidas.reduce((acc, curr) => {
    const sub = curr.subcategoria;
    if (!acc[sub]) acc[sub] = [];
    acc[sub].push(curr);
    return acc;
  }, {} as Record<string, Bebida[]>);

  return (
    <div className="min-h-screen flex flex-col bg-cream font-sans text-brand-brown">
      <Header />

      {/* Floating alert if active Meio a Meio */}
      <AnimatePresence>
        {activeSelection && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="sticky top-[72px] z-45 w-full bg-brand-gold py-3 px-4 shadow-sm border-b border-brand-brown/10 flex items-center justify-between"
          >
            <div className="flex items-center gap-2 max-w-[80%]">
              <Sparkles className="w-5 h-5 text-brand-red animate-pulse" />
              <p className="text-xs md:text-sm font-bold text-brand-brown">
                Selecione o 2º sabor de sua pizza <span className="uppercase font-black">Meio a Meio</span> ({activeSelection.size === 'broto' ? 'Broto' : 'Inteira'}):
                <span className="block text-[11px] font-normal text-brand-brown/80">
                  Sabor 1: #{activeSelection.cod1} {activeSelection.nome1}
                </span>
              </p>
            </div>
            <button 
              onClick={() => setActiveSelection(null)}
              className="text-brand-brown/60 hover:text-brand-brown p-1 text-xs font-bold uppercase"
            >
              Cancelar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Horizontal Navigation Bar */}
      <div className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-brand-brown/10 shadow-3xs flex flex-col">
        <div className="w-full max-w-6xl mx-auto px-4 py-2.5 flex items-center overflow-x-auto gap-2 no-scrollbar scroll-smooth">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleScrollToSection(cat.id)}
              className={`px-4 py-2 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer font-serif ${
                activeCategory === cat.id
                  ? 'bg-brand-red text-cream shadow-sm scale-102 font-extrabold'
                  : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200/60 hover:text-neutral-900'
              }`}
              id={`nav-${cat.id}-btn`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Cardápio Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 py-6 md:py-8 space-y-12 pb-28">
        {/* Search and Filters */}
        <div className="w-full relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-brown/45">
            <Search className="w-5 h-5" />
          </span>
          <input 
            type="text"
            placeholder="Buscar por código, nome da pizza ou ingrediente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white text-brand-brown placeholder-brand-brown/45 border border-brand-brown/15 rounded-xl shadow-3xs outline-hidden focus:ring-1 focus:ring-brand-red/35 focus:border-brand-red/35 transition-all text-sm font-sans"
            id="search-input"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-brown/40 hover:text-brand-brown"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* TRADICIONAIS SECTION */}
        <section id="tradicionais" className="scroll-mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="font-serif font-extrabold text-xl md:text-2xl tracking-tight text-brand-brown uppercase flex items-center gap-2">
              <PizzaIcon className="w-6 h-6 text-brand-red" />
              Pizzas Tradicionais
            </h2>
            <div className="flex-1 h-px bg-brand-brown/10" />
          </div>
          <p className="text-neutral-600 text-xs md:text-sm max-w-2xl font-light leading-relaxed">
            Todas as pizzas são feitas com nossa tradicional massa fina e crocante e acompanham molho de tomate, orégano e azeitonas.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTradicionais.map((pizza) => (
              <MenuCard 
                key={pizza.cod}
                item={pizza}
                category="tradicionais"
                onAddPizza={handleAddPizza}
                activeMeioAMeio={activeSelection}
                onSelectSecondFlavor={handleSelectSecondFlavor}
              />
            ))}
          </div>
          {filteredTradicionais.length === 0 && (
            <p className="text-xs text-neutral-500 italic py-4">Nenhuma pizza tradicional encontrada.</p>
          )}
        </section>

        {/* ESPECIAIS SECTION */}
        <section id="especiais" className="scroll-mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="font-serif font-extrabold text-xl md:text-2xl tracking-tight text-brand-brown uppercase flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-brand-red fill-brand-red/10" />
              Pizzas Especiais
            </h2>
            <div className="flex-1 h-px bg-brand-brown/10" />
          </div>
          <p className="text-neutral-600 text-xs md:text-sm max-w-2xl font-light leading-relaxed">
            Combinações premium exclusivas da Pizzaria Sam, elaboradas com ingredientes gourmet selecionados, queijos nobres e embutidos artesanais.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEspeciais.map((pizza) => (
              <MenuCard 
                key={pizza.cod}
                item={pizza}
                category="especiais"
                onAddPizza={handleAddPizza}
                activeMeioAMeio={activeSelection}
                onSelectSecondFlavor={handleSelectSecondFlavor}
              />
            ))}
          </div>
          {filteredEspeciais.length === 0 && (
            <p className="text-xs text-neutral-500 italic py-4">Nenhuma pizza especial encontrada.</p>
          )}
        </section>

        {/* DOCES SECTION */}
        <section id="doces" className="scroll-mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="font-serif font-extrabold text-xl md:text-2xl tracking-tight text-brand-brown uppercase flex items-center gap-2">
              <Flame className="w-6 h-6 text-brand-red fill-brand-red/10" />
              Pizzas Doces
            </h2>
            <div className="flex-1 h-px bg-brand-brown/10" />
          </div>
          <p className="text-neutral-600 text-xs md:text-sm max-w-2xl font-light leading-relaxed">
            Delícias preparadas com chocolates nobres de qualidade, frutas frescas selecionadas e confeitos para fechar sua refeição da melhor forma.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDoces.map((pizza) => (
              <MenuCard 
                key={pizza.cod}
                item={pizza}
                category="doces"
                onAddPizza={handleAddPizza}
                activeMeioAMeio={activeSelection}
                onSelectSecondFlavor={handleSelectSecondFlavor}
              />
            ))}
          </div>
          {filteredDoces.length === 0 && (
            <p className="text-xs text-neutral-500 italic py-4">Nenhuma pizza doce encontrada.</p>
          )}
        </section>

        {/* BEIRUTES SECTION */}
        <section id="beirutes" className="scroll-mt-12 space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="font-serif font-extrabold text-xl md:text-2xl tracking-tight text-brand-brown uppercase flex items-center gap-2">
              <Activity className="w-6 h-6 text-brand-red" />
              Beirutes Especiais
            </h2>
            <div className="flex-1 h-px bg-brand-brown/10" />
          </div>
          <p className="text-neutral-600 text-xs md:text-sm max-w-2xl font-light leading-relaxed">
            Beirutes elaborados em pão sírio artesanal leve e macio, recheado com ingredientes grelhados e prensado na chapa com muito queijo derretido.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredBeirutes.map((beirute) => (
              <MenuCard 
                key={beirute.cod}
                item={beirute}
                category="beirutes"
                onAddBeirute={handleAddBeirute}
              />
            ))}
          </div>
          {filteredBeirutes.length === 0 && (
            <p className="text-xs text-neutral-500 italic py-4">Nenhum beirute encontrado.</p>
          )}
        </section>

        {/* BEBIDAS SECTION */}
        <section id="bebidas" className="scroll-mt-12 space-y-6">
          <div className="flex items-center gap-4">
            <h2 className="font-serif font-extrabold text-xl md:text-2xl tracking-tight text-brand-brown uppercase flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-brand-red" />
              Bebidas
            </h2>
            <div className="flex-1 h-px bg-brand-brown/10" />
          </div>
          <p className="text-neutral-600 text-xs md:text-sm max-w-2xl font-light leading-relaxed">
            Bebidas geladas, refrigerantes, sucos naturais, águas minerais e cervejas selecionadas para acompanhar sua pizza.
          </p>

          {Object.keys(bebidasBySub).length === 0 ? (
            <p className="text-xs text-neutral-500 italic py-4">Nenhuma bebida encontrada.</p>
          ) : (
            <div className="space-y-8">
              {Object.entries(bebidasBySub).map(([subcat, items]) => {
                if (!items || items.length === 0) return null;

                return (
                  <div key={subcat} className="space-y-3.5">
                    <h3 className="font-serif font-extrabold text-sm md:text-base tracking-wide text-brand-brown/80 border-b border-brand-brown/10 pb-1.5 flex items-center gap-2 select-none uppercase">
                      <span className="w-1.5 h-4 bg-brand-red rounded-xs" />
                      {subcat}
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3.5">
                      {items.map((bebida) => (
                        <MenuCard 
                          key={bebida.cod}
                          item={bebida}
                          category="bebidas"
                          onAddBebida={handleAddBebida}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* PROMOÇÕES SECTION */}
        <section id="promocoes" className="scroll-mt-12 bg-white/60 rounded-2xl p-6 md:p-8 border border-brand-brown/10 shadow-3xs text-center space-y-4 max-w-3xl mx-auto">
          <ThumbsUp className="w-12 h-12 text-brand-gold mx-auto animate-bounce-slow" />
          <h2 className="font-serif font-black text-2xl text-brand-brown uppercase">Super Promoção da Semana!</h2>
          <p className="text-sm font-light text-brand-brown/80 leading-relaxed max-w-xl mx-auto">
            Compre 2 pizzas inteiras quaisquer (Tradicionais ou Especiais) no mesmo pedido e ganhe 1 refrigerante Guaraná Antarctica de 2 litros geladinho de brinde!
          </p>
          <div className="inline-block bg-brand-red/10 border border-brand-red/20 px-4 py-2 rounded-xl text-brand-red font-bold text-xs uppercase tracking-wide">
            🏷️ Brinde automático no carrinho!
          </div>
        </section>

        {/* ATENDIMENTO SECTION */}
        <section id="contato" className="scroll-mt-12 bg-neutral-900 text-white rounded-2xl p-6 md:p-8 space-y-6">
          <div className="space-y-2">
            <span className="text-brand-gold text-[10px] font-bold uppercase tracking-widest block">Informações de contato</span>
            <h2 className="font-serif font-black text-2xl md:text-3xl uppercase tracking-tight">Atendimento & Horários</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-neutral-300">
            <div className="space-y-3.5">
              <p className="flex items-start gap-2.5">
                <span className="text-lg">📍</span>
                <span>
                  <strong className="text-white block">Endereço:</strong>
                  {CONTATO.endereco}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-lg">📞</span>
                <span>
                  <strong className="text-white">Telefones:</strong> {CONTATO.telefones}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-lg">💬</span>
                <span>
                  <strong className="text-white">WhatsApp:</strong> (11) 99244-8741
                </span>
              </p>
            </div>
            
            <div className="space-y-3.5 border-t border-neutral-800 md:border-t-0 md:border-l md:pl-6 pt-6 md:pt-0">
              <p className="flex items-start gap-2.5">
                <span className="text-lg">🕒</span>
                <span>
                  <strong className="text-white block">Horário de Funcionamento:</strong>
                  {CONTATO.horario}
                </span>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-lg">🍕</span>
                <span>
                  {CONTATO.anos} anos servindo a melhor massa fina e crocante sem fermento de Caieiras!
                </span>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Persistent floating Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-gradient-to-t from-cream via-cream/90 to-transparent pointer-events-none">
        <div className="max-w-xl mx-auto pointer-events-auto">
          <button 
            onClick={() => setIsCartOpen(true)}
            className={`w-full flex items-center justify-between bg-brand-red hover:bg-brand-red-dark text-white p-4 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 ${
              animateCart ? 'scale-105 bg-brand-green' : 'scale-100'
            }`}
            id="floating-cart-bar-trigger"
          >
            <div className="flex items-center gap-3">
              <div className="relative bg-white/15 p-2 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-brand-brown font-black text-[10px] w-4.5 h-4.5 rounded-full flex items-center justify-center border border-brand-red shadow-2xs">
                    {totalItems}
                  </span>
                )}
              </div>
              <div className="text-left">
                <span className="text-[10px] text-white/70 block uppercase tracking-widest font-serif">Ver sacola</span>
                <span className="font-extrabold text-sm">
                  {totalItems === 0 ? 'Carrinho vazio' : `${totalItems} ${totalItems === 1 ? 'item selecionado' : 'itens selecionados'}`}
                </span>
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <span className="text-xs font-serif font-black uppercase tracking-widest text-white/80">Fechar pedido</span>
              <ChevronRight className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Modal do carrinho / Checkout */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        setCartItems={setCart}
        onStartMeioAMeio={handleStartMeioAMeio}
      />
    </div>
  );
}
