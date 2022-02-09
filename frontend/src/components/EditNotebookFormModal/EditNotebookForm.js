import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { updateNotebook, getNotebooks } from '../../store/notebooks';
import './EditNotebookForm.css';

const EditNotebookForm = ({ title, setShowModal, id }) => {
	const dispatch = useDispatch();
	const [editTitle, setEditTitle] = useState(title);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(
			updateNotebook({
				title: editTitle,
				notebookId: id,
			})
		);
		return dispatch(getNotebooks());
	};

	return (
		<div className='edit-notebook-container'>
			<div>
				<h2>Edit Notebook Title</h2>
				<p>Choose a new title for your notebook.</p>
			</div>
			<form className='edit-notebook-form' onSubmit={handleSubmit}>
				<div className='form-field'>
					<label htmlFor='title'>Title</label>
					<input
						id='notebook-title-input'
						type='text'
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
						placeholder='Notebook Title'
					/>
				</div>
				<div id='edit-notebook-button'>
					<button
						type='submit'
						disabled={title.length === 0}
						onClick={() => setTimeout(() => setShowModal(false), 100)}
					>
						Update
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditNotebookForm;
