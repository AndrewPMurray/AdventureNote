import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import '../LoginSignupForm.css';

const EditNote = ({ note }) => {
	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<form className='edit-note' onSubmit={handleSubmit}>
			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Title'
			/>
			<textbox value={content} onChange={(e) => setContent(e.target.value)} />
			<button className='edit-note-button' type='submit'>
				Save
			</button>
		</form>
	);
};

export default EditNote;
