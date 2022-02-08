import { csrfFetch } from './csrf';

const LOAD_NOTEBOOKS = 'notebooks/LOAD_NOTEBOOKS';
const ADD_NOTEBOOK = 'notebooks/ADD_NOTEBOOK';
const REMOVE_NOTEBOOK = 'notebooks/REMOVE_NOTEBOOK';
const UPDATE_NOTEBOOK = 'notebooks/UPDATE_NOTEBOOK';

const load = (list) => ({
	type: LOAD_NOTEBOOKS,
	list,
});

const add = (notebook) => ({
	type: ADD_NOTEBOOK,
	notebook,
});

const update = (notebook) => ({
	type: UPDATE_NOTEBOOK,
	notebook,
});

const remove = (notebookId) => ({
	type: REMOVE_NOTEBOOK,
	notebookId,
});

export const getNotebooks = () => async (dispatch) => {
	const response = await fetch('/api/notebooks');

	if (response.ok) {
		const list = await response.json();
		dispatch(load(list));
	}
};

export const addNotebook = (payload) => async (dispatch) => {
	const response = await csrfFetch('/api/notebooks', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
};

const initialState = {};

const notebooksReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_NOTEBOOKS: {
			const notebooks = {};
			action.list.forEach((notebook) => {
				notebooks[notebook.id] = notebook;
			});
			return { ...state, ...notebooks };
		}
		default:
			return state;
	}
};

export default notebooksReducer;
