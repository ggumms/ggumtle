import { useState } from 'react'

// 미래 날짜 설정 불가능하도록하는 기능 추가
type PeriodType = 'twoWeek' | 'oneDay' | 'oneWeek' | 'oneMonth' | 'oneYear' | null
const periodData = {
	twoWeek: '2주 마다',
	oneDay: '매일',
	oneWeek: '매주',
	oneMonth: '매월',
	oneYear: '매년',
	null: '없음',
}

const RemindPeriod = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [period, setPeriod] = useState<PeriodType>('twoWeek')

	// build error를 막기 위한 코드
	console.log(isOpen, setPeriod)

	const handleClickPeriod = () => {
		setIsOpen((prev) => !prev)
	}

	return (
		<div>
			<p>리마인드 주기</p>
			<button
				onClick={handleClickPeriod}
				className="
					relative w-full px-2 py-2 text-left border-[0.5px] rounded-[5px]
					after:content-clockImage after:inline-block after:h-[19px] after:absolute after:right-2 after:translate-y-1/2 after:bottom-1/2
				"
			>
				{period && periodData[period]}
			</button>
		</div>
	)
}

export default RemindPeriod
