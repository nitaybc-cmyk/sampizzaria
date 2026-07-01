import { Pizza, Beirute, Bebida, Bairro, ContactInfo } from './types';

export const BAIRROS: Bairro[] = [
  { bairro: "Centro", taxa: 5.0 },
  { bairro: "Jardim São Francisco", taxa: 5.0 },
  { bairro: "Jardim Santo Antônio", taxa: 5.0 },
  { bairro: "Miraval", taxa: 6.0 },
  { bairro: "Serpa", taxa: 6.0 },
  { bairro: "Jardim Nova Era", taxa: 6.0 },
  { bairro: "Vila São João", taxa: 6.0 },
  { bairro: "Jardim Vitória", taxa: 6.0 },
  { bairro: "Eucaliptos", taxa: 7.0 },
  { bairro: "Laranjeiras", taxa: 9.0 },
  { bairro: "Rosina", taxa: 9.0 },
  { bairro: "Sítio Aparecida", taxa: 9.0 },
  { bairro: "Jardim Marcelino", taxa: 9.0 },
  { bairro: "Vera Tereza", taxa: 9.0 },
  { bairro: "Vila Gertrudes", taxa: 9.0 },
  { bairro: "Jardim Europa", taxa: 9.0 },
  { bairro: "San Marino", taxa: 9.0 },
  { bairro: "Residencial San Marino", taxa: 9.0 },
  { bairro: "Jardim dos Abreus", taxa: 9.0 },
  { bairro: "Portal de Laranjeiras", taxa: 9.0 },
  { bairro: "Vila Verde", taxa: 12.0 },
  { bairro: "Alpes de Caieiras", taxa: 18.0 },
  { bairro: "Centro Franco", taxa: 18.0 },
  { bairro: "Perus (até a Rua Dedalion)", taxa: 18.0 },
  { bairro: "Mairiporã (Parque Ecológico Cantareira)", taxa: 28.0 }
];

export const TRADICIONAIS: Pizza[] = [
  { cod: "01", nome: "À Moda da Casa", ing: "Mussarela, rodelas de tomate, fatias de lombo e cebola", normal: 77.0, broto: 53.9 },
  { cod: "02", nome: "À Moda do Pizzaiolo", ing: "Cebola, mussarela, catupiry, peito de peru e bacon", normal: 77.0, broto: 53.9 },
  { cod: "03", nome: "Aliche", ing: "Tomate picado, aliche importado e cebola", normal: 78.0, broto: 54.6 },
  { cod: "04", nome: "Americana", ing: "Lombo, champignon, cebola, cobertura de mussarela, palmito e bacon", normal: 78.0, broto: 54.6 },
  { cod: "05", nome: "Atum à Moda da Casa", ing: "Atum chicharro, cebola, cobertura de mussarela, palmito e bacon", normal: 77.0, broto: 53.9 },
  { cod: "06", nome: "Atum à Peruana", ing: "Catupiry, cebola, atum chicharro, ovos e cobertura de mussarela", normal: 77.0, broto: 53.9 },
  { cod: "07", nome: "Australiana", ing: "Presunto, cebola, fatias de tomate, cobertura de mussarela e bacon", normal: 77.0, broto: 53.9 },
  { cod: "08", nome: "Bacon", ing: "Mussarela, fatias de tomate e bacon", normal: 78.0, broto: 54.6 },
  { cod: "09", nome: "Baiana", ing: "Cebola, cobertura de mussarela, calabresa picada e palmito", normal: 78.0, broto: 54.6 },
  { cod: "10", nome: "Bauru", ing: "Presunto, mussarela e fatias de tomate", normal: 76.0, broto: 53.2 },
  { cod: "11", nome: "Berinjela", ing: "Berinjela, catupiry, mussarela e bacon", normal: 78.0, broto: 54.6 },
  { cod: "12", nome: "Brasileira Quente", ing: "Calabresa moída, cobertura de mussarela, ovos, bacon e pimenta seca", normal: 77.0, broto: 53.9 },
  { cod: "13", nome: "Caipira", ing: "Mussarela, catupiry e milho verde", normal: 76.0, broto: 53.2 },
  { cod: "14", nome: "Calabresa", ing: "Calabresa fatiada, cebola, azeitonas e orégano", normal: 72.0, broto: 50.4 },
  { cod: "15", nome: "Canadense", ing: "Mussarela de búfala, lombo canadense, bacon e rúcula", normal: 78.0, broto: 54.6 },
  { cod: "16", nome: "Carmelita", ing: "Brócolis, catupiry, cobertura de mussarela e bacon", normal: 77.0, broto: 53.9 },
  { cod: "17", nome: "Catarina", ing: "Lombo, champignon, cebola, cobertura de mussarela, tomate e bacon", normal: 78.0, broto: 54.6 },
  { cod: "18", nome: "Alho Poró", ing: "Mussarela e alho poró", normal: 73.0, broto: 51.1 },
  { cod: "19", nome: "Chilena", ing: "Catupiry, frango desfido, milho verde e bacon", normal: 80.0, broto: 56.0 },
  { cod: "20", nome: "Coreana", ing: "Atum chicharro, catupiry, cebola, tomate, mussarela e bacon", normal: 78.0, broto: 54.6 },
  { cod: "21", nome: "Cubana", ing: "Atum sólido, cebola, catupiry, cobertura de mussarela, bacon e rúcula", normal: 79.0, broto: 55.3 },
  { cod: "22", nome: "Dois Queijos", ing: "Catupiry e mussarela", normal: 77.0, broto: 53.9 },
  { cod: "23", nome: "Escarola", ing: "Catupiry, escarola, mussarela e bacon", normal: 77.0, broto: 53.9 },
  { cod: "24", nome: "Espanhola", ing: "Atum chicharro, cebola, tomate, cobertura de mussarela e bacon", normal: 77.0, broto: 53.9 },
  { cod: "25", nome: "Florença", ing: "Atum sólido, cebola, mussarela de búfala, bacon e rúcula", normal: 80.0, broto: 56.0 },
  { cod: "26", nome: "Francesa", ing: "Presunto, cebola, catupiry, mussarela, palmito e bacon", normal: 76.0, broto: 53.2 },
  { cod: "27", nome: "Frango c/ Catupiry", ing: "Catupiry e frango desfiado", normal: 80.0, broto: 56.0 },
  { cod: "28", nome: "Gorgonzola", ing: "Brócolis, cobertura de mussarela, gorgonzola e bacon", normal: 77.0, broto: 53.9 },
  { cod: "29", nome: "Italiana", ing: "Atum chicharro, cebola, cobertura de mussarela, palmito e bacon", normal: 76.0, broto: 53.2 },
  { cod: "30", nome: "Abobrinha", ing: "Abobrinha, catupiry, cobertura de mussarela, alho frito e bacon", normal: 78.0, broto: 54.6 },
  { cod: "31", nome: "Marguerita", ing: "Mussarela, fatias de tomate, manjericão e parmesão", normal: 76.0, broto: 53.2 },
  { cod: "32", nome: "Mexicana", ing: "Presunto, champignon, cebola, cobertura de mussarela, lombo e bacon", normal: 78.0, broto: 54.6 },
  { cod: "33", nome: "Mineira", ing: "Catupiry, cebola, cobertura de mussarela, calabresa moída, palmito e bacon", normal: 78.0, broto: 54.6 },
  { cod: "34", nome: "Mista", ing: "Presunto, cobertura de mussarela, tomates e palmito", normal: 76.0, broto: 53.2 },
  { cod: "35", nome: "Mussarela Especial", ing: "Calabresa moída, ovos, cobertura de tomate e cobertura de mussarela", normal: 76.0, broto: 53.2 },
  { cod: "36", nome: "Mussarela Tradicional", ing: "Mussarela fatiada", normal: 73.0, broto: 51.1 },
  { cod: "37", nome: "Napolitana", ing: "Mussarela, fatias de tomate e parmesão", normal: 75.0, broto: 52.5 },
  { cod: "38", nome: "Nova Delícia", ing: "Lombo, catupiry, palmito e bacon", normal: 77.0, broto: 53.9 },
  { cod: "39", nome: "Palmito", ing: "Catupiry, palmito com cobertura de mussarela", normal: 77.0, broto: 53.9 },
  { cod: "40", nome: "Portuguesa", ing: "Presunto, cebola, cobertura de mussarela, ovos picado e bacon", normal: 78.0, broto: 54.6 },
  { cod: "41", nome: "Provolone", ing: "Mussarela, catupiry, fatias de tomate e provolone", normal: 77.0, broto: 53.9 },
  { cod: "42", nome: "Quatro Queijos", ing: "Catupiry, mussarela, provolone e gorgonzola", normal: 78.0, broto: 54.6 },
  { cod: "43", nome: "Romana", ing: "Mussarela, fatias de tomate, aliche importado e cebola", normal: 81.0, broto: 56.7 },
  { cod: "44", nome: "Russa", ing: "Catupiry, cebola, champignon, cobertura de mussarela, calabresa moída e ovos picado", normal: 76.0, broto: 53.2 },
  { cod: "45", nome: "Siciliana", ing: "Milho, cebola, catupiry, mussarela, presunto picado e palmito", normal: 76.0, broto: 53.2 },
  { cod: "46", nome: "Toscana", ing: "Calabresa fatiada, cebola e mussarela", normal: 76.0, broto: 53.2 },
  { cod: "47", nome: "Três Queijos", ing: "Catupiry, mussarela e provolone", normal: 76.0, broto: 53.2 },
  { cod: "48", nome: "Viena", ing: "Peito de peru, cebola, mussarela de búfala, bacon e rúcula", normal: 80.0, broto: 56.0 },
  { cod: "49", nome: "Veneza", ing: "Cebola, mussarela, fatias de tomate, salame e catupiry", normal: 80.0, broto: 56.0 },
  { cod: "50", nome: "Nova Era", ing: "Catupiry, bacon, frango e batata palha", normal: 80.0, broto: 56.0 }
];

export const ESPECIAIS: Pizza[] = [
  { cod: "51", nome: "Bolonhesa", ing: "Molho a bolonhesa, catupiry e cobertura de mussarela", normal: 80.0, broto: 56.0 },
  { cod: "52", nome: "Atum Especial", ing: "Atum sólido especial e cebola", normal: 78.0, broto: 54.6 },
  { cod: "53", nome: "Atum Comum Chicharro", ing: "Atum comum chicharro com cebola", normal: 76.0, broto: 53.2 },
  { cod: "54", nome: "Bacon Especial", ing: "Mussarela de búfala, fatias de tomate, bacon e rúcula", normal: 81.0, broto: 56.7 },
  { cod: "55", nome: "Pizza Sam", ing: "Catupiry, frango desfiado, champignon, cebola e bacon", normal: 80.0, broto: 56.0 },
  { cod: "56", nome: "Berinjela Especial", ing: "Berinjela, champignon, cheddar, mussarela de búfala e bacon", normal: 80.0, broto: 56.0 },
  { cod: "58", nome: "Chilena Especial", ing: "Frango desfiado, cheddar, milho verde e bacon", normal: 80.0, broto: 56.0 },
  { cod: "59", nome: "Cinco Queijos Especial", ing: "Gorgonzola, catupiry, mussarela de búfala, cheddar e provolone", normal: 80.0, broto: 56.0 },
  { cod: "60", nome: "Contemporânea", ing: "Frango, catupiry, ovos, provolone, mussarela e calabresa fatiada", normal: 79.0, broto: 55.3 },
  { cod: "61", nome: "Deliciosa", ing: "Catupiry, mussarela de búfala, salame fatiado e rúcula", normal: 77.0, broto: 53.9 },
  { cod: "62", nome: "Escarola Especial", ing: "Escarola, cheddar, mussarela e bacon", normal: 77.0, broto: 53.9 },
  { cod: "63", nome: "Frango Especial", ing: "Frango desfiado e cheddar", normal: 78.0, broto: 54.6 },
  { cod: "64", nome: "Light", ing: "Mussarela de búfala, peito de peru, palmito e rúcula", normal: 80.0, broto: 56.0 },
  { cod: "65", nome: "Lombinho Especial", ing: "Lombinho, cheddar, palmito, mussarela, cebola, tomate e bacon", normal: 80.0, broto: 56.0 },
  { cod: "66", nome: "Lombinho Picante", ing: "Lombo canadense, ovos, cobertura de mussarela de búfala e bacon", normal: 80.0, broto: 56.0 },
  { cod: "67", nome: "Marguerita de Búfala", ing: "Mussarela de búfala, tomate, parmesão e manjericão", normal: 79.0, broto: 55.3 },
  { cod: "68", nome: "Marguerita Especial", ing: "Cheddar, mussarela, tomate, parmesão e manjericão", normal: 77.0, broto: 53.9 },
  { cod: "69", nome: "Marroquina", ing: "Mussarela comum, mussarela de búfala e tomate alho frito", normal: 79.0, broto: 55.3 },
  { cod: "70", nome: "Nova Cubana", ing: "Catupiry, palmito, champignon e alho frito", normal: 79.0, broto: 55.3 },
  { cod: "71", nome: "Nova Portuguesa", ing: "Peito de peru, cebola, mussarela importada, ovos e aliche importada", normal: 77.0, broto: 53.9 },
  { cod: "72", nome: "Palmito Especial", ing: "Palmito, cheddar, mussarela, bacon e cebola", normal: 79.0, broto: 55.3 },
  { cod: "73", nome: "Pantanal Especial", ing: "Mussarela de búfala, tomate seco e rúcula", normal: 79.0, broto: 55.3 },
  { cod: "74", nome: "Pepperoni Especial", ing: "Mussarela de búfala, fatias de tomate, pepperoni e rúcula", normal: 80.0, broto: 56.0 },
  { cod: "75", nome: "Polonesa", ing: "Escarola, catupiry, mussarela de búfala, parmesão, alho frito e bacon", normal: 80.0, broto: 56.0 },
  { cod: "76", nome: "Quatro Queijos Especial", ing: "Gorgonzola, mussarela de búfala, cheddar e provolone", normal: 79.0, broto: 55.3 },
  { cod: "77", nome: "Rúcula Especial", ing: "Mussarela comum, tomate seco e rúcula", normal: 78.0, broto: 54.6 },
  { cod: "78", nome: "Camarão", ing: "Camarão, alho poró, catupiry, mussarela de búfala e bacon", normal: 98.0, broto: 68.6 },
  { cod: "79", nome: "Vedete", ing: "Mussarela, fatias de tomate, pepperoni, catupiry e palmito", normal: 81.0, broto: 56.7 },
  { cod: "80", nome: "São Francisco", ing: "Catupiry, mussarela de búfala, tomate, lombo e alho frito", normal: 79.0, broto: 55.3 },
  { cod: "81", nome: "Carne Seca", ing: "Catupiry, carne seca, mussarela, cebola, bacon e rúcula", normal: 79.0, broto: 55.3 },
  { cod: "82", nome: "Brócolis Alho e Óleo", ing: "Mussarela, brócolis e alho frito", normal: 73.0, broto: 51.1 },
  { cod: "86", nome: "Pepperoni", ing: "Mussarela, pepperoni e palmito", normal: 79.0, broto: 55.3 },
  { cod: "87", nome: "Tomate Seco", ing: "Tomate seco cobertura de mussarela", normal: 77.0, broto: 53.9 },
  { cod: "88", nome: "Primavera", ing: "Brócolis, champignon, palmito, cebola, cobertura de mussarela e rúcula", normal: 79.0, broto: 55.3 },
  { cod: "89", nome: "Caiçara", ing: "Frango com mussarela", normal: 78.0, broto: 54.6 },
  { cod: "90", nome: "Quase Tudo", ing: "Catupiry, atum sólido, frango desfiado, calabresa moída, mussarela e bacon", normal: 80.0, broto: 56.0 },
  { cod: "91", nome: "Caieiras", ing: "Catupiry, calabresa e cebola", normal: 78.0, broto: 54.6 },
  { cod: "92", nome: "Filé Mignon", ing: "Mussarela, brócolis, filé mignon, palmito, bacon e alho frito", normal: 98.0, broto: 68.6 },
  { cod: "93", nome: "Especial da Casa", ing: "Mussarela, camarão, alho poró e bacon", normal: 95.0, broto: 66.5 }
];

export const DOCES: Pizza[] = [
  { cod: "83", nome: "Banana", ing: "Banana, doce de leite ou leite condensado e canela em pó", normal: 77.0, broto: 53.9 },
  { cod: "84", nome: "Chocolate", ing: "Chocolate ao leite e granulado", normal: 76.0, broto: 53.2 },
  { cod: "85", nome: "Morango c/ Chocolate", ing: "Chocolate ao leite, morangos e granulado", normal: 80.0, broto: 56.0 },
  { cod: "94", nome: "Banana c/ Chocolate", ing: "Chocolate, banana e granulado", normal: 75.0, broto: 52.5 },
  { cod: "95", nome: "Prestígio", ing: "Chocolate e coco ralado", normal: 75.0, broto: 52.5 }
];

export const BEIRUTES: Beirute[] = [
  { cod: "101", nome: "Calabresa", ing: "Calabresa, cheddar, mussarela, presunto, alface, tomate, maionese, ovo e bacon", preco: 44.0 },
  { cod: "102", nome: "Filet de Frango", ing: "Filet de frango, cheddar, mussarela, presunto, alface, tomate, maionese, ovo e bacon", preco: 45.0 },
  { cod: "103", nome: "Filet Mignon", ing: "Filet mignon, cheddar, mussarela, presunto, alface, tomate, maionese, ovo e bacon", preco: 47.0 },
  { cod: "104", nome: "Peito de Peru", ing: "Peito de peru, cheddar, mussarela, presunto, alface, tomate, maionese, ovo e bacon", preco: 45.0 }
];

export const BEBIDAS: Bebida[] = [
  // 2 LTS
  { cod: "201", nome: "Coca-Cola 2 Litros", subcategoria: "2 LTS", preco: 16.0 },
  { cod: "202", nome: "Fanta Laranja 2 Litros", subcategoria: "2 LTS", preco: 16.0 },
  { cod: "203", nome: "Fanta Uva 2 Litros", subcategoria: "2 LTS", preco: 16.0 },
  { cod: "204", nome: "Sprite 2 Litros", subcategoria: "2 LTS", preco: 16.0 },
  { cod: "205", nome: "Kuat 2 Litros", subcategoria: "2 LTS", preco: 16.0 },
  { cod: "206", nome: "Guaraná Antarctica 2 Litros", subcategoria: "2 LTS", preco: 16.0 },
  { cod: "207", nome: "Coca-Cola Zero 2 Litros", subcategoria: "2 LTS", preco: 17.0 },

  // 600ML
  { cod: "208", nome: "Coca-Cola 600ml", subcategoria: "600ML", preco: 9.0 },
  { cod: "209", nome: "Fanta Laranja 600ml", subcategoria: "600ML", preco: 9.0 },
  { cod: "210", nome: "Fanta Uva 600ml", subcategoria: "600ML", preco: 9.0 },
  { cod: "211", nome: "Coca-Cola Zero 600ml", subcategoria: "600ML", preco: 10.0 },

  // LATA
  { cod: "212", nome: "Coca-Cola Lata", subcategoria: "LATA", preco: 8.0 },
  { cod: "213", nome: "Fanta Laranja Lata", subcategoria: "LATA", preco: 8.0 },
  { cod: "214", nome: "Fanta Uva Lata", subcategoria: "LATA", preco: 8.0 },
  { cod: "215", nome: "Schweppes Lata", subcategoria: "LATA", preco: 8.0 },
  { cod: "216", nome: "Coca-Cola Zero Lata", subcategoria: "LATA", preco: 9.0 },

  // Sucos e Águas
  { cod: "217", nome: "Suco Del Valle 1 Litro", subcategoria: "Sucos e Águas", preco: 16.0 },
  { cod: "218", nome: "Suco Del Valle Lata 290ml", subcategoria: "Sucos e Águas", preco: 8.0 },
  { cod: "219", nome: "Água sem Gás", subcategoria: "Sucos e Águas", preco: 4.0 },
  { cod: "220", nome: "Água com Gás", subcategoria: "Sucos e Águas", preco: 5.0 },

  // Cervejas
  { cod: "221", nome: "Cerveja Lata Skol 350ml", subcategoria: "Cervejas", preco: 8.0 }
];

export const CONTATO: ContactInfo = {
  nome: "Pizzaria Sam",
  endereco: "Rua São Cristóvão, 115 - Jd. São Francisco - Centro de Caieiras (ao lado do posto BR)",
  telefones: "4442-1588 / 4442-1709",
  whatsapp: "5511949753339", // Use real international format
  instagram: "@pizzariasam_",
  facebook: "Pizzaria Sam",
  horario: "Segunda: 18h às 23h | Terça: Fechado | Quarta a Domingo: 18h às 23h30",
  anos: 14,
  slogan: "Massa fina e crocante. Não contém fermento."
};
