import type { Metadata } from 'next';
import '@/styles/globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/panels/CartDrawer';
import { ProductHotspotModal } from '@/components/panels/ProductHotspotModal';
import { ReservationModal } from '@/components/panels/ReservationModal';
import { StoryModal } from '@/components/panels/StoryModal';

export const metadata: Metadata = {
  title: 'Maison Café — Immersive 3D Artisanal Sanctuary & Roastery',
  description:
    'Experience an immersive 3D digital twin of our architectural café in Colaba, Mumbai. Explore single-origin coffees, fresh French pastries, reserve dining tables, and order online.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-cafe-cream text-cafe-dark antialiased">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />

        {/* Global Floating Modals & Drawers */}
        <CartDrawer />
        <ProductHotspotModal />
        <ReservationModal />
        <StoryModal />
      </body>
    </html>
  );
}
