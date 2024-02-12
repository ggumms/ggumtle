import { useEffect } from 'react'
import { useSearchUserStore } from '../../store/searchUserStore'
import SearchUserItem from './components/SearchUserItem'
import LoadingUser from './components/LoadingUser'

const UserSearch = () => {
	const { userList, resetUserList, setSearching, searching } = useSearchUserStore()
	useEffect(() => {
		resetUserList()
		setSearching(false)
	}, [])
	useEffect(() => {
		console.log('[사용자 검색]', userList)
	}, [userList])
	return (
		<div className="h-screen px-4 w-full">
			{/* {userList.length ? (
				userList.map((user) => <SearchUserItem />)
			) : searching ? (
				<LoadingUser />
			) : null} */}
			{searching ? (
				<LoadingUser />
			) : userList.length ? (
				userList.map((user) => <SearchUserItem />)
			) : null}
		</div>
	)
}

export default UserSearch
