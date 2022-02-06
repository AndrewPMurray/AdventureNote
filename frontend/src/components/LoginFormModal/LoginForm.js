import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import '../LoginSignupForm.css';

const LoginForm = () => {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors([]);
		return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
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
					value={credential}
					onChange={(e) => setCredential(e.target.value)}
					placeholder='Username or Email'
				/>
				<input
					type='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					placeholder='Password'
				/>
				<button className='login-signup-button' type='submit'>
					Log In
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
