import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import './NotebookForm.css';

const SignupForm = () => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState('');
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.signup({})).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
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
					<label for='title'>Title</label>
					<input
						id='notebook-title-input'
						type='text'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Notebook Title'
					/>
				</div>
				<div id='add-notebook-button'>
					<button type='submit' disabled={title.length === 0}>
						Create
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignupForm;
