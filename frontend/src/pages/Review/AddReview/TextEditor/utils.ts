type ImageUrlType = string

interface findDeletedImageUrlReturn {
	urlToDelete: string | null
	deletedList: string[]
}
export const getImageDeleteInfo = (
	imageUrlList: ImageUrlType[],
	currentQuillValue: string
): findDeletedImageUrlReturn => {
	let urlToDelete = ''

	const deletedList = imageUrlList.filter((imageUrl) => {
		if (!currentQuillValue.includes(imageUrl)) {
			urlToDelete = imageUrl
			return false
		}
		return true
	})
	return { urlToDelete, deletedList }
}
