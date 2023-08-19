import { createContext, useState } from 'react';

export const GlobalContext = createContext();

export const GlobalStorage = ({ children }) => {
	const [token, setToken] = useState('');
	const [version, setVersion] = useState('');
	const [book, setBook] = useState('');
	const [chapter, setChapter] = useState('');

	return (
		<GlobalContext.Provider
			value={{
				token,
				setToken,
				version,
				setVersion,
				book,
				setBook,
				chapter,
				setChapter
			}}
		>
			{children}
		</GlobalContext.Provider>
	);
};
