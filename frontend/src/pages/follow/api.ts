import { QueryFunctionContext } from "@tanstack/react-query"
import { instance } from "../../api"

export const getFollower = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId, page, size] = queryKey
	return await instance
		.get(`/user/follower?userId=${userId}&page=${page}&size=${size}`)
		.then((response) => response.data.followerList)
		.catch((e) => console.log(`[Error] ${e}`))
}

export const getFollowee = async ({ queryKey }: QueryFunctionContext) => {
	const [, userId, page, size] = queryKey
	return await instance
		.get(`/user/followee?userId=${userId}&page=${page}&size=${size}`)
		.then((response) => response.data.followerList)
		.catch((e) => console.log(`[Error] ${e}`))
}