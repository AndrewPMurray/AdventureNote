import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotes } from '../../store/notes';

function NotesList() {
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

	return (
		<>
			<h2>All notes</h2>
			{!notesArr.length && <span>No notes available</span>}
			<div className='notes-container'>
				<ul className='notes-list'>
					{notesArr.map(
						(note) =>
							note.userId === user?.id && (
								<div key={note.id}>
									<p>Name: {note.name}</p>
									<p>Content: {note.content}</p>
									<p>Created: {note.createdAt}</p>
								</div>
							)
					)}
				</ul>
			</div>
		</>
	);
}

export default NotesList;
