import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getNotes, addNote } from '../../store/notes';
import { getNotebooks } from '../../store/notebooks';
import { useShowHide } from '../../context/ShowHide';
import NoteNode from './NoteNode';
import './NotebookNotes.css';

function NotebookNotes() {
	const notebookId = useParams().notebookId;
	const notebook = useSelector((state) => state.notebooks[notebookId]);
	const notes = useSelector((state) => state.notes);
	const user = useSelector((state) => state.session.user);
	const { activeNote, setActiveNote, expandNote } = useShowHide();
	const dispatch = useDispatch();
	const history = useHistory();

	const notebookNotesArr = notes?.list?.filter((note) => note?.notebookId === +notebookId);

	const addNewNote = async (e) => {
		e.preventDefault();

		const newNote = await dispatch(
			addNote({
				userId: user.id,
				notebookId,
			})
		);
		dispatch(getNotes(user?.id));
		setActiveNote(newNote);
	};

	useEffect(() => {
		if (user === null) {
			history.push('/');
		}
	}, [user, history]);

	useEffect(() => {
		if (user) {
			dispatch(getNotes());
			dispatch(getNotebooks());
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (
			notes[activeNote?.id]?.id === activeNote?.id &&
			notebookNotesArr.includes(notes[activeNote?.id])
		) {
			setActiveNote(notes[activeNote?.id]);
		} else setActiveNote(notebookNotesArr[0] || null);
	}, [notebookNotesArr, setActiveNote, activeNote, notes]);

	return (
		<div
			className='notes-container fade-in'
			style={
				expandNote ? { minWidth: 0, maxWidth: 0 } : { minWidth: '400px', maxWidth: '400px' }
			}
		>
			<h2 id='notes-header'>{notebook?.title}</h2>

			<div className='notes-list'>
				{notebookNotesArr.map((note) => (
					<div
						id={`active-${note.id === activeNote?.id}`}
						key={note.id}
						onClick={() => setActiveNote(note)}
					>
						{note.userId === user?.id && <NoteNode key={note.id} note={note} />}
					</div>
				))}
				{!notebookNotesArr.length && (
					<div id='add-note'>
						<img src='/images/quill-pen-graphic.png' alt='Add a note!' />
						<span onClick={addNewNote}>
							No notes in this notebook, click here to add one now!
						</span>
					</div>
				)}
				<div id='fade' />
			</div>
		</div>
	);
}

export default NotebookNotes;
