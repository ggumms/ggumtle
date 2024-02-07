import { FaLock } from 'react-icons/fa6'
import { BucketInfoProps } from '../interfaces'
import { bgColorClass, textColorClass } from '../constants/dynamicClass'
import { Skeleton } from '@mui/material'

const ProfileBucket = ({ isLoading, title, color, dayCount, isLock }: BucketInfoProps) => {
	return (
		<div className="flex justify-between bg-white">
			<div className="text-point1">
				<div className="text-sm leading-4">
					{/* @TODO: 대표 버킷이 null 인 경우 보여줄 컴포넌트 만들기 */}
					{isLoading ? (
						<Skeleton variant="text" sx={{ fontSize: '2rem' }} />
					) : title ? (
						title
					) : (
						<p className="text-point1">아직 대표 버킷이 없습니다</p>
					)}
				</div>
				{isLoading ? (
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				) : title ? (
					<p className="text-xs font-light">
						를 마음에 품은지
						<span className={textColorClass[color]}>
							<span className="text-base font-semibold">{dayCount}</span>일
						</span>
						째
					</p>
				) : (
					<p className="text-xs font-light leading-7">다른 버킷을 구경해 보세요</p>
				)}
			</div>
			<div className="flex flex-col items-end justify-center">
				{!isLoading && <div className={`w-6 h-6 rounded-full ${bgColorClass[color]}`}></div>}
				{!isLoading && (
					<div className={isLock ? 'pt-2' : 'hidden'}>
						<FaLock />
					</div>
				)}
			</div>
		</div>
	)
}

export default ProfileBucket
