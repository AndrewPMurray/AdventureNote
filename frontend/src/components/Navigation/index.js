import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	const signupLinks = sessionUser ? null : (
		<div className='nav-login-signup-links'>
			<LoginFormModal />
		</div>
	);

	return (
		<div className='nav-container'>
			<ul className='nav'>
				<NavLink to='/'>
					<img src='/images/quill-pen-graphic-colorized.png' />
					<h1>AdventureNote</h1>
				</NavLink>
				<li>{isLoaded && signupLinks}</li>
			</ul>
		</div>
	);
}

export default Navigation;
