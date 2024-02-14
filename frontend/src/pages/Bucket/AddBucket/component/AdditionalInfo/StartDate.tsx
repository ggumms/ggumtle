import { Fragment, useState } from 'react'
import DatePicker from './DatePicker'
import { Dialog, Transition } from '@headlessui/react'
import { useBucketStore } from '../../../../../store/bucketStore'
import { formatDate } from '../../../../../utils/date'

// createdDate로 이름 변경 필요
const StartDate = () => {
	const [isOpen, setIsOpen] = useState(false)
	const { createdDate, changeCreatedDate } = useBucketStore()

	const handleCloseDatePicker = () => {
		setIsOpen(false)
	}

	const handleClickStartDate = () => {
		setIsOpen(true)
	}

	return (
		<div>
			<p className="mb-[14px] text-sm font-bold  ml-[2px]">버킷 시작일</p>
			<button
				onClick={handleClickStartDate}
				className={
					'relative w-full px-4 py-2 text-left border-[0.5px] border-gray text-point1 rounded-[5px] text-base' +
					' ' +
					'after:content-calendarImage after:inline-block after:h-[19px] after:absolute after:right-4 after:translate-y-1/2 after:bottom-1/2'
				}
			>
				{createdDate instanceof Date ? formatDate(createdDate) : '날짜 선택'}
			</button>
			<Transition appear show={isOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={handleCloseDatePicker}>
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" />
					</Transition.Child>

					<div className="fixed inset-0 overflow-y-auto">
						<div className="flex items-center justify-center min-h-full p-4 text-center">
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 scale-95"
								enterTo="opacity-100 scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 scale-100"
								leaveTo="opacity-0 scale-95"
							>
								<Dialog.Panel className="w-full max-w-md p-6 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
									<DatePicker
										createdDate={new Date(createdDate)}
										setCreatedDate={changeCreatedDate}
										setIsOpen={setIsOpen}
									/>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition>
		</div>
	)
}

export default StartDate
