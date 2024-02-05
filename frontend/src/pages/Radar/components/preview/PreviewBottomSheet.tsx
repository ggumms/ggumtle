import { forwardRef } from 'react'
import PreviewUser from './PreviewUser'
import { IUserSimple } from '../FollowingTab'
import { MAX_BOTTOM_SHEET_HEIGHT } from '../../../../hooks/usePreviewBottomSheet'
import Header from '../../../../components/Header'
import { IMenu, IMenuFunc } from '../../../../interfaces'
import { useNavigate } from 'react-router-dom'
import { icons } from '../../../../constants/header-icons'
import UserPage from '../../../UserPage'

interface UserInfoProp {
	userInfo: IUserSimple | null
	togglePreview: () => void
	isMaxup: boolean
}
const PreviewBottomSheet = forwardRef<HTMLDivElement, UserInfoProp>((props, sheet) => {
	const { userInfo, togglePreview, isMaxup } = props
	const navigate = useNavigate()
	const menu: IMenu = {
		left: icons.BACK,
		center: 'juno', // @TODO: 사용자 닉네임 넣기
		right: icons.HAMBERGER,
	}

	const func: IMenuFunc = {
		left_func: () => {
			navigate(-1)
			// setIsMaxup(false)
		},
		right_func: undefined,
	}
	return (
		<div
			onClick={togglePreview}
			ref={sheet}
			// ref={previewRef}
			style={{ height: `${MAX_BOTTOM_SHEET_HEIGHT}px` }}
			className={`flex flex-col fixed top-[calc(100%-50px)] left-0 right-0 z-5 rounded-t-2xl shadow-2xl
		bg-white transition-transform duration-500 ease-out`}
		>
			{isMaxup ? (
				<Header menu={menu} func={func} />
			) : (
				<div className="h-10 rounded-t-lg relative pt-5 pb-2">
					<div className="w-14 h-[5px] rounded-full bg-unActive m-auto" />
				</div>
			)}
			{isMaxup ? (
				<UserPage isForRadar={true} />
			) : (
				<div className="px-5 py-2">
					{/* <div ref={content} className="px-5 py-2"> */}
					<PreviewUser userId={userInfo?.userId} />
				</div>
			)}
		</div>
	)
})

export default PreviewBottomSheet
