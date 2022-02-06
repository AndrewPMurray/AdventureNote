import './Notes.css';

function NoteNode({ note }) {
	return (
		<div id='note' key={note.id}>
			<p>Name: {note.name ? note.name : 'Untitled'}</p>
			<p>Content: {note.content}</p>
			<p>Created: {note.createdAt}</p>
		</div>
	);
}

export default NoteNode;
