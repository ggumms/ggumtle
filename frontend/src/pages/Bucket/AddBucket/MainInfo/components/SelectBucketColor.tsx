import React, { useEffect, useMemo, useState } from 'react'
import Ggumtle from '../../../../../components/Ggumtle'

import { useBucketStore } from '../../../../../store/bucketStore'
import { categoryData } from '../../../../../utils/category'
import { isCategoryType, isColorType } from '../../../../../utils/typeFilter'
import { ColorType } from '../../../../../interfaces'

const SelectBucketColor = () => {
	const { selectedInfo } = useBucketStore()
	// Todo : zustand로 변환하기
	const [selectedColor, setSelectedColor] = useState<ColorType>()

	const selectedColorList = useMemo(
		() =>
			Object.keys(selectedInfo)
				.filter((categoryName) => isCategoryType(categoryName) && selectedInfo[categoryName])
				.map((categoryName) => {
					if (isCategoryType(categoryName)) return categoryData[categoryName]
				}),
		[selectedInfo]
	)

	useEffect(() => {
		setSelectedColor(selectedColorList[0])
	}, [selectedColorList])

	const handleSelectColor = (event: React.MouseEvent<HTMLLIElement>) => {
		const { color } = event.currentTarget.dataset
		if (color && isColorType(color)) {
			setSelectedColor(color)
		}
	}

	return (
		<div className="flex flex-col items-center gap-12">
			{selectedColor && <Ggumtle color={selectedColor} width={100} height={100} speed={10} />}
			{selectedColorList.length > 1 && (
				<ul className="flex justify-center gap-3">
					{selectedColorList.map((color, index) => (
						<li key={`color-${index}`} data-color={color} onClick={handleSelectColor}>
							{color && <Ggumtle color={color} width={40} height={40} speed={0} />}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default SelectBucketColor
