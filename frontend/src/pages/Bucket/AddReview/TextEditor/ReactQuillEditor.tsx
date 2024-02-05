import { useEffect, useMemo, useRef, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { getImageDeleteInfo } from './utils'

interface ReactQuillProps {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

type ImageUrlType = string

const ReactQuillEditor = ({ value, setValue }: ReactQuillProps) => {
	// ReactQuill 컴포넌트에서 Editor 정보를 받아오기 위해서 해당 ref가 필요
	// ReactQuill 컴포넌트 타입을 사용
	const reactQuillRef = useRef<ReactQuill>(null)
	const [imageUrlList, setImageUrlList] = useState<ImageUrlType[]>([])

	const editorDeltaInfo = reactQuillRef.current?.lastDeltaChangeSet?.ops

	useEffect(() => {
		const isImageOrTextDeleted = !!reactQuillRef.current?.lastDeltaChangeSet?.ops?.find(
			(item) => 'delete' in item
		)

		if (isImageOrTextDeleted) {
			deleteImage(imageUrlList, value)
		}
	}, [editorDeltaInfo])

	const uploadImage = (file: File) => {
		try {
			// ts 에러 방지를 위한 코드
			console.log(file)

			// // image Api로 url 정보 받아오기
			// const res = await imageApi({ img: file })
			// const imgUrl = res.data.imgUrl
			// 임시 이미지 Url
			const imgUrl =
				'https://velog.velcdn.com/images%2Fcodren%2Fpost%2Fabb55c63-8ab3-4bcc-a2db-b22debe31157%2Fimage.png'

			// getEditor : quill editor 객체를 가져오는 메서드
			// getSelection : 사용자의 선택 범위를 가져오며, 선택적으로 편집기에 먼저 초점을 맞춥니다. 그렇지 않으면 에디터에 포커스가 없는 경우 null을 반환할 수 있습니다.
			const editor = reactQuillRef.current?.getEditor()
			const range = editor?.getSelection()

			// setSelection : 사용자의 선택 범위를 설정할 수 있다.
			// - 이용에 있어서 typeError를 막기 위해선 2번째 인자도 필수로 필요
			// - 2번째 인자 값(length)이 0인 경우 -> 해당 위치로 커서 이동
			// - 2번째 인자 값(length)이 0 이상인 경우 -> 1번째 인자값부터 length 길이 만큼 드레그 되어 표시됨
			if (editor && range) {
				editor.insertEmbed(range.index, 'image', imgUrl)
				editor.setSelection(range.index + 1, 0)
			}

			setImageUrlList((prev) => [...prev, imgUrl])
		} catch (error) {
			console.log(error)
			return null
		}
	}
	const deleteImage = async (imageUrlList: ImageUrlType[], currentQuillValue: string) => {
		console.log('이미지 삭제!')

		const { urlToDelete, deletedList } = getImageDeleteInfo(imageUrlList, currentQuillValue)

		// Todo: 이미지 삭제 api로 대체 예정
		console.log('deletedUrl', urlToDelete)
		setImageUrlList(deletedList)
	}

	const imageHandler = () => {
		const input = document.createElement('input')
		input.setAttribute('type', 'file')
		input.setAttribute('accept', 'image/*')
		input.setAttribute('style', '{width: "100%"}')
		input.click()

		input.addEventListener('change', async () => {
			const file = input.files && input.files[0]

			if (file) {
				uploadImage(file)
			}
		})
	}

	// modules가 rerendering되면서 못 읽어오는 경우가 있기 때문에 useMemo로 변경되지 않게 고정이 필요
	const modules = useMemo(
		() => ({
			toolbar: {
				container: [
					[{ header: [1, 2, 3, 4, 5, 6, false] }],
					[{ font: [] }],
					// [{ size: [] }],
					['bold', 'italic', 'underline', 'strike', 'blockquote'],
					[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
					['link', 'image', 'video', 'code-block'],
				],
				handlers: { image: imageHandler },
			},
		}),
		[]
	)

	return (
		<ReactQuill
			ref={reactQuillRef}
			theme="snow"
			value={value}
			onChange={setValue}
			modules={modules}
			className="flex flex-col grow"
		/>
	)
}

export default ReactQuillEditor
