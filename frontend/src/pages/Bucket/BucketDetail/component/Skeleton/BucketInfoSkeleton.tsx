import { Skeleton } from '@mui/material'

const BucketInfoSkeleton = () => {
	return (
		<div className="justify-between w-1/2 bg-white">
			<Skeleton variant="text" sx={{ fontSize: '0.875rem' }} style={{ lineHeight: '1.25rem' }} />

			{/* <Skeleton variant="text" width="100%" height="1rem" style={{ lineHeight: '1.5rem' }} /> */}
			<Skeleton variant="text" width="100%" height="16px" style={{ marginTop: '4px' }} />
		</div>
	)
}

export default BucketInfoSkeleton
