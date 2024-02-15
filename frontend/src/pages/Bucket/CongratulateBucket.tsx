import { Link, useParams } from 'react-router-dom'
import ShareButton from '../../components/ShareButton'
import WriteReviewButton from './BucketDetail/component/WriteReviewButton'
import { useRouter } from '../../hooks/useRouter'
import { Congratulation } from '../../assets/svgs'
import useFetchBucket from '../../hooks/useFetchBucket'
import { bgColorClass, textColorClass } from '../../constants/dynamicClass'

const CongratulateBucket = () => {
	const { bucketId } = useParams()
	const { goBack } = useRouter()

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
					<Congratulation className="" />
					{/* <img src="/clap_yellow.gif" style={{ width: '160px', height: '160px' }} /> */}
					<p className={`flex flex-col gap-2 mx-5 mt-11 ${textColorClass[bucketInfo.color]}`}>
						{/* <p className={`flex flex-col gap-2 mx-5 mt-11 text-sandPink`}> */}
						<span className="relative w-full text-4xl font-bold break-keep">
							{bucketInfo.title}
						</span>
						<span className="text-base font-bold text-point1">(을)를 달성하셨어요.</span>
					</p>
					<p
						// className={`p-5 mx-5 rounded-md mt-11 break-keep bg-sandPink/[0.5] `}
						className={`p-5 mx-5 rounded-md bg-lightGray mt-11 break-keep ${bgColorClass[bucketInfo.color]}`}
					>
						{bucketInfo.timeCapsule}
					</p>
					<section className="flex flex-col items-center w-full mt-11">
						<div className="flex w-full gap-3">
							<ShareButton />
							<WriteReviewButton id={bucketId as string} />
						</div>
						<Link to="/mypage" className="inline-block pt-8">
							<p className="border-b-2 text-gray">나중에 할래요.</p>
						</Link>
					</section>
				</div>
			)}
		</>
	)
}

export default CongratulateBucket
