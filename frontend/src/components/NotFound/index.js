import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
	return (
		<div id='not-found-container'>
			<h2>Not found</h2>
			<Link to='/'>Return</Link>
		</div>
	);
}

export default NotFound;
