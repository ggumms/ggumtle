import { IHeaderProp } from '../interfaces'

const Header = (props: IHeaderProp) => {
	const { left, center, right } = props.menu
	const { left_func, right_func } = props.func

	return (
		<div className="w-full flex justify-between items-center px-5 h-10 bg-transparent z-10 absolute top-0">
			{left ? <div onClick={left_func}>{left}</div> : <div className="invisible">{right}</div>}
			<div className="text-lg font-bold">{center}</div>
			{right ? <div onClick={right_func}>{right}</div> : <div className="invisible">{left}</div>}
		</div>
	)
}

export default Header
