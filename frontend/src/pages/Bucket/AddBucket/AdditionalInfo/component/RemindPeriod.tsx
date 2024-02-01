import { Menu, Transition } from '@headlessui/react'
import { useBucketStore } from '../../../../../store/bucketStore'
import { PeriodType } from '../../../../../types/bucket'

const periodData = {
	none: '없음',
	oneDay: '매일',
	oneWeek: '매주',
	twoWeeks: '2주 마다',
	oneMonth: '매월',
	oneYear: '매년',
}

const RemindPeriod = () => {
	const { period, changePeriod } = useBucketStore()

	return (
		<div>
			<p className="mb-[14px] text-sm font-bold ml-[2px]">리마인드 주기</p>
			<Menu as="div" className={'relative'}>
				<Menu.Button
					className="
				relative w-full px-4 py-2 text-left border-[0.5px] rounded-[5px] text-sm
				after:content-clockImage after:inline-block after:h-[19px] after:absolute after:right-4 after:translate-y-1/2 after:bottom-1/2
				"
				>
					{period && periodData[period]}
				</Menu.Button>
				<Transition
					enter="transition duration-100 ease-out"
					enterFrom="transform scale-95 opacity-0"
					enterTo="transform scale-100 opacity-100"
					leave="transition duration-75 ease-out"
					leaveFrom="transform scale-100 opacity-100"
					leaveTo="transform scale-95 opacity-0"
				>
					<Menu.Items
						as="ul"
						className="absolute left-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
					>
						{Object.entries(periodData).map(([key, value]) => (
							<Menu.Item key={key}>
								{({ active }) => (
									<button
										className={`${
											active ? 'bg-gray-100' : 'text-gray-900'
										} group flex w-full items-center px-2 py-2 text-sm`}
										onClick={() => changePeriod(key as PeriodType)}
									>
										{value}
									</button>
								)}
							</Menu.Item>
						))}
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}

export default RemindPeriod
