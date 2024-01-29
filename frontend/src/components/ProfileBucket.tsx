import { FaLock } from 'react-icons/fa6'
import { BucketInfoProps } from '../interfaces'
import { bgColorClass, textColorClass } from '../constants/dynamicClass'

const ProfileBucket = ({ title, color, dayCount, isLock }: BucketInfoProps) => {
	return (
		<div className="flex justify-between px-3 py-2 bg-white">
			<div className="text-point1">
				<p>{title}</p>
				<p className="text-xs">
					를 마음에 품은지
					<span className={textColorClass[color]}>
						<span className="text-base font-semibold">{dayCount}</span>일
					</span>
					째
				</p>
			</div>
			<div className="flex flex-col items-end justify-center">
				<div className={`w-6 h-6 rounded-full ${bgColorClass[color]}`}></div>
				<div className={isLock ? 'pt-2' : 'hidden'}>
					<FaLock />
				</div>
			</div>
		</div>
	)
}

export default ProfileBucket
