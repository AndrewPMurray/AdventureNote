import React from 'react';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Sidebar.css';

function Sidebar({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	const profileButton = sessionUser ? <ProfileButton user={sessionUser} /> : null;

	return (
		<div className='sidebar-container'>
			<ul className='sidebar'>
				<li>{isLoaded && profileButton}</li>
			</ul>
		</div>
	);
}

export default Sidebar;
