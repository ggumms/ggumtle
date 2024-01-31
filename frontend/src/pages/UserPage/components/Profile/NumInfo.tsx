import { Link } from 'react-router-dom'

const NumInfo = () => {
	const achieve = 56
	const follower = 43
	const following = 59
	return (
		<div className="flex justify-around items-center py-4">
			<Link to="/" className="flex flex-col justify-center items-center w-1/3">
				<span className='text-sm'>{achieve}%</span>
				<span className="text-xs font-light">달성률</span>
			</Link>
			<div className="h-8 bg-unActive w-[0.3px]"></div>
			<Link to="/" className="flex flex-col justify-center items-center w-1/3">
				<span className='text-sm'>{follower}</span>
				<span className="text-xs font-light">팔로워</span>
			</Link>
			<div className="h-8 bg-unActive w-[0.3px]"></div>
			<Link to="/" className="flex flex-col justify-center items-center w-1/3">
				<span className='text-sm'>{following}</span>
				<span className="text-xs font-light">팔로잉</span>
			</Link>
		</div>
	)
}

export default NumInfo
