import { FaChevronLeft } from 'react-icons/fa6'
import { FaChevronRight } from 'react-icons/fa6'

import {
	add,
	eachDayOfInterval,
	endOfMonth,
	format,
	getDay,
	isEqual,
	isSameMonth,
	isToday,
	parse,
	startOfToday,
} from 'date-fns'
import { useState } from 'react'

interface IDatePicker {
	createdDate: Date
	setCreatedDate: (date: Date) => void
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// Todo: 미래 날짜 설정 불가능하도록하는 기능 추가
const DatePicker = ({ createdDate, setCreatedDate, setIsOpen }: IDatePicker) => {
	const today = startOfToday()
	const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
	const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())

	const days = eachDayOfInterval({
		start: firstDayCurrentMonth,
		end: endOfMonth(firstDayCurrentMonth),
	})

	const previousMonth = () => {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
		setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
	}

	const nextMonth = () => {
		const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
		setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
	}

	const handleSelectDate = (event: React.MouseEvent<HTMLButtonElement>) => {
		// button 선택 시 근처(감싸고 있는) li tag 설정
		const dateElement = event.currentTarget.closest('li')

		if (dateElement && dateElement.dataset.index) {
			const dateIndex = parseInt(dateElement.dataset.index)
			setCreatedDate(days[dateIndex])
			setIsOpen(false)
		}
	}

	return (
		<div>
			<div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
				<div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
					<div className="md:pr-14">
						<div className="flex items-center">
							<h2 className="flex-auto font-semibold text-gray-900">
								{format(firstDayCurrentMonth, 'MMMM yyyy')}
							</h2>
							<button
								type="button"
								onClick={previousMonth}
								className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
							>
								<span className="sr-only">Previous month</span>
								<FaChevronLeft className="w-5 h-5" aria-hidden="true" />
							</button>
							<button
								onClick={nextMonth}
								type="button"
								className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
							>
								<span className="sr-only">Next month</span>
								<FaChevronRight className="w-5 h-5" aria-hidden="true" />
							</button>
						</div>
						<div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
							<div className="text-rose-600">일</div>
							<div>월</div>
							<div>화</div>
							<div>수</div>
							<div>목</div>
							<div>금</div>
							<div className="text-blue-700">토</div>
						</div>
						<ul className="grid grid-cols-7 mt-2 text-sm">
							{days.map((day, dayIdx) => (
								<li
									key={day.toString()}
									data-index={dayIdx}
									className={`${dayIdx === 0 && colStartClasses[getDay(day)]} py-1.5`}
								>
									<button
										type="button"
										onClick={handleSelectDate}
										className={`
												${isEqual(day, createdDate) && 'text-white'} 
												${!isEqual(day, createdDate) && isToday(day) && 'text-red-500'} 
												${
													!isEqual(day, createdDate) &&
													!isToday(day) &&
													isSameMonth(day, firstDayCurrentMonth) &&
													'text-gray-900'
												} 
												${
													!isEqual(day, createdDate) &&
													!isToday(day) &&
													!isSameMonth(day, firstDayCurrentMonth) &&
													'text-gray-400'
												} 
												${isEqual(day, createdDate) && isToday(day) && 'bg-red-500'} 
												${isEqual(day, createdDate) && 'bg-point1'} 
												${!isEqual(day, createdDate) && 'hover:bg-gray-200'} 
												${(isEqual(day, createdDate) || isToday(day)) && 'font-semibold'} 
												mx-auto flex h-8 w-8 items-center justify-center rounded-full
											`}
									>
										<time dateTime={format(day, 'yyyy-MM-dd')}>{format(day, 'd')}</time>
									</button>
								</li>
							))}
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}

// 요일별 클래스 관리
const colStartClasses = [
	'',
	'col-start-2',
	'col-start-3',
	'col-start-4',
	'col-start-5',
	'col-start-6',
	'col-start-7',
]

export default DatePicker
