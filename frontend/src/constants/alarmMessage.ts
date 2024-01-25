// 1. 회원가입 했을 때 환영인사
// 2. 누가 나를 팔로우 했을 경우
// 3. 내가 팔로우하는 사람이 새로운 버킷을 작성했을 때
// 4. 내가 팔로우하는 사람이 새로운 버킷을 달성했을 때
// 5. 내가 팔로우하는 사람이 새로운 후기를 작성했을 때
// 6. 리마인드 주기가 되거나, 리마인드 위치에 도착했을 때
// 7. 사용자가 내 버킷 상세페이지, 후기 페이지에 댓글을 다는 경우
// 8. 주인장이 좋아요 해줬을 때

export const alarmMessage = {
	WELCOME_MESSAGE: (username: string) =>
		`환영합니다, ${username}님, 회원가입이 성공적으로 완료되었습니다.`,
	NEW_FOLLOWER: (followerName: string) => `${followerName}님이 나를 팔로우했습니다.`,
	NEW_BUCKET_BY_FOLLOWER: (followerName: string) => `${followerName}님이 새 꿈틀을 작성했습니다.`,
	ACHIEVEMENT_BY_FOLLOWER: (followerName: string) => `${followerName}님이 꿈틀을 이루었습니다.`,
	NEW_REVIEW_BY_FOLLOWER: (followerName: string) =>
		`${followerName}님이 달성한 꿈틀의 후기를 작성했습니다.`,
	REMIND_NOTIFICATION: (bucket: string) => `리마인드: ${bucket}`,
	COMMENT_ON_BUCKET_OR_REVIEW: (username: string) => `${username}님이 나의 글에 댓글을 남겼습니다.`,
	LIKED_BY_OWNER: '작성자가 나의 댓글을 좋아합니다.',
}
