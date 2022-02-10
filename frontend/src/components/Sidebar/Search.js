import Reac, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './Sidebar.css';

function Search() {
	const dispatch = useDispatch();
	const [showMenu, setShowMenu] = useState(false);

	const openMenu = () => {
		if (showMenu) return;
		setShowMenu(true);
	};

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

	const handleSearch = async (e) => {
		if (e.key === 'Enter') console.log('SEARCHED!!!');
	};

	return (
		<>
			<div id='sidebar-search-container'>
				<input
					id='sidebar-search'
					onKeyDown={handleSearch}
					onClick={openMenu}
					placeholder='&#xf002; Search'
				></input>
				{showMenu && (
					<div id='search-results' onKeyDown={handleSearch}>
						SEARCHED
					</div>
				)}
			</div>
		</>
	);
}

export default Search;
