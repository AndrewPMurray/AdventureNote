import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import Search from './Search';
import './Sidebar.css';
import { useShowHide } from '../../context/ShowHide';
import { addNote, getNotes } from '../../store/notes';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useEffect } from 'react';

function Sidebar({ isLoaded }) {
	const user = useSelector((state) => state.session.user);
	const [hover, setHover] = useState(null);
	const { expandNote, setActiveNote } = useShowHide();
	const dispatch = useDispatch();
	const history = useHistory();
	const { notebookId } = useParams();

	const addNewNote = async (e) => {
		e.preventDefault();

		const newNote = await dispatch(
			addNote({
				userId: user.id,
				notebookId: notebookId || null,
			})
		);
		dispatch(getNotes(user?.id));
		setActiveNote(newNote);
		console.log(newNote);
		if (!notebookId || history.location.pathname.includes('notes'))
			history.push('/client/notes');
	};

	useEffect(() => {
		if (!document.querySelector('.edit-note')) {
			document.querySelector('#client-landing-container').style.justifyContent = 'flex-start';
		} else {
			document.querySelector('#client-landing-container').style.justifyContent = 'flex-end';
		}
		if (expandNote) {
			document.querySelector('.sidebar-container')?.classList.add('hide-left');
		} else {
			document.querySelector('.sidebar-container')?.classList.remove('hide-left');
		}
	});

	const profileButton = user ? <ProfileButton user={user} /> : null;

	return (
		<div className='sidebar-container fade-in'>
			<ul className='sidebar'>
				<li>{isLoaded && profileButton}</li>
				<li id='sidebar-menu-items'>
					{isLoaded && <Search />}
					<button
						id='notes-button'
						onMouseEnter={(e) => setHover(e.target)}
						onMouseLeave={(e) => setHover(null)}
					>
						<Link to='/client/notes'>
							<i className='fas fa-sticky-note' style={{ paddingRight: '10px' }}></i>
							Notes
						</Link>
						{hover === document.querySelector('#notes-button') && (
							<i
								className='fas fa-plus fade-in'
								style={{ paddingRight: '10px' }}
								onClick={addNewNote}
							></i>
						)}
					</button>
					<button id='notebooks-button'>
						<Link to='/client/notebooks'>
							<i className='fas fa-book-open' style={{ paddingRight: '10px' }}></i>
							Notebooks
						</Link>
					</button>
				</li>
			</ul>
		</div>
	);
}

export default Sidebar;
