import { useQuery } from '@tanstack/react-query'
import { IBucketInfo } from '../interfaces'
import { getBucketInfo } from '../api'

const useFetchBucket = (bucketId: string) => {
	const { isLoading, data: bucketInfo } = useQuery<IBucketInfo>({
		queryKey: ['bucketInfo', bucketId],
		queryFn: getBucketInfo,
	})

	return { isLoading, bucketInfo }
}

export default useFetchBucket
