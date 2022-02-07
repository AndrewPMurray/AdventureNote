import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import './EditNote.css';
import '../LoginSignupForm.css';

import { useShowHide } from '../../context/ShowHide';

const EditNote = ({ activeNote }) => {
	const noteId = activeNote;
	const note = useSelector((state) => state.notes[activeNote]);
	const [title, setTitle] = useState(note?.title || '');
	const [content, setContent] = useState(note?.content || '');
	const { expandNote, setExpandNote } = useShowHide();

	useEffect(() => {
		setTitle(note?.title || '');
		setContent(note?.content || '');
	}, [note?.title, note?.content]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	const moveSidebars = () => {
		let animation;
		if (expandNote) animation = 'slide-right';
		else animation = 'slide-left';
		document.querySelector('.edit-note').classList.add(animation);
		setExpandNote(!expandNote);
		setTimeout(() => {
			document.querySelector('.edit-note').classList.remove(animation);
		}, 250);
	};

	return !activeNote ? null : (
		<div className='edit-note'>
			<i
				id='expand-collapse-arrow'
				className='fas fa-arrows-alt-h'
				onClick={moveSidebars}
			></i>
			<form id='edit-note-form' onSubmit={handleSubmit}>
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
		</div>
	);
};

export default EditNote;
