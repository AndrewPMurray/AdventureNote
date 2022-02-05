import { csrfFetch } from './csrf';

const LOAD_NOTES = 'notes/LOAD_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const REMOVE_NOTE = 'notes/REMOVE_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';

const load = (list) => ({
	type: LOAD_NOTES,
	list,
});

const add = (note) => ({
	type: ADD_NOTE,
	note,
});

const update = (note) => ({
	type: UPDATE_NOTE,
	note,
});

const remove = (noteId) => ({
	type: REMOVE_NOTE,
	noteId,
});

export const getNotes = () => async (dispatch) => {
	const response = await fetch('/api/notes');

	if (response.ok) {
		const list = await response.json();
		dispatch(load(list));
	}
};

export const addNote = (payload) => async (dispatch) => {
	const response = await csrfFetch('/api/notes', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
		},
		body: JSON.stringify(payload),
	});
	if (response.ok) {
		const newNote = await response.json();
		dispatch(add(newNote));
		return newNote;
	}
};

export const editNote = (note) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/${note.id}`, {
		method: 'PUT',
		headers: {
			'content-type': 'application/JSON',
		},
		body: JSON.stringify(note),
	});

	if (response.ok) {
		const editedNote = await response.json();
		dispatch(update(editedNote));
		return editedNote;
	}
};

export const deleteNote = (noteId) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/${noteId}`, {
		method: 'DELETE',
	});

	if (response.ok) {
		const deletedNote = await response.json();
		dispatch(remove(deletedNote.id));
		return deletedNote;
	}
};

const initialState = {};

const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_NOTES: {
			const allNotes = {};
			action.list.forEach((note) => {
				allNotes[note.id] = note;
			});
			return { ...allNotes, state };
		}
		case ADD_NOTE: {
			const newState = { ...state, [action.id]: { id: action.id } };
			return newState;
		}
		case REMOVE_NOTE: {
			const newState = { ...state };
			delete newState[action.noteId];
			return newState;
		}
		case UPDATE_NOTE: {
			return {
				...state,
				[action.note.id]: action.note,
			};
		}
		default:
			return state;
	}
};

export default notesReducer;
