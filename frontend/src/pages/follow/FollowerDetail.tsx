import SearchUserItem from "../Search/components/SearchUserItem";

const FollowerDetail = () => {

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
    <div className="px-4">
      <SearchUserItem user={userInfo} />
      <SearchUserItem user={userInfo} />
      <SearchUserItem user={userInfo} />
      <SearchUserItem user={userInfo} />
    </div>
  );
};

export default FollowerDetail;