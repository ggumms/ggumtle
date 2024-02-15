import { halfBgColorClass } from '../../../../constants/dynamicClass'
import { IBucketInfo } from '../../../../interfaces'
interface ITimecapsuleProps {
	bucketInfo: IBucketInfo
}
const TimeCapsule = ({ bucketInfo }: ITimecapsuleProps) => {
	return (
		<>
			<p className={`p-5 rounded-md mt-11 break-keep ${halfBgColorClass[bucketInfo.color]}`}>
				{bucketInfo.timeCapsule}
			</p>
		</>
	)
}

export default TimeCapsule
