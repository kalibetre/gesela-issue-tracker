import React from 'react'
import Avatar from '../Avatar/Avatar'
import './Header.css'

const Header = (props) => {
	return (
		<header className='hd-container'>
			<div className="hd-acc">
				<div className="hd-acc-img">
					<Avatar />
				</div>
			</div>
			<div className='hd-title'>
				{props.title}
			</div>
		</header>
	)
}

export default Header
