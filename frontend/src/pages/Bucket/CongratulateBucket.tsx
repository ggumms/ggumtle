import { Link, useParams } from 'react-router-dom'
import ShareButton from '../../components/ShareButton'
import WriteReviewButton from './BucketDetail/WriteReviewButton'
import { useRouter } from '../../hooks/useRouter'
import { Congratulation } from '../../assets/svgs'

const CongratulateBucket = () => {
	const { bucketId } = useParams()
	const { goBack } = useRouter()

	// :: Validate bucketId
	if (isNaN(Number(bucketId))) {
		goBack()
		return
	}

	return (
		<div className="flex flex-col items-center justify-center h-screen px-5 gap-11 ">
			<Congratulation />
			<p className="flex flex-col gap-2">
				<span className="relative w-full text-4xl font-bold ">20만 첫 팬미팅!</span>
				<span className="text-base font-bold text-point1">(을)를 달성하셨어요.</span>
			</p>
			<p className="w-full h-20 bg-gray-400 rounded-xl">{}</p>
			<section className="flex flex-col items-center w-full">
				<div className="flex w-full gap-3">
					<ShareButton />
					<WriteReviewButton id={bucketId as string} />
				</div>
				<Link to="/mypage" className="inline-block pt-8">
					<p className="text-gray-300 border-b-2">나중에 할래요.</p>
				</Link>
			</section>
		</div>
	)
}

export default CongratulateBucket
