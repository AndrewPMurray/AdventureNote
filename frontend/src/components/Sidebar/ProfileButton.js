import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
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
					<ul className='profile-items fade-in'>
						<li>
							Account
							<div id='profile-dropdown-user-info'>
								<div>{user.username}</div>
								<div>{user.email}</div>
							</div>
						</li>
						<li>
							<button id='sidebar-link' onClick={logout}>
								Log Out
							</button>
						</li>
					</ul>
				)}
			</div>
		</>
	);
}

export default ProfileButton;
