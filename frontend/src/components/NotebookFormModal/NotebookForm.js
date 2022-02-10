import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addNotebook, getNotebooks } from '../../store/notebooks';
import './NotebookForm.css';

const NotebookForm = ({ setShowModal }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [title, setTitle] = useState('');
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(
			addNotebook({
				title,
				userId: user.id,
			})
		)
			.then((res) => {
				setShowModal(false);
			})
			.catch(async (res) => {
				const data = await res.json();
				if (data && data.errors) {
					setErrors(data.errors);
				}
			});
	};

	return (
		<div className='add-notebook-container'>
			<div>
				<h2>Create new notebook</h2>
				<p>
					Notebooks are useful for organizing your notes. Store each character with the
					campaign their involved with, or organize your notes for your next DM session.
					Notebooks are private and accessible by only you.
				</p>
			</div>
			<form className='add-notebook-form' onSubmit={handleSubmit}>
				<div className='form-field'>
					<label htmlFor='title'>Title</label>
					<input
						id='notebook-title-input'
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Notebook Title'
					/>
					{errors?.title && (
						<p style={{ paddingTop: '5px' }} id='errors'>
							{errors.title}
						</p>
					)}
				</div>
				<div id='add-notebook-button' disabled={title.length === 0}>
					<button type='submit'>Create</button>
				</div>
			</form>
		</div>
	);
};

export default NotebookForm;
