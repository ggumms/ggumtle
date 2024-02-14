import React, { useEffect, useMemo } from 'react'
import Ggumtle from '../../../../../components/Ggumtle'

import { useBucketStore } from '../../../../../store/bucketStore'
import { categoryData } from '../../../../../utils/category'
import { isCategoryType, isColorType } from '../../../../../utils/typeFilter'
import { CategoryType } from '../../../../../interfaces'

const SelectBucketColor = () => {
	const { selectedInfo, bucketColor, changeBucketColor } = useBucketStore()

	const selectedColorList = useMemo(
		() =>
			Object.keys(selectedInfo)
				.filter((categoryName) => isCategoryType(categoryName) && selectedInfo[categoryName])
				.map((categoryName) => {
					return categoryData[categoryName as CategoryType]
				}),
		[selectedInfo]
	)

	useEffect(() => {
		changeBucketColor(selectedColorList[0])
	}, [selectedColorList])

	const handleSelectColor = (event: React.MouseEvent<HTMLLIElement>) => {
		const { color } = event.currentTarget.dataset
		if (color && isColorType(color)) {
			changeBucketColor(color)
		}
	}

	return (
		<section className="flex flex-col items-center">
			{bucketColor && <Ggumtle color={bucketColor} width={125} height={125} speed={8} />}
			{selectedColorList.length > 1 && (
				<ul className="flex flex-wrap justify-center gap-3 mt-12">
					{selectedColorList.map((color, index) => (
						<li key={`color-${index}`} data-color={color} onClick={handleSelectColor}>
							{color && <Ggumtle color={color} width={40} height={40} speed={0} />}
						</li>
					))}
				</ul>
			)}
		</section>
	)
}

export default SelectBucketColor
