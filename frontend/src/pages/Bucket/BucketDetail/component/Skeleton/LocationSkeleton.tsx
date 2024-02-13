import { Skeleton } from '@mui/material'

const LocationSkeleton = () => {
	return (
		<section className="flex items-center gap-2 px-2 my-2 border rounded-sm border-lightGray">
			{/* 아이콘 대신 사용할 스켈레톤 */}
			<Skeleton variant="circular" width="1.7rem" height="1.7rem" className="bg-lightGray" />
			{/* 텍스트 정보 대신 사용할 스켈레톤 */}
			<div>
				<Skeleton variant="text" width="140px" height="16px" className="mb-1 bg-lightGray" />
				<Skeleton variant="text" width="100px" height="15px" className="bg-lightGray" />
			</div>
		</section>
	)
}

export default LocationSkeleton
