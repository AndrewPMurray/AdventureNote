import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	const loginLink = sessionUser ? null : (
		<div className='nav-login-signup-links'>
			<LoginFormModal />
		</div>
	);

	return (
		<div className='nav-container'>
			<ul className='nav'>
				<NavLink to='/'>
					<img src='/images/quill-pen-graphic-colorized.png' alt='feather-logo' />
					<h1>AdventureNote</h1>
				</NavLink>
				<li>{isLoaded && loginLink}</li>
			</ul>
		</div>
	);
}

export default Navigation;
