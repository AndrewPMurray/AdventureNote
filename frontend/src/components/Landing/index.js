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
	}, [user, history, setActiveNote]);

	return (
		<div id='landing-container'>
			<h2>Conquer Your Cluttered Quests</h2>
			<h3>
				Remember every NPC, interaction, and spell with all of your notes organized in one
				place.
			</h3>
			<SignupForm />
		</div>
	);
}

export default Landing;
