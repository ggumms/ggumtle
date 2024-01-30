import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

const BucketImage = () => {
	return (
		<div>
			<label
				htmlFor="bucket-image"
				className="
					bucket_image 
					inline-flex justify-center items-center w-24 h-24 border-2 border-dashed rounded-md border-[#d9d9d9] relative
					after:content-pictureImage after:inline-block after:w-6 after:h-6 after:absolute after:right-2 after:bottom-2
 				"
			>
				<p className="sr-only">버킷 이미지</p>
				<AiOutlinePlus size={24} color="#d9d9d9" />
			</label>
			<input type="file" name="bucket-image" id="bucket-image" className="hidden" />
		</div>
	)
}

export default BucketImage
