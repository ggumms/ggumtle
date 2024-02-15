import { useQuery } from '@tanstack/react-query'
import { IBucketInfo } from '../interfaces'
import { getBucketInfo } from '../api'

const useFetchBucket = (bucketId: string | undefined) => {
	const { isLoading, data: bucketInfo } = useQuery<IBucketInfo>({
		queryKey: ['bucketInfo', bucketId],
		queryFn: getBucketInfo,
		enabled: !!bucketId,
	})

	return { isLoading, bucketInfo }
}

export default useFetchBucket
