import { CheerUpReaction, CoolReaction, MetooReaction } from '../../../../constants/reactions'

// 피드 총 공감 개수 컴포넌트
const TotalReaction = ({ count }: { count: number }) => {
	return (
		<div className="flex items-center">
			<div className="flex relative left-1">
				<CoolReaction />
				<div className="relative right-1">
					<MetooReaction />
				</div>
				<div className="relative right-2">
					<CheerUpReaction />
				</div>
			</div>
			<div className="text-[10px] text-point1">{count}</div>
		</div>
	)
}

export default TotalReaction
