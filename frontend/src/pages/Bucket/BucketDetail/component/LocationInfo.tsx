import { HiLocationMarker } from 'react-icons/hi'

const LocationInfo = () => {
	const addressName = '용산 전자랜드'
	const addressDetail = '서울 용산구 청파로 74'
	return (
		<section className="flex items-center gap-2 p-3 mt-6 border rounded-sm border-lightGray">
			{/* @TODO: 버킷 고유 색상 적용시키기 */}
			<HiLocationMarker size="1.7rem" color="#AAD4D4" />
			<div className="ml-2">
				<p className="text-base font-bold text-point1">{addressName}</p>
				<p className="text-xs font-light text-point1">{addressDetail}</p>
			</div>
		</section>
	)
}

export default LocationInfo
