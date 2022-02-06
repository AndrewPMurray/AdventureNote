import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getNotes } from '../../store/notes';
import NodeNode from './NoteNode';
import './ClientLanding.css';

function NoteNode({ note }) {
	return (
		<div id='note' key={note.id}>
			<p>Name: {note.name}</p>
			<p>Content: {note.content}</p>
			<p>Created: {note.createdAt}</p>
		</div>
	);
}

export default NoteNode;
