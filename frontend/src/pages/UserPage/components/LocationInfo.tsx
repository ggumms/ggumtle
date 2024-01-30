import { HiLocationMarker } from 'react-icons/hi'

const LocationInfo = () => {
  const addressName = "용산 전자랜드"
  const addressDetail = "서울 용산구 청파로 74"
	return (
		<div className="border border-lightGray rounded-sm h-12 flex items-center px-2 my-2 gap-2">
			{/* @TODO: 버킷 고유 색상 적용시키기 */}
			<HiLocationMarker size="1.7rem" color="#AAD4D4" />
			<div>
				<p className='text-xs text-point1'>{addressName}</p>
				<p className='text-[10px] text-point1 font-light'>{addressDetail}</p>
			</div>
		</div>
	)
}

export default LocationInfo
