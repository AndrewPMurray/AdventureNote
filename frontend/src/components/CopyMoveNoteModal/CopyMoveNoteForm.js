import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editNote, getNotes } from '../../store/notes';
import { getNotebooks } from '../../store/notebooks';
import './CopyMoveNoteForm.css';

const CopyMoveNoteForm = ({ setShowModal, note }) => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.session.user);
	const notebooks = useSelector((state) => state.notebooks);

	const notebooksArr = Object.values(notebooks);
	const [notebookId, setNotebookId] = useState('');

	useEffect(() => {
		if (notebooks) {
			const notebooksArr = Object.values(notebooks);
			setNotebookId(notebooksArr[0]?.id);
		}
	}, [notebooks, setNotebookId]);

	useEffect(() => {
		if (user) {
			dispatch(getNotebooks(user?.id));
		}
	}, [dispatch, user]);

	const handleMove = async (e) => {
		e.preventDefault();
		console.log(note);

		await dispatch(
			editNote({
				id: note.id,
				name: note.name,
				content: note.content,
				notebookId: notebookId,
			})
		);
		dispatch(getNotes(user.id));
	};

	return (
		<div className='copy-move-note-container'>
			<div>
				<h2>Copy or move note</h2>
				<p>
					Please choose a notebook to move your note. You may also copy the note if you
					want to keep it in more than one place.
				</p>
			</div>
			<form className='notebooks-list' onSubmit={handleMove}>
				<div className='form-field'>
					<label htmlFor='notebooks'>Choose notebook</label>
					<select
						name='notebooks'
						id='notebook-selection-list'
						type='text'
						value={notebookId}
						onChange={(e) => setNotebookId(e.target.value)}
						placeholder='Notebook Title'
					>
						{notebooksArr.map((notebook) => (
							<option key={notebook.id} value={notebook.id}>
								{notebook.title}
							</option>
						))}
					</select>
				</div>
				<div id='copy-move-button-container'>
					<div id='move-note-button'>
						<button
							type='submit'
							disabled={notebookId?.length === 0}
							onClick={() => setTimeout(() => setShowModal(false), 100)}
						>
							Move
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CopyMoveNoteForm;
