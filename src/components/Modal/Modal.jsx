import React from 'react'
import { createPortal } from 'react-dom'
import './Modal.css'

const Modal = (props) => {

	return createPortal(
		<div className='modal-overlay'>
			<div className='modal-container'>
				<div className='modal-header'>
					<h3 className='modal-title'>{props.title}</h3>
					<button className='modal-close-btn' onClick={props.handleClose}>&times;</button>
				</div>
				<div className='modal-body'>
						{props.children}
				</div>
			</div>
		</div>, document.body
	)
}

export default Modal
