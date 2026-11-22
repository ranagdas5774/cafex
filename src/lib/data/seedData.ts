import { Product, SceneHotspot, ZoneConfig } from '@/types';

export const ZONES: Record<string, ZoneConfig> = {
  entrance: {
    id: 'entrance',
    name: 'Entrance & Facade',
    description: 'Step inside our artisanal sanctuary crafted with warm timber, raw brick, and golden ambient light.',
    cameraPosition: [0, 2.2, 7.5],
    cameraLookAt: [0, 1.5, 0],
  },
  counter: {
    id: 'counter',
    name: 'Espresso Bar & Counter',
    description: 'Where single-origin beans meet precision engineering on our custom La Marzocco espresso station.',
    cameraPosition: [-1.8, 1.7, 2.2],
    cameraLookAt: [-2.2, 1.2, -0.5],
  },
  seating: {
    id: 'seating',
    name: 'Main Lounge & Dining',
    description: 'Handcrafted walnut tables, bespoke leather chairs, and sunlight filtering through expansive steel-framed windows.',
    cameraPosition: [2.5, 1.8, 2.0],
    cameraLookAt: [2.0, 1.0, -1.0],
  },
  bakery: {
    id: 'bakery',
    name: 'Artisan Bakery Display',
    description: 'Freshly baked flaky viennoiserie, sourdough cruffins, and single-origin chocolate tarts baked every dawn.',
    cameraPosition: [-0.2, 1.6, 1.5],
    cameraLookAt: [-0.5, 1.1, -1.2],
  },
  brand: {
    id: 'brand',
    name: 'Heritage Wall & Story',
    description: 'Our journey from small-batch shade-grown farms in Chikmagalur to your porcelain cup.',
    cameraPosition: [1.8, 1.9, -1.5],
    cameraLookAt: [2.8, 1.8, -3.2],
  },
};

export const PRODUCTS: Product[] = [
  {
    id: 'prod-latte-01',
    slug: 'velvet-cortado',
    name: 'Velvet Cortado',
    category: 'coffee',
    description: 'Double ristretto of estate-grown Arabica cut with an equal part of warm textured micro-foam.',
    basePricePaise: 24000, // ₹240
    imageUrl: '/assets/images/menu/cortado.webp',
    hotspotId: 'hotspot-counter-cortado',
    available: true,
    modifierGroups: [
      {
        id: 'mod-milk',
        name: 'Milk Preference',
        required: true,
        options: [
          { id: 'opt-whole', name: 'Fresh Farm Whole Milk', priceDeltaPaise: 0 },
          { id: 'opt-oat', name: 'Oat Milk (Barista Edition)', priceDeltaPaise: 4000 },
          { id: 'opt-almond', name: 'Roasted Almond Milk', priceDeltaPaise: 4500 },
        ],
      },
      {
        id: 'mod-shot',
        name: 'Espresso Intensity',
        required: false,
        options: [
          { id: 'opt-extra-shot', name: 'Extra Estate Shot', priceDeltaPaise: 5000 },
        ],
      },
    ],
  },
  {
    id: 'prod-pour-02',
    slug: 'chikmagalur-single-origin-v60',
    name: 'Chikmagalur Estate V60',
    category: 'brews',
    description: 'Hand-poured pour-over featuring washed Red Catuai notes of jasmine, crisp red apple, and raw cane sugar.',
    basePricePaise: 28000, // ₹280
    imageUrl: '/assets/images/menu/v60.webp',
    hotspotId: 'hotspot-counter-v60',
    available: true,
  },
  {
    id: 'prod-bakery-01',
    slug: 'artisanal-butter-croissant',
    name: 'French Butter Croissant',
    category: 'bakery',
    description: 'Laminated with 84% Normandy cultured butter, baked to golden flake perfection every morning.',
    basePricePaise: 21000, // ₹210
    imageUrl: '/assets/images/menu/croissant.webp',
    hotspotId: 'hotspot-bakery-croissant',
    available: true,
  },
  {
    id: 'prod-bakery-02',
    slug: 'salted-caramel-cruffin',
    name: 'Salted Caramel Cruffin',
    category: 'dessert',
    description: 'Croissant dough muffin filled with whipped Madagascar vanilla bean ganache and house-made salted caramel.',
    basePricePaise: 26000, // ₹260
    imageUrl: '/assets/images/menu/cruffin.webp',
    hotspotId: 'hotspot-bakery-cruffin',
    available: true,
  },
  {
    id: 'prod-cold-01',
    slug: 'nitro-cold-brew',
    name: '24hr Nitro Cold Brew',
    category: 'cold',
    description: 'Steeped for 24 hours in cold filtered spring water and infused with food-grade nitrogen for a creamy, stout-like head.',
    basePricePaise: 26000, // ₹260
    imageUrl: '/assets/images/menu/coldbrew.webp',
    available: true,
  },
];

export const HOTSPOTS: SceneHotspot[] = [
  {
    id: 'hotspot-counter-cortado',
    zone: 'counter',
    title: 'Signature Cortado',
    subtitle: 'Tap to inspect roast & order',
    position: [-2.0, 1.25, -0.4],
    productId: 'prod-latte-01',
    actionType: 'open_product',
  },
  {
    id: 'hotspot-counter-v60',
    zone: 'counter',
    title: 'Single-Origin Pour Over',
    subtitle: 'Estate V60 Barista Brew',
    position: [-1.4, 1.25, -0.6],
    productId: 'prod-pour-02',
    actionType: 'open_product',
  },
  {
    id: 'hotspot-bakery-croissant',
    zone: 'bakery',
    title: 'Normandy Butter Croissant',
    subtitle: 'Freshly baked at 7:00 AM',
    position: [-0.6, 1.15, -1.1],
    productId: 'prod-bakery-01',
    actionType: 'open_product',
  },
  {
    id: 'hotspot-seating-reserve',
    zone: 'seating',
    title: 'Reserve Table No. 4',
    subtitle: 'Sunlit Window Booth',
    position: [1.8, 1.05, -0.9],
    actionType: 'open_reservation',
  },
  {
    id: 'hotspot-brand-story',
    zone: 'brand',
    title: 'Our Estate Heritage',
    subtitle: 'From Shade-Grown Soil to Cup',
    position: [2.5, 1.7, -2.8],
    actionType: 'open_story',
  },
];
