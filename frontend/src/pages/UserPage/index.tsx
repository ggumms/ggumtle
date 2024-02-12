import Header from '../../components/Header'
import { IMenu, IMenuFunc } from '../../interfaces'
import { icons } from '../../constants/header-icons'
import { useNavigate } from 'react-router-dom'
import ProfileSection from './components/ProfileSection'
import FeedSection from './components/FeedSection'

interface UserPageProp {
	userId: number
	isForRadar: boolean
}
const UserPage = ({ userId, isForRadar }: UserPageProp) => {
	const navigate = useNavigate()

	const menu: IMenu = {
		left: icons.BACK,
		center: 'junooo is my name', // @TODO: 사용자 닉네임 넣기
		right: icons.HAMBERGER,
	}

	const func: IMenuFunc = {
		left_func: () => navigate(-1),
		right_func: undefined,
	}

	return (
		<div className="bg-white">
			{!isForRadar && <Header menu={menu} func={func} />}
			<div className="mt-14 bg-lightGray">
				<ProfileSection userId={userId} />
				<FeedSection userId={userId} />
			</div>
		</div>
	)
}

export default UserPage
