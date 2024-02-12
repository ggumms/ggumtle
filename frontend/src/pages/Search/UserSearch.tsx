import { UserInfoType } from '../../interfaces'
import SearchUserItem from './components/SearchUserItem'

const UserSearch = () => {
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
	return (
		<div className="h-screen px-4">
			<SearchUserItem />
			<SearchUserItem />
			<SearchUserItem />
			<SearchUserItem />
		</div>
	)
}

export default UserSearch
