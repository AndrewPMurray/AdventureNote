import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import './Sidebar.css';
import { getNotes } from '../../store/notes';
import { getNotebooks } from '../../store/notebooks';
import { useShowHide } from '../../context/ShowHide';

function Search() {
	const notes = useSelector((state) => state.notes);
	const notebooks = useSelector((state) => state.notebooks);
	const [showMenu, setShowMenu] = useState(false);
	const [searchInput, setSearchInput] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();
	const { setActiveNote } = useShowHide();

	const notesArr = Object.values(notes);
	const notebooksArr = Object.values(notebooks);

	const searchNotes = notesArr.filter((note, i) => {
		return (
			note.name?.toLowerCase().includes(searchInput.toLowerCase()) ||
			note.content?.toLowerCase().includes(searchInput.toLowerCase())
		);
	});

	const searchNotebooks = notebooksArr.filter((notebook, i) => {
		return notebook.title?.toLowerCase().includes(searchInput.toLowerCase());
	});

	const openMenu = () => {
		if (showMenu) return 0;
		setShowMenu(true);
	};

	useEffect(() => {
		dispatch(getNotes());
		dispatch(getNotebooks());
	}, [dispatch]);

	useEffect(() => {
		if (!showMenu) return;

		const closeMenu = (e) => {
			if (e.target === document.querySelector('#search-results')) return;
			if (e.target === document.querySelector('#sidebar-search')) return;
			setShowMenu(false);
		};

		document.addEventListener('click', closeMenu);

		return () => document.removeEventListener('click', closeMenu);
	}, [showMenu]);

	return (
		<>
			<div id='sidebar-search-container'>
				<input
					id='sidebar-search'
					onClick={openMenu}
					placeholder='&#xf002; Search'
					value={searchInput}
					onChange={(e) => setSearchInput(e.target.value)}
					autoComplete='off'
				></input>
				{showMenu && (
					<div id='search-results'>
						<ul id='note-search-results'>
							Notes
							{searchNotes.map((note, i) => {
								return (
									i < 10 && (
										<li key={note.id}>
											<Link
												to='/client/notes'
												onClick={() => {
													setActiveNote(note);
													setSearchInput('');
												}}
											>
												{note.name}
											</Link>
										</li>
									)
								);
							})}
						</ul>
						<ul id='notebook-search-results'>
							Notebooks
							{searchNotebooks.map((notebook, i) => {
								return (
									i < 10 && (
										<li key={notebook.id}>
											<Link
												to={`/client/notebooks/${notebook.id}`}
												onClick={() => setSearchInput('')}
											>
												{notebook.title}
											</Link>
										</li>
									)
								);
							})}
						</ul>
					</div>
				)}
			</div>
		</>
	);
}

export default Search;
