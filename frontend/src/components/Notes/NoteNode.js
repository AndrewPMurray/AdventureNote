import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import './Notes.css';
import { getNotebooks } from '../../store/notebooks';

function NoteNode({ note }) {
	const notebooks = useSelector((state) => state.notebooks);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getNotebooks(note.userId));
	}, [dispatch]);

	return (
		<div id='note' key={note.id}>
			<p id='note-title'>
				{note.name
					? note.name.length > 30
						? `${note.name.slice(0, 30)}...`
						: note.name
					: 'Untitled'}
			</p>
			<p id='note-content'>
				{note?.content?.length > 90 ? `${note.content?.slice(0, 90)}...` : note?.content}
			</p>
			{note?.notebookId && (
				<p id='notebook'>
					In Notebook:{' '}
					<Link to={`/client/notebooks/${note.notebookId}`}>
						{notebooks[note.notebookId]?.title.length > 25
							? `${notebooks[note.notebookId]?.title.slice(0, 25)}...`
							: notebooks[note.notebookId]?.title}
					</Link>
				</p>
			)}

			<p id='note-updated-at'>
				{note.createdAt === note.updatedAt ? 'Created' : 'Updated'}{' '}
				<ReactTimeAgo date={Date.parse(note?.updatedAt)} />
			</p>
		</div>
	);
}

export default NoteNode;
