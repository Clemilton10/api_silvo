import { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../../components/GlobalStorage';
import BibleApi from '../Versions/Bible';

export function Btn({ setPageName, label, url }) {
	const handleClick = () => {
		setPageName(url);
	};
	return (
		<div className="btn" onClick={handleClick}>
			{label}
		</div>
	);
}

export default function Verses({ setPageName }) {
	const global = useContext(GlobalContext);

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
					<Btn
						setPageName={setPageName}
						label={global.version.toUpperCase()}
						url="Versions"
					/>
				</font>
				<Btn setPageName={setPageName} label={book} url="Books" />
				<Btn setPageName={setPageName} label={chapter} url="Chapters" />
				<img
					src="/vite.svg"
					border="0"
					height="50"
					onClick={() => setPageName('Login')}
					style={{ cursor: 'pointer' }}
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
