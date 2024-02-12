import { Skeleton } from '@mui/material'
import React from 'react'

const LoadingUser = () => {
	return (
		<div className="flex gap-4 px-1">
			<Skeleton variant="circular" width={55} height={55} />
			<div className="w-4/6">
				<Skeleton variant="text" className="w-3/5" />
				<Skeleton variant="text" className="w-3/4" />
			</div>
		</div>
	)
}

export default LoadingUser