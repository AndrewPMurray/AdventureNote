import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Sidebar.css';
import { useShowHide } from '../../context/ShowHide';
import { addNote, getNotes } from '../../store/notes';
import { Link, useHistory } from 'react-router-dom';

function Sidebar({ isLoaded }) {
	const user = useSelector((state) => state.session.user);
	const { expandNote, setActiveNote } = useShowHide();
	const dispatch = useDispatch();
	const history = useHistory();

	const addNewNote = async (e) => {
		e.preventDefault();

		const newNote = await dispatch(addNote(user.id));
		dispatch(getNotes(user?.id));
		setActiveNote(newNote.id);
		history.push('/client/notes');
	};

	const profileButton = user ? <ProfileButton user={user} /> : null;

	return (
		!expandNote && (
			<div className='sidebar-container slide-from-offscreen'>
				<ul className='sidebar'>
					<li>{isLoaded && profileButton}</li>
					<div id='sidebar-menu-items'>
						<button id='add-note-button' onClick={addNewNote}>
							<i className='fas fa-plus' style={{ paddingRight: '10px' }}></i>
							Add Note
						</button>
						<Link to='/client/notebooks'>
							<button id='notebooks-button'>
								<i
									className='fas fa-book-open'
									style={{ paddingRight: '10px' }}
								></i>
								Notebooks
							</button>
						</Link>
					</div>
				</ul>
			</div>
		)
	);
}

export default Sidebar;
