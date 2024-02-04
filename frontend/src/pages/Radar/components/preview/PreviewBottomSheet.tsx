import { forwardRef } from 'react'
import PreviewUser from './PreviewUser'
import { IUserSimple } from '../FollowingTab'
import { MAX_BOTTOM_SHEET_HEIGHT } from '../../../../hooks/usePreviewBottomSheet'

interface UserInfoProp {
	userInfo: IUserSimple | null
	togglePreview: () => void
}
const PreviewBottomSheet = forwardRef<HTMLDivElement, UserInfoProp>((props, sheet) => {
	const { userInfo, togglePreview } = props
	return (
		<div
			onClick={togglePreview}
			ref={sheet}
			// ref={previewRef}
			style={{ height: `${MAX_BOTTOM_SHEET_HEIGHT}px` }}
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
