// import { PiBell } from 'react-icons/pi'
// import { LiaBellSolid } from 'react-icons/lia'
// import { PiBellSimple } from 'react-icons/pi'
// import { BsBell } from 'react-icons/bs'
import { VscBell } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
import { getAlarmCount } from '../pages/Alarm/api'
import { useQuery } from '@tanstack/react-query'
const AlarmIcon = () => {
	const { data: alarmCount, isLoading} = useQuery({
		queryKey: ['alarmCount'],
		queryFn: getAlarmCount,
	})

	return (
		<Link to="/alarm">
			<div className="flex px-3 pt-2 relative">
				<VscBell size="1.7rem" color="#454645" />
				<div className={`w-[14px] h-[14px] text-white text-[8px] flex justify-center items-center rounded-full bg-[#E14246] ${!alarmCount && 'invisible'} absolute right-3 top-1 border border-white` }>
					{ !isLoading && alarmCount}
				</div>
			</div>
		</Link>
	)
}

export default AlarmIcon
