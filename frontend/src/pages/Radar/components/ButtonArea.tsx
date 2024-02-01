import { useState } from 'react'
import { MdOutlineRefresh } from 'react-icons/md'
import { GoPlus } from 'react-icons/go'

const ButtonArea = () => {
	const [isPressed, setIsPressed] = useState(false)

	const handleMouseDown = () => {
		console.log('down')
		setIsPressed(true)
	}

	const handleMouseUp = () => {
		console.log('up')
		setIsPressed(false)
	}

	const handleRefresh = () => {
		console.log('refresh')
	}
	return (
		<div className="absolute bottom-14 z-5 w-full flex flex-col items-center justify-center">
			<div className="w-full m-0 flex items-end justify-center">
				<div
					className={`inline-flex justify-center items-center py-2 px-4 gap-2 rounded-md border-2 transition-transform duration-300 ${
						isPressed
							? 'bg-point1 text-white border-white hover:scale-105'
							: 'bg-white text-point1 border-point1 scale-95'
					}`}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onClick={handleRefresh}
				>
					<MdOutlineRefresh />
					새로고침
				</div>
				<div className="absolute right-4" onClick={() => console.log('helo')}>
					<div className="rounded-full shadow-lg p-2 border-[0.5px] border-lightGray">
						<GoPlus size="2rem" color="#52A88C" />
					</div>
				</div>
			</div>
		</div>
	)
}

export default ButtonArea
