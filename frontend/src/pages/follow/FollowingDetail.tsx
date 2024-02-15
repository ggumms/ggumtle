import { useOutletContext } from 'react-router-dom'
import SearchUserItem from '../Search/components/SearchUserItem'
import { useQuery } from '@tanstack/react-query'
import { getFollowee } from './api'
import { UserInfoType } from '../../interfaces'

const FollowingDetail = () => {
	const { userId } = useOutletContext<{ userId: number }>()
	const { isLoading, data } = useQuery({
		queryKey: ['userFollowee', userId],
		queryFn: getFollowee,
	})

	// UserInfoType issue는 머지하면서 수정하기
	console.log(data)
	return (
		<div className="px-4 pt-14">
			{!isLoading &&
				data.searchList.content.map((user: UserInfoType) => (
					<SearchUserItem user={user} key={user.userId} />
				))}
		</div>
	)
}
export default FollowingDetail
