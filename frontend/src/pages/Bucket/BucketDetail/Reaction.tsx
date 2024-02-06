import { useState } from 'react'
import { Cool, Underpin, WantToDo } from '../../../assets/svgs'
import { textColorClass } from '../../../constants/dynamicClass'

const Reaction = () => {
	// Api dummy data
	const bucketColor = 'green'
	// Todo : addtionalProp1이 '멋져요' 이렇게 오는게 맞는지 확인해보고 map 이용해서 코드 수정 하기
	const bucketReaction = {
		userReaction: '멋져요',
		reactionCounts: {
			additionalProp1: 201,
			additionalProp2: 99,
			additionalProp3: 21,
		},
	}

	// Todo: Api 데이터롤 변경 필요 + 전역 state로 관리 예정
	const [reaction, setReaction] = useState(bucketReaction.userReaction)

	const handleClickReaction = (event: React.MouseEvent<HTMLLIElement>) => {
		const reactionType = event.currentTarget.dataset.reaction

		// Todo : Api 통신 연결 성공 시 아래 코드 수행하도록 수정 필요
		if (reactionType) {
			setReaction(reactionType)
		}
	}

	return (
		// WithHeader 레이아웃을 살리기 위해서 absolute 적용, 더 좋은 방법 있으면 개선 예정
		<div className="relative mb-28">
			<ul className="absolute flex justify-evenly py-3 border-unActive border-y-[1px] w-[calc(100%_+_40px)] -left-5">
				<li
					data-reaction="멋져요"
					onClick={handleClickReaction}
					className={`${reaction === '멋져요' && textColorClass[bucketColor]} inline-flex flex-col items-center`}
				>
					<Cool className="mb-1 w-8 h-8" />
					<p className="text-xs font-bold mb-2">멋져요</p>
					<p className="text-sm font-bold">{bucketReaction.reactionCounts.additionalProp1}</p>
				</li>
				<li
					data-reaction="응원해요"
					onClick={handleClickReaction}
					className={`${reaction === '응원해요' && textColorClass[bucketColor]} inline-flex flex-col items-center`}
				>
					<Underpin className="mb-1 w-8 h-8" />
					<p className="text-xs font-bold mb-2">응원해요</p>
					<p className="text-sm font-bold">{bucketReaction.reactionCounts.additionalProp2}</p>
				</li>
				<li
					data-reaction="나도할래"
					onClick={handleClickReaction}
					className={`${reaction === '나도할래' && textColorClass[bucketColor]} inline-flex flex-col items-center`}
				>
					<WantToDo className="mb-1 w-8 h-8" />
					<p className="text-xs font-bold mb-2">나도할래</p>
					<p className="text-sm font-bold">{bucketReaction.reactionCounts.additionalProp3}</p>
				</li>
			</ul>
		</div>
	)
}

export default Reaction
