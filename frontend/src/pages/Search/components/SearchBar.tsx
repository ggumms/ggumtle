import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { IoIosCloseCircle } from 'react-icons/io'
import { getUserSearch } from '../api'
import { useSearchUserStore } from '../../../store/searchUserStore'

const SearchBar = () => {
	const [input, setInput] = useState('')
	const { addUserList, setSearching, resetUserList } = useSearchUserStore()
	const { isLoading, data, isSuccess } = useQuery({
		queryKey: ['userSearch', input, 0, 20],
		queryFn: getUserSearch,
		enabled: input !== '',
		staleTime: 500,
	})
	console.log('[SearchBar]', data)

	useEffect(() => {
		console.log(isSuccess)
		if (isSuccess) {
			setSearching(false)
		}
	}, [isSuccess])

	useEffect(() => {
		if (input === '') {
			setSearching(false)
			resetUserList()
		}
	}, [input])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
		setSearching(true)
		console.log('[input]', input)
		if (!isLoading && data) {
			console.log('[데이터삽입]', data.searchList.content)
			addUserList(data.searchList.content)
		}
	}

	return (
		<div className="flex w-full items-center px-4">
			<div className="flex w-11/12 mr-2 items-center">
				<FiSearch size="1.5rem" color="#707070" className="absolute left-7" />
				<input
					type="text"
					value={input}
					placeholder="검색"
					onChange={handleInputChange}
					className="w-full pl-10 py-2 px-4 focus:outline-none bg-[#F6F6F6] rounded-md"
				/>
				<IoIosCloseCircle size="1.5rem" className="absolute right-14" color="#ACADAD" />
			</div>
			<button className="w-1/12 text-sm text-point1">취소</button>
		</div>
	)
}

export default SearchBar
