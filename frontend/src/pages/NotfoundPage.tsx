// NotFoundPage.tsx
import { FaBan } from 'react-icons/fa'
import { useRouter } from '../hooks/useRouter'

const NotFoundPage: React.FC = () => {
	const { routeTo } = useRouter()

	const handleClickGoHomeBtn = () => {
		routeTo('/')
	}
	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="text-center">
				<h1 className="flex items-center justify-center text-6xl font-bold text-gray-800 align-middle">
					<FaBan size={40} />
					<p>404</p>
				</h1>
				<p className="text-2xl font-light text-gray-600">Page not found</p>
				<p className="mt-4 text-gray-500">The page you are looking for does not exist.</p>
				<button
					onClick={handleClickGoHomeBtn}
					className="p-1 px-4 py-2 mt-6 font-bold text-white border-b-2 hover:text-blue-600"
				>
					Go Home
				</button>
			</div>
		</div>
	)
}

export default NotFoundPage
