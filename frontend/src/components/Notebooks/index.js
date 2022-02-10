import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';
import { deleteNotebook, getNotebooks } from '../../store/notebooks';
import NotebookFormModal from '../NotebookFormModal';
import EditNotebookFormModal from '../EditNotebookFormModal';
import DeleteNotebookModal from '../DeleteNotebookModal';
import './Notebooks.css';

function Notebooks() {
	const [menuId, setMenuId] = useState(null);
	const notebooks = useSelector((state) => state.notebooks);
	const user = useSelector((state) => state.session.user);
	const dispatch = useDispatch();
	const history = useHistory();

	const notebooksArr = Object.values(notebooks);

	useEffect(() => {
		if (!menuId) return;

		const closeMenu = (e) => {
			if (e.target === document.querySelector('#edit-notebook-text')) return;
			if (e.target === document.querySelector('#delete-notebook-text')) return;
			setMenuId(null);
		};

		document.querySelector('.notebooks-container').addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [menuId]);

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
		<div className='notebooks-container fade-in'>
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
						<tr key={notebook.id} id='table-body'>
							<td>
								<Link to={`/client/notebooks/${notebook.id}`}>
									{notebook.title.length > 30
										? `${notebook.title.slice(0, 25)}...`
										: notebook.title}
								</Link>
							</td>
							<td>{user?.username}</td>
							<td>
								<ReactTimeAgo date={Date.parse(notebook.updatedAt)} />
							</td>
							<td>
								<p id='notebook-menu-icon' onClick={() => setMenuId(notebook.id)}>
									<i
										className='fas fa-ellipsis-v'
										style={{ width: '40px', textAlign: 'center' }}
									></i>
								</p>
								{menuId === notebook.id && (
									<ul className='notebook-menu-items fade-in'>
										<EditNotebookFormModal
											title={notebook.title}
											id={notebook.id}
											setMenuId={setMenuId}
										/>
										<DeleteNotebookModal notebook={notebook} />
									</ul>
								)}
							</td>
						</tr>
					</tbody>
				))}
			</table>
		</div>
	);
}

export default Notebooks;
