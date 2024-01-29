// import { PiBell } from 'react-icons/pi'
// import { LiaBellSolid } from 'react-icons/lia'
// import { PiBellSimple } from 'react-icons/pi'
// import { BsBell } from 'react-icons/bs'
import { VscBell } from 'react-icons/vsc'
import { Link } from 'react-router-dom'
const AlarmIcon = () => {
	const hasReadYet = true
	return (
		<Link to="/alarm">
			<div className="flex px-3 pt-2">
				{/* <PiBell size="1.8rem"/> */}
				{/* <LiaBellSolid size="1.8rem"/> */}
				{/* <PiBellSimple size="1.8rem" /> */}
				{/* <BsBell size="1.5rem" /> */}
				<VscBell size="1.7rem" color="#454645" />
				<div className={`w-[5px] h-[5px] rounded-full bg-[#E14246] ${!hasReadYet && 'invisible'}`}></div>
			</div>
		</Link>
	)
}

export default AlarmIcon
