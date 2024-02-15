import { FiSearch } from 'react-icons/fi'
import { IoIosCloseCircle } from 'react-icons/io'

interface SearchBarProp {
	input: string
	setInput: React.Dispatch<React.SetStateAction<string>>
	onClickHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const SearchBar = ({ input, setInput, onClickHandler }: SearchBarProp) => {
	const handleDeleteClick = () => {
		setInput('')
	}

	return (
		<div className="fixed top-28 bg-white z-10 right-0 left-0 flex w-full items-center px-4 pb-1">
			<div className="flex w-11/12 mr-2 items-center">
				<FiSearch size="1.5rem" color="#707070" className="absolute left-6" />
				<input
					type="text"
					value={input}
					placeholder="검색"
					onChange={onClickHandler}
					className="w-full pl-10 py-2 px-4 focus:outline-none bg-[#F6F6F6] rounded-md"
				/>
				<IoIosCloseCircle
					onClick={handleDeleteClick}
					size="1.5rem"
					className="absolute right-16"
					color="#ACADAD"
				/>
			</div>
			<button className="w-1/12 text-sm text-point1">취소</button>
		</div>
	)
}

export default SearchBar
