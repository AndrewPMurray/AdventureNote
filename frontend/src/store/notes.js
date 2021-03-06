import { csrfFetch } from './csrf';

const LOAD_NOTES = 'notes/LOAD_NOTES';
const ADD_NOTE = 'notes/ADD_NOTE';
const REMOVE_NOTE = 'notes/REMOVE_NOTE';
const UPDATE_NOTE = 'notes/UPDATE_NOTE';
const RESET_STATE = 'notes/RESET_STATE';

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

export const clearNoteState = () => ({ type: RESET_STATE });

export const getNotes = () => async (dispatch) => {
	const response = await fetch('/api/notes');

	if (response.ok) {
		const list = await response.json();
		dispatch(load(list));
	}
};

export const addNote = (note) => async (dispatch) => {
	const response = await csrfFetch('/api/notes', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
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
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(note),
	});
	if (response.ok) {
		const editedNote = await response.json();
		if (!editedNote.message) dispatch(update(editedNote));
		return editedNote;
	}
};

export const deleteNote = (noteId) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/${noteId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		const deletedNote = await response.json();
		dispatch(remove(noteId));
		return deletedNote;
	}
};

const sortByDate = (list) => {
	return list
		.map((note) => note)
		.sort((noteA, noteB) => {
			return noteB.updatedAt.replace(/[^\d]/g, '') - noteA.updatedAt.replace(/[^\d]/g, '');
		});
};

const initialState = {
	list: [],
};

const notesReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_NOTES: {
			const notes = {};
			action.list.forEach((note) => {
				notes[note.id] = note;
			});
			return {
				...state,
				...notes,
				list: sortByDate(action.list),
			};
		}
		case ADD_NOTE: {
			const newState = { ...state, [action.note.id]: action.note };
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
		case RESET_STATE: {
			return {
				list: [],
			};
		}
		default:
			return state;
	}
};

export default notesReducer;
