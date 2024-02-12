import { Outlet, useNavigate } from 'react-router-dom'
import { IMenu, IMenuFunc } from '../../interfaces'
import { icons } from '../../constants/header-icons'
import Header from '../../components/Header'
import { searchHeaderList } from '../../router'
import SearchNavHeader from './components/SearchNavHeader'

const SearchPage = () => {
	const navigate = useNavigate()

	const menu: IMenu = {
		left: icons.BACK,
		center: '검색하기',
		right: undefined,
	}

	const func: IMenuFunc = {
		left_func: () => navigate("/"),
		right_func: undefined,
	}

	return (
		<div>
			<Header menu={menu} func={func} />
			<section className="pt-16">
				<SearchNavHeader headerData={searchHeaderList} />
				<Outlet />
			</section>
		</div>
	)
}

export default SearchPage
