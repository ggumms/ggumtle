import { useEffect } from 'react'

// const { Kakao } = window
const Test = () => {

	const realUrl = 'http://localhost:5173'

	// 재랜더링시에 실행되게 해준다.
	useEffect(() => {
		// init 해주기 전에 clean up 을 해준다.
		window.Kakao.cleanup()
		// 자신의 js 키를 넣어준다.
		window.Kakao.init(import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY)
		// 잘 적용되면 true 를 뱉는다.
		console.log(window.Kakao.isInitialized())
	}, [])

	const shareKakao = () => {
		window.Kakao.Share.sendDefault({
			objectType: 'feed',
			content: {
				title: '오늘의 디저트',
				description: '아메리카노, 빵, 케익',
				imageUrl:
					'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
				link: {
					// mobileWebUrl: realUrl,
          webUrl: realUrl,
				},
			},
			buttons: [
        {
          title: '나도 테스트 하러가기',
					link: {
            // mobileWebUrl: realUrl,
            webUrl: realUrl,
					},
				},
			],
		})
	}
	return (
		<>
			<button
				className="bg-black text-white rounded-full px-2 py-1"
				onClick={() => {
					shareKakao()
				}}
			>
				카카오톡 공유하기
			</button>
		</>
	)
}

export default Test
