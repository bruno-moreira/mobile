export interface MarketplaceItem {
  id: string
  name: string
  description: string
  price: number
  categoryId: string
  image: string
  sellerId: string
  sellerName: string
  isMyItem?: boolean
}

export const categories = [
  {
    id: "52e81585-f71a-44cd-8bd0-49771e45da44",
    name: "Peças",
    iconId: "52e81585-f71a-44cd-8bd0-49771e45da44"
  },
  {
    id: "57d6e5ff-35f6-4d21-a521-84f23d511d25",
    name: "Acessórios",
    iconId: "57d6e5ff-35f6-4d21-a521-84f23d511d25"
  },
  {
    id: "826910d4-187d-4c15-88f4-382b7e056739",
    name: "Ferramentas",
    iconId: "826910d4-187d-4c15-88f4-382b7e056739"
  },
  {
    id: "12ce52cf-b33b-4b3c-8972-eb72c66c83e4",
    name: "Segurança",
    iconId: "12ce52cf-b33b-4b3c-8972-eb72c66c83e4"
  },
  {
    id: "a4f1e32e-80c3-4f14-9d72-9e9f5a83c9b7",
    name: "Limpeza",
    iconId: "1a4f1e32e-80c3-4f14-9d72-9e9f5a83c9b7"
  }
]

// Simulando um usuário logado
const currentUser = {
  id: "user-123",
  name: "João Silva",
}

export const marketplaceItems: MarketplaceItem[] = [
  {
    id: "1",
    name: "Óleo de Motor",
    description: "Óleo de motor sintético 5W-30, 1L",
    price: 89.90,
    categoryId: "52e81585-f71a-44cd-8bd0-49771e45da44",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000",
    sellerId: "user-123",
    sellerName: "João Silva",
    isMyItem: true,
  },
  {
    id: "2",
    name: "Filtro de Ar",
    description: "Filtro de ar para motor 1.0/1.6",
    price: 45.90,
    categoryId: "52e81585-f71a-44cd-8bd0-49771e45da44",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000",
    sellerId: "user-456",
    sellerName: "Maria Santos",
  },
  {
    id: "3",
    name: "Tapete de Borracha",
    description: "Jogo de tapetes em borracha universal",
    price: 129.90,
    categoryId: "57d6e5ff-35f6-4d21-a521-84f23d511d25",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000",
    sellerId: "user-789",
    sellerName: "Pedro Oliveira",
  },
  {
    id: "4",
    name: "Kit de Ferramentas",
    description: "Kit com 100 peças para manutenção",
    price: 199.90,
    categoryId: "826910d4-187d-4c15-88f4-382b7e056739",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000",
    sellerId: "user-123",
    sellerName: "João Silva",
    isMyItem: true,
  },
  {
    id: "5",
    name: "Cadeado para Volante",
    description: "Cadeado de segurança para volante",
    price: 79.90,
    categoryId: "12ce52cf-b33b-4b3c-8972-eb72c66c83e4",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000",
    sellerId: "user-456",
    sellerName: "Maria Santos",
  },
  {
    id: "6",
    name: "Shampoo Automotivo",
    description: "Shampoo especial para lavagem de carros",
    price: 39.90,
    categoryId: "146b1a88-b3d3-4232-8b8f-c1f006f1e86d",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=1000",
    sellerId: "user-789",
    sellerName: "Pedro Oliveira",
  }
]

export const addItem = (item: Omit<MarketplaceItem, "id" | "sellerId" | "sellerName" | "isMyItem">) => {
  const newItem: MarketplaceItem = {
    ...item,
    id: Math.random().toString(36).substr(2, 9),
    sellerId: currentUser.id,
    sellerName: currentUser.name,
    isMyItem: true,
  }
  marketplaceItems.push(newItem)
  return newItem
} 