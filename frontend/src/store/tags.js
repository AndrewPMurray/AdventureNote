import { csrfFetch } from './csrf';

const LOAD_TAGS = 'tags/LOAD_TAGS';
const ADD_TAG = 'tags/ADD_TAG';
const ADD_TAG_TO_NOTE = 'tags/ADD_TAG_TO_NOTE';
const REMOVE_TAG = 'tags/REMOVE_TAG';
const UPDATE_TAG = 'tags/UPDATE_TAG';
const RESET_STATE = 'tags/RESET_STATE';

const load = (tags) => ({
	type: LOAD_TAGS,
	tags,
});

const add = (tag) => ({
	type: ADD_TAG,
	tag,
});

const addToNote = (tag) => ({
	type: ADD_TAG_TO_NOTE,
	tag,
});

const update = (tag) => ({
	type: UPDATE_TAG,
	tag,
});

const remove = (tagId) => ({
	type: REMOVE_TAG,
	tagId,
});

export const clearTagState = () => ({ type: RESET_STATE });

export const getTags = (userId, noteId) => async (dispatch) => {
	const response = await fetch(`/api/tags/${userId}/${noteId}`);

	if (response.ok) {
		const tags = await response.json();
		dispatch(load(tags));
	}
};

export const createTag = (tag) => async (dispatch) => {
	const response = await csrfFetch('/api/tags', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(tag),
	});
	if (response.ok) {
		const newTag = await response.json();
		dispatch(add(newTag));
		return newTag;
	}
};

export const addTag = (tagId, noteId) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/${noteId}/tags`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ tagId }),
	});
	if (response.ok) {
		const newNoteTag = await response.json();
		dispatch(addToNote(newNoteTag));
		return newNoteTag;
	}
};

export const editTag = (tag) => async (dispatch) => {
	const response = await csrfFetch(`/api/tags/${tag.id}`, {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(tag),
	});
	if (response.ok) {
		const editedTag = await response.json();
		if (!editedTag.message) dispatch(update(editedTag));
		return editedTag;
	}
};

export const deleteTag = (tagId) => async (dispatch) => {
	const response = await csrfFetch(`/api/tags/${tagId}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		const deletedTag = await response.json();
		dispatch(remove(tagId));
		return deletedTag;
	}
};

export const removeTag = (tagId, noteId) => async (dispatch) => {
	const response = await csrfFetch(`/api/notes/${noteId}/tags/${tagId}`, {
		method: 'DELETE',
	});
	if (response.ok) {
		const removedTag = await response.json();
		dispatch(remove(tagId));
	}
};

const initialState = { noteTags: [] };

const tagsReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TAGS: {
			const tags = {};
			action.tags.allTags.forEach((tag) => {
				tags[tag.id] = tag;
			});
			return {
				...state,
				...tags,
				noteTags: [...action.tags.noteTags],
			};
		}
		case ADD_TAG: {
			const newState = { ...state, [action.tag.id]: action.tag };
			return newState;
		}
		case ADD_TAG_TO_NOTE: {
			const newState = { ...state };
			state.noteTags.push(action.tag);
			return newState;
		}
		case REMOVE_TAG: {
			const newState = { ...state };
			delete newState[action.tagId];
			return newState;
		}
		case UPDATE_TAG: {
			return {
				...state,
				[action.tag.id]: action.tag,
			};
		}
		case RESET_STATE: {
			return {};
		}
		default:
			return state;
	}
};

export default tagsReducer;
