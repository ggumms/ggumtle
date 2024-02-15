import { CategoryDataType, CategoryType, selectedInfoType } from '../interfaces'
import { isCategoryType } from './typeFilter'

// Todo : Enum으로 수정해서 적용해보기
export const categoryData: CategoryDataType = {
	환경: 'green',
	자선활동: 'lightGreen',
	인간관계: 'red',
	휴식: 'yellow',
	연애: 'pink',
	운동: 'mint',
	여행: 'orange',
	언어: 'skyBlue',
	문화: 'purple',
	도전: 'beige',
	취미: 'sandPink',
	직장: 'brown',
}

// const defaultCategories = {
// 	환경: false,
// 	자선활동: false,
// 	인간관계: false,
// 	휴식: false,
// 	연애: false,
// 	운동: false,
// 	여행: false,
// 	언어: false,
// 	문화: false,
// 	도전: false,
// 	취미: false,
// 	직장: false,
// }
export const defaultCategories = Object.keys(categoryData).reduce((prev, category) => {
	return { ...prev, [category]: false }
}, {} as selectedInfoType)

export const getCurrentCategories = (selectedCategoryInfo: selectedInfoType): CategoryType[] =>
	Object.keys(selectedCategoryInfo).reduce((prev, category) => {
		if (isCategoryType(category) && selectedCategoryInfo[category]) {
			return [...prev, category]
		}

		return prev
	}, [] as CategoryType[])
