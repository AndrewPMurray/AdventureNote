import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotes, addNote } from '../../store/notes';
import NoteNode from './NoteNode';
import './Notes.css';

function Notes() {
	const notes = useSelector((state) => state.notes.list);
	const user = useSelector((state) => state.session.user);
	const [activeNote, setActiveNote] = useState(notes[0]?.id);
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
	}, [user]);

	useEffect(() => {
		dispatch(getNotes(user?.id));
	}, [dispatch]);

	useEffect(() => {
		setActiveNote(notes[0]?.id);
	}, [notes]);

	return (
		<div className='notes-container'>
			<h2>All notes</h2>

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
				<div id='note' className='add-note' onClick={addNewNote}>
					{!notesArr.length ? (
						<span>No notes available, click here to add one now!</span>
					) : (
						<span>Add a new note</span>
					)}
				</div>
			</div>
		</div>
	);
}

export default Notes;
