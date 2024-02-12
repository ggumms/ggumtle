import { useState } from 'react'
import BucketFeed from './BucketFeed'
import ReviewFeed from './ReviewFeed'
import { useQuery } from '@tanstack/react-query'
import { getTimeline } from '../../api'
import { CategoryType, ColorType } from '../../../../interfaces'

export interface IFeed {
	categories: CategoryType[]
	color: ColorType
	commentCount: number
	context: string | null
	createdDate: string
	day: number
	id: number
	images: string[]
	isAchieved: boolean
	reactionCount: number
	title: string
	type: 'BUCKET' | 'REVIEW'
}
// const FeedSection = () => {
const FeedSection = ({ userId }: { userId: number }) => {
	const [done, setDone] = useState<boolean>(true)
	const [doing, setDoing] = useState<boolean>(true)
	const [review, setReview] = useState<boolean>(true)
	// const userId = 1
	const page = 0
	const size = 5
	const { data: timeline } = useQuery({
		queryKey: ['timeline', userId, doing, done, review, page, size],
		queryFn: getTimeline,
	})

	return (
		<div>
			{/* @TODO: 토글 컴포넌트로 따로 분리하기 start---- */}
			<div className="flex gap-2 py-3 px-5">
				<div
					onClick={() => setDone(!done)}
					className={`transition-colors ${done ? 'bg-point1 text-white' : 'bg-white text-point1'} w-14 h-6 rounded-md flex items-center justify-center text-xs`}
				>
					미달성
				</div>
				<div
					onClick={() => setDoing(!doing)}
					className={`transition-colors ${doing ? 'bg-point1 text-white' : 'bg-white text-point1'} w-14 h-6 rounded-md flex items-center justify-center text-xs`}
				>
					달성
				</div>
				<div
					onClick={() => setReview(!review)}
					className={`transition-colors ${review ? 'bg-point1 text-white' : 'bg-white text-point1'} w-14 h-6 rounded-md flex items-center justify-center text-xs`}
				>
					후기
				</div>
			</div>
			{/* @TODO: 토글 컴포넌트로 따로 분리하기 end---- */}

			<div className="flex flex-col gap-2">
				{timeline && timeline.content.map((feed: IFeed) =>
					feed.type === 'BUCKET' ? <BucketFeed userId={userId} bucket={feed} /> : <ReviewFeed userId={userId} review={feed}/>
				)}
			</div>
		</div>
	)
}

export default FeedSection
