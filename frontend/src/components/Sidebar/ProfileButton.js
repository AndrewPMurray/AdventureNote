import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as sessionActions from '../../store/session';
import './Sidebar.css';

function ProfileButton({ user }) {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = () => {
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	const logout = (e) => {
		e.preventDefault();
		dispatch(sessionActions.logout());
	};

	return (
		<>
			<div className='profile-dropdown'>
				<button className='sidebar-user-button' onClick={openMenu}>
					<i className='fas fa-user-circle' />
					<h3 id='sidebar-username'>{user.username}</h3>
				</button>
				{showMenu && (
					<ul className='profile-items'>
						<li>{user.username}</li>
						<li>{user.email}</li>
						<button id='sidebar-link' onClick={logout}>
							Log Out
						</button>
					</ul>
				)}
			</div>
		</>
	);
}

export default ProfileButton;
