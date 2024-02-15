import React, { useEffect, useRef, useState } from 'react'
import { checkFileIsValidImage, checkFileSizeIsValid } from '../../../../../utils/image'
import { Picture } from '../../../../../assets/svgs'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoCloseSharp } from 'react-icons/io5'
import { useBucketStore } from '../../../../../store/bucketStore'

// image는 나중에 submit할 때 Post하기
const BucketImage = () => {
	const { bucketImage, changeBucketImage, resetBucketImage } = useBucketStore() // 서버에 전송하기 위한 state
	const [imageSrc, setImageSrc] = useState('') // 화면에 표시하기 위한 state
	const fileInputRef = useRef<HTMLInputElement>(null) // onChange를 제대로 동작 시키기 위해 사용

	useEffect(() => {
		const reader = new FileReader()
		reader.onload = (e: ProgressEvent<FileReader>) => {
			const result = e.target?.result
			if (typeof result === 'string') {
				setImageSrc(result)
			}
		}
		bucketImage instanceof File && reader && reader.readAsDataURL(bucketImage)
	}, [bucketImage])

	// 파일을 선택했을 때 돌아가는 함수
	const handleFileValidation = async (event: React.ChangeEvent<HTMLInputElement>) => {
		const target = event.currentTarget
		const selectedFile = (target.files as FileList)[0]

		// 파일이 비었는지 검사
		if (selectedFile === undefined) {
			return
		}

		// 파일의 확장자가 유효한지 검사
		if (!checkFileIsValidImage(selectedFile.name)) {
			target.value = ''
			alert('유효한 파일이 입력되지 않았습니다.')
			return
		}

		// 파일의 사이즈가 유효한지 검사
		if (!checkFileSizeIsValid(selectedFile.size)) {
			target.value = ''
			alert('파일의 용량이 너무 큽니다.')
			return
		}

		changeBucketImage(selectedFile)
	}

	const handleResetImage = () => {
		resetBucketImage()
		setImageSrc('')
		if (fileInputRef.current) fileInputRef.current.value = ''
	}

	return (
		<div>
			<p className="mb-[14px] text-sm font-bold  ml-[2px]">이미지</p>
			<div className="relative inline-block">
				{imageSrc ? (
					<>
						<label
							htmlFor="bucket-image"
							className="box-content relative inline-flex items-end justify-end w-24 h-24 border-2 rounded-md border-[#d9d9d9]"
							// border-2 rounded-md border-[#d9d9d9]
						>
							<img src={imageSrc} alt="Uploaded" className="absolute w-24 h-24 rounded-md" />
							<Picture className="absolute w-6 h-6 bottom-2 right-2" />
						</label>
						<button onClick={handleResetImage} className="absolute top-2 right-2">
							<IoCloseSharp size={24} color="#d9d9d9" />
						</button>
					</>
				) : (
					<label
						htmlFor="bucket-image"
						className="
				bucket_image 
						inline-flex justify-center items-center w-24 h-24 border-2 border-dashed rounded-md border-[#d9d9d9] relative box-content
						after:content-pictureImage after:inline-block after:w-6 after:h-6 after:absolute after:right-2 after:bottom-2
						"
					>
						<p className="sr-only">버킷 이미지</p>
						<AiOutlinePlus size={24} color="#d9d9d9" />
					</label>
				)}
				<input
					type="file"
					accept="image/png, image/jpg, image/jpeg image/gif"
					name="bucket-i	mage"
					id="bucket-image"
					ref={fileInputRef}
					className="hidden"
					onChange={handleFileValidation}
				/>
			</div>
		</div>
	)
}

export default BucketImage
