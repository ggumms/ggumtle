import { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'
import ReviewTitle from '../component/ReviewTitle'
import TextEditor from '../component/TextEditor'
import QuickSaveButton from '../component/QuickSaveButton'
import PostReviewButton from '../component/PostReviewButton'
import ModifyButton from '../component/ModifyButton'

import { useRouter } from '../../../hooks/useRouter'
import useFetchBucket from '../../../hooks/useFetchBucket'
import { useCurrentUserStore } from '../../../store/currentUserStore'
import { getReviewBrief } from '../api'
import { IMenu, IMenuFunc } from '../../../interfaces'
import { icons } from '../../../constants/header-icons'

const WriteReview = () => {
	const { userInfo } = useCurrentUserStore()
	const [title, setTitle] = useState('')
	const [reviewText, setReviewText] = useState('')

	const { goBack, currentPath } = useRouter()
	const { bucketId } = useParams()

	const isWriteMode = currentPath.includes('write')

	// :: Validate bucketId
	// bucketId Path variable로 Number 값이 아닌 값이 들어오면 이전 페이지로 이동
	useEffect(() => {
		if (isNaN(Number(bucketId))) {
			goBack()
			return
		}
	}, [])

	// :: Check is my bucket
	const { isLoading, bucketInfo } = useFetchBucket(bucketId as string)
	useEffect(() => {
		if (bucketInfo && userInfo && bucketInfo.writerId !== userInfo.userId) {
			alert('권한이 없는 사용자입니다!')
			goBack()
			return
		}
	}, [bucketInfo, userInfo])

	// :: Fetch review data
	const fetchReviewData = async (bucketId: string) => {
		const { title, context, hasReview, hasTemp } = await getReviewBrief(bucketId)
		console.log(title, context, hasReview, hasTemp)

		if (isWriteMode) {
			if (hasReview) {
				alert('작성된 리뷰가 있습니다.')
				goBack()
				return
			}
			if (hasTemp) {
				setTitle(title)
				setReviewText(context)
				alert('작성하던 글이 있으시네요!')
			}
		} else {
			// ModifyMode
			if (!hasReview) {
				alert('작성된 리뷰가 없습니다.')
				goBack()
				return
			}
			title && setTitle(title)
			context && setReviewText(context)
		}
	}
	useEffect(() => {
		bucketId && fetchReviewData(bucketId)
	}, [bucketId])

	// :: Header
	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = { left: icons.BACK, center: '버킷 후기 작성', right: undefined }
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	return (
		<>
			{isLoading ? (
				<>{/* Skeleton */}</>
			) : (
				<WithHeaderLayout headerMenu={headerMenu} headerFunc={headerFunc}>
					<ReviewTitle title={title} setTitle={setTitle} />
					<TextEditor value={reviewText} setValue={setReviewText} />
					<div className="flex gap-3 py-12">
						{isWriteMode
							? bucketId && (
									<>
										<QuickSaveButton bucketId={bucketId} title={title} context={reviewText} />
										<PostReviewButton bucketId={bucketId} title={title} context={reviewText} />
									</>
								)
							: bucketId && <ModifyButton bucketId={bucketId} title={title} context={reviewText} />}
					</div>
				</WithHeaderLayout>
			)}
		</>
	)
}

export default WriteReview
