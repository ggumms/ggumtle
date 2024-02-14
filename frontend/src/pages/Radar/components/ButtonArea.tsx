import { MdOutlineRefresh } from 'react-icons/md'
import { GoPlus } from 'react-icons/go'
import { Link } from 'react-router-dom'

interface ButtonAreaProp {
	refreshRadar: () => void
}
const ButtonArea = ({ refreshRadar }: ButtonAreaProp) => {
	return (
		<div className="absolute bottom-14 z-5 w-full flex flex-col items-center justify-center">
			<div className="w-full m-0 flex items-end justify-center">
				<div
					className={`inline-flex justify-center items-center py-2 px-4 gap-2 rounded-md border-2 transition-transform duration-300 bg-white text-point1 border-point1 scale-95
					`}
					// 여기 refresh 적용이 왜 ㅏㅇㄴ될까
					onClick={refreshRadar}
				>
					<MdOutlineRefresh />
					새로고침
				</div>
				<Link to="/bucket/write" className="absolute right-4">
					<div className="rounded-full shadow-lg p-2 border-[0.5px] border-lightGray">
						<GoPlus size="2rem" color="#52A88C" />
					</div>
				</Link>
			</div>
		</div>
	)
}

export default ButtonArea
