interface IMirrorProps {
	value: string
}

// editor style을 유지하기 위한 className 지정
const ReactQuillMirror = ({ value }: IMirrorProps) => {
	return <div className="break-words">{value}</div>
}

export default ReactQuillMirror
