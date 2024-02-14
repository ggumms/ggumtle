import ReactQuill from 'react-quill'

interface IMirrorProps {
	value: string | undefined
}

// editor style을 유지하기 위한 className 지정
const EditorViewer = ({ value }: IMirrorProps) => {
	if (!value) {
		return <></>
	}
	return (
		<div className="w-full max-w-full prose">
			<ReactQuill value={value} readOnly={true} theme={'bubble'} />
		</div>
	)
}

export default EditorViewer
