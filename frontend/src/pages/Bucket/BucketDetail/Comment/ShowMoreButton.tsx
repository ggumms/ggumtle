import { Menu, Transition } from '@headlessui/react'
import { AiOutlineMore } from 'react-icons/ai'
import { useDetailPageTypeStore } from '../../../../store/detailStore'

const ShowMoreButton = () => {
	const { setPageType } = useDetailPageTypeStore()

	const handleClickModifyButton = () => {
		setPageType('editComment')
	}
	const handleClickDeleteButton = () => {
		// Todo : 삭제 요청 Api 적용
	}
	return (
		<div>
			<Menu as="div" className="absolute top-0 right-0">
				<Menu.Button>
					<AiOutlineMore color="#767676" />
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
						className="absolute z-10 mt-2 origin-top-right translate-x-1/2 bg-white divide-gray-100 rounded-sm shadow-lg right-1/2 ring-1 ring-black ring-opacity-5 focus:outline-none"
					>
						<Menu.Item as="li">
							<button onClick={handleClickModifyButton} className="w-12 p-1 text-sm text-point1">
								수정
							</button>
						</Menu.Item>
						<Menu.Item as="li">
							<button onClick={handleClickDeleteButton} className="w-12 p-1 text-sm text-point1">
								삭제
							</button>
						</Menu.Item>
					</Menu.Items>
				</Transition>
			</Menu>
		</div>
	)
}

export default ShowMoreButton
