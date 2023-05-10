import React from 'react'
import IssueCard from '../IssueCard/IssueCard'
import Workspace from '../Workspace/Workspace'
import './Issues.css'

const isssues = [
	{
			"id": 1,
			"title": "Multi-layered optimal service-desk",
			"description": "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.\n\nQuisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.",
			"user": "Gabby Allcott",
			"date": "2021-01-01",
			"status": "IN PROGRESS"
	},
	{
			"id": 2,
			"title": "Diverse well-modulated matrix",
			"description": "Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
			"user": "Bobbie Turnell",
			"date": "2021-01-01",
			"status": "PENDING"
	},
	{
			"id": 3,
			"title": "Inverse eco-centric website",
			"description": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.",
			"user": "Malva Samuel",
			"date": "2021-01-01",
			"status": "COMPLETED"
	},
	{
			"id": 4,
			"title": "Managed tertiary process improvement",
			"description": "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque.\n\nDuis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
			"user": "Syd Stockoe",
			"date": "2021-01-01",
			"status": "IN PROGRESS"
	},
	{
			"id": 5,
			"title": "Compatible transitional ability",
			"description": "Etiam vel augue. Vestibulum rutrum rutrum neque. Aenean auctor gravida sem.\n\nPraesent id massa id nisl venenatis lacinia. Aenean sit amet justo. Morbi ut odio.",
			"user": "Thatcher Henriksson",
			"date": "2021-01-01",
			"status": "PENDING"
	},
	{
			"id": 6,
			"title": "Persistent zero administration secured line",
			"description": "In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.\n\nCras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.",
			"user": "Quill Antwis",
			"date": "2021-01-01",
			"status": "PENDING"
	},
	{
			"id": 7,
			"title": "Progressive transitional frame",
			"description": "Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.\n\nProin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue. Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.\n\nAenean lectus. Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.",
			"user": "Auguste Ogles",
			"date": "2021-01-01",
			"status": "IN PROGRESS"
	},
	{
			"id": 8,
			"title": "Monitored real-time parallelism",
			"description": "Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.\n\nSed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
			"user": "Bella Levison",
			"date": "2021-01-01",
			"status": "PENDING"
	},
	{
			"id": 9,
			"title": "Extended actuating synergy",
			"description": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.\n\nQuisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.",
			"user": "Vi Merrigan",
			"date": "2021-01-01",
			"status": "IN PROGRESS"
	},
	{
			"id": 10,
			"title": "Advanced upward-trending info-mediaries",
			"description": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.\n\nAenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
			"user": "Rosemarie Harrhy",
			"date": "2021-01-01",
			"status": "PENDING"
	}
]

const Issues = () => {
	const status = ['PENDING', 'IN PROGRESS', 'COMPLETED']
	
	const pendingCards = isssues.filter(issue => issue.status === status[0])
	const inProgressCards = isssues.filter(issue => issue.status === status[1])
	const completedCards = isssues.filter(issue => issue.status === status[2])

	return (
		<Workspace title="All Issues">
			<div className='issue-list-container'>
				<div className="issue-list">
					<div className='issue-list-content'>
						<div className='issue-list-title'>
							pending
						</div>
						<div className='issue-cards'>
							{pendingCards.map(issue => <IssueCard {...issue} />)}
						</div>
					</div>
				</div>
				<div className="issue-list">
					<div className='issue-list-content'>
						<div className='issue-list-title'>
							in progress
						</div>
						<div className='issue-cards'>
							{inProgressCards.map(issue => <IssueCard {...issue} />)}
						</div>
					</div>
				</div>
				<div className="issue-list">
					<div className='issue-list-content'>
						<div className='issue-list-title'>
							completed
						</div>
						<div className='issue-cards'>
							{completedCards.map(issue => <IssueCard {...issue} />)}
						</div>
					</div>
				</div>
			</div>
		</Workspace>
	)
}

export default Issues
