import { IBucketWide } from '../interfaces'

// 꿈틀이와 텍스트가 justify-between 상태인 버킷 컴포넌트
const ProfileBucketWide = ({ title, color, dDay, isLock }: IBucketWide) => {
	return (
		<div className="flex justify-between px-3">
			<div className="">
				<p className="text-text">구독자 100만명 달성하기</p>
				<p className="text-xs">
					를 마음에 품은지{' '}
					<span className="text-[#52A88C]">
						<span className="text-base font-semibold">14</span>일
					</span>
					째
				</p>
			</div>
			<div className="flex flex-col items-end justify-center">
				<div className="w-6 h-6 rounded-full bg-green-300"></div>
				<div>🔒</div>
			</div>
		</div>
	)
}

export default ProfileBucketWide
