import {
	DummyUser1,
	DummyUser2,
	DummyUser3,
	DummyUser4,
	DummyUser5,
	DummyUser6,
} from '../../../../assets/svgs'
import InterestTag from '../../../../components/InterestTag'
import ProfileBucket from '../../../../components/ProfileBucket'
import { useUserInfoQuery } from '../../../../hooks/useUserInfo'
import FollowButtons from './FollowButtons'
import NumInfo from './NumInfo'

const ProfileSection = ({ userId }: { userId: number }) => {
	const { isLoading, userInfo } = useUserInfoQuery(userId!)

	const randomProfile = [
		<DummyUser1 className="w-16 h-16" />,
		<DummyUser2 className="w-16 h-16" />,
		<DummyUser3 className="w-16 h-16" />,
		<DummyUser4 className="w-16 h-16" />,
		<DummyUser5 className="w-16 h-16" />,
		<DummyUser6 className="w-16 h-16" />,
	]

	return (
		<div className="px-5 pt-2 pb-4 bg-white">
			<section className="flex items-center justify-around">
				<fieldset className="flex flex-col items-center justify-center w-2/5">
					{!isLoading &&
						userInfo &&
						(userInfo.userProfileImage ? (
							<div className="w-16 h-16 overflow-hidden rounded-full">
								<img src={userInfo.userProfileImage} alt="유저 프로필" />
							</div>
						) : (
							randomProfile[userInfo.userId % 6]
						))}
					{!isLoading && userInfo && (
						<p className="font-semibold text-point1">{userInfo.userNickname}</p>
					)}
				</fieldset>

				<fieldset className="w-full px-2">
					{/* @TODO: 대표버킷 없을 경우 처리 */}
					{/* {hasTitleBucket && ( */}
					{!isLoading && userInfo && (
						<ProfileBucket
							type="profile"
							isLoading={false}
							title={userInfo.bucketTitle}
							color={userInfo.bucketColor}
							dayCount={userInfo.dayCount}
							isLock={null}
							isDone={userInfo.isAchieved}
						/>
					)}
					{/* )} */}
					{!isLoading && userInfo && (
						<div className="bg-white">
							{userInfo.category.map((cate) => (
								<InterestTag tag={cate} key={cate} />
							))}
						</div>
					)}
				</fieldset>
			</section>
			<section>
				{!isLoading && userInfo && <NumInfo userId={userInfo.userId} />}
				{!isLoading && userInfo && <FollowButtons userId={userInfo.userId} />}
			</section>
		</div>
	)
}

export default ProfileSection
