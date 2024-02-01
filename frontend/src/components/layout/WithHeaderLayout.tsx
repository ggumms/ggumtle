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
			<section className="flex flex-col px-5 grow">{children}</section>
		</div>
	)
}

export default WithHeaderLayout
