import ReactQuillEditor from './ReactQuillEditor'
// import ReactQuillMirror from './ReactQuillMirror'

interface ITextEditorProps {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const TextEditor = ({ value, setValue }: ITextEditorProps) => {
	return (
		<>
			<ReactQuillEditor value={value} setValue={setValue} />
			{/* //Todo: 나중에 github처럼 html-parser써서 미리보기 화면 전환 가능하도록 제공 예정 */}
			{/* <ReactQuillMirror value={value} /> */}
		</>
	)
}

export default TextEditor
