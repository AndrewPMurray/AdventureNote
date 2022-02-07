import './Notes.css';

function NoteNode({ note }) {
	return (
		<div id='note' key={note.id}>
			<p>
				Name:{' '}
				{note.name
					? note.name.length > 30
						? `${note.name.slice(0, 30)}...`
						: note.name
					: 'Untitled'}
			</p>
			<p>
				Content:{' '}
				{note?.content?.length > 30 ? `${note.content?.slice(0, 90)}...` : note?.content}
			</p>
			<p>Updated: {note?.updatedAt}</p>
		</div>
	);
}

export default NoteNode;
