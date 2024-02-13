// :: Review
// - Post Request
// interface IPostReactionRes {
// 	result: string
// 	userReaction: ReactionType
// }
// export const postBucketReaction = async (
// 	id: string,
// 	reactionType: ReactionType
// ): Promise<'success' | 'fail'> => {
// 	const reactionRes = await instance.post<IPostReactionRes>(`bucket/reaction/`, {
// 		bucketId: id,
// 		userReaction: reactionType,
// 	})
// 	if (reactionRes.data.result === 'ok' && reactionRes.data.userReaction === reactionType) {
// 		return 'success'
// 	}
// 	return 'fail'
// }
