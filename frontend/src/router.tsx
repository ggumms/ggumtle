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
import DefaultLayout from './components/layout/DefaultLayout'

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
	},
])

export default router
