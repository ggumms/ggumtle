import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { getUserStats } from '../../api'

interface IUserStats {
	achieveRate: number
	follower: number
	following: number
}
const NumInfo = ({ userId }: { userId: number }) => {
	const { data: stats } = useQuery<IUserStats>({
		queryKey: ['userStat', userId],
		queryFn: getUserStats,
		enabled: !!userId,
	})
	console.log('[NumInfo]', stats)

	return (
		<div className="flex justify-around items-center py-4">
			<Link to="/" className="flex flex-col justify-center items-center w-1/3">
				<span className="text-sm">{stats && stats.achieveRate}%</span>
				<span className="text-xs font-light">달성률</span>
			</Link>
			<div className="h-8 bg-unActive w-[0.3px]"></div>
			<Link
				to={`/follow/${userId}/follower`}
				className="flex flex-col justify-center items-center w-1/3"
			>
				<span className="text-sm">{stats && stats.follower}</span>
				<span className="text-xs font-light">팔로워</span>
			</Link>
			<div className="h-8 bg-unActive w-[0.3px]"></div>
			<Link
				to={`/follow/${userId}/following`}
				className="flex flex-col justify-center items-center w-1/3"
			>
				<span className="text-sm">{stats && stats.following}</span>
				<span className="text-xs font-light">팔로잉</span>
			</Link>
		</div>
	)
}

export default NumInfo
