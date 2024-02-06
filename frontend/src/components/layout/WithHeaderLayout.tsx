import { ReactNode } from 'react'
import { IMenu, IMenuFunc } from '../../interfaces'
import Header from '../Header'

interface IWithHeaderLayoutProps {
	headerMenu: IMenu
	headerFunc: IMenuFunc
	children: ReactNode
}

const WithHeaderLayout = ({ headerMenu, headerFunc, children }: IWithHeaderLayoutProps) => {
	return (
		<div className="flex h-screen pt-16 ">
			<Header menu={headerMenu} func={headerFunc} />
			{/* 컨텐츠가 많아짐에 따라 width를 넘어가는 문제 해결을 위한 max-width 지정 */}
			<section className="flex flex-col max-w-full px-5 grow">{children}</section>
		</div>
	)
}

export default WithHeaderLayout
