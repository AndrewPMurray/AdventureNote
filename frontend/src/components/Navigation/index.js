import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector((state) => state.session.user);

	let sessionLinks;
	if (sessionUser) {
		sessionLinks = <ProfileButton user={sessionUser} />;
	} else {
		sessionLinks = (
			<div className='nav-login-signup-links'>
				<NavLink className='nav-link' to='/login'>
					Log In
				</NavLink>
				<NavLink className='nav-link' to='/signup'>
					Sign Up
				</NavLink>
			</div>
		);
	}

	return (
		<div className='nav-container'>
			<ul className='nav'>
				<li>
					<NavLink className='nav-link' exact to='/'>
						Home
					</NavLink>
				</li>
				<li>{isLoaded && sessionLinks}</li>
			</ul>
		</div>
	);
}

export default Navigation;
