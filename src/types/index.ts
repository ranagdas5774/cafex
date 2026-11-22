export type ZoneId = 'entrance' | 'counter' | 'seating' | 'bakery' | 'brand';

export interface ZoneConfig {
  id: ZoneId;
  name: string;
  description: string;
  cameraPosition: [number, number, number];
  cameraLookAt: [number, number, number];
}

export interface ModifierOption {
  id: string;
  name: string;
  priceDeltaPaise: number;
}

export interface ModifierGroup {
  id: string;
  name: string;
  required: boolean;
  options: ModifierOption[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: 'coffee' | 'brews' | 'cold' | 'bakery' | 'dessert';
  description: string;
  basePricePaise: number;
  imageUrl: string;
  hotspotId?: string;
  available: boolean;
  modifierGroups?: ModifierGroup[];
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  selectedModifiers: {
    groupId: string;
    optionId: string;
    name: string;
    priceDeltaPaise: number;
  }[];
  unitPricePaise: number;
}

export interface ReservationRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  date: string;
  timeSlot: string;
  guestCount: number;
  tableId: string;
  specialRequests?: string;
}

export interface SceneHotspot {
  id: string;
  zone: ZoneId;
  title: string;
  subtitle: string;
  position: [number, number, number];
  productId?: string;
  actionType: 'open_product' | 'open_reservation' | 'open_story' | 'enter_cafe';
}
