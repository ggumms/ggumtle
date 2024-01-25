import { alarmMessage } from '../../../../constants/alarmMessage'
const AlarmItem = () => {
	const hasReadYet = true
	return (
		<div className="px-5 py-2 flex gap-2 justify-between items-center">
			<div>
				{/* 사용자 프로필 이미지로 변경 */}
				<svg
					viewBox="0 0 36 36"
					fill="none"
					role="img"
					xmlns="http://www.w3.org/2000/svg"
					width="50"
					height="50"
				>
					<mask id=":rf:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
						<rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
					</mask>
					<g mask="url(#:rf:)">
						<rect width="36" height="36" fill="#987f69"></rect>
						<rect
							x="0"
							y="0"
							width="36"
							height="36"
							transform="translate(-5 9) rotate(189 18 18) scale(1)"
							fill="#fcd036"
							rx="36"
						></rect>
						<g transform="translate(-5 4.5) rotate(-9 18 18)">
							<path d="M13,19 a1,0.75 0 0,0 10,0" fill="#000000"></path>
							<rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
							<rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
						</g>
					</g>
				</svg>
			</div>
			<div className="w-4/5 px-2">
				<p className="text-point1 text-xs">{alarmMessage.WELCOME_MESSAGE('wonju')}</p>
				<p className="font-light text-point1 text-xs">나의 첫 꿈틀을 작성해 보세요</p>
				<p className="font-light text-point1 text-xs">2시간 전</p>
			</div>
			<div
				className={`w-[7px] h-[7px] rounded-full bg-[#E14246] ${!hasReadYet && 'invisible'}`}
			></div>
		</div>
	)
}

export default AlarmItem
