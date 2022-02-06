import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotes, addNote } from '../../store/notes';
import { useActiveNote } from '../../context/ActiveNote';
import NoteNode from './NoteNode';
import './Notes.css';

function Notes() {
	const notes = useSelector((state) => state.notes.list);
	const user = useSelector((state) => state.session.user);
	const { activeNote, setActiveNote } = useActiveNote();
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
			dispatch(getNotes(user?.id));
		}
	}, [dispatch, user]);

	useEffect(() => {
		setActiveNote(notes[0]?.id);
	}, [notes, setActiveNote]);

	return (
		<div className='notes-container'>
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
					<div id='note' className='add-note' onClick={addNewNote}>
						<span>No notes available, click here to add one now!</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default Notes;
