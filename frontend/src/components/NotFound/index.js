import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
	useEffect(() => {
		document.body.style.backgroundColor = 'black';

		return () => (document.body.style.backgroundColor = '');
	});
	return (
		<>
			<div id='not-found-container'>
				<img src='/images/trogdor.png' />
				<h2>There be dragons here</h2>
				<p>and it looks like it burninated your page...</p>
				<Link to='/'>Return</Link>
			</div>
		</>
	);
}

export default NotFound;
