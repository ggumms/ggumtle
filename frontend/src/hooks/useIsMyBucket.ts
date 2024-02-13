import { useEffect, useState } from 'react'
import { useCurrentUserStore } from '../store/currentUserStore'
import { IBucketInfo } from '../interfaces'

const useIsMyBucket = (bucketInfo: IBucketInfo) => {
	const [isMyBucket, setIsMyBucket] = useState(false)
	const { userInfo } = useCurrentUserStore()

	useEffect(() => {
		if (userInfo && bucketInfo.writerId === userInfo.userId) {
			setIsMyBucket(true)
		} else {
			setIsMyBucket(false)
		}
	}, [userInfo, bucketInfo])

	return isMyBucket
}

export default useIsMyBucket
