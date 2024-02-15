import { useEffect, useState } from 'react'
import { useSearchBucketStore } from '../../store/searchBucketStore'
import SearchBucketItem from './components/SearchBucketItem'
import { useSearchBucket } from '../../hooks/searchHooks'
import SearchBar from './components/SearchBar'
import LoadingBucket from './components/skeleton/LoadingBucket'

const BucketSearch = () => {
	const { bucketList, resetBucketList, addBucketList, setSearching, searching } =
		useSearchBucketStore()
	const [input, setInput] = useState('')
	const { isLoading, data, isSuccess } = useSearchBucket(input)

	useEffect(() => {
		console.log(bucketList)
		if (isSuccess) {
			setSearching(false)
		}
	}, [isSuccess])

	useEffect(() => {
		if (input === '') {
			setSearching(false)
			resetBucketList()
		}
	}, [input])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
		setSearching(true)
		console.log('[input]', input)
		console.log('[data]', data)
		if (input && !isLoading && data.searchList) {
			console.log('[데이터삽입]', data.searchList)
			addBucketList(data.searchList.content)
		}
	}

	return (
		<div className="w-full pt-24">
			<SearchBar input={input} setInput={setInput} onClickHandler={handleInputChange} />
			<section className="bg-lightGray flex flex-col gap-2">
				{searching ? (
					bucketList.map(() => <LoadingBucket /> )
				) : bucketList.length ? (
					bucketList.map((bucket) => <SearchBucketItem bucket={bucket} key={bucket.bucketId} />)
				) : null}
			</section>
		</div>
	)
}

export default BucketSearch
