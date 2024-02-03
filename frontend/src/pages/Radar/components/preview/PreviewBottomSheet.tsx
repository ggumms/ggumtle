import { forwardRef } from 'react'
import PreviewUser from './PreviewUser'
import { IUserSimple } from '../FollowingTab'

export const MIN_Y = 500 // 바텀시트가 최대로 높이 올라갔을 때의 y 값
export const MAX_Y = window.innerHeight - 100 // 바텀시트가 최소로 내려갔을 때의 y 값
export const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y // 바텀시트의 세로 길이

interface UserInfoProp {
	userInfo: IUserSimple | null
}
const PreviewBottomSheet = forwardRef<HTMLDivElement, UserInfoProp>((props, sheet) => {
	const { userInfo } = props
	console.log('userinfo: ', userInfo)
	return (
		<div
			// onClick={togglePreview}
			ref={sheet}
			// ref={previewRef}
			style={{ height: `${BOTTOM_SHEET_HEIGHT}px` }}
			className={`flex flex-col fixed top-[calc(100%-50px)] left-0 right-0 z-5 rounded-t-2xl shadow-2xl
		bg-white transition-transform duration-500 ease-out`}
		>
			<div className="h-10 rounded-t-lg relative pt-5 pb-2">
				<div className="w-14 h-[5px] rounded-full bg-unActive m-auto" />
			</div>
			<div className="px-5 py-2">
				{/* <div ref={content} className="px-5 py-2"> */}
				<PreviewUser userId={userInfo?.userId} />
			</div>
		</div>
	)
})

export default PreviewBottomSheet
