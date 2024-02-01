import { useState } from 'react'
import { MdOutlineRefresh } from 'react-icons/md'
// import PreviewUser from './preview/PreviewUser'

const ButtonArea = () => {
	const [isPressed, setIsPressed] = useState(false)

	const handleMouseDown = () => {
		setIsPressed(true)
	}

	const handleMouseUp = () => {
		setIsPressed(false)
	}

	const handleRefresh = () => {
		console.log('refresh')
	}
	return (
		<div className="absolute bottom-0 z-20 w-full flex flex-col items-center justify-center">
			<div className="w-full m-0 flex items-end justify-center">
				<div
					className={`inline-flex justify-center items-center py-2 w-32 mr-0 gap-2 rounded-md border-2 transition-colors ${
						isPressed ? 'bg-point1 text-white border-point1' : 'bg-white text-point1 border-point1'
					}`}
					onMouseDown={handleMouseDown}
					onMouseUp={handleMouseUp}
					onClick={handleRefresh}
				>
					<MdOutlineRefresh />
					새로고침
				</div>
				<div className="absolute right-0">+버튼</div>
			</div>
			{/* <PreviewUser /> */}
		</div>
	)
}

export default ButtonArea
