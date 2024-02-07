import Ggumtle from '../../components/Ggumtle'

// Todo : url을 통해서 현재 버킷 정보를 확인하고 해당 버킷이 사용자의 버킷인지 확인 필요 -> 사용자의 버킷이 아니라면 메인 페이지로 인동
const AchieveBucket = () => {
	return (
		<div>
			<h1>This is AchieveBucket Page</h1>
			<Ggumtle width={80} height={80} speed={5} color="lightGreen" />
		</div>
	)
}

export default AchieveBucket
