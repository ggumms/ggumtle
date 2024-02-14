import { useEffect } from 'react'

const { Kakao } = window
const bucketPicture = '/public/dummy.PNG'
const title = '구독자분들과 팬미팅 진행하기'
const userNickname = 'juno'
// const bucketId = 3

const ShareButton = () => {
	// 예상 props
	const realUrl = `http://localhost:5173`
	const feedTitle = title
	const username = userNickname

	useEffect(() => {
		Kakao.cleanup()
		Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY)
	}, [])

	const handleShareKakao = () => {
		Kakao.Share.sendDefault({
			objectType: 'feed',
			content: {
				title: `꿈:틀 | ${username}`,
				description: feedTitle,
				imageUrl: bucketPicture,
				link: {
					mobileWebUrl: realUrl,
					webUrl: realUrl,
				},
			},
			buttons: [
				{
					title: '공유하기',
					link: {
						mobileWebUrl: realUrl,
						webUrl: realUrl,
					},
				},
			],
		})
	}
	return (
		<button
			onClick={() => handleShareKakao()}
			className="w-full text-lg text-white border-point1 border-[1px] bg-point1 font-bold py-4 rounded-[5px]"
		>
			공유하기
		</button>
	)
}

export default ShareButton
