import { categoryData } from './category'
import { CategoryType } from '../interfaces'

// before categoryData changing
// export const isCategoryType = (input: string): input is CategoryType => {
// 	const matchingCount = categoryData.filter((category) => category.name === input).length
// 	return matchingCount > 0
// }

// after categoryData changing
export const isCategoryType = (input: string): input is CategoryType => {
	const matchingCount = Object.keys(categoryData).filter((category) => category === input).length
	return matchingCount > 0
}
