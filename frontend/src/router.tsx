import { Router as RemixRouter } from '@remix-run/router/dist/router'

import { createBrowserRouter } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import FollowingTab from './pages/Rader/components/FollowingTab'
import AllTab from './pages/Rader/components/AllTab'
import Rader from './pages/Rader/Rader'
import AlarmPage from './pages/Rader/components/AlarmPage'
import SearchPage from './pages/Search/SearchPage'
import UserSearch from './pages/Search/components/UserSearch'
import BucketSearch from './pages/Search/components/BucketSearch'
import ReviewSearch from './pages/Search/components/ReviewSearch'
import UserPage from './pages/UserPage/UserPage'
import BucketDetail from './pages/Bucket/BucketDetail'
import DefaultLayout from './components/layout/DefaultLayout'

// Router와 관련된 데이터를 관리하는 객체의 타입
interface IRouterBase {
	path: string // 페이지 경로
	element: React.ReactNode // 페이지 엘리먼트
	children?: IRouterBase[]
	label?: string
}

// 나중에 인증과 관련된 여러 종류의 Router 설정을 위해 사용된다.
// Ex : type RouterElement = UserAccessibleRouterElement | AdminAccessibleRouterElement | NoneUserOnlyAccessibleRouterElement
type RouterElement = IRouterBase

// 라우터와 관련된 모든 데이터를 관리하는 배열
const routerData: RouterElement[] = [
	{
		path: 'auth',
		element: <LoginPage />,
	},
	{
		path: '/',
		element: <Rader />,
		children: [
			{
				path: '',
				element: <FollowingTab />,
			},
			{
				path: 'all',
				element: <AllTab />,
			},
		],
	},
	{
		path: '/alarm',
		element: <AlarmPage />,
	},
	{
		path: '/search',
		element: <SearchPage />,
		children: [
			{
				path: '',
				element: <UserSearch />,
			},
			{
				path: 'bucket',
				element: <BucketSearch />,
			},
			{
				path: 'review',
				element: <ReviewSearch />,
			},
		],
	},
	{
		path: '/user/:userId',
		element: <UserPage />,
	},
	{
		path: '/bucket/:bucketId',
		element: <BucketDetail />,
	},
	{ path: '/bucket/:bucketId', element: <BucketDetail /> },
]

const router: RemixRouter = createBrowserRouter(
	routerData.map((router) => {
		return {
			path: router.path,
			element: <DefaultLayout>{router.element}</DefaultLayout>,
			children: router.children ?? router.children,
		}
	})
)

// RouterData 활용 예시
// - 레이아웃에 사용될 데이터 만들기
// 1. 적용 전
// export const addBucketHeaderList: MultiPageHeaderInfo[] = [
// 	{ name: '카테고리', path: 'category' },
// 	{ name: '꿈 내용', path: 'main' },
// 	{ name: '장소', path: 'place' },
// 	{ name: '추가정보', path: 'additional' },
// ]
// 2. 적용 후
// - 현재는 label이 없지만 필요에 따라 label을
// export const addBucketHeaderList = routerData.map((router) => {
// 	return { name: router.label, path: router.path }
// })

export default router
