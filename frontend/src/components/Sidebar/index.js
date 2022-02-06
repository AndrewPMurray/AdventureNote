import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Sidebar.css';
import { useShowHide } from '../../context/ShowHide';

function Sidebar({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);
	const { expandNote } = useShowHide();

	const profileButton = sessionUser ? <ProfileButton user={sessionUser} /> : null;

	return (
		!expandNote && (
			<div className='sidebar-container'>
				<ul className='sidebar'>
					<li>{isLoaded && profileButton}</li>
				</ul>
			</div>
		)
	);
}

export default Sidebar;
