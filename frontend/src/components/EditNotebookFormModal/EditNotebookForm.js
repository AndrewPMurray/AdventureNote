import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateNotebook } from '../../store/notebooks';
import './EditNotebookForm.css';

const EditNotebookForm = ({ setShowModal, setMenuId, id, title }) => {
	const dispatch = useDispatch();
	const [editTitle, setEditTitle] = useState(title);
	const [errors, setErrors] = useState({});

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(
			updateNotebook({
				title: editTitle === '' ? null : editTitle,
				notebookId: id,
			})
		)
			.then((res) => {
				setShowModal(false);
				setMenuId(null);
			})
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
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
					{errors?.title && (
						<p style={{ paddingTop: '5px' }} id='errors'>
							{errors.title}
						</p>
					)}
				</div>
				<div id='edit-notebook-button'>
					<button type='submit' disabled={editTitle.length === 0}>
						Update
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditNotebookForm;
