import { MAX_BOTTOM_SHEET_HEIGHT } from '../../../../hooks/useUserBottomSheet'
import Header from '../../../../components/Header'
import { IMenu, IMenuFunc } from '../../../../interfaces'
import { icons } from '../../../../constants/header-icons'
import BucketPreview from './BucketPreview'
import RadarCategoryItems from '../RadarCategory'
import BucketDetail from '../../../Bucket/BucketDetail'
import { Link } from 'react-router-dom'

/*
bottomSheet Header 토글시 -> 카테고리 표출
bucketItem 클릭시 -> bucketInfo 표출
*/
interface BucketBottomSheetProp {
	bucketId: number | null
	setBucketId: React.Dispatch<React.SetStateAction<number | null>>
	togglePreview: () => void
	handleSubmitCategories: () => void
	isMaxup: boolean
	sheet: React.RefObject<HTMLDivElement>
	content: React.RefObject<HTMLDivElement>
}

const BucketBottomSheet = (props: BucketBottomSheetProp) => {
	const { bucketId, setBucketId, togglePreview, handleSubmitCategories, isMaxup, sheet, content } =
		props
	const menu: IMenu = {
		left: icons.BACK,
		center: 'juno의 꿈:틀', // @TODO: 사용자 닉네임 넣기
		right: icons.HAMBERGER,
	}

	const func: IMenuFunc = {
		left_func: () => {
			togglePreview()
		},
		right_func: undefined,
	}

	const handleToggleBottomSheet = () => {
		togglePreview()
		setTimeout(() => setBucketId(null), 800)
	}
	return (
		<div
			ref={sheet}
			style={{ height: `${MAX_BOTTOM_SHEET_HEIGHT}px` }}
			className={`flex flex-col fixed top-[calc(100%-50px)] left-0 right-0 z-30 rounded-t-2xl shadow-2xl
		bg-white transition-transform duration-500 ease-out overflow-scroll pb-20`}
		>
			{isMaxup ? (
				<Header menu={menu} func={func} />
			) : (
				<div onClick={handleToggleBottomSheet} className="h-10 rounded-t-lg relative pt-5 pb-2">
					<div className="w-14 h-[5px] rounded-full bg-unActive m-auto" />
				</div>
			)}
			{isMaxup ? (
				<div ref={content}>
					<BucketDetail />
				</div>
			) : bucketId ? (
				<Link to={`/bucket/${bucketId}`} className="px-5 py-2">
					<BucketPreview bucketId={bucketId} />
				</Link>
			) : (
				<fieldset className="pt-2">
					<div className="px-5 pb-2">
						<p className="text-point1 font-semibold pb-2">카테고리 선택</p>
						<RadarCategoryItems />
					</div>
					<div
						onClick={handleSubmitCategories}
						className="w-full flex flex-col justify-center items-center bg-point1 h-10 text-white"
					>
						<p className="leading-9 py-2">선택 완료</p>
					</div>
				</fieldset>
			)}
		</div>
	)
}

export default BucketBottomSheet
