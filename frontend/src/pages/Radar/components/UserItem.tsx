// @TODO: 데이터 형식 어떻게 받아올지는 추후 논의
const userSize: Record<number, string> = {
	1: 'w-12 h-12',
	2: 'w-10 h-10',
	3: 'w-8 h-8',
}

const userFontSize: Record<number, string> = {
	1: 'text-sm',
	2: 'text-xs',
	3: 'text-[10px]',
}

export interface UserItemProps {
	pos: { x: number; y: number }
	post_id?: string
	// onClick: () => void
}

const UserItem = ({ pos }: UserItemProps) => {
	// const UserItem = ({ pos, onClick }: UserItemProps) => {
	const itemStyle: { position: 'absolute'; left: string; bottom: string } = {
		position: 'absolute',
		left: `${45 + pos.x}%`,
		bottom: `${40 + pos.y}%`,
	}
	const name = 'wan'
	return (
		<div className="inline-flex flex-col items-center animate-floating" style={itemStyle}>
			{/* @TODO: api 통신할 때에는 img 태그로 변경 후 실제 데이터 삽입하기
      <img src="" alt="" /> */}
			<div className={`bg-black rounded-full ${userSize[1]}`}></div>
			<span className={`${userFontSize[1]} font-semibold`}>{name}</span>
		</div>
	)
}

export default UserItem
