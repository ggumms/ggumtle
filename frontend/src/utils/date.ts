// padStart : 빈 문자열을 채워주는 메서드
export const formatDate = (date: Date | string): string => {
	if (typeof date === 'string') {
		return date
	}
	const year = date.getFullYear()
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const day = date.getDate().toString().padStart(2, '0')
	return `${year}-${month}-${day}`
}
