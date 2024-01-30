import { useState } from 'react'

const FeedSection = () => {
	const [achieve, setAchieve] = useState<boolean>(true)
	const [unachieve, setUnachieve] = useState<boolean>(true)
	const [review, setReview] = useState<boolean>(true)

	return (
		<div className="px-5">
			<div className="flex gap-2 py-3">
				<div
					onClick={() => setAchieve(!achieve)}
					className={`transition-colors ${achieve ? 'bg-point1 text-white' : 'bg-white text-point1'} w-14 h-6 rounded-md flex items-center justify-center text-xs`}
				>
					미달성
				</div>
				<div
        onClick={() => setUnachieve(!unachieve)}
					className={`transition-colors ${unachieve ? 'bg-point1 text-white' : 'bg-white text-point1'} w-14 h-6 rounded-md flex items-center justify-center text-xs`}
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
		</div>
	)
}

export default FeedSection
