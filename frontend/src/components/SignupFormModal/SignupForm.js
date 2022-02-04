import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import * as sessionActions from '../../store/session';
import '../LoginSignupForm.css';

const SignupFormPage = () => {
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
			<form className='login-signup-form' onSubmit={handleSubmit}>
				<ul>
					{errors.map((error, i) => (
						<li key={i}>{error}</li>
					))}
				</ul>
				<label>
					Email
					<input
						type='text'
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
				</label>
				<label>
					Username
					<input
						type='text'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</label>
				<label>
					Password
					<input
						type='password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</label>
				<label>
					Confirm Password
					<input
						type='password'
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
					/>
				</label>
				<button className='login-signup-button' type='submit'>
					Sign Up
				</button>
			</form>
		</div>
	);
};

export default SignupFormPage;
