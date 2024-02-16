// :: Bucket

// import axios from 'axios'
import { instance, multipartInstance } from '../../../axios'
import { IBaseBucketInfo } from '../../../interfaces'

// - Post Request
interface IPostBucketRes {
	result: string
	bucketId: number
}
export const postBucket = async (bucketInfo: IBaseBucketInfo): Promise<number | null> => {
	const bucketRes = await instance.post<IPostBucketRes>(`/bucket/`, bucketInfo)
	if (bucketRes.data.result === 'ok') {
		return bucketRes.data.bucketId
	}
	return null
}

interface IBucketImageRes {
	result: string
	bucketImageUrl: string
}
export const postBucketImage = async (image: FormData, id: number): Promise<string> => {
	const imageRes = await multipartInstance.post<IBucketImageRes>(`/bucket/image/${id}`, image)
	return imageRes.data.bucketImageUrl

	// const axiosConfig = {
	// 	headers: {
	// 		'Content-Type': 'multipart/form-data',
	// 		Authorization: `Bearer ${import.meta.env.VITE_USER1_TOKEN}`,
	// 	},
	// 	withCredentials: true,
	// }
	// const imageRes = await axios.post<IBucketImageRes>(
	// 	`${import.meta.env.VITE_BASE_URL}/bucket/image/${id}`,
	// 	image,
	// 	axiosConfig
	// )
	// return imageRes.data.imageUrl
}
