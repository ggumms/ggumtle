import React from 'react'
import { Outlet } from 'react-router-dom'

const Rader = () => {
	return (
		<div>
			This is Rader Page
			<Outlet />
		</div>
	)
}

export default Rader
