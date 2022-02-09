import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import CopyMoveNoteForm from './CopyMoveNoteForm';

const CopyMoveNoteModal = ({ note }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<div id='copy-move-button' onClick={() => setShowModal(true)}>
				Move Note
			</div>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<CopyMoveNoteForm note={note} setShowModal={setShowModal} />
				</Modal>
			)}
		</>
	);
};

export default CopyMoveNoteModal;
