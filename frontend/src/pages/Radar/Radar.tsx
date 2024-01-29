import { mainHeaderList } from '../../router'
import MultiPageLayout from '../../components/layout/MutiPageLayout/MultiPageLayout'
const Radar = () => {
	// const bucketInfo = {
	// 	title: '구독자 100만명 달성하기',
	// 	color: 'green',
	// 	dDay: 168,
	// 	isLock: true,
	// }
	// <ProfileBucket bucketInfo={bucketInfo} />

	return <MultiPageLayout headerData={mainHeaderList} hasIcon={true} />
}

export default Radar
