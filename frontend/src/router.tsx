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
import AddBucket from './pages/Bucket/AddBucket'
import MainInfo from './pages/Bucket/AddBucket/MainInfo'
import DefaultLayout from './components/layout/DefaultLayout'
import CategoryInfo from './pages/Bucket/AddBucket/CategoryInfo'
import PlaceInfo from './pages/Bucket/AddBucket/PlaceInfo'
import AdditionalInfo from './pages/Bucket/AddBucket/AdditionalInfo'
import { MultiPageHeaderInfo } from './types/router'

const router = createBrowserRouter([
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
	{ path: '/bucket/:bucketId', element: <BucketDetail /> },
	{
		path: '/bucket/write',
		element: (
			<DefaultLayout>
				<AddBucket />
			</DefaultLayout>
		),
		children: [
			{ path: 'category', element: <CategoryInfo /> },
			{ path: 'main', element: <MainInfo /> },
			{ path: 'place', element: <PlaceInfo /> },
			{ path: 'additional', element: <AdditionalInfo /> },
		],
	},
])

//  TODO : router 배열을 변수로 분리해서 router 배열을 이용해서 headerList 제공하도록 만들기
// export const addBucketHeaderList = () => {
// }
export const addBucketHeaderList: MultiPageHeaderInfo[] = [
	{ name: '카테고리', path: 'category' },
	{ name: '꿈 내용', path: 'main' },
	{ name: '장소', path: 'place' },
	{ name: '추가정보', path: 'additional' },
]

export default router
