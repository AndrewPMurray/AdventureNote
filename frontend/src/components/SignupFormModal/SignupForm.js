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
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(
			sessionActions.signup({ email, username, password, confirmPassword })
		).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	return (
		<div className='login-signup-form-container'>
			<img src='/images/quill-pen-graphic-colorized.png' />
			<h2>Sign up here to begin using AdventureNote</h2>
			<form className='login-signup-form' onSubmit={handleSubmit}>
				<div className='form-field'>
					<input
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder='Email'
					/>
					{errors.email && <li id='errors'>{errors.email}</li>}
				</div>
				<div className='form-field'>
					<input
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						placeholder='Username'
					/>
					{errors.username && <li id='errors'>{errors.username}</li>}
				</div>
				<div className='form-field'>
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder='Password'
					/>
					{errors.password && <li id='errors'>{errors.password}</li>}
				</div>
				<div className='form-field'>
					<input
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						placeholder='Confirm Password'
					/>
					{errors.confirmPassword && <li id='errors'>{errors.confirmPassword}</li>}
				</div>
				<button className='login-signup-button' type='submit'>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupForm;
