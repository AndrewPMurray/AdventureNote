import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotes, addNote } from '../../store/notes';
import NoteNode from './NoteNode';
import './ClientLanding.css';

function ClientLanding() {
	const notes = useSelector((state) => state.notes);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const notesArr = Object.values(notes);
	console.log(notesArr);

	useEffect(() => {
		if (user === null) {
			history.push('/');
		}
	}, [user]);

	useEffect(() => {
		dispatch(getNotes(user?.id));
	}, [dispatch]);

	const addNewNote = async (e) => {
		e.preventDefault();

		const newNote = await dispatch(addNote(user.id));
		return history.push(`/notes/${newNote.id}`);
	};

	return (
		<div className='notes-container'>
			<h2>All notes</h2>
			{!notesArr.length && <span>No notes available</span>}

			<div className='notes-list'>
				{notesArr.map((note) => note.userId === user?.id && <NoteNode note={note} />)}
				<div id='note' onClick={addNewNote}>
					<p>Add a new note</p>
				</div>
			</div>
		</div>
	);
}

export default ClientLanding;
