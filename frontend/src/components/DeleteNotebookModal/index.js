import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import DeleteNotebook from './DeleteNotebook';

const DeleteNotebookModal = ({ notebook }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div id='delete-notebook-button' onClick={() => setShowModal(true)}>
				<i className='fas fa-trash-alt' />
				<p id='delete-notebook-text'>Delete notebook</p>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<DeleteNotebook setShowModal={setShowModal} notebook={notebook} />
				</Modal>
			)}
		</>
	);
};

export default DeleteNotebookModal;
