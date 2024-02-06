import UserProfile from '../../../components/UserProfile'
import WithHeaderLayout from '../../../components/layout/WithHeaderLayout'
import { icons } from '../../../constants/header-icons'
import { useRouter } from '../../../hooks/useRouter'
import { IMenu, IMenuFunc, UserInfoType } from '../../../interfaces'
import BucketInfo from './BucketInfo'

const userInfo: UserInfoType = {
	userId: 1,
	userProfileImage: 'url',
	userNickname: 'junho',
	category: ['인간관계', '여행', '직장'],
	bucketId: 2,
	bucketTitle: '구독자 100만명 달성하기',
	dayCount: 14,
	color: 'mint',
	isAchieved: true,
	owner: true,
	isFollowing: null,
}

const BucketDetail = () => {
	const { goBack } = useRouter()

	const handleLeftFunc = () => {
		goBack()
	}
	const headerMenu: IMenu = {
		left: icons.BACK,
		center: `${userInfo.userNickname}의 꿈:틀`,
		right: undefined,
	}
	const headerFunc: IMenuFunc = { left_func: handleLeftFunc, right_func: undefined }

	return (
		<>
			<WithHeaderLayout headerMenu={headerMenu} headerFunc={headerFunc}>
				<BucketInfo />
				<UserProfile type="detail" userInfo={userInfo} />
			</WithHeaderLayout>
		</>
	)
}

export default BucketDetail
