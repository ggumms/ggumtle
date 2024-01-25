import { FaLock } from 'react-icons/fa6'
import { BucketInfoProps } from '../interfaces'
import { bgColorClass, textColorClass } from '../constants/dynamicClass'

const ProfileBucket = ({ bucketInfo }: BucketInfoProps) => {
	const { title, color, dDay, isLock } = bucketInfo

	return (
		<div className="flex justify-between px-3 pt-10">
			<div className="text-point1">
				<p>{title}</p>
				<p className="text-xs">
					를 마음에 품은지
					<span className={textColorClass[color]}>
						<span className="text-base font-semibold">{dDay}</span>일
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
