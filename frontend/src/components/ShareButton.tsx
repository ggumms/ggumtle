import { useEffect } from 'react'
// import defaultPicture from '../assets/ggumtle.gif'

const { Kakao } = window
const title = '카카오톡 공유 테스트'
const userNickname = 'inhwa'
const baseUrl = import.meta.env.VITE_KAKAO_SHARE_BASE_URL
const defaultPicture = `${baseUrl}/assets/ggumtle.gif`

interface IShareButtonProps {
	userName?: string
	feedTitle?: string
	path?: string
	imageUrl?: string
}
const ShareButton = ({
	userName = userNickname,
	feedTitle = title,
	path = '',
	imageUrl = defaultPicture,
}: IShareButtonProps) => {
	const destinationUrl = path ? baseUrl + path : baseUrl
	console.log(userName, feedTitle, path, defaultPicture, imageUrl, destinationUrl)

	useEffect(() => {
		Kakao.cleanup()
		Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY)
	}, [])

	const handleShareKakao = () => {
		Kakao.Share.sendDefault({
			// 카카오톡 공유 메세지를 표시한 유형
			objectType: 'feed',
			// 공유 메세지안에 들어갈 내용
			content: {
				title: `꿈:틀 | ${userName}`,
				description: feedTitle,
				imageUrl: imageUrl,
				link: {
					mobileWebUrl: destinationUrl,
					webUrl: destinationUrl,
				},
			},
			buttons: [
				{
					title: '이동하기',
					link: {
						mobileWebUrl: destinationUrl,
						webUrl: destinationUrl,
					},
				},
			],
		})
	}
	return (
		<button
			onClick={() => handleShareKakao()}
			className="w-full text-lg border-point1 border-[1px] text-point1 font-bold py-4 rounded-[5px]"
		>
			공유하기
		</button>
	)
}

export default ShareButton
