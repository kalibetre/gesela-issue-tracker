import React from 'react'
import { truncateText } from '../../utils/utils'
import './IssueCard.css'

const IssueCard = (props) => {
	return (
		<div className='issue-card'>
			<header className='issue-card-header'>
				<span>
						{props.user}
				</span>
				<span className='dot'></span>
				<span>
						{props.date}
				</span>
			</header>
			<article className='issue-card-content'>
				<h3>{truncateText(props.title, 50)}</h3>
				<p>{truncateText(props.description, 200)}</p>
			</article>
		</div>
	)
}

export default IssueCard
