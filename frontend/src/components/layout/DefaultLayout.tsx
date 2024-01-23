import React from 'react'

interface DefaultLayoutProps {
	children: React.ReactNode
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="w-[390px] h-[844px] bg-white shadow-lg px-5">{children}</div>
		</div>
	)
}

export default DefaultLayout
