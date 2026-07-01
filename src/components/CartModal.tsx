import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Plus, Minus, Send, Phone, MapPin, CreditCard, AlertCircle } from 'lucide-react';
import { CartItem, Bairro } from '../types';
import { BAIRROS, CONTATO, TRADICIONAIS, ESPECIAIS, DOCES } from '../data';

const ALL_PIZZAS = [...TRADICIONAIS, ...ESPECIAIS, ...DOCES];

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onUpdateItem?: (id: string, updates: Partial<CartItem>) => void;
  onStartMeioAMeio?: (
    id: string,
    cod1: string,
    nome1: string,
    ing1: string,
    size: 'normal' | 'broto'
  ) => void;
}

export default function CartModal({
  isOpen,
  onClose,
  cartItems,
  onUpdateQty,
  onRemoveItem,
  onClearCart,
  onUpdateItem,
  onStartMeioAMeio,
}: CartModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [custName, setCustName] = useState<string>('');
  const [custPhone, setCustPhone] = useState<string>('');
  const [deliveryType, setDeliveryType] = useState<'entrega' | 'retirada'>('entrega');
  const [custAddress, setCustAddress] = useState<string>('');
  const [selectedBairro, setSelectedBairro] = useState<string>(BAIRROS[0].bairro);
  const [paymentType, setPaymentType] = useState<string>('Pix');
  const [needsChange, setNeedsChange] = useState<boolean>(false);
  const [changeFor, setChangeFor] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        const errorEl = document.getElementById('validation-error-message');
        if (errorEl) {
          errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
    }
  }, [errorMessage]);

  const handleClose = () => {
    setStep(1);
    onClose();
  };

  const formatMoney = (val: number) => {
    return val.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const currentBairroObj = BAIRROS.find((b) => b.bairro === selectedBairro);
  const deliveryFee = deliveryType === 'entrega' && currentBairroObj ? currentBairroObj.taxa : 0;

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = subtotal + deliveryFee;

  // Validate form before order dispatch
  const handleSendOrder = () => {
    setErrorMessage('');

    if (!custName.trim()) {
      setErrorMessage('Por favor, informe seu nome no campo "Seu Nome".');
      return;
    }
    if (!custPhone.trim()) {
      setErrorMessage('Por favor, informe seu telefone com DDD.');
      return;
    }
    if (deliveryType === 'entrega' && !custAddress.trim()) {
      setErrorMessage('Por favor, informe o endereço completo para entrega.');
      return;
    }
    if (paymentType === 'Dinheiro' && needsChange && !changeFor.trim()) {
      setErrorMessage('Por favor, insira o valor para o qual deseja troco.');
      return;
    }

    // Format WhatsApp text string
    let msg = `🍕 *Novo Pedido — Pizzaria Sam*\n\n`;
    
    msg += `*Cliente:* ${custName.trim()}\n`;
    msg += `*Telefone:* ${custPhone.trim()}\n`;
    msg += `------------------------------------\n\n`;
    
    msg += `*Itens do Pedido:*\n`;
    cartItems.forEach((item) => {
      const sizeLabel = item.size ? (item.size === 'broto' ? ' - Broto' : ' - Inteira Grande') : '';
      let partsLabel = item.nome1;
      if (item.nome2) {
        partsLabel = `Meio a Meio: ${item.nome1} / ${item.nome2}`;
      }
      
      msg += `• *${item.quantity}x* ${partsLabel}${sizeLabel} — ${formatMoney(item.price * item.quantity)}\n`;
      if (item.type !== 'bebida') {
        if (item.ing2) {
          msg += `   _Ingredientes: ${item.ing1} | ${item.ing2}_\n`;
        } else if (item.ing1) {
          msg += `   _Ingredientes: ${item.ing1}_\n`;
        }
      }
      if (item.observations && item.observations.trim()) {
        msg += `   *Obs:* _"${item.observations.trim()}"_\n`;
      }
    });
    
    msg += `\n------------------------------------\n`;
    msg += `*Subtotal:* ${formatMoney(subtotal)}\n`;
    if (deliveryType === 'entrega') {
      msg += `*Taxa de entrega (${selectedBairro}):* ${formatMoney(deliveryFee)}\n`;
    }
    msg += `*Total Geral: ${formatMoney(total)}*\n`;
    msg += `------------------------------------\n\n`;

    msg += `*Tipo de Serviço:* ${deliveryType === 'entrega' ? '🛵 Entrega em Domicílio' : '🏬 Retirada no Local'}\n`;
    if (deliveryType === 'entrega') {
      msg += `*Endereço para entrega:* ${custAddress.trim()} — Bairro: ${selectedBairro}\n`;
    }
    msg += `*Forma de pagamento:* ${paymentType}\n`;
    if (paymentType === 'Dinheiro') {
      if (needsChange) {
        msg += `*Precisa de Troco:* Sim, troco para ${formatMoney(parseFloat(changeFor.replace(',', '.'))) || formatMoney(total)}\n`;
      } else {
        msg += `*Precisa de Troco:* Não necessita de troco\n`;
      }
    }

    const encodedText = encodeURIComponent(msg);
    const waUrl = `https://wa.me/${CONTATO.whatsapp}?text=${encodedText}`;
    window.open(waUrl, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="absolute inset-0 bg-brand-brown/40 backdrop-blur-xs"
          />

          {/* Cart Sidebar panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.35 }}
            className="relative bg-cream w-full max-w-md h-full shadow-2xl flex flex-col justify-between z-10 border-l border-brand-brown/10"
          >
            {/* Header */}
            <div className="bg-brand-brown text-cream p-5 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-gold animate-bounce" />
                <h3 className="font-serif text-xl font-bold tracking-tight">
                  Seu Pedido
                </h3>
                <span className="bg-brand-red text-cream font-bold text-xs px-2.5 py-0.5 rounded-full">
                  {cartItems.reduce((count, item) => count + item.quantity, 0)}
                </span>
              </div>
              <button
                onClick={handleClose}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 text-cream transition"
                id="close-cart-modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Step Progress Tracker */}
            {cartItems.length > 0 && (
              <div className="flex items-center justify-center gap-3 px-5 py-3 bg-brand-brown/5 border-b border-brand-brown/10 select-none shrink-0">
                <div className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors duration-200 ${step === 1 ? 'bg-brand-red text-white' : 'bg-brand-brown/20 text-brand-brown'}`}>1</span>
                  <span className={`text-xs font-bold leading-none ${step === 1 ? 'text-brand-brown font-extrabold' : 'text-brand-brown/50'}`}>Carrinho</span>
                </div>
                <div className="w-8 h-[2px] bg-brand-brown/10" />
                <div className="flex items-center gap-1.5">
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black transition-colors duration-200 ${step === 2 ? 'bg-brand-red text-white' : 'bg-brand-brown/20 text-brand-brown'}`}>2</span>
                  <span className={`text-xs font-bold leading-none ${step === 2 ? 'text-brand-brown font-extrabold' : 'text-brand-brown/50'}`}>Dados de Entrega</span>
                </div>
              </div>
            )}

            {/* Content list & forms */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6" style={{ paddingBottom: '120px' }}>
              {cartItems.length === 0 ? (
                <div className="text-center py-20 flex flex-col items-center justify-center space-y-4">
                  <div className="bg-brand-brown/5 p-6 rounded-full">
                    <ShoppingBag className="w-12 h-12 text-brand-brown/30" />
                  </div>
                  <h4 className="font-serif text-lg font-bold text-brand-brown/85">
                    Carrinho Vazio
                  </h4>
                  <p className="text-xs text-brand-brown/60 max-w-[250px] leading-relaxed mx-auto">
                    Navegue pelas categorias do cardápio e adicione sabores deliciosos para começar seu pedido.
                  </p>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="bg-brand-red hover:bg-brand-red-dark text-cream font-bold text-xs py-2 px-6 rounded-full cursor-pointer transition shadow-sm"
                    id="back-to-menu-empty"
                  >
                    Olhar Cardápio
                  </button>
                </div>
              ) : step === 1 ? (
                <>
                  {/* Step 1: Items and Customization in Cart */}
                  <div className="space-y-3">
                    <div className="text-xxs font-bold uppercase text-brand-brown/40 tracking-widest pb-1 border-b border-brand-brown/10">
                      Pratos Escolhidos
                    </div>

                    <div className="divide-y divide-brand-brown/10 max-h-[340px] overflow-y-auto pr-1">
                      {cartItems.map((item) => (
                        <div key={item.id} className="py-4 space-y-3 border-b border-brand-brown/5">
                          <div className="flex justify-between gap-4">
                            <div className="flex-1 space-y-1">
                              <h4 className="font-sans font-extrabold text-[13.5px] md:text-[14.5px] text-brand-brown leading-snug">
                                {item.nome2 ? (
                                  <>
                                    <span className="text-brand-gold font-bold text-[11px]">1/2</span> {item.nome1} <br />
                                    <span className="text-brand-gold font-bold text-[11px]">1/2</span> {item.nome2}
                                  </>
                                ) : (
                                  item.nome1
                                )}
                                {item.size === 'broto' ? (
                                  <span className="bg-brand-red/10 text-brand-red font-semibold text-[9px] uppercase tracking-wider ml-1.5 px-1.5 py-0.5 rounded">
                                    Broto
                                  </span>
                                ) : item.type === 'pizza' ? (
                                  <span className="bg-brand-brown/10 text-brand-brown font-semibold text-[9px] uppercase tracking-wider ml-1.5 px-1.5 py-0.5 rounded">
                                    Inteira Grande
                                  </span>
                                ) : null}
                              </h4>
                              {item.type !== 'bebida' && (
                                <p className="text-[11px] text-brand-brown/60 italic font-sans leading-normal line-clamp-1">
                                  {item.nome2 
                                    ? `${item.ing1} | ${item.ing2}` 
                                    : item.ing1}
                                </p>
                              )}
                              <span className="text-xs font-extrabold text-brand-red block">
                                {formatMoney(item.price)}
                              </span>

                              {/* 'Como deseja a pizza?' options inside cart */}
                              {item.type === 'pizza' && (
                                <div className="mt-2.5 p-2.5 bg-brand-brown/5 rounded-xl border border-brand-brown/10 text-left space-y-2.5 max-w-[290px]">
                                  <span className="text-[10px] uppercase font-bold text-brand-brown/60 tracking-wider block">
                                    Como deseja a pizza?
                                  </span>
                                  <div className="flex gap-2">
                                    {/* Sabor Único option */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const p1 = ALL_PIZZAS.find(p => p.cod === item.cod1);
                                        const originalPrice = p1 ? (item.size === 'broto' ? p1.broto : p1.normal) : item.price;
                                        onUpdateItem?.(item.id, {
                                          nome2: undefined,
                                          cod2: undefined,
                                          ing2: undefined,
                                          price: originalPrice,
                                        });
                                      }}
                                      className={`flex-1 py-1.5 px-2 rounded-lg text-center text-[10px] md:text-xs font-bold transition border cursor-pointer ${
                                        !item.nome2
                                          ? 'bg-brand-red text-white border-transparent shadow-2xs'
                                          : 'bg-white text-brand-brown border-brand-brown/10 hover:bg-brand-brown/5'
                                      }`}
                                      id={`prep-single-${item.id}`}
                                    >
                                      Sabor Único
                                    </button>

                                    {/* Meio a Meio option */}
                                    <button
                                      type="button"
                                      onClick={() => {
                                        if (onStartMeioAMeio) {
                                          onStartMeioAMeio(item.id, item.cod1, item.nome1, item.ing1, item.size || 'normal');
                                        }
                                      }}
                                      className={`flex-1 py-1.5 px-2 rounded-lg text-center text-[10px] md:text-xs font-bold transition border cursor-pointer ${
                                        item.nome2
                                          ? 'bg-brand-red text-white border-transparent shadow-2xs'
                                          : 'bg-white text-brand-brown border-brand-brown/10 hover:bg-brand-brown/5'
                                      }`}
                                      id={`prep-half-${item.id}`}
                                    >
                                      Meio a Meio
                                    </button>
                                  </div>

                                  {/* Change 2nd flavor button when Meio a Meio (2 sabores) is active */}
                                  {item.nome2 ? (
                                    <div className="pt-1 text-center border-t border-brand-brown/10">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          if (onStartMeioAMeio) {
                                            onStartMeioAMeio(item.id, item.cod1, item.nome1, item.ing1, item.size || 'normal');
                                          }
                                        }}
                                        className="inline-flex items-center gap-1.5 text-[10px] bg-brand-gold hover:bg-brand-gold/80 text-brand-brown font-black py-1 px-3 rounded-full cursor-pointer transition-all shadow-2xs hover:scale-102"
                                      >
                                        🔄 Mudar 2º Sabor
                                      </button>
                                    </div>
                                  ) : (
                                    /* If Meio a Meio button was clicked but has no second flavor yet */
                                    null
                                  )}
                                </div>
                              )}
                            </div>

                            <div className="flex flex-col justify-between items-end gap-2 shrink-0">
                              <button
                                type="button"
                                onClick={() => onRemoveItem(item.id)}
                                className="text-brand-red hover:text-brand-red-dark bg-brand-red/5 hover:bg-brand-red/10 p-1.5 rounded-lg transition shrink-0"
                                title="Remover do pedido"
                                id={`remove-item-${item.id}`}
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              <div className="flex items-center gap-2 bg-brand-brown/5 rounded-full px-2 py-1 border border-brand-brown/10">
                                <button
                                  type="button"
                                  onClick={() => onUpdateQty(item.id, -1)}
                                  className="w-5 h-5 rounded-full flex items-center justify-center text-brand-brown/70 hover:bg-white hover:shadow-xs transition"
                                  id={`qty-minus-${item.id}`}
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono text-xs font-bold w-4 text-center text-brand-brown">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => onUpdateQty(item.id, 1)}
                                  className="w-5 h-5 rounded-full flex items-center justify-center text-brand-brown/70 hover:bg-white hover:shadow-xs transition"
                                  id={`qty-plus-${item.id}`}
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Observações text input for this pizza as requested */}
                          <div
                            className="bg-brand-brown/[0.04] rounded-xl border border-brand-brown/10 text-left"
                            style={{ height: '83px', paddingTop: '10px', paddingLeft: '13px', paddingRight: '12px', paddingBottom: '12px' }}
                          >
                            <label htmlFor={`obs-${item.id}`} className="block text-[8px] uppercase font-extrabold text-brand-brown/60 mb-1 tracking-wider">
                              Observações (Ex: Retirar cebola, sem azeitona, etc.):
                            </label>
                            <textarea
                              id={`obs-${item.id}`}
                              rows={2}
                              value={item.observations || ''}
                              onChange={(e) => onUpdateItem?.(item.id, { observations: e.target.value })}
                              placeholder="Adicione observações para este item..."
                              className="w-full bg-white text-brand-brown border border-brand-brown/15 rounded-xl px-2.5 py-1.5 text-xs font-sans focus:outline-none focus:border-brand-red placeholder:text-brand-brown/30 resize-none transition"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Button to add more items */}
                    <div className="flex justify-center pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="w-[270px] py-2.5 flex items-center justify-center gap-1.5 bg-brand-red hover:bg-brand-red-dark text-white font-extrabold text-xs md:text-sm rounded-xl shadow-2xs hover:shadow-xs cursor-pointer transition-all"
                        id="add-more-from-cart-global"
                      >
                        Adicionar + Sabores
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Step 2: Customer, Delivery, and Payment Information */}
                  <div className="space-y-4">
                    <h5 className="font-serif font-bold text-sm text-brand-brown flex items-center gap-1.5 pb-1 border-b border-brand-brown/5">
                      <Phone className="w-4 h-4 text-brand-red" />
                      Dados do Cliente
                    </h5>

                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label htmlFor="cust-name-input" className="block text-[10px] uppercase font-bold text-brand-brown/50 mb-1 tracking-wider">
                          Seu Nome *
                        </label>
                        <input
                          id="cust-name-input"
                          type="text"
                          required
                          value={custName}
                          onChange={(e) => setCustName(e.target.value)}
                          placeholder="Quem recebe o pedido"
                          className="w-full bg-white text-brand-brown border border-brand-brown/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-red"
                        />
                      </div>
                      <div>
                        <label htmlFor="cust-phone-input" className="block text-[10px] uppercase font-bold text-brand-brown/50 mb-1 tracking-wider">
                          WhatsApp / Telefone com DDD *
                        </label>
                        <input
                          id="cust-phone-input"
                          type="tel"
                          required
                          value={custPhone}
                          onChange={(e) => setCustPhone(e.target.value)}
                          placeholder="Ex: (11) 91234-5678"
                          className="w-full bg-white text-brand-brown border border-brand-brown/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-red"
                        />
                      </div>
                    </div>

                    {/* Delivery / Pickup choices */}
                    <div className="pt-2">
                      <label className="block text-[10px] uppercase font-bold text-brand-brown/50 mb-1 tracking-wider">
                        Entrega ou Retirada?
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setDeliveryType('entrega')}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition ${
                            deliveryType === 'entrega'
                              ? 'bg-brand-red border-brand-red text-cream shadow-xs'
                              : 'bg-white border-brand-brown/15 text-brand-brown hover:bg-brand-brown/5'
                          }`}
                          id="select-delivery"
                        >
                          🛵 Entrega em Domicílio
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeliveryType('retirada')}
                          className={`py-2 px-3 rounded-xl border text-xs font-bold text-center cursor-pointer transition ${
                            deliveryType === 'retirada'
                              ? 'bg-brand-red border-brand-red text-cream shadow-xs'
                              : 'bg-white border-brand-brown/15 text-brand-brown hover:bg-brand-brown/5'
                          }`}
                          id="select-pickup"
                        >
                          🏬 Retirada no Local
                        </button>
                      </div>
                    </div>

                    {/* Delivery Fields show/hide */}
                    {deliveryType === 'entrega' && (
                      <div className="space-y-3 pt-2">
                        <h5 className="font-serif font-bold text-sm text-brand-brown flex items-center gap-1.5 pb-1 border-b border-brand-brown/5">
                          <MapPin className="w-4 h-4 text-brand-red" />
                          Endereço de Entrega
                        </h5>

                        <div>
                          <label htmlFor="bairro-select" className="block text-[10px] uppercase font-bold text-brand-brown/50 mb-1 tracking-wider">
                            Escolha o seu Bairro *
                          </label>
                          <select
                            id="bairro-select"
                            value={selectedBairro}
                            onChange={(e) => setSelectedBairro(e.target.value)}
                            className="w-full bg-white text-brand-brown border border-brand-brown/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-red cursor-pointer"
                          >
                            {BAIRROS.map((b) => (
                              <option key={b.bairro} value={b.bairro}>
                                {b.bairro} — taxa: {formatMoney(b.taxa)}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label htmlFor="address-details" className="block text-[10px] uppercase font-bold text-brand-brown/50 mb-1 tracking-wider">
                            Endereço Completo (Rua, Número, Apto, Ref.) *
                          </label>
                          <textarea
                            id="address-details"
                            rows={2}
                            required
                            value={custAddress}
                            onChange={(e) => setCustAddress(e.target.value)}
                            placeholder="Rua, número, complemento (ex: apto 42, bloco B), ponto de referência"
                            className="w-full bg-white text-brand-brown border border-brand-brown/15 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-brand-red resize-none"
                          />
                        </div>
                      </div>
                    )}

                    {/* Payment select and conditional change/troco display */}
                    <div className="space-y-3 pt-2">
                      <h5 className="font-serif font-bold text-sm text-brand-brown flex items-center gap-1.5 pb-1 border-b border-brand-brown/5">
                        <CreditCard className="w-4 h-4 text-brand-red" />
                        Forma de Pagamento
                      </h5>

                      <div>
                        <label htmlFor="payment-method-select" className="block text-[10px] uppercase font-bold text-brand-brown/50 mb-1 tracking-wider">
                          Forma de Pagamento *
                        </label>
                        <select
                          id="payment-method-select"
                          value={paymentType}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPaymentType(val);
                            if (val !== 'Dinheiro') {
                              setNeedsChange(false);
                            }
                          }}
                          className="w-full bg-white text-brand-brown border border-brand-brown/15 rounded-xl px-3 py-2.5 text-sm font-bold focus:outline-none focus:border-brand-red cursor-pointer"
                        >
                          <option value="Pix">⚡ Pix</option>
                          <option value="Cartão">💳 Cartão de Crédito/Débito</option>
                          <option value="Dinheiro">💵 Dinheiro</option>
                        </select>
                      </div>

                      {/* Cash Change Conditional Render */}
                      {paymentType === 'Dinheiro' && (
                        <div className="bg-white border border-brand-brown/10 p-3 rounded-xl space-y-2 mt-2">
                          <div className="flex items-center justify-between">
                            <label htmlFor="needs-change-cb" className="text-xs text-brand-brown font-semibold cursor-pointer select-none">
                              Precisa de troco?
                            </label>
                            <input
                              id="needs-change-cb"
                              type="checkbox"
                              checked={needsChange}
                              onChange={(e) => setNeedsChange(e.target.checked)}
                              className="w-4 h-4 accent-brand-red outline-none cursor-pointer"
                            />
                          </div>
                          {needsChange && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                            >
                              <label htmlFor="change-for-input" className="block text-[9px] uppercase font-bold text-brand-brown/50 tracking-wider mb-1">
                                Troco para quanto? *
                              </label>
                              <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-brand-brown/40 font-bold">R$</span>
                                <input
                                  id="change-for-input"
                                  type="text"
                                  value={changeFor}
                                  onChange={(e) => setChangeFor(e.target.value)}
                                  placeholder="Ex: 50,00 ou 100,00"
                                  className="w-full bg-cream/20 text-brand-brown border border-brand-brown/15 rounded-lg pl-8 pr-3 py-1.5 text-xs font-bold focus:outline-none focus:border-brand-red"
                                />
                              </div>
                            </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </>
              )}

              {/* Validation Error Alerts instead of browser popups */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-start gap-2 bg-red-50 border border-brand-red/30 p-3 rounded-xl text-xs font-bold text-brand-red leading-relaxed shadow-2xs mt-4"
                  id="validation-error-message"
                >
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="block font-black uppercase text-[10px] tracking-wider mb-0.5">Aviso:</span>
                    {errorMessage}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Footer Summary & Navigation Buttons */}
            {cartItems.length > 0 && (
              <div className="p-5 border-t border-brand-brown/10 bg-cream-2/30 space-y-3 shrink-0 w-full">
                {/* Calculations summary lines */}
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-brand-brown/70 font-sans">
                    <span>Subtotal</span>
                    <span>{formatMoney(subtotal)}</span>
                  </div>
                  {deliveryType === 'entrega' && step === 2 && (
                    <div className="flex justify-between text-brand-brown/70 font-sans">
                      <span>Taxa de entrega ({selectedBairro})</span>
                      <span>{formatMoney(deliveryFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-base font-serif font-black text-brand-red pt-1.5 border-t border-brand-brown/5">
                    <span>Total do seu Pedido</span>
                    <span>{formatMoney(step === 2 ? total : subtotal)}</span>
                  </div>
                </div>

                {/* Step Action buttons */}
                {step === 1 ? (
                  <button
                    type="button"
                    onClick={() => {
                      setErrorMessage('');
                      setStep(2);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-cream font-bold text-base py-3 px-6 rounded-full cursor-pointer transition shadow-md hover:scale-[1.01] active:scale-95"
                    id="advance-to-checkout"
                  >
                    Avançar para Entrega ➔
                  </button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <button
                      type="button"
                      onClick={handleSendOrder}
                      className="w-full inline-flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-red-dark text-cream font-bold text-base py-3 px-6 rounded-full cursor-pointer transition shadow-md hover:scale-[1.01] active:scale-95"
                      id="submit-whatsapp-order"
                    >
                      <Send className="w-4 h-4 fill-current text-cream" />
                      Enviar pedido pelo WhatsApp
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setErrorMessage('');
                        setStep(1);
                      }}
                      className="w-full text-center text-xs font-extrabold text-brand-brown/70 hover:text-brand-brown hover:underline py-1 cursor-pointer transition"
                      id="back-to-cart-step-1"
                    >
                      👈 Voltar para o Carrinho
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
