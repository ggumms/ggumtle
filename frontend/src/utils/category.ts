import { ICategoryItem, selectedInfoType } from '../interfaces'

export const categoryData: ICategoryItem[] = [
	{ name: '환경', color: 'green' },
	{ name: '자선활동', color: 'lightGreen' },
	{ name: '인간관계', color: 'red' },
	{ name: '휴식', color: 'yellow' },
	{ name: '연애', color: 'pink' },
	{ name: '운동', color: 'mint' },
	{ name: '여행', color: 'orange' },
	{ name: '언어', color: 'skyBlue' },
	{ name: '문화', color: 'purple' },
	{ name: '도전', color: 'beige' },
	{ name: '취미', color: 'sandPink' },
	{ name: '직장', color: 'brown' },
]

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
export const defaultCategories = categoryData.reduce((prev, category) => {
	return { ...prev, [category.name]: false }
}, {} as selectedInfoType)
