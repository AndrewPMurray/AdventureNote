import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// components
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Landing from './components/Landing';
import ClientLanding from './components/ClientLanding';

// utils
import * as sessionActions from './store/session';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);

	if (!user) {
		document.body.style.backgroundColor = 'white';
	} else {
		document.body.style.backgroundColor = '';
	}

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			{isLoaded && (
				<Switch>
					<Route exact path='/'>
						<Navigation isLoaded={isLoaded} />
						<Landing />
					</Route>
					<Route path='/client'>
						<div id='client-landing-container'>
							<Sidebar isLoaded={isLoaded} />
							<ClientLanding />
						</div>
					</Route>
					<Route>
						<h2>Not Found</h2>
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
