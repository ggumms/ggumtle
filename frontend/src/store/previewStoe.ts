import { useRef } from 'react'
import { create } from 'zustand'
import { MAX_Y, MIN_Y } from '../pages/Radar/components/preview/PreviewBottomSheet'

interface IPreviewStore {
	isOpen: boolean
	openPreview: () => void
	closePreview: () => void
}

export const usePreviewStore = create<IPreviewStore>((set) => ({
	isOpen: false,
	openPreview: () => set(() => ({ isOpen: true })),
	closePreview: () => set(() => ({ isOpen: false })),
}))

// export const usePreviewStore = create<IPreviewStore>((set) => ({
// 	previewRef: useRef<HTMLDivElement>(null),
// 	isOpen: false,
//   openPreview: () =>
//     set((state) => {
//       if (state.previewRef.current) {
//         state.previewRef.current.style.setProperty(
//           'transform',
//           `translateY(${MIN_Y - MAX_Y}px)`
//         );
//       }
//       return {
//         ...state,
//         isOpen: true,
//       };
//     }),
//   closePreview: () =>
//     set((state) => {
//       if (state.previewRef.current) {
//         state.previewRef.current.style.setProperty(
//           'transform',
//           `translateY(${MIN_Y - MAX_Y}px)`
//         );
//       }
//       return {
//         ...state,
//         isOpen: false,
//       };
//     }),
// }));
