import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotes, addNote } from '../../store/notes';
import { useShowHide } from '../../context/ShowHide';
import NoteNode from './NoteNode';
import './Notes.css';

function Notes() {
	const notes = useSelector((state) => state.notes.list);
	const user = useSelector((state) => state.session.user);
	const { activeNote, setActiveNote, expandNote } = useShowHide();
	const dispatch = useDispatch();
	const history = useHistory();

	const notesArr = Object.values(notes);

	const addNewNote = async (e) => {
		e.preventDefault();

		const newNote = await dispatch(addNote(user.id));
		dispatch(getNotes(user?.id));
		setActiveNote(newNote.id);
	};

	useEffect(() => {
		if (user === null) {
			history.push('/');
		}
	}, [user, history]);

	useEffect(() => {
		if (user) {
			dispatch(getNotes());
		}
	}, [dispatch, user]);

	useEffect(() => {
		setActiveNote(notes[0]?.id);
	}, [notes, setActiveNote]);

	if (expandNote) {
		document.querySelector('.notes-container')?.classList.add('hide-left');
	} else {
		document.querySelector('.notes-container')?.classList.remove('hide-left');
	}

	return (
		<div className='notes-container fade-in'>
			<h2 id='notes-header'>All notes</h2>

			<div className='notes-list'>
				{notesArr.map((note) => (
					<div
						id={`active-${note.id === activeNote}`}
						key={note.id}
						onClick={() => setActiveNote(note.id)}
					>
						{note.userId === user?.id && <NoteNode key={note.id} note={note} />}
					</div>
				))}
				{!notesArr.length && (
					<div id='add-note'>
						<img src='/images/quill-pen-graphic.png' alt='Add a note!' />
						<span onClick={addNewNote}>
							No notes available, click here to add one now!
						</span>
					</div>
				)}
				<div id='fade' />
			</div>
		</div>
	);
}

export default Notes;
