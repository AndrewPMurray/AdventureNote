import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editNote, deleteNote, getNotes } from '../../store/notes';
import { useShowHide } from '../../context/ShowHide';

import './EditNote.css';
import '../LoginSignupForm.css';
import CopyMoveNoteModal from '../CopyMoveNoteModal';

const EditNote = () => {
	const { expandNote, setExpandNote, activeNote } = useShowHide();
	const noteId = activeNote?.id;
	const notebookId = activeNote?.notebookId;
	const user = useSelector((state) => state.session.user);
	const [name, setName] = useState(activeNote?.name);
	const [content, setContent] = useState(activeNote?.content);
	const [isTyping, setIsTyping] = useState(true);
	const [showMenu, setShowMenu] = useState(false);
	const [savePrompt, setSavePrompt] = useState(false);
	const dispatch = useDispatch();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		setName(activeNote?.name);
		setContent(activeNote?.content);
	}, [activeNote?.name, activeNote?.content]);

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (e.target === document.querySelector('#copy-move-button')) return;
			if (e.target === document.querySelector('#delete-note-text')) return;
			setShowMenu(false);
		};

		document.querySelector('#client-landing-container').addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const handleSubmit = async (e) => {
		await dispatch(
			editNote({
				id: noteId,
				name: name,
				content: content,
				notebookId: notebookId,
			})
		);

		savePromptPopup();

		if (savePrompt) clearTimeout(savePromptPopup());

		setSavePrompt(true);
		dispatch(getNotes(user?.id));
	};

	const timer = () => setTimeout(() => setIsTyping(false), 500);

	const savePromptTimeout = () =>
		setTimeout(() => {
			setSavePrompt(false);
		}, 175);

	const savePromptPopup = () =>
		setTimeout(() => {
			const savePrompt = document.getElementById('save-prompt');
			savePrompt?.classList.remove('fade-in');
			savePrompt?.classList.add('fade-out');
			savePromptTimeout();
		}, 2000);

	useEffect(() => {
		const saveMonitor = setInterval(() => {
			if (isTyping) return;
			handleSubmit();
			setIsTyping(true);
		}, 750);

		return () => {
			clearInterval(saveMonitor);
			clearTimeout(timer());
			clearTimeout(savePromptPopup());
			clearTimeout(savePromptTimeout());
		};
	});

	const removeNote = async () => {
		await dispatch(deleteNote(noteId));
		dispatch(getNotes(user?.id));
		setExpandNote(false);
		setShowMenu(false);
	};

	const moveSidebars = () => {
		let animation;
		if (expandNote) {
			animation = 'slide-right';
			document.querySelector('.edit-note').classList.add(animation);
			setTimeout(() => {
				document.querySelector('.edit-note').classList.remove(animation);
				setExpandNote(!expandNote);
			}, 250);
		} else {
			animation = 'slide-left';
			document.querySelector('.edit-note').classList.add(animation);
			setExpandNote(!expandNote);
			setTimeout(() => {
				document.querySelector('.edit-note').classList.remove(animation);
			}, 250);
		}
	};

	return !activeNote ? null : (
		<div className='edit-note'>
			<div className='note-utils-container'>
				<i
					id='expand-collapse-arrow'
					className={
						expandNote ? 'fas fa-angle-double-right' : 'fas fa-angle-double-left'
					}
					onClick={() => setExpandNote(!expandNote)}
				></i>
				<i id='note-hamburger-menu' className='fas fa-bars' onClick={openMenu}></i>
				{showMenu && (
					<ul className='note-menu-items fade-in-slide-down'>
						<CopyMoveNoteModal note={activeNote} setShowMenu={setShowMenu} />
						<div id='delete-note-button' onClick={removeNote}>
							<i className='fas fa-trash-alt' />
							<p id='delete-note-text'>Delete note</p>
						</div>
					</ul>
				)}
			</div>
			<form id='edit-note-form' onSubmit={handleSubmit}>
				<input
					type='text'
					value={name || ''}
					onChange={(e) => setName(e.target.value)}
					onKeyUp={() => timer()}
					onKeyDown={() => clearTimeout(timer())}
					placeholder='Name'
				/>
				<textarea
					value={content || ''}
					onChange={(e) => setContent(e.target.value)}
					placeholder='Start taking your notes here'
					onKeyUp={() => timer()}
					onKeyDown={() => clearTimeout(timer())}
				/>
				{/* <button className='edit-note-button' type='submit'>
					Save
				</button> */}
			</form>
			{savePrompt && (
				<div id='save-prompt' className='fade-in'>
					Note saved
				</div>
			)}
		</div>
	);
};

export default EditNote;
