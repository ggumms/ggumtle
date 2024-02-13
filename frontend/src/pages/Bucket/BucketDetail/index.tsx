import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '@mui/material'

import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'
import BucketInfo from './component/BucketInfo'
import InterestTag from './component/InterestTag'
import UserProfile from '../../../components/UserProfile/UserProfile'
import ShareButton from '../../../components/ShareButton'
import AchieveDreamButton from './component/AcheiveDreamButton'
import WriteReviewButton from './component/WriteReviewButton'
import DetailLocation from './component/DetailLocation'
import Reaction from './component/Reaction'
import CommentList from './component/Comment/CommentList'
import CommentInput from './component/Comment/CommentInput'

import { useRouter } from '../../../hooks/useRouter'
import { getBucketDetailInfo } from './api'

import { IBucketDetailInfo, IMenu, IMenuFunc } from '../../../interfaces'
import { icons } from '../../../constants/header-icons'
import BucketMoreButton from './component/BucketMoreButton'

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

	// :: Header
	const handleLeftFunc = () => {
		goBack()
	}
	// Todo : userInfo api 붙이고 나서 자기 글인지 여부에 따라 BucketMoreButton 조건부 렌더링으로 수정하기
	const headerMenu: IMenu = {
		left: icons.BACK,
		center: `${bucketDetailInfo ? bucketDetailInfo.userInfo.userNickname + '의 꿈:틀' : '꿈:틀'}`,
		right: <BucketMoreButton />,
	}
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	// :: Rendering
	return (
		<>
			<WithHeaderLayout headerMenu={headerMenu} headerFunc={headerFunc}>
				<BucketInfo
					isLoading={isLoading}
					title={bucketDetailInfo?.bucketInfo.title}
					color={bucketDetailInfo?.bucketInfo.color}
					dayCount={bucketDetailInfo?.bucketInfo.dayCount}
					isPrivate={bucketDetailInfo?.bucketInfo.isPrivate}
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
							<ShareButton />
							{bucketDetailInfo.bucketInfo.achievementDate === null
								? bucketId && <AchieveDreamButton id={bucketId} />
								: bucketId && <WriteReviewButton id={bucketId} />}
						</div>
						{bucketId && <Reaction id={bucketId} />}
						{bucketId && (
							<CommentList
								isInputFocused={isInputFocused}
								setIsInputShown={setIsInputShown}
								id={bucketId}
							/>
						)}
					</>
				)}
			</WithHeaderLayout>
			{isInputShown && bucketId && (
				<CommentInput bucketId={bucketId} setIsInputFocused={setIsInputFocused} />
			)}
		</>
	)
}

export default BucketDetail
