import { HiLocationMarker } from 'react-icons/hi'

const LocationInfo = () => {
	const addressName = '용산 전자랜드'
	const addressDetail = '서울 용산구 청파로 74'
	return (
		<section className="flex items-center gap-2 px-2 my-2 border rounded-sm border-lightGray">
			{/* @TODO: 버킷 고유 색상 적용시키기 */}
			<HiLocationMarker size="1.7rem" color="#AAD4D4" />
			<div>
				<p className="text-xs text-point1">{addressName}</p>
				<p className="text-[10px] text-point1 font-light">{addressDetail}</p>
			</div>
		</section>
	)
}

export default LocationInfo
