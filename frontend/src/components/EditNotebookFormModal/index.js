import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import EditNotebookForm from './EditNotebookForm';

const EditNotebookFormModal = ({ title, id, setMenuId }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div onClick={() => setShowModal(true)}>
				<p id='edit-notebook-text'>Edit Notebook Title</p>
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<EditNotebookForm
						setShowModal={setShowModal}
						setMenuId={setMenuId}
						title={title}
						id={id}
					/>
				</Modal>
			)}
		</>
	);
};

export default EditNotebookFormModal;
