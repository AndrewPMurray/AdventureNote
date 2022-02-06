import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import '../LoginSignupForm.css';

const LoginForm = () => {
	const dispatch = useDispatch();
	const [credential, setCredential] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState({});

	const handleSubmit = (e) => {
		e.preventDefault();
		setErrors({});
		return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
			const data = await res.json();
			if (data && data.errors) setErrors(data.errors);
		});
	};

	return (
		<div className='login-signup-form-container'>
			<img src='/images/quill-pen-graphic-colorized.png' />
			{errors.invalid && <li id='errors'>{errors.invalid}</li>}
			<h2>Login</h2>
			<form className='login-signup-form' onSubmit={handleSubmit}>
				<div className='form-field'>
					<input
						type='text'
						value={credential}
						onChange={(e) => setCredential(e.target.value)}
						placeholder='Email or Username'
					/>
					{errors.credential && <li id='errors'>{errors.credential}</li>}
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
				<button className='login-signup-button' type='submit'>
					Log In
				</button>
			</form>
		</div>
	);
};

export default LoginForm;
