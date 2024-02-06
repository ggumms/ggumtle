import Header from '../../components/Header'
import { IMenu, IMenuFunc } from '../../interfaces'
import { icons } from '../../constants/header-icons'
import { useNavigate } from 'react-router-dom'
import ProfileSection from './components/Profile/ProfileSection'
import FeedSection from './components/Feed/FeedSection'

const UserPage = ({ isForRadar }: { isForRadar: boolean }) => {
	const navigate = useNavigate()
	const menu: IMenu = {
		left: icons.BACK,
		center: 'juno', // @TODO: 사용자 닉네임 넣기
		right: icons.HAMBERGER,
	}

	const func: IMenuFunc = {
		left_func: () => navigate(-1),
		right_func: undefined,
	}
	return (
		<div className="z-30 bg-white">
			{!isForRadar && <Header menu={menu} func={func} />}
			<div className="mt-14 bg-lightGray">
				<ProfileSection />
				<FeedSection />
			</div>
		</div>
	)
}

export default UserPage
