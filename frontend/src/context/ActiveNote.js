import { createContext, useContext, useState } from 'react';

export const ActiveNoteContext = createContext();

export const useActiveNote = () => useContext(ActiveNoteContext);

export default function ActiveNoteProvider({ children }) {
	const [activeNote, setActiveNote] = useState(null);

	return (
		<ActiveNoteContext.Provider
			value={{
				activeNote,
				setActiveNote,
			}}
		>
			{children}
		</ActiveNoteContext.Provider>
	);
}
