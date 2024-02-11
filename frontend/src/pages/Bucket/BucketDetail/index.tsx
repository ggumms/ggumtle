import UserProfile from '../../../components/UserProfile/UserProfile'
import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'
import { icons } from '../../../constants/header-icons'
import { useRouter } from '../../../hooks/useRouter'
import { IBucketDetailInfo, IMenu, IMenuFunc } from '../../../interfaces'
import BucketInfo from './BucketInfo'
import InterestTag from './InterestTag'
import ShareButton from '../../../components/ShareButton'
import AchieveDreamButton from './AcheiveDreamButton'
import WriteReviewButton from './WriteReviewButton'
import { useParams } from 'react-router-dom'
import Reaction from './Reaction'
import CommentList from './Comment/CommentList'
import CommentInput from './Comment/CommentInput'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getBucketDetailInfo } from './api'
import DetailLocation from './DetailLocation'
import { Skeleton } from '@mui/material'

const BucketDetail = () => {
	const [isInputShown, setIsInputShown] = useState(false)
	const [isInputFocused, setIsInputFocused] = useState(false)
	const { goBack } = useRouter()
	const { bucketId } = useParams()

	// bucketId Path variable로 Number 값이 아닌 값이 들어오면 이전 페이지로 이동
	useEffect(() => {
		if (isNaN(Number(bucketId))) {
			goBack()
			return
		}

		return () => {}
	}, [])

	// :: Get Bucket & User(writer) data
	const { isLoading, data: bucketDetailInfo } = useQuery<IBucketDetailInfo>({
		queryKey: ['bucketInfo', bucketId],
		queryFn: getBucketDetailInfo,
	})
	console.log('isLoading', isLoading, bucketDetailInfo)

	// :: Header
	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = {
		left: icons.BACK,
		center: `${bucketDetailInfo ? bucketDetailInfo.userInfo.userNickname + '의 꿈:틀' : '꿈:틀'}`,
		right: undefined,
	}
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	return (
		<>
			<WithHeaderLayout headerMenu={headerMenu} headerFunc={headerFunc}>
				<BucketInfo
					isLoading={isLoading}
					title={bucketDetailInfo?.bucketInfo.title}
					// title={undefined}
					color={bucketDetailInfo?.bucketInfo.color}
					dayCount={bucketDetailInfo?.bucketInfo.dayCount}
					isPrivate={bucketDetailInfo?.bucketInfo.isPrivate}
				/>
				<UserProfile type="detail" isLoading={isLoading} userInfo={bucketDetailInfo?.userInfo} />
				{/* 옵셔널한 정보들 (장소, 사진) */}
				{isLoading || bucketDetailInfo === undefined ? (
					<Skeleton
						variant="rectangular"
						width={'100%'}
						height={'16rem'}
						// className="rounded-md"
					/>
				) : (
					bucketDetailInfo.bucketInfo.bucketPicture && (
						<img
							src={bucketDetailInfo.bucketInfo.bucketPicture}
							alt="dummy"
							className="object-contain w-full h-64 my-2 rounded-md"
						/>
					)
				)}
				<DetailLocation
					isLoading={isLoading}
					latitude={bucketDetailInfo?.bucketInfo.latitude}
					longitude={bucketDetailInfo?.bucketInfo.longitude}
					address={bucketDetailInfo?.bucketInfo.address}
				/>
				{isLoading || bucketDetailInfo === undefined ? (
					<>{/* Todo: skeleton 추가 */}</>
				) : (
					<>
						{/* 날짜 */}
						<p className="text-base text-disabled">{bucketDetailInfo.bucketInfo.createdDate}</p>
						{/* 태그 */}
						<ul className="bg-white">
							{bucketDetailInfo.bucketInfo.category.map((category, index) => (
								<InterestTag tag={category} key={`category-${index}`} />
							))}
						</ul>
						<div className="flex gap-3">
							<ShareButton />
							{bucketDetailInfo.bucketInfo.achievementDate === null
								? bucketId && <AchieveDreamButton id={bucketId} />
								: bucketId && <WriteReviewButton id={bucketId} />}
						</div>
						{bucketId && <Reaction id={bucketId} />}
						<CommentList isInputFocused={isInputFocused} setIsInputShown={setIsInputShown} />
					</>
				)}
			</WithHeaderLayout>
			{isInputShown && <CommentInput setIsInputFocused={setIsInputFocused} />}
		</>
	)
}

export default BucketDetail
