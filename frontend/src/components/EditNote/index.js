import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { editNote, deleteNote, getNotes } from '../../store/notes';
import { addTag, getTags, createTag } from '../../store/tags';
import { useShowHide } from '../../context/ShowHide';

import './EditNote.css';
import '../LoginSignupForm.css';
import CopyMoveNoteModal from '../CopyMoveNoteModal';

const EditNote = () => {
	const { expandNote, setExpandNote, activeNote } = useShowHide();
	const noteId = activeNote?.id;
	const notebookId = activeNote?.notebookId;
	const allTags = useSelector((state) => Object.values(state.tags)).filter((e) => e.id);
	const noteTags = useSelector((state) => Object.values(state.tags.noteTags));
	const user = useSelector((state) => state.session.user);
	const [name, setName] = useState(activeNote?.name);
	const [content, setContent] = useState(activeNote?.content);
	const [tagName, setTagName] = useState('');
	const [isTyping, setIsTyping] = useState(true);
	const [showMenu, setShowMenu] = useState(false);
	const [savePrompt, setSavePrompt] = useState(false);
	const dispatch = useDispatch();

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	const filteredTags = allTags.filter((tag) => {
		let tagOnNote = false;
		noteTags.every((noteTag) => {
			if (tag.name === noteTag.name) {
				tagOnNote = true;
				return false;
			}
			return true;
		});
		if (!tagOnNote) return tag.name.toLowerCase().includes(tagName.toLowerCase());
		else return false;
	});

	useEffect(() => {
		setName(activeNote?.name);
		setContent(activeNote?.content);
	}, [activeNote?.name, activeNote?.content]);

	useEffect(() => {
		if (user && noteId) {
			dispatch(getTags(user.id, noteId));
		}
		setTagName('');
	}, [user, noteId, dispatch]);

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

	const createNewTag = async () => {
		const newTag = await dispatch(createTag({ name: tagName, userId: user.id }));
		addTagToNote(newTag.id);
	};

	const addTagToNote = async (tagId) => {
		await dispatch(addTag(tagId, noteId));
		setTagName('');
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
			<form id='edit-note-form' onSubmit={handleSubmit} onClick={() => setTagName('')}>
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
			</form>
			{savePrompt && (
				<div id='save-prompt' className='fade-in'>
					Note saved
				</div>
			)}
			<div id='tags-container'>
				{noteTags.map((tag) => (
					<p key={`note-tag-${tag.id}`} id='tag'>
						{tag.name}
					</p>
				))}
				<div id='add-tag'>
					{tagName.length > 0 && (
						<div id='add-tag-list' style={{ cursor: 'auto' }}>
							<p
								id='add-new-tag'
								style={{ cursor: 'pointer' }}
								onClick={createNewTag}
							>
								Create Tag{' '}
								{tagName.length > 10 ? `${tagName.slice(0, 10)}...` : tagName}
							</p>
							<ul id='select-tag' style={{ marginTop: '5px', cursor: 'pointer' }}>
								{filteredTags.map((tag) => (
									<li key={`tag-${tag.id}`} onClick={() => addTagToNote(tag.id)}>
										{tag.name.length > 10
											? `${tag.name.slice(0, 10)}...`
											: tag.name}
									</li>
								))}
							</ul>
						</div>
					)}
					<i className='fa-solid fa-tag' style={{ marginRight: '10px' }}></i>
					<input
						placeholder='Add Tag'
						style={{
							width: '75px',
							border: 'none',
							backgroundColor: 'transparent',
							color: 'white',
							height: '100%',
						}}
						value={tagName}
						onChange={(e) => setTagName(e.target.value)}
					/>
				</div>
			</div>
		</div>
	);
};

export default EditNote;
