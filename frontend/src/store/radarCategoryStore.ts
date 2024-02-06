import { create } from 'zustand'
import { defaultCategories } from '../utils/category'
import { selectedInfoType } from '../interfaces'

interface IRadarCategoryStore {
	selectedCategory: selectedInfoType
	addCategory: (selectedItemName: string) => void
	removeCategory: (selectedItemName: string) => void
	resetCategory: () => void
}

export const useRadarCategoryStore = create<IRadarCategoryStore>((set) => ({
	selectedCategory: { ...defaultCategories },
	addCategory: (selectedItemName) =>
    set((state) => ({
      selectedCategory: {
        ...state.selectedCategory,
        [selectedItemName]: true,
      },
    })),
  removeCategory: (selectedItemName) =>
    set((state) => ({
      selectedCategory: {
        ...state.selectedCategory,
        [selectedItemName]: false,
      },
    })),
  resetCategory: () =>
    set(() => ({
      selectedCategory: { ...defaultCategories },
    })),
}))