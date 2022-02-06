import { createContext, useContext, useState } from 'react';

export const ShowHideContext = createContext();

export const useShowHide = () => useContext(ShowHideContext);

export default function ShowHideProvider({ children }) {
	const [activeNote, setActiveNote] = useState(null);
	const [expandNote, setExpandNote] = useState(false);

	return (
		<ShowHideContext.Provider
			value={{
				activeNote,
				setActiveNote,
				expandNote,
				setExpandNote,
			}}
		>
			{children}
		</ShowHideContext.Provider>
	);
}
