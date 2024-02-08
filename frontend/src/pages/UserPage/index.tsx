import Header from '../../components/Header'
import { IMenu, IMenuFunc } from '../../interfaces'
import { icons } from '../../constants/header-icons'
import { useNavigate } from 'react-router-dom'
import ProfileSection from './components/Profile/ProfileSection'
import FeedSection from './components/Feed/FeedSection'
import { useUserInfoQuery } from '../../hooks/useUserInfo'

interface UserPageProp {
	userId: number
	isForRadar: boolean
}
const UserPage = ({ userId, isForRadar }: UserPageProp) => {
	const navigate = useNavigate()
	
	const {isLoading, userInfo} = useUserInfoQuery(userId)
	console.log('[userpage]', userInfo)

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
		<div className="z-35 bg-white">
			{!isForRadar && <Header menu={menu} func={func} />}
			<div className="mt-14 bg-lightGray">
				<ProfileSection isLoading={isLoading} userInfo={userInfo} />
				<FeedSection />
			</div>
		</div>
	)
}

export default UserPage
