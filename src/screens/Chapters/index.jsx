import { useContext, useState, useEffect } from 'react';

import { GlobalContext } from '../../components/GlobalStorage';
import BibleApi from '../Versions/Bible';

export default function Chapters({ setPageName }) {
	const global = useContext(GlobalContext);

	const [chapters, setChapters] = useState([]);

	const handleChapters = async () => {
		const ctBibleApi = new BibleApi();
		const rp = await ctBibleApi.getChapters(global.token, global.book);
		let tmp = [];
		for (let i = 0; i < rp.chapters; i++) {
			tmp.push(i + 1);
		}
		console.clear();
		console.log(tmp);
		setChapters(tmp);
	};
	const handleChapter = (chapter) => {
		global.setChapter(chapter);
		setPageName('Verses');
	};
	useEffect(() => {
		handleChapters();
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
				<h1>Capítulos</h1>
				<div className="books_content">
					{chapters.map((item) => (
						<div
							className="btn"
							key={item}
							onClick={() => {
								handleChapter(item);
							}}
						>
							{item}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}
