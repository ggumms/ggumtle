import { useState } from 'react'
import DatePicker from './DatePicker'
import { startOfToday } from 'date-fns'

const StartDate = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [startDate, setStartDate] = useState<Date>(startOfToday)

	const handleClickStartDate = () => {
		setIsOpen((prev) => !prev)
	}

	// padStart : 빈 문자열을 채워주는 메서드
	const formatDate = (date: Date): string => {
		const year = date.getFullYear()
		const month = (date.getMonth() + 1).toString().padStart(2, '0')
		const day = date.getDate().toString().padStart(2, '0')
		return `${year}-${month}-${day}`
	}

	return (
		<div>
			<p>버킷 시작일</p>
			<button
				onClick={handleClickStartDate}
				className="
					relative w-full px-2 py-2 text-left border-[0.5px] rounded-[5px]
					after:content-calendarImage after:inline-block after:h-[19px] after:absolute after:right-2 after:translate-y-1/2 after:bottom-1/2
				"
			>
				{startDate instanceof Date ? formatDate(startDate) : '날짜 선택'}
			</button>
			{isOpen && (
				<DatePicker startDate={startDate} setStartDate={setStartDate} setIsOpen={setIsOpen} />
			)}
		</div>
	)
}

export default StartDate
