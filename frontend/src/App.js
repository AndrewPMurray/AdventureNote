import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

// components
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import Landing from './components/Landing';
import Notes from './components/Notes';
import EditNote from './components/EditNote';
import Notebooks from './components/Notebooks';

// Utils & contexts as needed
import * as sessionActions from './store/session';
import { useShowHide } from './context/ShowHide';

function App() {
	const { activeNote } = useShowHide();
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	if (!user) {
		document.body.style.backgroundColor = 'white';
	} else {
		document.body.style.backgroundColor = '';
	}

	return (
		<>
			{isLoaded && (
				<Switch>
					<Route exact path='/'>
						<Navigation isLoaded={isLoaded} />
						<Landing />
					</Route>
					<Route path='/client/notes'>
						<div id='client-landing-container'>
							<Sidebar isLoaded={isLoaded} />
							<Notes />
							<EditNote activeNote={activeNote} />
						</div>
					</Route>
					<Route exact path='/client/notebooks'>
						<div id='client-landing-container'>
							<Sidebar isLoaded={isLoaded} />
							<Notebooks />
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
