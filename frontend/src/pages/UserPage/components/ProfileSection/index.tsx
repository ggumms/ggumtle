import InterestTag from '../../../../components/InterestTag'
import ProfileBucket from '../../../../components/ProfileBucket'
import { useUserInfoQuery } from '../../../../hooks/useUserInfo'
import FollowButtons from './FollowButtons'
import NumInfo from './NumInfo'

const ProfileSection = ({ userId }: { userId: number }) => {

	const { isLoading, userInfo } = useUserInfoQuery(userId!)
	console.log('[ProfileSection]', userInfo)
	// const { userId, userProfileImage, bucketTitle, userNickname, color, dayCount, category } = userInfo
	// const hasTitleBucket = bucketTitle && color && dayCount

	return (
		<div className="bg-white px-5 pt-2 pb-4">
			<section className="flex items-center justify-around">
				<fieldset className="flex flex-col items-center justify-center w-2/5">
					{/* @TODO: 추후 실제 프로필 이미지로 변경 */}
					{/* <DummyUser1 /> */}
					{!isLoading && userInfo && (
						<div className="w-16 h-16 rounded-full overflow-hidden">
							<img src={userInfo.userProfileImage} alt="" />
						</div>
					)}
					{!isLoading && userInfo && (
						<p className="font-semibold text-point1">{userInfo.userNickname}</p>
					)}
				</fieldset>

				<fieldset className="w-full px-2">
					{/* @TODO: 대표버킷 없을 경우 처리 */}
					{/* {hasTitleBucket && ( */}
					{!isLoading && userInfo && (
						<ProfileBucket
							isLoading={false}
							title={userInfo.bucketTitle}
							color={userInfo.color}
							dayCount={userInfo.dayCount}
							isLock={null}
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
