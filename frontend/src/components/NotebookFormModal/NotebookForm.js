import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { addNotebook, getNotebooks } from '../../store/notebooks';
import './NotebookForm.css';

const NotebookForm = ({ showModal, setShowModal }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const [title, setTitle] = useState('');
	const [errors, setErrors] = useState({});
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		dispatch(
			addNotebook({
				title,
				userId: user.id,
			})
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
		return dispatch(getNotebooks());
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
				</div>
				<div id='add-notebook-button'>
					<button
						type='submit'
						disabled={title.length === 0}
						onClick={() => setTimeout(() => setShowModal(false), 100)}
					>
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default NotebookForm;
