import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getNotes, addNote } from '../../store/notes';
import { useShowHide } from '../../context/ShowHide';
import NoteNode from '../Notes/NoteNode';
import './TagNotes.css';
import { addTag } from '../../store/tags';

function TagNotes() {
	const { tagId } = useParams();
	const tag = useSelector((state) => state.tags[tagId]);
	const notes = useSelector((state) => state.notes);
	const user = useSelector((state) => state.session.user);
	const { activeNote, setActiveNote, expandNote } = useShowHide();
	const dispatch = useDispatch();
	const history = useHistory();

	const tagNotesArr = notes?.list?.filter((note) => {
		let hasTag = false;
		note.NoteTags.every((noteTag) => {
			if (noteTag.id === +tagId) {
				hasTag = true;
				return false;
			}
			return true;
		});
		if (hasTag) return true;
		return false;
	});

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
		if (
			notes[activeNote?.id]?.id === activeNote?.id &&
			tagNotesArr.includes(notes[activeNote?.id])
		) {
			setActiveNote(notes[activeNote?.id]);
		} else setActiveNote(tagNotesArr[0] || null);
	}, [tagNotesArr, setActiveNote, activeNote, notes]);

	const addNewNote = async (e) => {
		e.preventDefault();

		const newNote = await dispatch(
			addNote({
				userId: user.id,
				notebookId: null,
			})
		);
		await dispatch(addTag(tagId, newNote.id));
		setActiveNote(newNote);
	};

	return (
		<div
			className='notes-container fade-in'
			style={
				expandNote ? { minWidth: 0, maxWidth: 0 } : { minWidth: '400px', maxWidth: '400px' }
			}
		>
			<h2 id='notes-header'>Tag: {tag?.name}</h2>

			<div className='notes-list'>
				{tagNotesArr.map((note) => (
					<div
						id={`active-${note.id === activeNote?.id}`}
						key={note.id}
						onClick={() => setActiveNote(note)}
					>
						{note.userId === user?.id && <NoteNode key={note.id} note={note} />}
					</div>
				))}
				{!tagNotesArr.length && (
					<div id='add-note'>
						<img src='/images/quill-pen-graphic.png' alt='Add a note!' />
						<span onClick={addNewNote}>
							No notes associated with this tag, click here to add one now!
						</span>
					</div>
				)}
				<div id='fade' />
			</div>
		</div>
	);
}

export default TagNotes;
