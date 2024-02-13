import LocationInfo from './LocationInfo'
import LocationSkeleton from './Skeleton/LocationSkeleton'

interface IDetailLocationProps {
	isLoading: boolean
	latitude: number | undefined
	longitude: number | undefined
	address: string | undefined
}
const DetailLocation = ({ isLoading, latitude, longitude, address }: IDetailLocationProps) => {
	const hasLocationData = latitude === undefined || longitude === undefined || address === undefined
	if (isLoading || hasLocationData) return <LocationSkeleton />

	return <LocationInfo />
}

export default DetailLocation
