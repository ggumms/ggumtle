export interface DescProp {
	main1: string | undefined
	main2: string
	sub: string | null
	date: string
}

const Desc = ({ main1, main2, sub, date }: DescProp) => {
	return (
		<div className="px-2">
			<p className="text-point1 text-xs">
				<span className="font-semibold">{main1}</span>
				{main2}
			</p>
			<p className="font-light text-point1 text-xs truncate">{sub}</p>
			<p className="font-light text-gray text-[10px]">{date}</p>
		</div>
	)
}

export default Desc
