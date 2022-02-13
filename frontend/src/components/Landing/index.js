import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useShowHide } from '../../context/ShowHide';

import SignupForm from '../SignupFormModal';
import './Landing.css';

function Landing() {
	const user = useSelector((state) => state.session.user);
	const history = useHistory();
	const { setActiveNote } = useShowHide();

	useEffect(() => {
		if (user !== null) {
			history.push('/client/notes');
		}
		setActiveNote(null);
		document.body.style.backgroundColor = 'white';

		return () => (document.body.style.backgroundColor = '');
	}, [user, history, setActiveNote]);

	return (
		<div id='landing-container'>
			<h2>Conquer Your Cluttered Quests</h2>
			<h3>
				Remember every NPC, interaction, and spell with all of your notes organized in one
				place.
			</h3>
			<SignupForm />
			<div id='footer'>
				<a href='https://www.linkedin.com/in/andrew-murray-304b39231/'>
					<i className='fab fa-linkedin'></i>
				</a>
				<a href='https://github.com/andrewpmurray'>
					<i className='fab fa-github'></i>
				</a>
			</div>
		</div>
	);
}

export default Landing;
