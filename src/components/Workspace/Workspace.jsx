import React from 'react'
import './Workspace.css'

const Workspace = (props) => {
	return (
		<section className='wks-main-container'>
			<div className="wks-header">
				<h2 className="wks-title">
					{props.title}
				</h2>
			</div>
			<main className="wks-main">
				{props.children}
			</main>
		</section>
	)
}

export default Workspace
