import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlobalContext } from '../../components/GlobalStorage';
import BibleApi from '../Versions/Bible';

export default function Books() {
	const global = useContext(GlobalContext);
	const navigate = useNavigate();

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
		navigate('/chapters');
	};
	useEffect(() => {
		handleBooks();
	}, []);
	return (
		<div className="login_cover">
			<div className="login_content">
				<img
					src="./public/vite.svg"
					border="0"
					height="100"
					onClick={() => navigate('/')}
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
