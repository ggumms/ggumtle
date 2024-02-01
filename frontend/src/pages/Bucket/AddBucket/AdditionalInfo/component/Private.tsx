import { useState } from 'react'
import { GoCheckCircleFill } from 'react-icons/go'
import { GoCheckCircle } from 'react-icons/go'

const Private = () => {
	const [isPrivate, setIsPrivate] = useState(false)

	const handleClickRadio = () => {
		setIsPrivate((prev) => !prev)
	}
	return (
		<div>
			<p className="mb-[14px] text-sm font-bold  ml-[2px]">공개 여부</p>
			<fieldset className="flex gap-20">
				<label htmlFor="public" className="flex items-center gap-2">
					{isPrivate ? (
						<GoCheckCircle size={24} color="#D9D9D9" />
					) : (
						<GoCheckCircleFill size={24} />
					)}
					<input
						type="radio"
						name="is-private"
						id="public"
						checked={!isPrivate}
						onChange={handleClickRadio}
						className="hidden"
					/>
					<p className="text-sm">공개</p>
				</label>
				<label htmlFor="private" className="flex items-center gap-2">
					{isPrivate ? (
						<GoCheckCircleFill size={24} />
					) : (
						<GoCheckCircle size={24} color="#D9D9D9" />
					)}
					<input
						type="radio"
						name="is-private"
						id="private"
						checked={isPrivate}
						onChange={handleClickRadio}
						className="hidden"
					/>
					<p className="text-sm">비공개</p>
				</label>
			</fieldset>
		</div>
	)
}

export default Private
