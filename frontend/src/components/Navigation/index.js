import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	const profileButton = sessionUser ? <ProfileButton user={sessionUser} /> : null;
	const signupLinks = sessionUser ? null : (
		<div className='nav-login-signup-links'>
			<LoginFormModal />
			<SignupFormModal />
		</div>
	);

	return (
		<div className='nav-container'>
			<ul className='nav'>
				<li>
					{isLoaded && profileButton}
					<NavLink className='nav-link' exact to='/'>
						Home
					</NavLink>
				</li>
				<li>{isLoaded && signupLinks}</li>
			</ul>
		</div>
	);
}

export default Navigation;
