import { ReactNode, useEffect } from 'react'
import { getMyInfo } from '../../api'
import { useCurrentUserStore } from '../../store/currentUserStore'
import { useRouter } from '../../hooks/useRouter'

interface IValidateTokenLayoutProps {
	children: ReactNode
}

const ValidateTokenLayout = ({ children }: IValidateTokenLayoutProps) => {
	const { setUserInfo, resetUserInfo } = useCurrentUserStore()
	const { routeTo, currentPath } = useRouter()

	const fetchMyInfo = async () => {
		try {
			const userRes = await getMyInfo()
			console.log(userRes)
			setUserInfo(userRes)
		} catch (error) {
			// Todo : 로그인 페이지 만들어지면 로그아웃 + login 페이지로 이동하도록 만들기
			routeTo('/')
		}
	}

	useEffect(() => {
		fetchMyInfo()

		return () => {
			resetUserInfo()
		}
	}, [currentPath])

	return <div>{children}</div>
}

export default ValidateTokenLayout
