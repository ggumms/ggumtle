import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getBucketReaction } from './api'
import { IReactionInfo, ReactionCountType, ReactionType } from '../../../types/bucket'
import { isReactionType } from '../../../utils/typeFilter'

import { Cool, Underpin, WantToDo } from '../../../assets/svgs'
import { textColorClass } from '../../../constants/dynamicClass'

interface IReactionProps {
	id: string
}
const defaultReactionInfo: ReactionCountType = { 멋져요: 0, 응원해요: 0, 나도할래: 0 }

const Reaction = ({ id }: IReactionProps) => {
	const [activeReaction, setActiveReaction] = useState<ReactionType | null>(null)
	const [reactionInfo, setReactionInfo] = useState<ReactionCountType>()
	const activeColor = 'green' // active된 Reaction의 색상을 변수로 지정해둔 것

	// id별로 cachepool을 관리하기 위해선 id가 필요하다.
	const { isLoading, data: bucketReaction } = useQuery<IReactionInfo>({
		queryKey: ['bucketReaction', id],
		queryFn: getBucketReaction,
	})

	// Todo: 전역 state로 관리 예정
	useEffect(() => {
		bucketReaction && createReactionData(bucketReaction)
	}, [isLoading, bucketReaction])

	const createReactionData = async (bucketReaction: IReactionInfo) => {
		const { userReaction, reactionCounts } = bucketReaction

		const currentReactionInfo = { ...defaultReactionInfo }
		Object.keys(reactionCounts).forEach((reactionType) => {
			if (isReactionType(reactionType)) {
				currentReactionInfo[reactionType] = reactionCounts[reactionType]
			}
		})

		setActiveReaction(userReaction)
		setReactionInfo(currentReactionInfo)
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

	// :: Event handler
	const handleClickReaction = async (event: React.MouseEvent<HTMLLIElement>) => {
		const reactionType = event.currentTarget.dataset.reaction

		// Todo : Api 통신 연결 성공 시 아래 코드 수행하도록 수정 필요
		const postReactionRes = await 'success'

		if (postReactionRes === 'success' && reactionType && isReactionType(reactionType)) {
			setActiveReaction(reactionType)
		}
	}

	if (isLoading) {
		return <></>
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
