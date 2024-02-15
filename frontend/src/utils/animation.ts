export function interpolateColor(startColor: string, endColor: string, value: number) {
	// 색상 코드를 RGB 값으로 변환
	function hexToRgb(hex: string) {
		const r = parseInt(hex.slice(1, 3), 16),
			g = parseInt(hex.slice(3, 5), 16),
			b = parseInt(hex.slice(5, 7), 16)
		return [r, g, b]
	}

	// RGB 값을 선형 보간하여 새로운 색상 계산
	function interpolate(start: number, end: number, step: number) {
		return start + (end - start) * step
	}

	// 시작 색상과 끝 색상을 RGB 값으로 변환
	const startRgb = hexToRgb(startColor)
	const endRgb = hexToRgb(endColor)
	const step = value / 100

	// 각 채널에 대해 선형 보간 수행
	const resultRgb = [
		Math.round(interpolate(startRgb[0], endRgb[0], step)),
		Math.round(interpolate(startRgb[1], endRgb[1], step)),
		Math.round(interpolate(startRgb[2], endRgb[2], step)),
	]

	// 결과 RGB 값을 16진수 색상 코드로 변환
	function rgbToHex(r: number, g: number, b: number) {
		return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
	}

	// 최종 색상 코드 반환
	return rgbToHex(resultRgb[0], resultRgb[1], resultRgb[2])
}
