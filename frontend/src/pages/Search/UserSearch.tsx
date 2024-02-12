import { useEffect, useState } from 'react'
import { useSearchUserStore } from '../../store/searchUserStore'
import SearchUserItem from './components/SearchUserItem'
import LoadingUser from './components/LoadingUser'
import SearchBar from './components/SearchBar'
import { useSearchUser } from '../../hooks/searchHooks'

const UserSearch = () => {
	const { userList, resetUserList, addUserList, setSearching, searching } = useSearchUserStore()
	const [input, setInput] = useState('')
	const { isLoading, data, isSuccess } = useSearchUser(input)

	useEffect(() => {
		console.log(isSuccess)
		if (isSuccess) {
			setSearching(false)
		}
	}, [isSuccess])

	useEffect(() => {
		if (input === '') {
			setSearching(false)
			resetUserList()
		}
	}, [input])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
		setSearching(true)
		console.log('[input]', input)
		if (!isLoading && data) {
			console.log('[데이터삽입]', data.searchList.content)
			addUserList(data.searchList.content)
		}
	}

	return (
		<div className="h-screen px-4 w-full">
			<SearchBar input={input} setInput={setInput} onClickHandler={handleInputChange} />
			{searching ? (
				<LoadingUser />
			) : userList.length ? (
				userList.map((user) => <SearchUserItem user={user} key={user.userId} />)
			) : null}
		</div>
	)
}

export default UserSearch
