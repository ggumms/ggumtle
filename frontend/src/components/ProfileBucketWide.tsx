import { FaLock } from 'react-icons/fa6'
import { BucketInfoProps } from '../interfaces'

// 꿈틀이와 텍스트가 justify-between 상태인 버킷 컴포넌트

const ProfileBucketWide = ({ bucketInfo }: BucketInfoProps) => {
	const { title, color, dDay, isLock } = bucketInfo
	
	return (
		<div className="flex justify-between px-3">
			<div className="">
				<p className="text-text">{title}</p>
				<p className="text-xs">
					를 마음에 품은지{' '}
					<span className={`text-${color}`}>
						<span className="text-base font-semibold">{dDay}</span>일
					</span>
					째
				</p>
			</div>
			<div className="flex flex-col items-end justify-center">
				<div className="w-6 h-6 rounded-full bg-green-300"></div>
				<div className={isLock ? '' : 'hidden'}>
					<FaLock />
				</div>
			</div>
		</div>
	)
}

export default ProfileBucketWide
