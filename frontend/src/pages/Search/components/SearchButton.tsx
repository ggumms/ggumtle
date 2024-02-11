import { FiSearch } from 'react-icons/fi'

const SearchButton = () => {
	const angle = 90
	const x = 50 * Math.cos(angle)
	const y = 50 * Math.sin(angle)

	const left = `left-[${x + 46}%]`
	const bottom = `bottom-[${y + 42}]`
	return (
		<div
			className={`bg-point1 absolute ${left} ${bottom} w-12 h-12 rounded-full flex justify-center items-center`}
		>
			<FiSearch size="2rem" color="white" />
		</div>
	)
}

export default SearchButton
