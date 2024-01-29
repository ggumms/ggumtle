import { categoryData } from './category'
import { CategoryType } from '../interfaces'

export const isCategoryType = (input: string): input is CategoryType => {
	const matchingCount = categoryData.filter((category) => category.name === input).length
	return matchingCount > 0
}
