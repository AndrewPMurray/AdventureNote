import React from 'react';
import { Route, Switch } from 'react-router-dom';

//components
import LoginFormPage from './components/LoginFormPage';

function App() {
	return (
		<Switch>
			<Route path='/login'>
				<LoginFormPage />
			</Route>
		</Switch>
	);
}

export default App;
