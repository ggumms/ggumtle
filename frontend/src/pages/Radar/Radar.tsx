import { Outlet } from 'react-router-dom'
const Radar = () => {
	// const bucketInfo = {
	// 	title: '구독자 100만명 달성하기',
	// 	color: 'green',
	// 	dDay: 168,
	// 	isLock: true,
	// }

	return (
		<div>
			{/* <ProfileBucket bucketInfo={bucketInfo} /> */}
			<Outlet />
		</div>
	)
}

export default Radar
