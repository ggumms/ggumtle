import ProfileBucket from '../../../components/ProfileBucket'

const BucketInfo = () => {
	return (
		<>
			{/* // Todo: Api 통신으로 데이터 대체 예정, hook 이용해서 버킷 데이터 한번에 데이터 받아오기 */}
			{/* // Todo: 달성 여부도 ProfileBucket 컴포넌트에서 받도록 수정 필요*/}
			<ProfileBucket
				type="bucketDetail"
				isLoading={false}
				title={'구독자 백만명 달성하기'}
				color={'lightGreen'}
				dayCount={14}
				isLock={false}
				isDone={true}
			/>
		</>
	)
}

export default BucketInfo
