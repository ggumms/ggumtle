import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css' // css import

type StartDateType = Date | null
type EndDateType = Date | null
type BucketDate = StartDateType | [StartDateType, EndDateType]

const StartDate = () => {
	const [isOpen, setIsOpen] = useState(false)
	const [startDate, setStartDate] = useState<BucketDate>(new Date())

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
			{isOpen && <Calendar onChange={setStartDate} value={startDate} />}
		</div>
	)
}

export default StartDate
