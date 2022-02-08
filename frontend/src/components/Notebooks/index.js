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
		if (user === null) {
			history.push('/');
		}
	}, [user, history]);

	useEffect(() => {
		if (user) {
			dispatch(getNotebooks(user?.id));
		}
	}, [dispatch, user]);

	return (
		<div className='notebooks-container'>
			<Link to='/client/notes'>Back to all notes</Link>
			<h2 id='notebooks-header'>Notebooks</h2>
			<div id='notebooks-table-container'>
				<div id='notebooks-table-pre-header'>
					<p>
						{notebooksArr.length
							? notebooksArr.length > 1
								? `${notebooksArr.length} notebooks`
								: `${notebooksArr.length} notebook`
							: 'No notebooks'}
					</p>
					<NotebookFormModal />
				</div>
				<div id='notebooks-table'>
					<tr id='table-header'>
						<th>Title</th>
						<th>Created by</th>
						<th>Updated</th>
						<th>Actions</th>
					</tr>
					{notebooksArr.map((notebook) => (
						<tr>
							<td>{notebook.title}</td>
							<td>{user.username}</td>
							<td>
								<ReactTimeAgo date={notebook.updatedAt} />
							</td>
							<td></td>
						</tr>
					))}
				</div>
			</div>
		</div>
	);
}

export default Notebooks;
