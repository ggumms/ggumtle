import ProfileBucket from '../../../components/ProfileBucket'

const BucketInfo = () => {
	return (
		<>
			{/* // Todo: Api 통신으로 데이터 대체 예정, hook 이용해서 버킷 데이터 한번에 데이터 받아오기 */}
			<ProfileBucket
				title={'구독자 백만명 달성하기'}
				color={'lightGreen'}
				dayCount={14}
				isLock={true}
			/>
		</>
	)
}

export default BucketInfo
