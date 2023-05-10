import React from 'react'
import './Logo.css'

const Logo = () => {
	return (
		<div className='logo-container'>
			<img
					src="/images/logo.png"
					alt="logo"
					className="logo-img"
			/>
			<h1 className="logo-title">Gesela</h1>
		</div>
	)
}

export default Logo
