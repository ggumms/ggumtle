import ReactQuillEditor from './ReactQuillEditor'

interface ITextEditorProps {
	value: string
	setValue: React.Dispatch<React.SetStateAction<string>>
}

const TextEditor = ({ value, setValue }: ITextEditorProps) => {
	return (
		<>
			<ReactQuillEditor value={value} setValue={setValue} />
		</>
	)
}

export default TextEditor
