import { ReactNode } from 'react'
import SearchButton from '../../../Search/components/SearchButton'

const Radar = ({ children }: { children: ReactNode }) => {
	return (
		<div className="w-[110%] mb-5 z-15 animate-radar3 border border-[#c6c6c661] aspect-square rounded-full flex absolute items-center justify-center">
			<div className="w-[70%] animate-radar2 border border-[#c6c6c661] aspect-square rounded-full flex absolute items-center justify-center">
				<div className="w-[57%] animate-radar1 border border-[#c6c6c661] aspect-square rounded-full flex absolute items-center justify-center">
					{children}
				</div>
			</div>
			<SearchButton />
		</div>
	)
}

export default Radar
