import ReactTimeAgo from 'react-time-ago';
import './Notes.css';

function NoteNode({ note }) {
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
				{note?.content?.length > 30 ? `${note.content?.slice(0, 90)}...` : note?.content}
			</p>
			<p id='note-updated-at'>
				Updated <ReactTimeAgo date={note?.updatedAt} />
			</p>
		</div>
	);
}

export default NoteNode;
