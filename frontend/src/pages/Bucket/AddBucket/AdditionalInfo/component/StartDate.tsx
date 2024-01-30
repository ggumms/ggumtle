import { useEffect, useState } from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css' // css import

type StartDateType = Date | null
type EndDateType = Date | null
type BucketDate = StartDateType | [StartDateType, EndDateType]

const StartDate = () => {
	const [startDate, setStartDate] = useState<BucketDate>(new Date())

	useEffect(() => {
		console.log(startDate)
	}, [startDate])

	return (
		<div>
			<p>버킷 시작일</p>
			<Calendar onChange={setStartDate} value={startDate} />
		</div>
	)
}

export default StartDate
