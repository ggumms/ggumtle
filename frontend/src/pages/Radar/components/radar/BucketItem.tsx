// @TODO: 데이터 형식 어떻게 받아올지는 추후 논의

// UserItem 컴포넌트랑 같이 사용할 경우 constants 폴더에 넣어서 사용하기
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

const BucketItem = () => {
	const name = 'wan'
	return (
		<div className="inline-flex flex-col items-center">
			{/* @TODO: api 통신할 때에는 img 태그로 변경 후 실제 데이터 삽입하기
      <img src="" alt="" /> */}
			<div className={`bg-green rounded-2xl ${userSize[1]}`}></div>
			<span className={`${userFontSize[1]} font-semibold`}>{name}</span>
		</div>
	)
}

export default BucketItem
