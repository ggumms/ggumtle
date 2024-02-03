import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

interface ReactQuillProps {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const ReactQuillEditor = ({ value, setValue }: ReactQuillProps) => {
	const modules = {
		toolbar: [
			[{ header: [1, 2, 3, 4, 5, 6, false] }],
			[{ font: [] }],
			// [{ size: [] }],
			['bold', 'italic', 'underline', 'strike', 'blockquote'],
			[{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
			['link', 'image', 'video', 'code-block'],
		],
	}

	return (
		<ReactQuill
			theme="snow"
			value={value}
			onChange={setValue}
			modules={modules}
			className="flex flex-col grow"
		/>
	)
}

export default ReactQuillEditor
