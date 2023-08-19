import React, { useState, useEffect, useCallback } from 'react';

import { GlobalStorage } from './components/GlobalStorage';
import Login from './screens/Login';
import Register from './screens/Register';
import Versions from './screens/Versions';
import Books from './screens/Books';
import Chapters from './screens/Chapters';
import Verses from './screens/Verses';

const pages = {
	Login: Login,
	Register: Register,
	Versions: Versions,
	Books: Books,
	Chapters: Chapters,
	Verses: Verses
};

function App() {
	// buscando uma lista com o nomes das chaves (keys) em String
	const listName = Object.keys(pages);
	const [page, setPage] = useState(0);

	const setPageName = useCallback(
		(name) => {
			//buscando o nome passado na lista de nomes de chaves
			const pageIndex = listName.indexOf(name);
			// se não for -1 quer dizer que existe
			if (pageIndex !== -1) {
				setPage(pageIndex);
			}
		},
		[listName, setPage]
	);
	const PageComponent = pages[listName[page]];

	return (
		<GlobalStorage>
			<PageComponent setPageName={setPageName} />
		</GlobalStorage>
	);
}
export default App;
