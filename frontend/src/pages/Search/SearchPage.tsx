import React from 'react'
import { Outlet } from 'react-router-dom'

const SearchPage = () => {
	return (
		<div>
			This is Search Page
			<Outlet />
		</div>
	)
}

export default SearchPage
