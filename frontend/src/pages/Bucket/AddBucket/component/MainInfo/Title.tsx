import { ChangeEvent } from 'react'
import { useBucketStore } from '../../../../../store/bucketStore'

const Title = () => {
	const { bucketTitle, changeBucketTitle } = useBucketStore()

	const handleChangeTitle = (event: ChangeEvent<HTMLInputElement>) => {
		const input = event.currentTarget.value
		changeBucketTitle(input)
	}

	return (
		<label>
			<p className="mb-3 text-sm font-bold leading-none text-point1 ">제목</p>
			<input
				type="text"
				name="title"
				id="title"
				placeholder="어떤 버킷을 이루고 싶나요?"
				value={bucketTitle}
				onChange={handleChangeTitle}
				maxLength={100}
				className="w-full px-5 py-4 text-sm bg-inputBg rounded-[5px]"
			/>
		</label>
	)
}

export default Title
