import { FaLock } from 'react-icons/fa6'
import { BucketInfoProps } from '../interfaces'
import { bgColorClass, textColorClass } from '../constants/dynamicClass'
import { Skeleton } from '@mui/material'

const ProfileBucket = ({ isLoading, title, color, dayCount, isLock }: BucketInfoProps) => {
	return (
		<div className="flex justify-between bg-white">
			<div className="text-point1">
				<p className="text-sm leading-4">
					{isLoading ? <Skeleton variant="text" sx={{ fontSize: '2rem' }} /> : title}
				</p>
				{isLoading ? (
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				) : (
					<p className="text-xs font-light">
						를 마음에 품은지
						<span className={textColorClass[color!]}>
							<span className="text-base font-semibold">{dayCount}</span>일
						</span>
						째
					</p>
				)}
			</div>
			<div className="flex flex-col items-end justify-center">
				<div className={`w-6 h-6 rounded-full ${bgColorClass[color!]}`}></div>
				<div className={isLock ? 'pt-2' : 'hidden'}>
					<FaLock />
				</div>
			</div>
		</div>
	)
}

export default ProfileBucket
