import { Skeleton } from '@mui/material'

const LoadingReview = () => {
	return (
		<div className="bg-white px-5 py-4">
			<Skeleton variant="rounded" width={250} height={40} />
			<Skeleton variant="text" className="text-xl w-3/5" />
		</div>
	)
}

export default LoadingReview
