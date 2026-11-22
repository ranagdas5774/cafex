import { create } from 'zustand';
import { ZoneId } from '@/types';
import { ZONES } from '@/lib/data/seedData';

interface SceneState {
  currentZone: ZoneId;
  targetCameraPos: [number, number, number];
  targetCameraLookAt: [number, number, number];
  activeHotspotId: string | null;
  activeProductId: string | null;
  isProductModalOpen: boolean;
  isReservationModalOpen: boolean;
  isStoryModalOpen: boolean;
  canvasLoaded: boolean;
  progressPercent: number;

  setZone: (zoneId: ZoneId) => void;
  openHotspot: (hotspotId: string, actionType: string, productId?: string) => void;
  closeModals: () => void;
  setCanvasLoaded: (loaded: boolean) => void;
  setProgressPercent: (progress: number) => void;
}

export const useSceneStore = create<SceneState>((set) => ({
  currentZone: 'entrance',
  targetCameraPos: ZONES.entrance.cameraPosition,
  targetCameraLookAt: ZONES.entrance.cameraLookAt,
  activeHotspotId: null,
  activeProductId: null,
  isProductModalOpen: false,
  isReservationModalOpen: false,
  isStoryModalOpen: false,
  canvasLoaded: false,
  progressPercent: 0,

  setZone: (zoneId: ZoneId) => {
    const config = ZONES[zoneId] || ZONES.entrance;
    set({
      currentZone: zoneId,
      targetCameraPos: config.cameraPosition,
      targetCameraLookAt: config.cameraLookAt,
      activeHotspotId: null,
    });
  },

  openHotspot: (hotspotId: string, actionType: string, productId?: string) => {
    if (actionType === 'open_product' && productId) {
      set({
        activeHotspotId: hotspotId,
        activeProductId: productId,
        isProductModalOpen: true,
        isReservationModalOpen: false,
        isStoryModalOpen: false,
      });
    } else if (actionType === 'open_reservation') {
      set({
        activeHotspotId: hotspotId,
        isReservationModalOpen: true,
        isProductModalOpen: false,
        isStoryModalOpen: false,
      });
    } else if (actionType === 'open_story') {
      set({
        activeHotspotId: hotspotId,
        isStoryModalOpen: true,
        isProductModalOpen: false,
        isReservationModalOpen: false,
      });
    }
  },

  closeModals: () => {
    set({
      isProductModalOpen: false,
      isReservationModalOpen: false,
      isStoryModalOpen: false,
      activeHotspotId: null,
      activeProductId: null,
    });
  },

  setCanvasLoaded: (loaded: boolean) => set({ canvasLoaded: loaded }),
  setProgressPercent: (progress: number) => set({ progressPercent: progress }),
}));
