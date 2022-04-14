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
import NotebookNotes from './components/NotebookNotes';
import NotFound from './components/NotFound';

// Utils & contexts as needed
import * as sessionActions from './store/session';
import TagNotes from './components/TagNotes';

function App() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);
	const user = useSelector((state) => state.session.user);

	useEffect(() => {
		dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
	}, [dispatch]);

	if (!user) {
		document.body.style.backgroundColor = 'white';
	} else {
		document.body.style.backgroundColor = 'black';
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
							<EditNote />
						</div>
					</Route>
					<Route exact path='/client/notebooks'>
						<div id='client-landing-container'>
							<Sidebar isLoaded={isLoaded} />
							<Notebooks />
						</div>
					</Route>
					<Route path='/client/notebooks/:notebookId'>
						<div id='client-landing-container'>
							<Sidebar isLoaded={isLoaded} />
							<NotebookNotes />
							<EditNote />
						</div>
					</Route>
					<Route path='/client/tags/:tagId'>
						<div id='client-landing-container'>
							<Sidebar isLoaded={isLoaded} />
							<TagNotes />
							<EditNote />
						</div>
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			)}
		</>
	);
}

export default App;
