import axios from 'axios'

const instance = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	withCredentials: true,
})

export const getRadarUsers = async () => {
  return instance
		.get('radar/following', {
			headers: {
        Accept: "application/json;charset=UTF-8",
				Authorization: `Bearer ${import.meta.env.VITE_USER1_TOKEN}`,
			},
		})
		.then((response) => response.data.radar)
}
