import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import NotebookForm from './NotebookForm';

const NotebookFormModal = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id='new-notebook-button' onClick={() => setShowModal(true)}>
				<i className='fas fa-plus-square' style={{ paddingRight: '10px' }}></i>
				New Notebook
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<NotebookForm />
				</Modal>
			)}
		</>
	);
};

export default NotebookFormModal;
