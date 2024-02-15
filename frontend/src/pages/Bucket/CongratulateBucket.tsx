import { Link, useParams } from 'react-router-dom'
import ShareButton from '../../components/ShareButton'
import WriteReviewButton from './BucketDetail/component/WriteReviewButton'
import { useRouter } from '../../hooks/useRouter'
import { Congratulation } from '../../assets/svgs'
import useFetchBucket from '../../hooks/useFetchBucket'
import { halfBgColorClass, textColorClass } from '../../constants/dynamicClass'
import { useCurrentUserStore } from '../../store/currentUserStore'

const CongratulateBucket = () => {
	const { userInfo } = useCurrentUserStore()
	const { bucketId } = useParams()
	const { goBack, currentPath } = useRouter()

	const { isLoading, bucketInfo } = useFetchBucket(bucketId)

	// :: Validate bucketId
	if (isNaN(Number(bucketId))) {
		goBack()
		return
	}

	return (
		<>
			{isLoading || !bucketInfo ? (
				<></>
			) : (
				<div className="flex flex-col items-center justify-center h-full px-5 pt-20 pb-10 ">
					<Congratulation />
					<p className={`flex flex-col gap-2 mx-2 mt-11 ${textColorClass[bucketInfo.color]}`}>
						<span className="relative w-full text-4xl font-bold break-keep">
							{bucketInfo.title}
						</span>
						<span className="text-base font-bold text-point1">(을)를 달성하셨어요.</span>
					</p>
					<p className={`p-5 rounded-md mt-11 break-keep ${halfBgColorClass[bucketInfo.color]}`}>
						{bucketInfo.timeCapsule}
					</p>
					<section className="flex flex-col items-center w-full mt-11">
						<div className="flex w-full gap-3">
							<ShareButton
								userName={userInfo?.userNickname}
								feedTitle={bucketInfo.title}
								path={currentPath}
							/>
							<WriteReviewButton bucketId={bucketId as string} />
						</div>
						<Link to={`/bucket/${bucketId}`} className="inline-block pt-8">
							<p className="border-b-2 text-gray">나중에 할래요.</p>
						</Link>
					</section>
				</div>
			)}
		</>
	)
}

export default CongratulateBucket
