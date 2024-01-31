interface IPageDescription {
	title: string
	desc1?: string
	desc2?: string
}
type PageType = 'categoryWrite' | 'categoryJoin' | 'placeWrite' | 'additionalWrite'
type PageDescriptionDataType = Record<PageType, IPageDescription>

const pageDescriptionData: PageDescriptionDataType = {
	categoryJoin: {
		title: '무엇을 좋아하세요?',
		desc1: '이루고 싶었던 꿈꿔오던 분야가 있으신가요?',
		desc2: '경험해보고 싶었던, 경험해보고 싶은 분야의 버킷리스트들을 받아보세요!',
	},
	categoryWrite: { title: '카테고리 선택', desc1: '어떤 종류의 꿈을 꾸고 계신가요?' },
	placeWrite: {
		title: '이루고 싶은 꿈의 위치를 지정해 주세요',
		desc1: '주소를 검색하고 지도로 상세 위치를 지정해 주세요',
	},
	additionalWrite: { title: '꿈에 대한 추가 정보를 설정해 주세요' },
}

interface IPageDescriptionProps {
	type: PageType
}
const PageDescription = ({ type }: IPageDescriptionProps) => {
	return (
		<>
			<h1 className="mb-4 text-2xl font-bold">{pageDescriptionData[type].title}</h1>
			{pageDescriptionData[type].desc1 && (
				<p className="text-xs font-bold text-subText">{pageDescriptionData[type].desc1}</p>
			)}
			{pageDescriptionData[type].desc2 && (
				<p className="text-xs font-bold text-subText">{pageDescriptionData[type].desc2}</p>
			)}
		</>
	)
}

export default PageDescription
