import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { icons } from '../../constants/header-icons'
import { IMenu, IMenuFunc } from '../../interfaces'
import FollowNavHeader from './components/FollowNavHeader'
import { followHeaderList } from '../../router'

const FollowDetail = () => {
	const navigate = useNavigate()
	// 뒤로가기 버튼은 navigate(-1)이 아니라 해당 userId의 userPage로 이동해야 될듯
	const menu: IMenu = {
		left: icons.BACK,
		center: 'userNickname', // @TODO: 사용자 닉네임 넣기
		right: undefined,
	}

	const func: IMenuFunc = {
		left_func: () => navigate('/'),
		right_func: undefined,
	}
	return (
		<div>
			<Header menu={menu} func={func} />
			<section className="pt-16">
				<FollowNavHeader headerData={followHeaderList} />
				<Outlet />
			</section>
		</div>
	)
}

export default FollowDetail
