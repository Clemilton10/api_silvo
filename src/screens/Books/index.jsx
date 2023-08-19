import { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../../components/GlobalStorage';
import BibleApi from '../Versions/Bible';

export default function Books({ setPageName }) {
	const global = useContext(GlobalContext);

	const [books, setBooks] = useState([]);

	const handleBooks = async () => {
		const ctBibleApi = new BibleApi();
		const rp = await ctBibleApi.getBooks(global.token);
		console.clear();
		console.log(rp);
		setBooks(rp);
	};
	const handleBook = (book) => {
		global.setBook(book);
		setPageName('Chapters');
	};
	useEffect(() => {
		handleBooks();
	}, []);
	return (
		<div className="login_cover">
			<div className="login_content">
				<img
					src="/vite.svg"
					border="0"
					height="100"
					onClick={() => setPageName('Login')}
					style={{ cursor: 'pointer' }}
				/>
				<h1>Livros</h1>
				<div className="books_content">
					{books.map(({ name, abbrev }) => (
						<div
							className="btn"
							key={abbrev.pt}
							onClick={() => {
								handleBook(abbrev.pt);
							}}
						>
							{name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
