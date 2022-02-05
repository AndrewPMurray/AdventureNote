import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// components
import Navigation from './components/Navigation';
import Landing from './components/Landing';
import NotesList from './components/Notes';

// utils
import * as sessionActions from './store/session';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	return (
		<>
			<Navigation isLoaded={isLoaded} />
			{isLoaded && (
				<Switch>
					<Route exact path='/'>
						<Landing />
					</Route>
					<Route path='/client'>
						<NotesList />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
