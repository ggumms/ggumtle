import { FiSearch } from 'react-icons/fi'

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
		<div
			onClick={() => console.log('helo')}
			className="bg-point1 w-14 h-14 rounded-full flex justify-center items-center"
			style={itemStyle}
		>
			<FiSearch size="2rem" color="white" />
		</div>
	)
}

export default SearchButton
