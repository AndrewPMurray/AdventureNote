import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Landing() {
	const user = useSelector((state) => state.session.user);
	const history = useHistory();

	useEffect(() => {
		if (user !== null) {
			history.push('/client');
		}
	}, [user]);

	return (
		<>
			<h2>Landing placeholder</h2>
		</>
	);
}

export default Landing;
