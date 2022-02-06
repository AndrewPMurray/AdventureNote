import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotes, addNote } from '../../store/notes';
import NoteNode from './NoteNode';
import './Notes.css';

function Notes() {
	const notes = useSelector((state) => state.notes.list);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const notesArr = Object.values(notes);

	const addNewNote = async (e) => {
		e.preventDefault();

		const newNote = await dispatch(addNote(user.id));
		dispatch(getNotes(user?.id));
	};

	useEffect(() => {
		if (user === null) {
			history.push('/');
		}
	}, [user]);

	useEffect(() => {
		dispatch(getNotes(user?.id));
	}, [dispatch]);

	return (
		<div className='notes-container'>
			<h2>All notes</h2>
			{!notesArr.length && <span>No notes available</span>}

			<div className='notes-list'>
				{notesArr.map(
					(note) => note.userId === user?.id && <NoteNode key={note.id} note={note} />
				)}
				<div id='note' onClick={addNewNote}>
					<p>Add a new note</p>
				</div>
			</div>
		</div>
	);
}

export default Notes;
