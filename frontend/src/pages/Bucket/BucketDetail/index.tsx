import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@mui/material'

import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'
import BucketInfo from './component/BucketInfo'
import InterestTag from './component/InterestTag'
import UserProfile from '../../../components/UserProfile/UserProfile'
import BucketMoreButton from './component/BucketMoreButton'
import Reaction from './component/Reaction'
import CommentList from './component/Comment/CommentList'
import CommentInput from './component/Comment/CommentInput'
import DetailButtonSection from './component/DetailButtonSection'

import useStoreBucketInfo from '../../../hooks/useStoreBucketInfo'
import { useRouter } from '../../../hooks/useRouter'
import useHasReview from '../../../hooks/useHasReview'

import { getBucketDetailInfo } from './api'
import { isMyUserType } from './../../../utils/typeFilter'
import { IBucketDetailInfo, IMenu, IMenuFunc } from '../../../interfaces'
import { icons } from '../../../constants/header-icons'
import TimeCapsule from './component/TimeCapsule'

const BucketDetail = () => {
	const [isInputShown, setIsInputShown] = useState(false)
	const [isInputFocused, setIsInputFocused] = useState(false)

	const { goBack } = useRouter()
	const { bucketId } = useParams()

	// :: Validate bucketId
	// bucketId Path variable로 Number 값이 아닌 값이 들어오면 이전 페이지로 이동
	useEffect(() => {
		if (isNaN(Number(bucketId))) {
			goBack()
			return
		}
	}, [])

	// :: Get Bucket & User(writer) data
	const { isLoading, data: bucketDetailInfo } = useQuery<IBucketDetailInfo>({
		queryKey: ['bucketDetailInfo', bucketId],
		queryFn: getBucketDetailInfo,
	})
	useStoreBucketInfo(bucketDetailInfo?.bucketInfo)

	// :: Get bucket has review
	const hasReview = useHasReview(bucketDetailInfo?.bucketInfo.reviewId)

	// :: Header
	const bucketRightMenu =
		bucketDetailInfo && isMyUserType(bucketDetailInfo.userInfo) ? <BucketMoreButton /> : undefined
	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = {
		left: icons.BACK,
		center: `${bucketDetailInfo ? bucketDetailInfo.userInfo.userNickname + '의 꿈:틀' : '꿈:틀'}`,
		right: bucketRightMenu,
	}
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	// :: Rendering
	if (bucketId === undefined) {
		goBack()
		return
	}
	return (
		<>
			<WithHeaderLayout headerMenu={headerMenu} headerFunc={headerFunc}>
				<BucketInfo
					isLoading={isLoading}
					title={bucketDetailInfo?.bucketInfo.title}
					color={bucketDetailInfo?.bucketInfo.color}
					dayCount={bucketDetailInfo?.bucketInfo.dayCount}
					isPrivate={bucketDetailInfo?.bucketInfo.isPrivate}
					isDone={bucketDetailInfo?.bucketInfo.achievementDate}
				/>
				<div className="mt-3">
					<UserProfile type="detail" isLoading={isLoading} userInfo={bucketDetailInfo?.userInfo} />
				</div>
				{/* 옵셔널한 정보들 (장소, 사진) */}

				{isLoading || bucketDetailInfo === undefined ? (
					<Skeleton variant="rectangular" width={'100%'} height={'16rem'} />
				) : (
					bucketDetailInfo.bucketInfo.bucketPicture && (
						<img
							src={bucketDetailInfo.bucketInfo.bucketPicture}
							alt="dummy"
							className="object-contain w-full h-64 mt-6 rounded-md"
						/>
					)
				)}
				{isLoading || bucketDetailInfo === undefined ? (
					<></>
				) : (
					bucketDetailInfo.bucketInfo.timeCapsule && (
						<TimeCapsule bucketInfo={bucketDetailInfo.bucketInfo} />
					)
				)}
				{isLoading || bucketDetailInfo === undefined ? (
					<>{/* Todo: skeleton 추가 */}</>
				) : (
					<>
						{/* 날짜 */}
						<p className="mt-6 text-base text-disabled">
							{bucketDetailInfo.bucketInfo.createdDate}
						</p>
						{/* 태그 */}
						<ul className="mt-3 bg-white">
							{bucketDetailInfo.bucketInfo.category.map((category, index) => (
								<InterestTag tag={category} key={`category-${index}`} />
							))}
						</ul>
						<div className="flex gap-3 my-8">
							<DetailButtonSection
								bucketId={bucketId}
								bucketDetailInfo={bucketDetailInfo}
								hasReview={hasReview}
							/>
						</div>
						<Reaction id={bucketId} />
						<CommentList
							isInputFocused={isInputFocused}
							setIsInputShown={setIsInputShown}
							id={bucketId}
						/>
					</>
				)}
			</WithHeaderLayout>
			{isInputShown && <CommentInput bucketId={bucketId} setIsInputFocused={setIsInputFocused} />}
		</>
	)
}

export default BucketDetail
