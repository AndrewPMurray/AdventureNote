import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

import './index.css';
import App from './App';
import { ModalProvider } from './context/Modal';
import ShowHideProvider from './context/ShowHide';
import { restoreCSRF, csrfFetch } from './store/csrf';

import store from './store';
import * as sessionActions from './store/session';

import './index.css';

TimeAgo.addDefaultLocale(en);

if (process.env.NODE_ENV !== 'production') {
	restoreCSRF();

	window.csrfFetch = csrfFetch;
	window.store = store;
	window.sessionActions = sessionActions;
} else if (window.location.protocol === 'http:') {
	window.location.href = window.location.href.replace('http:', 'https:');
}

function Root() {
	return (
		<Provider store={store}>
			<ShowHideProvider>
				<ModalProvider>
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</ModalProvider>
			</ShowHideProvider>
		</Provider>
	);
}

ReactDOM.render(
	<React.StrictMode>
		<Root />
	</React.StrictMode>,
	document.getElementById('root')
);
