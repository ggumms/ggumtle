import { useEffect, useState } from 'react'
import { useSearchReviewStore } from '../../store/searchReviewStore'
import SearchReviewItem from './components/SearchReviewItem'
import { useSearchReview } from '../../hooks/searchHooks'
import SearchBar from './components/SearchBar'
import LoadingReview from './components/skeleton/LoadingReview'

const ReviewSearch = () => {
	const { reviewList, resetReviewList, addReviewList, setSearching, searching } =
		useSearchReviewStore()
	const [input, setInput] = useState('')
	const { isLoading, data, isSuccess } = useSearchReview(input)

	useEffect(() => {
		console.log('list: ', reviewList)
		if (isSuccess) {
			setSearching(false)
		}
	}, [isSuccess])

	useEffect(() => {
		console.log('input: ', input)
		if (input === '') {
			setSearching(false)
			resetReviewList()
		}
	}, [input])

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value)
		setSearching(true)
		console.log('[input]', input)
		console.log('[data]', data)
		if (input && !isLoading && data.searchList) {
			console.log('[데이터삽입]', data.searchList)
			addReviewList(data.searchList.content)
		}
	}

	return (
		<div className="w-full pt-24">
			<SearchBar input={input} setInput={setInput} onClickHandler={handleInputChange} />
			<section className="bg-lightGray flex flex-col gap-2">
				{searching ? (
					reviewList.map(() => <LoadingReview />)
				) : reviewList.length ? (
					reviewList.map((review) => <SearchReviewItem review={review} key={review.reviewId} />)
				) : null}
			</section>
		</div>
	)
}

export default ReviewSearch
