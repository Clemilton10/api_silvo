import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { GlobalContext } from '../../components/GlobalStorage';
import BibleApi from '../Versions/Bible';

export function Btn({ label, url }) {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate(url);
	};
	return (
		<div className="btn" onClick={handleClick}>
			{label}
		</div>
	);
}

export default function Verses() {
	const global = useContext(GlobalContext);
	const navigate = useNavigate();

	const [verses, setVerses] = useState([]);
	const [book, setBook] = useState('');
	const [chapter, setChapter] = useState('');

	const handleVerses = async () => {
		const ctBibleApi = new BibleApi();
		const rp = await ctBibleApi.getVerses(
			global.token,
			global.version,
			global.book,
			global.chapter
		);
		console.clear();
		console.log(rp);
		setVerses(rp.verses);
		setBook(rp.book.name);
		setChapter(rp.chapter.number);
	};
	useEffect(() => {
		handleVerses();
	}, []);
	return (
		<div className="verses_cover">
			<h1 className="verses_h1">
				<font style={{ color: 'var(--white)' }}>
					<Btn label={global.version.toUpperCase()} url="/versions" />
				</font>
				<Btn label={book} url="/books" />
				<Btn label={chapter} url="/chapters" />
				<img
					src="./public/vite.svg"
					border="0"
					height="50"
					onClick={() => navigate('/')}
				/>
			</h1>
			<div className="verses_content">
				{verses.map(({ number, text }) => (
					<div key={number}>
						<strong>{number}</strong> {text}
					</div>
				))}
			</div>
		</div>
	);
}
