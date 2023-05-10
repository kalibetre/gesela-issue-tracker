import React from 'react'
import './LinkGroup.css'

const LinkGroup = (props) => {
	return (
		<section className='lg-container'>
			<div className='lg-title'>
				{props.title}
			</div>
			<div className='lg-links'>
				{props.children}
			</div>
		</section>
	)
}

export default LinkGroup
