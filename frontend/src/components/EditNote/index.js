import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editNote, deleteNote, getNotes } from '../../store/notes';

import './EditNote.css';
import '../LoginSignupForm.css';

import { useShowHide } from '../../context/ShowHide';

const EditNote = ({ activeNote }) => {
	const noteId = activeNote;
	const note = useSelector((state) => state.notes[activeNote]);
	const user = useSelector((state) => state.session.user);
	const [name, setName] = useState(note?.name || '');
	const [content, setContent] = useState(note?.content || '');
	const [showMenu, setShowMenu] = useState(false);
	const [savePrompt, setSavePrompt] = useState(false);
	const [noChange, setNoChange] = useState(false);
	const { expandNote, setExpandNote } = useShowHide();
	const dispatch = useDispatch();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	useEffect(() => {
		setName(note?.name || '');
		setContent(note?.content || '');
	}, [note?.name, note?.content]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const fadeTimeout = () =>
			setTimeout(() => {
				setSavePrompt(false);
				setNoChange(false);
			}, 175);

		const savePromptPopup = () =>
			setTimeout(() => {
				const savePrompt = document.getElementById('save-prompt');
				savePrompt?.classList.remove('fade-in');
				savePrompt?.classList.add('fade-out');
				fadeTimeout();
			}, 2000);

		if (savePrompt) {
			clearTimeout(savePromptPopup);
			clearTimeout(fadeTimeout);
		}

		const editedNote = await dispatch(
			editNote({
				noteId,
				name,
				content,
				notebookId: null,
			})
		);
		dispatch(getNotes(user?.id));
		if (editedNote.message) setNoChange(true);
		setSavePrompt(true);
		savePromptPopup();
	};

	const removeNote = async (e) => {
		await dispatch(deleteNote(noteId));
		dispatch(getNotes(user?.id));
		setExpandNote(false);
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
			<div className='note-utils-container'>
				<i
					id='expand-collapse-arrow'
					className={
						expandNote ? 'fas fa-angle-double-right' : 'fas fa-angle-double-left'
					}
					onClick={moveSidebars}
				></i>
				<i id='note-hamburger-menu' className='fas fa-bars' onClick={openMenu}></i>
				{showMenu && (
					<ul className='note-menu-items fade-in'>
						<div id='delete-note-button' to='/' onClick={removeNote}>
							<i className='fas fa-trash-alt' />
							<p>Delete note</p>
						</div>
					</ul>
				)}
			</div>
			<form id='edit-note-form' onSubmit={handleSubmit}>
				<input
					type='text'
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder='Name'
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
			{savePrompt && (
				<div id='save-prompt' className='fade-in'>
					{noChange ? 'No changes detected' : 'Note saved'}
				</div>
			)}
		</div>
	);
};

export default EditNote;
