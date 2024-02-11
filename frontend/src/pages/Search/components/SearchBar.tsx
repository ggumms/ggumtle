import { FiSearch } from 'react-icons/fi'
import { IoIosCloseCircle } from 'react-icons/io'

const SearchBar = () => {
	return (
		<div className="flex w-full items-center px-4">
			<div className='flex w-11/12 mr-2 items-center'>
				<FiSearch size="1.5rem" color="#707070" className="absolute left-7" />
				<input
					type="text"
					placeholder="검색"
					className="w-full pl-10 py-2 px-4 focus:outline-none bg-[#F6F6F6] rounded-md"
				/>
				<IoIosCloseCircle size="1.5rem" className="absolute right-14" color="#ACADAD" />
			</div>
			<button className="w-1/12 text-sm text-point1">취소</button>
		</div>
	)
}

export default SearchBar
