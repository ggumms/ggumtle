import { instance } from '../../../axios'

interface IPatchAchieveRes {
	result: string
	message: string
}
export const patchAchieve = async (bucketId: string): Promise<'success' | 'fail'> => {
	const bucketRes = await instance.patch<IPatchAchieveRes>(`/bucket/${bucketId}`)
	if (bucketRes.data.result === 'ok') {
		return 'success'
	}
	return 'fail'
}
