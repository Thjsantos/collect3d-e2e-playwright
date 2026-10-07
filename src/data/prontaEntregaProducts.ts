export interface ProntaEntregaProduct {
  productName: string;
  price: string;
}

export const PRONTA_ENTREGA_PRODUCTS: ProntaEntregaProduct[] = [
  { productName: 'Pistola - Jinx - Arcane - League og Legends', price: 'R$280,00' },
  { productName: 'Máscara Scorpion - Mortal Kombat 11', price: 'R$180,00' },
  { productName: 'Link - The Legend of Zelda - Action figure', price: 'R$550,00' },
  { productName: 'Kratos 2018 - God of War - Action figure', price: 'R$1.200,00' },
];

/** All products as name -> price, in declaration order. */
export function prontaEntregaAsMap(): Map<string, string> {
  return new Map(PRONTA_ENTREGA_PRODUCTS.map((p) => [p.productName, p.price]));
}
