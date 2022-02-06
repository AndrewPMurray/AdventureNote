import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import './EditNote.css';

import '../LoginSignupForm.css';

const EditNote = ({ activeNote }) => {
	const noteId = activeNote;
	const note = useSelector((state) => state.notes[activeNote]);
	const [title, setTitle] = useState(note?.title || '');
	const [content, setContent] = useState(note?.content || '');

	useEffect(() => {
		setTitle(note?.title || '');
		setContent(note?.content || '');
	}, [note?.title, note?.content]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return !activeNote ? null : (
		<form className='edit-note' onSubmit={handleSubmit}>
			<input
				type='text'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder='Title'
			/>
			<textarea
				value={content}
				onChange={(e) => setContent(e.target.value)}
				placeholder='Start taking your notes here'
			/>
			<button className='edit-note-button' type='submit'>
				Save
			</button>
		</form>
	);
};

export default EditNote;
