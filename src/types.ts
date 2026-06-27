export interface Pizza {
  cod: string;
  nome: string;
  ing: string;
  normal: number;
  broto: number;
}

export interface Beirute {
  cod: string;
  nome: string;
  ing: string;
  preco: number;
}

export interface Bairro {
  bairro: string;
  taxa: number;
}

export interface ContactInfo {
  nome: string;
  endereco: string;
  telefones: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
  horario: string;
  anos: number;
  slogan: string;
}

export type CartItemType = 'pizza' | 'pizza-half' | 'beirute';

export interface CartItem {
  id: string; // unique cart item id
  type: CartItemType;
  cod1: string;
  cod2?: string; // for half & half
  cod3?: string; // for 3-flavors
  nome1: string;
  nome2?: string; // for half & half
  nome3?: string; // for 3-flavors
  size?: 'normal' | 'broto';
  ing1: string;
  ing2?: string; // for half & half
  ing3?: string; // for 3-flavors
  price: number;
  quantity: number;
  observations?: string;
}
