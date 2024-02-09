import { useEffect, useState } from 'react'
import { Cool, Underpin, WantToDo } from '../../../assets/svgs'
import { textColorClass } from '../../../constants/dynamicClass'
import { ReactionCountType, ReactionType } from '../../../types/bucket'
import { isReactionType } from '../../../utils/typeFilter'

const Reaction = () => {
	const [activeReaction, setActiveReaction] = useState<ReactionType | null>(null)
	const [reactionInfo, setReactionInfo] = useState<ReactionCountType>()
	const activeColor = 'green'

	// Todo: Api 데이터로 변경 필요 + 전역 state로 관리 예정
	useEffect(() => {
		createReactionData()
	}, [])

	// Api dummy data
	const createReactionData = async () => {
		// Todo : addtionalProp1이 '멋져요' 이렇게 오는게 맞는지 확인해보고 map 이용해서 코드 수정 하기
		// Todo : Api 연동 이후 as 키워드 삭제 예정
		const { userReaction, reactionCounts } = await {
			userReaction: '멋져요',
			reactionCounts: {
				멋져요: 201,
				응원해요: 99,
				나도할래: 21,
			},
		}

		if (isReactionType(userReaction)) {
			setActiveReaction(userReaction)
			setReactionInfo(reactionCounts)
		}
	}

	const getReactionIcon = (reactionType: ReactionType) => {
		switch (reactionType) {
			case '멋져요':
				return <Cool className="w-8 h-8 mb-1" />
			case '나도할래':
				return <WantToDo className="w-8 h-8 mb-1" />
			case '응원해요':
				return <Underpin className="w-8 h-8 mb-1" />
		}
	}

	const handleClickReaction = async (event: React.MouseEvent<HTMLLIElement>) => {
		const reactionType = event.currentTarget.dataset.reaction

		// Todo : Api 통신 연결 성공 시 아래 코드 수행하도록 수정 필요
		const postReactionRes = await 'success'

		if (postReactionRes === 'success' && reactionType && isReactionType(reactionType)) {
			setActiveReaction(reactionType)
		}
	}

	return (
		// WithHeader 레이아웃을 살리기 위해서 absolute 적용, 더 좋은 방법 있으면 개선 예정
		<div className="relative mb-28">
			<ul className="absolute flex justify-evenly py-3 border-unActive border-y-[1px] w-[calc(100%_+_40px)] -left-5">
				{reactionInfo &&
					Object.keys(reactionInfo).map((reaction, index) => (
						<li
							data-reaction={reaction}
							key={`reaction-${index}`}
							onClick={handleClickReaction}
							className={`${activeReaction === reaction && textColorClass[activeColor]} inline-flex flex-col items-center`}
						>
							{getReactionIcon(reaction as ReactionType)}
							<p className="mb-2 text-xs font-bold">{reaction}</p>
							<p className="text-sm font-bold">{reactionInfo[reaction as ReactionType] ?? 0}</p>
						</li>
					))}
			</ul>
		</div>
	)
}

export default Reaction
