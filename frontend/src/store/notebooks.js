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
	if (response.ok) {
		const newNotebook = await response.json();
		dispatch(add(newNotebook));
		return newNotebook;
	}
};

export const updateNotebook = (payload) => async (dispatch) => {
	const response = await csrfFetch(`/api/notebooks/${payload.notebookId}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const editedNotebook = await response.json();
		dispatch(update(editedNotebook));
		return editedNotebook;
	}
};

export const deleteNotebook = (notebookId) => async (dispatch) => {
	const response = await csrfFetch(`/api/notebooks/${notebookId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		const deletedNotebook = await response.json();
		dispatch(remove(notebookId));
		return deletedNotebook;
	}
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
		case ADD_NOTEBOOK: {
			const newState = { ...state, [action.notebook.id]: action.notebook };
			return newState;
		}
		case UPDATE_NOTEBOOK: {
			return {
				...state,
				[action.notebook.id]: action.notebook,
			};
		}
		case REMOVE_NOTEBOOK: {
			const newState = { ...state };
			delete newState[action.notebookId];
			return newState;
		}
		default:
			return state;
	}
};

export default notebooksReducer;
