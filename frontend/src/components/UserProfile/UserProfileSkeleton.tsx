import { Skeleton } from '@mui/material'

const profileStyle = {
	comment: {
		profileSize: '36px',
		nameTextSize: '12px',
		bucketTextSize: '10px',
		achieveIconWidth: 12,
		achieveIconHeight: 12,
		profileRightMargin: '8px',
		bucketTitleLeftMargin: '8px',
	},
	detail: {
		profileSize: '42px',
		nameTextSize: '14px',
		bucketTextSize: '12px',
		achieveIconWidth: 14,
		achieveIconHeight: 14,

		profileRightMargin: '12px',
		bucketTitleLeftMargin: '12px',
	},
	follow: {
		profileSize: '55px',
		nameTextSize: '14px',
		bucketTextSize: '12px',
		achieveIconWidth: 14,
		achieveIconHeight: 14,
		profileRightMargin: '16px',
		bucketTitleLeftMargin: '6px',
	},
}

interface IUserProfileSkeletonProps {
	type: 'comment' | 'detail' | 'follow'
}

const UserProfileSkeleton = ({ type }: IUserProfileSkeletonProps) => {
	const style = profileStyle[type]

	return (
		<section className="flex">
			<Skeleton variant="circular" width={style.profileSize} height={style.profileSize} />
			<div
				className="flex flex-col justify-center w-1/4"
				style={{ marginLeft: style.profileRightMargin }}
			>
				<Skeleton variant="text" width="70%" height={'21px'} />
				<Skeleton variant="text" width="100%" height={style.bucketTextSize} />
			</div>
		</section>
	)
}

export default UserProfileSkeleton
