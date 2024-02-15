import { FaLock } from 'react-icons/fa6'
import { BucketInfoProps } from '../interfaces'
import { IoCheckbox } from 'react-icons/io5'
import { Skeleton } from '@mui/material'
import Ggumtle from './Ggumtle'
import { textColorClass } from '../constants/dynamicClass'

export interface IProfileBucketStyle {
	titleText: string
	subText: string
	dayText: string
	ggumtleSize: number
	padding: string
	checkSize: string
}
export interface IProfileStyle {
	profile: IProfileBucketStyle
	bucketDetail: IProfileBucketStyle
	reviewDetail: IProfileBucketStyle
}

const profileStyle: IProfileStyle = {
	profile: {
		titleText: 'text-sm font-semibold',
		subText: 'text-xs font-light',
		dayText: 'text-base font-semibold',
		ggumtleSize: 25,
		padding: 'py-0',
		checkSize: '1.2rem',
	},
	bucketDetail: {
		titleText: 'text-lg font-semibold py-1',
		subText: 'text-sm font-light',
		dayText: 'text-base font-semibold',
		ggumtleSize: 25,
		padding: 'pt-1 pb-2',
		checkSize: '1.5rem',
	},
	reviewDetail: {
		titleText: 'text-sm font-semibold py-1',
		subText: 'text-[10px] font-light', // figma에는 8px 이었는데... 너무 작아서 10px로 바꿔봤습니다..ㅜ 변경하셔도 됩니당
		dayText: 'text-sm font-semibold',
		ggumtleSize: 25,
		padding: 'py-2 pl-4 pr-2',
		checkSize: '1.5rem',
	},
}
const ProfileBucket = ({
	type = 'profile',
	isLoading,
	title,
	color,
	dayCount,
	isLock,
	isDone,
}: BucketInfoProps) => {
	return (
		<div
			className={`flex justify-between bg-white ${profileStyle[type].padding} ${type === 'reviewDetail' && 'rounded-md border-[0.2px] border-[#e7e7e7] items-start'}`}
		>
			<div className="text-point1">
				{/* 버킷 타이틀 */}
				<div
					className={`${profileStyle[type].titleText} leading-4 ${isDone && textColorClass[color]}`}
				>
					{/* @TODO: 대표 버킷이 null 인 경우 보여줄 컴포넌트 만들기 */}
					{isLoading ? (
						<Skeleton variant="text" sx={{ fontSize: '2rem' }} />
					) : title ? (
						title
					) : (
						<p className="text-point1">아직 대표 버킷이 없습니다</p>
					)}
				</div>

				{/* 버킷을 품은지 며칠째 */}
				{isLoading ? (
					<Skeleton variant="text" sx={{ fontSize: '1rem' }} />
				) : title ? (
					<p className={`${profileStyle[type].subText}`}>
						를 마음에 품은지
						<span className={textColorClass[color]}>
							<span className={`${profileStyle[type].dayText}`}>{dayCount}</span>일
						</span>
						째{isDone && <span>, 버킷 달성!</span>}
					</p>
				) : (
					<p className={`${profileStyle[type].subText} leading-7`}>다른 버킷을 구경해 보세요</p>
				)}
			</div>

			{/* 꿈틀이 or 달성 표시, 공개 여부 */}
			<div
				className={`flex flex-col items-end justify-center ${type === 'reviewDetail' && 'py-1'}`}
			>
				{!isLoading &&
					(isDone ? (
						<IoCheckbox
							size={profileStyle[type].checkSize}
							className={`rounded-xl ${textColorClass[color]}`}
						/>
					) : (
						<Ggumtle
							color={color ?? 'transparent'}
							speed={10}
							width={profileStyle[type].ggumtleSize}
							height={profileStyle[type].ggumtleSize}
						/>
					))}
				<div className={isLock ? 'pt-2' : 'hidden'}>
					<FaLock />
				</div>
			</div>
		</div>
	)
}

export default ProfileBucket
