import { categoryData } from '../../../utils/category'
import { isCategoryType } from '../../../utils/typeFilter'
import { useRadarCategoryStore } from '../../../store/radarCategoryStore'
import { bgColorClass, borderColorClass } from '../../../constants/dynamicClass'
import { CategoryType } from '../../../interfaces'

const RadarCategoryItems = () => {
	const { selectedCategory, addCategory, removeCategory } = useRadarCategoryStore()
	const handleCategorySelect = (event: React.MouseEvent<HTMLLIElement>) => {
		const selectedName = event.currentTarget.dataset.name as CategoryType

		if (selectedName && isCategoryType(selectedName)) {
			selectedCategory[selectedName] ? removeCategory(selectedName) : addCategory(selectedName)
		}
	}

	// const { data: myinfo, isLoading: isMyinfoLoading} = useMyInfoQuery()
	// console.log(myinfo?.category)
	// useEffect(() => {
	// 	myinfo && myinfo.category.map((cate) => {
	// 		addCategory(cate)
	// 	})
	// }, [])

	return (
		<ul className="flex flex-wrap overflow-x-scroll gap-x-2 gap-y-2">
			{Object.keys(categoryData).map((categoryName, index) => {
				if (!isCategoryType(categoryName)) {
					return <></>
				}
				return (
					<li
						key={`category-${index}`}
						data-name={categoryName}
						onClick={handleCategorySelect}
						className={
							`flex items-center font-semilight px-[4px] py-[1px] rounded-md transition-colors text-sm` +
							' ' +
							(selectedCategory[categoryName]
								? `${bgColorClass[categoryData[categoryName]]} text-white border ${borderColorClass[categoryData[categoryName]]}`
								: `bg-unActive text-white border border-unActive`)
						}
					>
						<p>{categoryName}</p>
					</li>
				)
			})}
		</ul>
	)
}

export default RadarCategoryItems
