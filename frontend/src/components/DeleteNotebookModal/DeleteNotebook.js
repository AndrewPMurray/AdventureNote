import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteNotebook, getNotebooks } from '../../store/notebooks';
import './DeleteNotebook.css';

const DeleteNotebook = ({ setShowModal, notebook }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => setDisabled(false), 2000);

		return () => clearTimeout(timer);
	});

	const removeNotebook = async () => {
		await dispatch(deleteNotebook(notebook.id)).then(() => {
			setShowModal(false);
		});
	};

	return (
		<div className='confirm-delete-notebook-container'>
			<div>
				<h2>Deleting {notebook.title}</h2>
				<p>
					This will delete all notes associated with the notebook! Please be sure to move
					any notes you would like to keep. Are you sure you want to delete this notebook?
				</p>
			</div>
			<div id='confirm-delete-notebook-button'>
				<button type='submit' disabled={disabled} onClick={removeNotebook}>
					Confirm
				</button>
			</div>
		</div>
	);
};

export default DeleteNotebook;
