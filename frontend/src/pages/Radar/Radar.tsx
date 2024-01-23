import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../../components/Header'
import { IMenu, IMenuFunc } from '../../interfaces'
import { icons } from '../../constants/header-icons'
import ProfileBucket from '../../components/ProfileBucket'

const Radar = () => {
	// 헤더 컴포넌트 사용 예시입니다.
	const navigate = useNavigate()

	// 각각 왼쪽 오른쪽 중앙 제목에 나타낼 아이콘, 제목 지정
	const menu: IMenu = {
		left: icons.BACK, // 왼쪽에 나타낼 아이콘 (./src/constants/header-icons 에 지정해두고 사용)
		center: '방명록', // 헤더 컴포넌트에 나타낼 헤더 제목
		right: undefined, // 사용하지 않는 쪽은 undefined 지정
	}

	// 왼쪽 오른쪽 아이콘에 할당할 함수 설정
	const func: IMenuFunc = {
		left_func: () => navigate(-1),
		right_func: undefined, // 마찬가지로 사용하지 않는 쪽은 undefined 지정
	}
	const bucketInfo = {
		title: '구독자 100만명 달성하기',
		color: 'green',
		dDay: 168,
		isLock: true,
	}

	return (
		<div>
			<Header menu={menu} func={func} />
			<ProfileBucket bucketInfo={bucketInfo} />
			<Outlet />
		</div>
	)
}

export default Radar
