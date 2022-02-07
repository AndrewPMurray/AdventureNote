import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { getNotes, addNote } from '../../store/notes';
import './Notebooks.css';

function Notebooks() {
	const notebooks = useSelector((state) => state.notebooks);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const addNotebook = () => {};

	return (
		<div className='notebooks-container'>
			<Link to='/client/notes'>Back to all notes</Link>
			<h2 id='notebooks-header'>Notebooks</h2>
			<div id='notebooks-table-container'>
				<div id='notebooks-table-pre-header'>
					<p>No notebooks</p>
					<button id='new-notebook-button'>
						<i className='fas fa-plus-square' style={{ paddingRight: '10px' }}></i>
						New Notebook
					</button>
				</div>
				<div id='notebooks-table'>
					<tr id='table-header'>
						<th>Title</th>
						<th>Created by</th>
						<th>Updated</th>
						<th>Actions</th>
					</tr>
					<tr>
						<td>data</td>
						<td>data</td>
						<td>data</td>
						<td>data</td>
					</tr>
				</div>
			</div>
		</div>
	);
}

export default Notebooks;
