import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import '../LoginSignupForm.css';

const SignupForm = () => {
	const dispatch = useDispatch();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			setErrors([]);
			return dispatch(sessionActions.signup({ email, username, password })).catch(
				async (res) => {
					const data = await res.json();
					if (data && data.errors) setErrors(data.errors);
				}
			);
		}
		return setErrors(['Password and Confirm Password did not match']);
	};

	return (
		<div className='login-signup-form-container'>
			<ul id='errors'>
				{errors.map((error, i) => (
					<li key={i}>{error}</li>
				))}
			</ul>
			<form className='login-signup-form' onSubmit={handleSubmit}>
				<input
					type='text'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					placeholder='Email'
				/>
				<input
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					placeholder='Username'
				/>
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
				/>
				<input
					type='password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					placeholder='Confirm Password'
				/>
				<button className='login-signup-button' type='submit'>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupForm;
