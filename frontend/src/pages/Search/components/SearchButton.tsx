import { FiSearch } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const SearchButton = () => {
	const angle = 5.3
	const x = 50 * Math.cos(angle)
	const y = 50 * Math.sin(angle)

	const itemStyle: { position: 'absolute'; left: string; bottom: string } = {
		position: 'absolute',
		left: `${45 + x}%`,
		bottom: `${45 + y}%`,
	}
	return (
		<Link
			to="/search"
			className="bg-point1 w-14 h-14 rounded-full flex justify-center items-center z-30"
			style={itemStyle}
		>
			<FiSearch size="2rem" color="white" />
		</Link>
	)
}

export default SearchButton
