// @TODO: 페이지 전환 애니메이션 추가하기

import { useNavigate } from 'react-router-dom'
import Header from '../../../../components/Header'
import { icons } from '../../../../constants/header-icons'
import { IMenu, IMenuFunc } from '../../../../interfaces'
import Button from '@mui/material-next/Button'
import AlarmItem from './AlarmItem'

const AlarmPage = () => {
	const navigate = useNavigate()

	const menu: IMenu = {
		left: icons.BACK,
		center: '알림',
		right: undefined,
	}

	const func: IMenuFunc = {
		left_func: () => navigate(-1),
		right_func: undefined,
	}

	return (
		<div className="w-full">
			<Header menu={menu} func={func} />
			<div className="h-screen pt-10 flex flex-col">
				<AlarmItem />
				<AlarmItem />
				<AlarmItem />
				<AlarmItem />
				<AlarmItem />
				<div className="fixed bottom-2 w-full flex justify-center">
					<Button color="secondary" disabled={false}>
						다 읽음 처리하기
					</Button>
				</div>
			</div>
		</div>
	)
}

export default AlarmPage
