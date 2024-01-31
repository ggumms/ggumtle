import { ChangeEvent } from 'react'
import { useBucketStore } from '../../../../../store/bucketStore'

const TimeCapsule = () => {
	const { timeCapsule, changeTimeCapsule } = useBucketStore()

	const handleChangeTimeCapsule = (event: ChangeEvent<HTMLTextAreaElement>) => {
		const input = event.currentTarget.value
		changeTimeCapsule(input)
	}

	// placeholder를 여러 줄로 입력하기 위해 textarea 사용
	return (
		<label>
			<p className="mb-3 text-sm font-bold leading-none text-point1"> 타입캡슐</p>
			<textarea
				name="timeCapsule"
				id="timeCapsule"
				value={timeCapsule}
				placeholder="버킷을 이뤘을 미래의 나에게 어떤 마음으로 버킷을 시작했는지 알려주세요. 작성해주신 글은 버킷을 달성한 나에게 전달됩니다."
				onChange={handleChangeTimeCapsule}
				maxLength={1000}
				className="w-full h-36 px-5 py-4 text-sm bg-inputBg text-wrap rounded-[5px] resize-none"
			/>
		</label>
	)
}

export default TimeCapsule
