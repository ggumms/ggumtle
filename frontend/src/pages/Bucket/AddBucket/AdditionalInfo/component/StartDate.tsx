import { useState } from 'react'
import DatePicker from './DatePicker'
import { startOfToday } from 'date-fns'

// createdDate로 이름 변경 필요
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
			{/* 설명 글자 관련 css도 설정 필요 */}
			<p>버킷 시작일</p>
			{/* 버튼 글자 관련 css도 설정 필요 */}
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
