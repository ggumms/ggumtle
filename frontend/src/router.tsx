import { Router as RemixRouter } from '@remix-run/router/dist/router'
import { createBrowserRouter, useParams } from 'react-router-dom'
import LoginPage from './pages/auth/LoginPage'
import FollowingTab from './pages/Radar/FollowingTab'
import AllTab from './pages/Radar/AllTab'
import Radar from './pages/Radar'
import AlarmPage from './pages/Alarm'
import SearchPage from './pages/Search'
import UserSearch from './pages/Search/UserSearch'
import BucketSearch from './pages/Search/BucketSearch'
import ReviewSearch from './pages/Search/ReviewSearch'
import UserPage from './pages/UserPage'
import BucketDetail from './pages/Bucket/BucketDetail'
import AddBucket from './pages/Bucket/AddBucket'
import MainInfo from './pages/Bucket/AddBucket/component/MainInfo/MainInfo'
import CategoryInfo from './pages/Bucket/AddBucket/component/CategoryInfo/CategoryInfo'
// import PlaceInfo from './pages/Bucket/AddBucket/PlaceInfo'
import AdditionalInfo from './pages/Bucket/AddBucket/component/AdditionalInfo'
import { MultiPageHeaderInfo } from './types/router'
import NotFoundPage from './pages/NotfoundPage'
import ValidateTokenLayout from './components/layout/ValidateTokenLayout'
import WriteReview from './pages/Review/WriteReview'
import FollowDetail from './pages/follow'
import FollowerDetail from './pages/follow/FollowerDetail'
import FollowingDetail from './pages/follow/FollowingDetail'
import ReviewDetail from './pages/Review/ReviewDetail'
import AchieveBucket from './pages/Bucket/AchieveBucket'
import CongratulateBucket from './pages/Bucket/CongratulateBucket'

// Router와 관련된 데이터를 관리하는 객체의 타입
interface IRouterBase {
	path: string // 페이지 경로
	element: React.ReactNode // 페이지 엘리먼트
	label: string
	children?: IRouterBase[]
}

// 나중에 인증과 관련된 여러 종류의 Router 설정을 위해 사용된다.
// Ex : type RouterElement = UserAccessibleRouterElement | AdminAccessibleRouterElement | NoneUserOnlyAccessibleRouterElement
type RouterElement = IRouterBase

// 라우터와 관련된 모든 데이터를 관리하는 배열
const routerData: RouterElement[] = [
	{
		path: 'auth',
		element: <LoginPage />,
		label: '',
	},
	{
		path: '/',
		element: <Radar />,
		label: '메인페이지',
		children: [
			{
				path: '',
				element: <FollowingTab />,
				label: '팔로잉',
			},
			{
				path: 'follow',
				element: <FollowingTab />,
				label: '팔로잉',
			},
			{
				path: 'all',
				element: <AllTab />,
				label: '전체',
			},
		],
	},
	{
		path: '/alarm',
		element: <AlarmPage />,
		label: '',
	},
	{
		path: '/search',
		element: <SearchPage />,
		label: '검색페이지',
		children: [
			{
				path: '',
				element: <UserSearch />,
				label: '사용자',
			},
			{
				path: 'user',
				element: <UserSearch />,
				label: '사용자',
			},
			{
				path: 'bucket',
				element: <BucketSearch />,
				label: '꿈:틀',
			},
			{
				path: 'review',
				element: <ReviewSearch />,
				label: '후기',
			},
		],
	},

	{
		path: '/mypage',
		// @TODO: 추후 본인 userId 삽입
		element: <UserPage isForRadar={false} userId={6} />,
		label: '',
	},
	{
		path: '/user/:userId',
		// @TODO: 추후 본인 userId 삽입
		element: <UserPageWrapper />,
		label: '',
	},

	{
		path: '/follow/:userId',
		element: <FollowDetail />,
		label: '팔로우상세',
		children: [
			{
				path: '',
				element: <FollowerDetail />,
				label: '팔로워',
			},
			{
				path: 'follower',
				element: <FollowerDetail />,
				label: '팔로워',
			},
			{
				path: 'following',
				element: <FollowingDetail />,
				label: '팔로잉',
			},
		],
	},
	{ path: '/bucket/:bucketId', element: <BucketDetail />, label: '' },
	{
		path: '/bucket/write',
		element: <AddBucket />,
		label: '버킷작성',
		children: [
			{
				path: '',
				element: <CategoryInfo />,
				label: '카테고리',
			},
			{
				path: 'category',
				element: <CategoryInfo />,
				label: '카테고리',
			},
			{ path: 'main', element: <MainInfo />, label: '꿈내용' },
			// { path: 'place', element: <PlaceInfo />, label: '장소' },
			{ path: 'additional', element: <AdditionalInfo />, label: '추가정보' },
		],
	},
	{
		path: '/bucket/modify/:bucketId',
		element: <AddBucket />,
		label: '버킷작성',
		children: [
			{
				path: '',
				element: <CategoryInfo />,
				label: '카테고리',
			},
			{
				path: 'category',
				element: <CategoryInfo />,
				label: '카테고리',
			},
			{ path: 'main', element: <MainInfo />, label: '꿈내용' },
			// { path: 'place', element: <PlaceInfo />, label: '장소' },
			{ path: 'additional', element: <AdditionalInfo />, label: '추가정보' },
		],
	},
	{ path: '/bucket/achieve/:bucketId', element: <AchieveBucket />, label: '리뷰달성' },
	{ path: '/review/write/:bucketId', element: <WriteReview />, label: '리뷰작성' },
	{ path: '/review/modify/:bucketId', element: <WriteReview />, label: '리뷰수정' },
	{ path: '/review/:reviewId', element: <ReviewDetail />, label: '리뷰상세' },
	{ path: '/bucket/congratulation/:bucketId', element: <CongratulateBucket />, label: '리뷰축하' },
	{ path: '*', element: <NotFoundPage />, label: '' },
]

const router: RemixRouter = createBrowserRouter(
	routerData.map((router) => {
		return {
			path: router.path,
			element: <ValidateTokenLayout>{router.element}</ValidateTokenLayout>,
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

function UserPageWrapper() {
	const { userId } = useParams()

	return userId && <UserPage isForRadar={false} userId={parseInt(userId)} />
}

export const addBucketHeaderList: MultiPageHeaderInfo[] = routerData.reduce((prev, router) => {
	let headerData
	if (router.label !== '버킷작성') return [...prev]
	if (router.children) {
		headerData = router.children
			.filter((child) => child.path)
			.map((child) => {
				return { name: child?.label, path: child.path }
			})
		return [...headerData]
	}
	return [...prev]
}, [] as MultiPageHeaderInfo[])
// export const addBucketHeaderList: MultiPageHeaderInfo[] = routerData

export const mainHeaderList: MultiPageHeaderInfo[] = routerData.reduce((prev, router) => {
	let headerData
	if (router.label !== '메인페이지') return [...prev]
	if (router.children) {
		headerData = router.children
			.filter((child) => child.path)
			.map((child) => {
				return { name: child?.label, path: child.path }
			})
		return [...headerData]
	}
	return [...prev]
}, [] as MultiPageHeaderInfo[])

export default router

export const searchHeaderList: MultiPageHeaderInfo[] = routerData.reduce((prev, router) => {
	let headerData
	if (router.label !== '검색페이지') return [...prev]
	if (router.children) {
		headerData = router.children
			.filter((child) => child.path)
			.map((child) => {
				return { name: child?.label, path: child.path }
			})
		return [...headerData]
	}
	return [...prev]
}, [] as MultiPageHeaderInfo[])
export const followHeaderList: MultiPageHeaderInfo[] = routerData.reduce((prev, router) => {
	let headerData
	if (router.label !== '팔로우상세') return [...prev]
	if (router.children) {
		headerData = router.children
			.filter((child) => child.path)
			.map((child) => {
				return { name: child?.label, path: child.path }
			})
		return [...headerData]
	}
	return [...prev]
}, [] as MultiPageHeaderInfo[])
