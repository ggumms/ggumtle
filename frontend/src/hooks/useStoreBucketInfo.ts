import { useEffect } from 'react'
import { useBucketStore } from '../store/bucketStore'
import { IBucketInfo } from '../interfaces'

const useStoreBucketInfo = (bucketInfo: IBucketInfo | undefined) => {
	const { addBucketState, resetAllState } = useBucketStore()
	useEffect(() => {
		resetAllState()
		if (bucketInfo) {
			addBucketState(bucketInfo)
		}
		return () => {
			resetAllState()
		}
	}, [bucketInfo])
}

export default useStoreBucketInfo
