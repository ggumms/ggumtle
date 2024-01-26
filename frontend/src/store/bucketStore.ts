import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CategoryType, selectedInfoType } from '../interfaces'
import { defaultCategories } from '../utils/category'

// Todo: Slices Pattern 이용해서 페이지 State 관리 적용하기
interface ICategorySlice {
	// State
	selectedInfo: selectedInfoType
	// Action
	addCategory: (selectedItem: CategoryType) => void
	removeCategory: (selectedItem: CategoryType) => void
	resetCategory: () => void
}

// 버킷 정보를 관리하는 전역 State
// - 버킷 생성
// - 상세 버킷 조회
export const useBucketStore = create<ICategorySlice>()(
	devtools(
		persist(
			(set) => ({
				selectedInfo: { ...defaultCategories },
				addCategory: (selectedItemName) =>
					set((state) => {
						state.selectedInfo[selectedItemName] = true
						return { selectedInfo: { ...state.selectedInfo } }
					}),
				removeCategory: (selectedItemName) =>
					set((state) => {
						state.selectedInfo[selectedItemName] = false
						return { selectedInfo: { ...state.selectedInfo } }
					}),
				resetCategory: () =>
					set(() => {
						return { selectedInfo: { ...defaultCategories } }
					}),
			}),
			{ name: 'selectedInfo' }
		)
	)
)
