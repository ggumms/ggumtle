import React from 'react'
import './Ggumtle.css'
import { bgColorClass } from '../constants/dynamicClass'

const Ggumtle = () => {
	return (
		<>
			<div
				className={`ggumtle min-h-[200px] min-w-[200px] w-[4vh] h-[4vh] ${bgColorClass['green']}`}
			/>
		</>
	)
}

export default Ggumtle
