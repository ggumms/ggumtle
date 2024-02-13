import { useQuery } from "@tanstack/react-query"
import { getAlarm } from "../pages/Alarm/api"

export const useAlarmQuery = () => {
	return useQuery({
		queryKey: ['alarm', 0, 20],
		queryFn: getAlarm,
	})
}
