import { useEffect } from 'react'
import { FiShare } from 'react-icons/fi'

const { Kakao } = window
const FeedShare = () => {
	// 예상 props
	const realUrl = 'http://localhost:5173'
	const feedTitle = '구독자 100만명 달성하기'
	const username = 'juno'

	useEffect(() => {
		Kakao.cleanup()
		Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY)
		console.log(Kakao.isInitialized())
	}, [])

	const shareKakao = () => {
		Kakao.Share.sendDefault({
			objectType: 'feed',
			content: {
				title: `꿈:틀 | ${username}`,
				description: feedTitle,
				imageUrl:
					'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
				link: {
					mobileWebUrl: realUrl,
					webUrl: realUrl,
				},
			},
			buttons: [
				{
					title: '보러가기',
					link: {
						mobileWebUrl: realUrl,
						webUrl: realUrl,
					},
				},
			],
		})
	}
	return <FiShare size="0.9rem" color="#454645" onClick={() => shareKakao()} />
}

export default FeedShare
