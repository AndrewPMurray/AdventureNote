import React, { useState } from 'react';
import { Modal } from '../../context/Modal';
import SignupForm from './SignupForm';

const SignupFormModal = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<button id='signup-button' onClick={() => setShowModal(true)}>
				Sign Up For Free
			</button>
			{showModal && (
				<Modal onClose={() => setShowModal(false)}>
					<SignupForm />
				</Modal>
			)}
		</>
	);
};

export default SignupFormModal;
