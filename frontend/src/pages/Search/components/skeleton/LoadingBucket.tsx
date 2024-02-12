import { Skeleton } from "@mui/material"

const LoadingBucket = () => {
	return (
		<div className="bg-white flex justify-between items-start px-5 py-4">
			<div>
				<Skeleton variant="rounded" width={250} height={40} />
				<Skeleton variant="text" className="text-xl w-4/5" />
			</div>
			<Skeleton variant="circular" width={30} height={30} />
		</div>
	)
}

export default LoadingBucket
