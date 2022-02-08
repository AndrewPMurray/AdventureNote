import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { getNotebooks } from '../../store/notebooks';
import NotebookFormModal from '../NotebookFormModal';
import './Notebooks.css';

function Notebooks() {
	const notebooks = useSelector((state) => state.notebooks);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const notebooksArr = Object.values(notebooks);

	useEffect(() => {
		if (user) {
			dispatch(getNotebooks(user?.id));
		}
	}, [dispatch, user]);

	useEffect(() => {
		if (user === null) {
			history.push('/client/notes');
		}
	}, [user, history]);

	return (
		<div className='notebooks-container'>
			<Link to='/client/notes'>Back to all notes</Link>
			<h2 id='notebooks-header'>Notebooks</h2>
			<div id='notebooks-table-pre-header'>
				<p>
					{notebooksArr.length
						? notebooksArr.length > 1
							? `${notebooksArr.length} notebooks`
							: `1 notebook`
						: 'No notebooks'}
				</p>
				<NotebookFormModal />
			</div>
			<table id='notebooks-table'>
				<thead>
					<tr id='table-header'>
						<th>Title</th>
						<th>Created by</th>
						<th>Updated</th>
						<th>Actions</th>
					</tr>
				</thead>
				{notebooksArr.map((notebook) => (
					<tbody key={notebook.id}>
						<tr id='table-body'>
							<td>
								<Link to={`/client/notebooks/${notebook.id}`}>
									{notebook.title}
								</Link>
							</td>
							<td>{user?.username}</td>
							<td>
								<ReactTimeAgo date={Date.parse(notebook.updatedAt)} />
							</td>
							<td></td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
}

export default Notebooks;
